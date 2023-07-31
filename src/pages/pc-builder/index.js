import config from '@/config';
import RootLayout from '@/layouts/rootLayout';
import { clearList, removeItem } from '@/redux/features/pc-build/pcBuildSlice';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PcBuilder = ({ categories }) => {
    const dispatch = useDispatch();
    const selectedItemList = useSelector(state => state.pcBuild.itemList);
    const [isAllCategoriesSelected, setIsAllCategoriesSelected] = useState(false);

    const isAllCategoryIncluded = (items) => {
        const productItems = new Set(items.map(item => item.category._id));
        const cats = new Set(categories.map(item => item._id));

        for (const item of cats) {
            if (!productItems.has(item)) {
                return false;
            }
        }

        return true;
    }

    useState(() => {
        const isValid = isAllCategoryIncluded(selectedItemList);
        setIsAllCategoriesSelected(isValid)
    }, [selectedItemList])


    const handleRemoveItem = (id) => {
        dispatch(removeItem(id));
        setIsAllCategoriesSelected(false);
    };

    const handleClearList = () => {
        dispatch(clearList());
        setIsAllCategoriesSelected(false);
    }

    const handleSave = () => {
        toast.success("Build saved successfully")
    }

    return (
        <div className='container m-auto text-white pb-20'>
            <h1 className='mt-7 mb-5 font-bold text-3xl text-black'>Build Your PC</h1>
            <p className='text-base'>Please select category from below</p>
            <div className='grid grid-cols-4 gap-4 text-black'>
                {categories.map(item => <div key={item._id} className={`py-2 px-4 rounded-md flex justify-between items-center ${selectedItemList.find(innerItem => innerItem.category._id === item._id) ? "bg-purple-400" : "bg-purple-100"}`}>
                    <p className='font-medium text-md'>{item.name}</p>
                    <Link href={`/category/${item._id}?choosable=true`} className='p-2 rounded-md bg-purple-900 text-white'>Choose</Link>
                </div>)}
            </div>
            <div className='mt-7 mb-5 flex items-center justify-between'>
                <div>
                    <h1 className=' font-bold text-3xl text-black'>Selected items</h1>
                    <p className='text-red-500 block'>Please select at least one component from all categories</p>
                </div>
                <button className='bg-red-500 flex p-3 rounded-md' onClick={handleClearList}>
                    <p className='text-white'>Clear list</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58 6.7 5.3a1 1 0 0 0-1.42 1.42L10.58 12l-5.3 5.3a1 1 0 0 0 1.42 1.4L12 13.42l5.3 5.3a1 1 0 0 0 1.42-1.42L13.42 12z" />
                    </svg>
                </button>
            </div>
            <div className='text-black gap-4 flex flex-col items-center'>
                {selectedItemList?.map(item => <div key={item._id} className='flex justify-between items-center px-4 py-3 w-[600px] rounded bg-purple-100'>
                    <p className='font-medium'>{item.productName}</p>
                    <button onClick={() => handleRemoveItem(item._id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58 6.7 5.3a1 1 0 0 0-1.42 1.42L10.58 12l-5.3 5.3a1 1 0 0 0 1.42 1.4L12 13.42l5.3 5.3a1 1 0 0 0 1.42-1.42L13.42 12z" />
                    </svg>
                    </button>
                </div>)}
                <button disabled={!isAllCategoriesSelected} onClick={handleSave} className={`mt-10 px-8 py-2 bg-purple-900 text-white rounded-md w-[600px] ${isAllCategoriesSelected ? "opacity-100" : "opacity-50"}`}>Complete Build</button>
            </div>
        </div>
    );
};

export const getServerSideProps = async () => {
    const data = await fetch(`${config.api_url}/get-categories`);
    const categories = await data.json();
    return {
        props: {
            categories
        }
    }
}

PcBuilder.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>
}

export default PcBuilder;