# 🚀 Hardware Store - Next.js with Stripe Integration Setup

## Your Project Configuration

**Frontend:** Next.js 14 - https://hardware.in-sourceit.com/  
**Backend:** Laravel API - https://api.in-sourceit.com/api  
**Storage:** https://api.in-sourceit.com/

---

## ✨ What's Updated

✅ **Complete Stripe Payment Integration** in checkout  
✅ **Fixed Total Calculations** (subtotal, shipping, tax)  
✅ **Professional Checkout UI/UX**  
✅ **Works with your existing Laravel backend**  
✅ **No API URL configuration needed** (already in next.config.mjs)

---

## 📦 Quick Setup (5 Minutes)

### Step 1: Extract & Install

```bash
# Extract the project
unzip hardware-frontend-updated-complete.zip -d hardware-frontend
cd hardware-frontend

# Install dependencies (includes Stripe packages)
npm install
```

### Step 2: Configure Stripe

```bash
# Copy environment template
cp .env.example .env.local
```

Edit `.env.local` and add your Stripe key:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
```

**Get your Stripe key:**
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy "Publishable key" (starts with `pk_test_`)
3. Paste in `.env.local`

### Step 3: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### Step 4: Test Checkout

1. Add products to cart
2. Go to checkout
3. Use test card: **4242 4242 4242 4242**
4. Expiry: **12/34**, CVC: **123**, ZIP: **12345**
5. Complete purchase!

---

## 🔧 Laravel Backend Integration

### Required API Endpoints

Your Laravel backend needs to handle these checkout endpoints:

#### 1. Checkout Calculation API

**Endpoint:** `POST https://api.in-sourceit.com/api/checkout`

**Purpose:** Calculate order totals (subtotal, shipping, tax)

**Request Body:**
```json
{
  "products": [
    {"id": 1, "quantity": 2, "variation_id": 5},
    {"id": 3, "quantity": 1}
  ],
  "shipping_address_id": 123,
  "billing_address_id": 123,
  "delivery_description": "standard",
  "delivery_interval": "",
  "payment_method": "stripe",
  "coupon": "DISCOUNT10",
  "points_amount": 0,
  "wallet_balance": 0
}
```

**Expected Response:**
```json
{
  "status": 200,
  "data": {
    "total": {
      "sub_total": 1000.00,
      "shipping_total": 50.00,
      "tax_total": 100.00,
      "total": 1150.00,
      "coupon_total_discount": 100.00
    }
  }
}
```

#### 2. Order Creation API

**Endpoint:** `POST https://api.in-sourceit.com/api/order`

**Purpose:** Create order and handle Stripe payment

**Request Body:**
```json
{
  "products": [...],
  "shipping_address_id": 123,
  "billing_address_id": 123,
  "delivery_description": "standard",
  "delivery_interval": "",
  "payment_method": "stripe",
  "coupon": "DISCOUNT10",
  "points_amount": 0,
  "wallet_balance": 0
}
```

**Expected Response for Stripe Payment:**
```json
{
  "status": 201,
  "data": {
    "order_number": "ORD-12345",
    "client_secret": "pi_xxx_secret_yyy",
    "is_guest": false,
    "consumer": {
      "email": "customer@example.com"
    }
  }
}
```

**Expected Response for COD:**
```json
{
  "status": 201,
  "data": {
    "order_number": "ORD-12345",
    "is_guest": false
  }
}
```

---

## 💻 Laravel Backend Implementation

### Install Stripe Package

```bash
composer require stripe/stripe-php
```

