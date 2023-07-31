import ProductCard from '@/components/productCard';
import config from '@/config';
import RootLayout from '@/layouts/rootLayout';
import React, { useEffect, useState } from 'react';

const CategoryDetails = ({ categoryDetails }) => {
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        setCategoryName(categoryDetails.length ? categoryDetails[0].category.name : "")
    }, [categoryDetails])

    return (
        <div className='container m-auto'>
            <h1 className='mt-12 mb-10 mb-5 font-bold text-3xl text-black'>Items under {categoryName} category</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    categoryDetails?.map(item => <ProductCard key={item._id} product={item} />)
                }
            </div>
        </div>
    );
};

export const getStaticProps = async (context) => {
    const res = await fetch(`${config.api_url}/category/${context.params.slug}`)
    const categoryDetails = await res.json()
    return { props: { categoryDetails } }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${config.api_url}/get-categories`)
    const categoryList = await res.json()
    const categoryPaths = categoryList.map((cat) => ({
        params: { slug: cat._id },
    }))
    return { paths: categoryPaths, fallback: true }
}


CategoryDetails.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}

export default CategoryDetails;