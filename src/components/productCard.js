import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product, isAddComponentAvailable = false }) => {
    return (
        <Link href={`/product/${product._id}`}>
            <div className="card w-96 bg-base-100 shadow-xl relative">
                <div className={`rounded-lg text-white font-bold text-base px-2 py-1 absolute top-2 right-2 z-10 ${product.status === "In Stock" ? "bg-green-500" : "bg-red-500"}`}>
                    {product.status}
                </div>
                <div className='h-[200px] w-full pt-5 relative overflow-hidden'>
                    <Image src={product.image} alt='product' layout="fill"
                        objectFit="cover" />
                </div>
                <div className="card-body bg-gray-300 text-black">
                    <h2 className="card-title">{product.productName}</h2>
                    <p className='text-purple-900 font-bold'>{product.category.name}</p>
                    <p>Price: {product.price}</p>
                    <p>Rating: {product.averageRating}</p>
                    {
                        isAddComponentAvailable && (
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Add Component</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;