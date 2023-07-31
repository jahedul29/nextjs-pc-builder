import config from '@/config';
import RootLayout from '@/layouts/rootLayout';
import Image from 'next/image';

const ProductDetails = ({ productDetails }) => {
    return (
        <div className='container m-auto'>
            <h1 className='mt-12 mb-10 mb-5 font-bold text-3xl text-black'>{productDetails.productName}</h1>
            <div className=''>
                <div className='w-[500px] mb-20 m-auto'>
                    <Image className='!relative' src={productDetails.image} alt="product" objectFit="cover" layout="fill" />
                </div>
                <div className='text-black'>
                    <p className='text-3xl font-bold text-green-600'>{productDetails.status}</p>
                    <p className='text-2xl font-bold text-purple-900'>Category: {productDetails.category.name}</p>
                    <p className='text-4xl font-bold text-red-500'>{productDetails.price}</p>
                    <p className='text-xl font-bold'>Average Rating: {productDetails.averageRating}</p>
                    <p className='text-xl font-bold'>Individual Rating: {productDetails.individualRating}</p>
                    <p className='text-xl font-bold'>Key Features</p>
                    <ul className='list-disc pl-10'>
                        {productDetails.keyFeatures.map((item, index) => <li class key={index}>{item}</li>)}
                    </ul>
                    <p className='text-xl font-bold'>Reviews</p>
                    <ul className='list-disc pl-10'>
                        {productDetails.reviews.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const getStaticProps = async (context) => {
    const res = await fetch(`${config.api_url}/product/${context.params.slug}`)
    const productDetails = await res.json()
    return { props: { productDetails } }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${config.api_url}/get-products`)
    const productList = await res.json()
    const productPaths = productList.map((cat) => ({
        params: { slug: cat._id },
    }))
    return { paths: productPaths, fallback: true }
}


ProductDetails.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}

export default ProductDetails;