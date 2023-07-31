import { addItem } from '@/redux/features/pc-build/pcBuildSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const query = router.query;

    const handleAddItem = (e, item) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(addItem(item));
        router.push("/pc-builder")
    }

    return (
        <Link href={`/product/${product._id}`}>
            <div className="card w-96 bg-base-100 shadow-xl relative m-auto">
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
                        query.choosable && (
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={(e) => handleAddItem(e, product)}>Add To Builder</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;