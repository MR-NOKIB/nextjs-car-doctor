"use client"
import { registerUser } from "@/app/actions/auth/registerUser";
import SocialLogin from "@/app/login/components/SocialLogin";
import Link from 'next/link'

export default function RegisterForm() {
    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        await registerUser({ name, email, password });
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
                <h1 className="text-3xl font-bold text-center">Register</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                </div>
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
                    </label>
                </div>
                <div className="form-control mt-6">
                    <input className="btn bg-orange-600 text-white hover:bg-orange-400 w-full" type="submit" value="Register" />
                </div>
            </form>
            <div className="text-center mb-8">
                <p>Already have an account? <Link href="/login" className="link link-hover text-orange-600 font-bold">Login</Link></p>
                <div className="divider px-6">OR</div>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    )
}
