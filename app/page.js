import Link from 'next/link';



export default function Home() {
  return (
    <div>
        <div className='text-center px-10 mt-20 mx-auto md:w-1/2 xl:w-1/3'>
            <h2 className='text-2xl font-semibold'>Do You Need Help To Help You Hunt For Job?
              If So Give Us Your Username, Emails And We Will Send Recruiters To Them!
            </h2>

            <div className='flex justify-center items-center mt-20'>
                <button className='bg-black px-5 py-4 rounded-md text-white hover:bg-slate-500 font-semibold'><Link href="/register">Get Started With This Process Now</Link></button>
            </div> 
        </div>   
    </div>
  )
}
