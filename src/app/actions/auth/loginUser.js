"use server"

import dbConnect, { collectionNames } from "@/lib/dbConnect";
import bcrypt from 'bcrypt'

export const loginUser = async (payload) => {

    const { email, password } = payload;

    const user = await dbConnect(collectionNames.userCollection).findOne({ email });
    console.log(user);
    if (!user) return null;

    const isPasswordOk = await bcrypt.compare(password, user.password)
    if (!isPasswordOk) return null;

    return user;
}