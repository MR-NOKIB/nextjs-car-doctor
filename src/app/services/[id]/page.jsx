import dbConnect, { collectionNames } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import React from 'react'

export default async function ServiceDetailsPage({ params }) {
    const p = await params;
    const res = await fetch(`http://localhost:3000/api/service/${p.id}`)
    const data = await res.json();
    return (
        <div className='max-w-[1137px] mx-auto pt-2 mb-20'>
            <section className='flex justify-center'>
                <figure className=' relative'>
                    <Image
                        className=''
                        src={"/assets/images/checkout/checkout.png"}
                        width={1137}
                        height={300}
                        alt="banner" />
                    <div className='absolute w-full h-full border rounded-lg top-0 overlay-bg'>
                        <div className='w-full h-full flex items-center ps-16 font-bold text-2xl'>
                            <div>
                                <h1 className='text-white'>Service Details</h1>
                            </div>
                        </div>
                    </div>
                </figure>
            </section>

            <section className='grid grid-cols-12 gap-4 mt-8'>
                <div className='col-span-9'>
                    <figure >
                        <Image
                            className='w-full h-full object-fill rounded'
                            src={data.img}
                            width={752} height={400}
                            alt={data.title} />
                    </figure>
                    <div className=''>
                        <h3 className='text-xl font-bold my-8'>{data.title}</h3>
                        <p className='textarea-accent'>{data.description}</p>
                    </div>
                </div>

                <div className='col-span-3'>
                    <h1 className='text-2xl font-bold mb-4'>
                        Price: ${data.price}
                    </h1>
                    <button className='bg-orange-500 text-white w-full py-2 rounded cursor-pointer'>
                        Checkout
                    </button>
                </div>
            </section>
        </div>
    )
}
