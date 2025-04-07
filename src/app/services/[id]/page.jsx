import dbConnect, { collectionNames } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import React from 'react'

export default async function ServiceDetailsPage({ params }) {
    const p = await params;
    const data = await dbConnect(collectionNames.servicesCollection).findOne({ _id: new ObjectId(p.id) });
    return (
        <div className='max-w-[1137px] mx-auto'>
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

            <section>
                <Image src={data.img} width={400} height={280} alt={data.title} />
                <h1 className='text-2xl font-bold'>{data.title}</h1>
            </section>
        </div>
    )
}
