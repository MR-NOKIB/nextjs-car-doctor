"use client"
import { signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        toast("Submitting ....")
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if (result.ok) {
                // Successful login, redirect to home page
                toast.success("Login Successful")
                router.push('/');
                form.reset();
            } else {
                toast.success("Failed To Login");
            }
        } catch (error) {
            console.log(error);
            toast.success("Failed To Login");
        }
    }
    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-2">
                    <input className="btn bg-orange-600 text-white hover:bg-orange-400 w-full" type="submit" value="Login" />
                </div>
            </form>
            <div className="text-center mb-8">
                <p>{"Don't"} have an account? <Link href="/register" className="link link-hover text-orange-600 font-bold">Register</Link></p>
                <div className="divider px-6">OR</div>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    )
}
