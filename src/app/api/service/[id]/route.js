import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    const p = await params;
    const data = await dbConnect(collectionNames.servicesCollection).findOne({ _id: new ObjectId(p.id) });
    return NextResponse.json(data);
}