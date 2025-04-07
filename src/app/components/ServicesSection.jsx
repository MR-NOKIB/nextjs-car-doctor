import dbConnect, { collectionNames } from '@/lib/dbConnect'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default async function ServicesSection() {
    // const res = await fetch("/services.json")
    // const data = await res.json();
    const data = await dbConnect(collectionNames.servicesCollection).find({}).toArray();

    return (
        <div className='grid grid-cols-12 gap-6 container mx-aut mt-4'>
            {
                data.map(item => {
                    return (
                        <div key={item._id} className='col_span-12 md:col-span-6 lg:col-span-4 border border-gray-300 rounded-lg p-4'>
                            <figure className='w-full h-3/4 flex justify-center items-center'>
                                <Image
                                    className='w-full h-full object-fit'
                                    src={item.img}
                                    width={314}
                                    height={108}
                                    alt={item.title} />
                            </figure>
                            <div className='flex justify-between items-center mt-4'>
                                <div>
                                    <h2 className='font-bold text-xl'>{item.title}</h2>
                                    <p className='font-bold text-xl text-orange-500 '>
                                        Price: {item.price}
                                    </p>
                                </div>
                                <Link href={`/services/${item._id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,105,0,1)"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