### Example Laravel Controller

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'products' => 'required|array',
            'payment_method' => 'required|string',
            'shipping_address_id' => 'nullable|integer',
            'billing_address_id' => 'required|integer',
            // ... other validations
        ]);

        // Calculate total
        $total = $this->calculateTotal($validated);

        // Create order in database
        $order = Order::create([
            'user_id' => auth()->id(),
            'order_number' => 'ORD-' . time(),
            'total' => $total,
            'payment_method' => $validated['payment_method'],
            'status' => 'pending',
            // ... other fields
        ]);

        // Handle Stripe payment
        if ($validated['payment_method'] === 'stripe') {
            $stripe = new StripeClient(env('STRIPE_SECRET_KEY'));
            
            try {
                $paymentIntent = $stripe->paymentIntents->create([
                    'amount' => $total * 100, // Amount in cents
                    'currency' => 'usd',
                    'metadata' => [
                        'order_id' => $order->id,
                        'order_number' => $order->order_number,
                    ],
                    'description' => 'Order ' . $order->order_number,
                ]);

                return response()->json([
                    'status' => 201,
                    'data' => [
                        'order_number' => $order->order_number,
                        'client_secret' => $paymentIntent->client_secret,
                        'is_guest' => !auth()->check(),
                        'consumer' => [
                            'email' => $order->email ?? auth()->user()->email,
                        ],
                    ],
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 500,
                    'message' => 'Payment processing failed: ' . $e->getMessage(),
                ], 500);
            }
        }

        // Handle COD
        if ($validated['payment_method'] === 'cod') {
            return response()->json([
                'status' => 201,
                'data' => [
                    'order_number' => $order->order_number,
                    'is_guest' => !auth()->check(),
                ],
            ]);
        }
    }

    public function checkout(Request $request)
    {
        // Calculate totals for display
        $subtotal = 0;
        $shipping = 50.00; // Calculate based on delivery method
        $tax = 0;

        foreach ($request->products as $product) {
            $productModel = Product::find($product['id']);
            $subtotal += $productModel->price * $product['quantity'];
        }

        // Calculate tax (example: 10%)
        $tax = $subtotal * 0.10;

        $total = $subtotal + $shipping + $tax;

        // Apply coupon if provided
        if ($request->coupon) {
            $discount = $this->applyCoupon($request->coupon, $subtotal);
            $total -= $discount;
        }

        return response()->json([
            'status' => 200,
            'data' => [
                'total' => [
                    'sub_total' => round($subtotal, 2),
                    'shipping_total' => round($shipping, 2),
                    'tax_total' => round($tax, 2),
                    'total' => round($total, 2),
                    'coupon_total_discount' => $discount ?? 0,
                ],
            ],
        ]);
    }
}
```

### Add to .env (Laravel Backend)

```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### Configure Routes (routes/api.php)

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::post('/order', [OrderController::class, 'createOrder']);
});
```

---

## 🎯 Files Changed in Your Project

```
src/Components/Pages/Checkout/
├── index.jsx                           ✅ Updated - Main checkout
├── CheckoutForm.jsx                    ✅ Updated - Form handler
├── CheckoutFormData/
│   └── PaymentMethodSection.jsx       ✅ NEW - Stripe integration
└── CheckoutSidebar/
    ├── index.jsx                       ✅ Updated - Totals calculation
    └── PlaceOrder.jsx                  ✅ Updated - Payment processing

public/styles/
└── checkout-styles.css                 ✅ NEW - Professional styling

Root Files:
├── package.json                        ✅ Updated - Stripe packages added
├── .env.example                        ✅ Updated - Stripe configuration
└── next.config.mjs                     ✅ No changes needed
```

---

## 🧪 Testing

### Test Cards

```
✅ Successful Payment:
Card: 4242 4242 4242 4242
Expiry: 12/34
CVC: 123
ZIP: 12345

❌ Declined:
Card: 4000 0000 0000 0002

