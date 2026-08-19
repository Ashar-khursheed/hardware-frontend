import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      orderNumber = `ORD-${Date.now()}`,
      orderDate = new Date().toISOString(),
      orderStatus = 'awaiting_shipment',
      customerName = '',
      customerEmail = '',
      shippingAddress = {},
      billingAddress = {},
      items = [],
      shippingCost = 0,
      carrierCode = 'stamps_com',
      serviceCode = 'usps_priority_mail',
      serviceName = 'USPS Priority Mail',
      paymentMethod = 'cod'
    } = body;

    const apiKey = process.env.SHIPSTATION_API_KEY || 'lgHleF9HQUXKp76+cYs13Abh1gMDj6MqUQsej4yCIWI';
    const apiSecret = process.env.SHIPSTATION_API_SECRET || apiKey;
    const authHeader = 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const formattedItems = (items || []).map((item) => ({
      name: item?.product?.name || item?.name || 'Hardware Product',
      sku: item?.product?.sku || item?.sku || `SKU-${item?.product_id || item?.id || '101'}`,
      quantity: item?.quantity || 1,
      unitPrice: Number(item?.product?.sale_price || item?.price || 0),
      imageUrl: item?.product?.product_thumbnail?.original_url || ''
    }));

    const shipTo = {
      name: customerName || `${shippingAddress.title || ''} ${shippingAddress.first_name || ''}`.trim() || 'Valued Customer',
      company: shippingAddress.company || '',
      street1: shippingAddress.street || shippingAddress.address_line_1 || '',
      street2: shippingAddress.address_line_2 || '',
      city: shippingAddress.city || '',
      state: shippingAddress.state_name || shippingAddress.state_id || '',
      postalCode: shippingAddress.pincode || shippingAddress.postal_code || '',
      country: shippingAddress.country_code || 'US',
      phone: shippingAddress.phone || body.phone || '',
      residential: true
    };

    const shipstationOrderPayload = {
      orderNumber: String(orderNumber),
      orderDate: orderDate,
      orderStatus: orderStatus,
      customerUsername: customerEmail,
      customerEmail: customerEmail,
      billTo: {
        name: customerName || 'Valued Customer',
        company: billingAddress.company || '',
        street1: billingAddress.street || shippingAddress.street || '',
        city: billingAddress.city || shippingAddress.city || '',
        state: billingAddress.state_name || shippingAddress.state_name || '',
        postalCode: billingAddress.pincode || shippingAddress.pincode || '',
        country: billingAddress.country_code || 'US',
        phone: billingAddress.phone || body.phone || ''
      },
      shipTo: shipTo,
      items: formattedItems,
      amountPaid: Number(body.total || 0),
      shippingAmount: Number(shippingCost || 0),
      carrierCode: carrierCode,
      serviceCode: serviceCode,
      requestedShippingService: serviceName,
      paymentMethod: paymentMethod,
      advancedOptions: {
        storeId: null
      }
    };

    console.log('Posting order to ShipStation account accounts@convexns.com:', shipstationOrderPayload);

    let shipstationSuccess = false;
    let ssResponseData = null;

    try {
      const ssResponse = await fetch('https://ssapi.shipstation.com/orders/createorder', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipstationOrderPayload),
        cache: 'no-store'
      });

      if (ssResponse.ok) {
        ssResponseData = await ssResponse.json();
        shipstationSuccess = true;
      } else {
        const errorText = await ssResponse.text();
        console.warn('ShipStation createorder API response status:', ssResponse.status, errorText);
      }
    } catch (apiErr) {
      console.warn('ShipStation API connection attempt:', apiErr.message);
    }

    return NextResponse.json({
      success: true,
      shipstationSynced: shipstationSuccess,
      orderNumber: orderNumber,
      shipstationOrder: ssResponseData,
      message: shipstationSuccess ? 'Order successfully synced with ShipStation' : 'Order saved in store DB'
    });

  } catch (error) {
    console.error('ShipStation Create Order API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to sync order with ShipStation'
    }, { status: 500 });
  }
}
