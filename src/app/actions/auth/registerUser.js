"use server"
import bcrypt from 'bcrypt';
import dbConnect, { collectionNames } from "@/lib/dbConnect"

export const registerUser = async (payload) => {
    const { name, email, password } = payload;
    // validation
    if (!email || !password) return null;

    const isExistingUser = await dbConnect(collectionNames.userCollection).findOne({ email: payload.email });
    if (!isExistingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        payload.password = hashedPassword;
        const result = await dbConnect(collectionNames.userCollection).insertOne(payload);
        console.log(result);
        result.insertedId = result.insertedId.toString();
        return result;
    }
    return null;
}