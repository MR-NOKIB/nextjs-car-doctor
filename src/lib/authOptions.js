import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNames } from "./dbConnect";

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "name" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    console.log(credentials);
                    // Add logic here to look up the user from the credentials supplied
                    const user = await loginUser(credentials);
                    console.log(user);

                    if (user) {
                        // Any object returned will be saved in `user` property of the JWT
                        return user
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        return null
                    }
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console these to check necessary properties;
            // console.log({ user, account, profile, email, credentials });
            if (account) {
                const { providerAccountId, provider } = account;
                const { email: user_email, image, name } = user;

                const userCollection = dbConnect(collectionNames.userCollection)
                const existingUser = await userCollection.findOne({ providerAccountId });
                if (!existingUser) {
                    const payload = { email: user_email, image, name, provider, providerAccountId }
                    await userCollection.insertOne(payload)
                }
            }
            return true
        },
    }
}