🔐 3D Secure:
Card: 4000 0027 6000 3184
```

### Test Scenarios

1. ✅ Complete checkout with Stripe
2. ✅ Complete checkout with COD
3. ✅ Apply coupon code
4. ✅ Use points/wallet
5. ✅ Guest checkout
6. ✅ Logged-in user checkout
7. ✅ Test on mobile device
8. ✅ Test declined card
9. ✅ Test invalid card details

---

## 🚨 Important Notes

### API Configuration
Your APIs are already configured in `next.config.mjs`:
- ✅ Base URL: https://hardware.in-sourceit.com/
- ✅ API URL: https://api.in-sourceit.com/api
- ✅ Storage URL: https://api.in-sourceit.com/

**You don't need to change these!** Just add your Stripe key to `.env.local`

### Stripe Keys
- **Frontend (.env.local):** Publishable key (pk_test_xxx)
- **Backend (.env):** Secret key (sk_test_xxx)
- **Never commit** real keys to version control
- Use test keys for development
- Use live keys for production

### CORS Configuration
Make sure your Laravel backend allows requests from:
- https://hardware.in-sourceit.com
- http://localhost:3000 (for development)

Add to `config/cors.php`:
```php
'allowed_origins' => [
    'https://hardware.in-sourceit.com',
    'http://localhost:3000',
],
```

---

## 🎨 Customization

### Change Brand Colors

Edit `public/styles/checkout-styles.css`:

```css
/* Line 16 - Primary color */
.step-number {
  background: #007bff; /* Change to your brand color */
}

/* Line 305 - Button color */
.place-order-btn {
  background: #007bff; /* Change to your brand color */
}
```

### Add More Payment Methods

Edit `src/Components/Pages/Checkout/CheckoutFormData/PaymentMethodSection.jsx`:

```jsx
// Add PayPal, for example
<button 
  type="button" 
  className={`payment-tab ${selectedPaymentTab === 'paypal' ? 'active' : ''}`}
  onClick={() => {
    setSelectedPaymentTab('paypal');
    setFieldValue("payment_method", "paypal");
  }}
>
  <i className="ri-paypal-line me-2"></i> 
  PayPal
</button>
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
# Build the project
npm run build

# Test production build
npm start
```

**Environment Variables to Add:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
```

### Backend Deployment

Update your Laravel `.env`:
```env
STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
```

---

## 🐛 Troubleshooting

### Issue: Stripe not loading
**Fix:** 
1. Check `.env.local` exists
2. Verify key starts with `pk_test_`
3. Restart dev server: `npm run dev`

### Issue: API calls failing
**Fix:**
1. Check backend is running
2. Verify CORS is configured
3. Check browser console for errors
4. Verify API URLs in `next.config.mjs`

### Issue: Total calculations not showing
**Fix:**
1. Verify backend `/api/checkout` endpoint is working
2. Check response format matches expected structure
3. Review browser network tab for API response

### Issue: Payment not processing
**Fix:**
1. Check Laravel backend has Stripe secret key
2. Verify backend returns `client_secret`
3. Check Stripe dashboard for payment logs
4. Review browser console for errors

---

## 💰 Costs

**Stripe Fees:**
- No setup fees
- No monthly fees
- 2.9% + $0.30 per successful charge

**Example:**
- $100 sale = $96.80 to you (Stripe fee: $3.20)

---

## 📚 Additional Resources

**Stripe:**
- Documentation: https://stripe.com/docs
- Laravel Package: https://github.com/stripe/stripe-php
- Testing: https://stripe.com/docs/testing
- Dashboard: https://dashboard.stripe.com

**Your Project:**
- Backend API: https://api.in-sourceit.com/api
- Frontend: https://hardware.in-sourceit.com/

---

## ✅ Setup Checklist

- [ ] Extract project files
- [ ] Run `npm install`
- [ ] Create `.env.local` with Stripe key
- [ ] Configure Laravel backend with Stripe
- [ ] Test checkout with test card
- [ ] Verify API endpoints work
- [ ] Test on mobile
- [ ] Check CORS configuration
- [ ] Review error handling
- [ ] Test all payment methods

**All done?** You're ready to go live! 🎉

---

## 🆘 Need Help?

1. Check `PROJECT-README.md` for full documentation
2. Review `CHECKOUT-README.md` for checkout details
3. See Laravel logs: `storage/logs/laravel.log`
4. Check browser console (F12) for frontend errors
5. Review Stripe dashboard for payment logs

---

*Setup Guide for Hardware Store - Next.js + Laravel*  
*Last Updated: December 2024*
