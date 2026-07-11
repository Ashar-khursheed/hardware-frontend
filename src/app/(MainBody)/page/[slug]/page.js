import PagesContent from '@/Components/Page/PagesContent'
import axios from 'axios';
import https from 'https';

async function getPageDetails(slug) {
    console.log("=== getPageDetails Start ===");
    console.log("Fetching slug:", slug);
    console.log("API URL:", `${process.env.API_PROD_URL}/page/slug/${slug}`);
    try {
        const response = await axios.get(`${process.env.API_PROD_URL}/page/slug/${slug}`, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });
        console.log("API Response Status:", response?.status);
        console.log("API Response Data:", response?.data);
        return response?.data;
    } catch (err) {
        console.error("Error fetching page details:", err.message || err);
        return null;
    }
}

export async function generateMetadata({ params }) {
    // fetch data
    const pagesData = await getPageDetails(params?.slug);
    return {
        openGraph: {
            title: pagesData?.meta_title,
            description: pagesData?.meta_description,
            images: [
                {
                    // url: '../../../../../../public/assets/images/logo.png',
                    url: pagesData?.page_meta_image?.original_url,
                    width: 1200,
                    height: 600,
                },
                {
                    // url: pagesData?.page_meta_image?.original_url,
                    url: '../../../../../../public/assets/images/logo.png',
                    width: 1200,
                    height: 600,
                }
            ]
        },
    }
}

const Pages = async ({ params }) => {
    const pagesData = await getPageDetails(params?.slug);

    return (
        <>
            {pagesData?.schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: pagesData.schema
                    }}
                />
            )}

            {params && <PagesContent params={params.slug} />}
        </>
    );
}

export default Pages