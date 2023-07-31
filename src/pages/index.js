// import { Inter } from 'next/font/google'
import ProductCard from '@/components/productCard';
import config from '@/config';
import RootLayout from '@/layouts/rootLayout'
import Link from 'next/link';
import bannerImg from '@/assets/images/pc-builder-banner.png'
import Image from 'next/image';
// const inter = Inter({ subsets: ['latin'] })

export default function Home({ featuredCategories, featuredProducts }) {
  return (
    <div className='container m-auto pb-20'>
      <div className='w-full h-[400px] sm:h-[600px] overflow-hidden flex items-center justify-center relative'>
        <Image src={bannerImg} alt='banner' objectFit='cover' className='w-full relative' />
        <div className='absolute h-full w-full flex items-center justify-center z-10 bg-gray-900 bg-opacity-70'>
          <h1 className='text-4xl sm:text-8xl font-bold font-italic text-white'>Build your own desktop</h1>
        </div>
      </div>
      <h1 className='mt-10 mb-7 font-bold text-3xl text-black text-center'>Featured Product</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-0 sm:gap-x-4'>
        {
          featuredProducts?.map(item => <ProductCard key={item._id} product={item} />)
        }
      </div>
      <h1 className='mt-10 mb-7 font-bold text-3xl text-black text-center'>Featured Categories</h1>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-y-4 gap-x-0 sm:gap-x-4'>
        {
          featuredCategories.map(cat => <Link key={cat._id} href={`/category/${cat._id}`}><div className='rounded-lg bg-purple-100 p-10 flex items-center justify-center w-[300px] text-xl text-black font-bold m-auto'>
            <p>{cat.name}</p>
          </div></Link>)
        }
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const data = await fetch(`${config.api_url}/get-categories/featured`);
  const result = await data.json();

  const productData = await fetch(`${config.api_url}/get-products/featured`);
  const productResult = await productData.json();

  return {
    props: {
      featuredCategories: result,
      featuredProducts: productResult
    }
  }
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>
}
