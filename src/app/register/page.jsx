import Image from 'next/image'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="lg:mr-12 md:mr-12 w-1/2">
                    <Image
                        src={"/assets/images/login/login.svg"}
                        width={460}
                        height={502}
                        alt="please login" />
                </div>
                <RegisterForm></RegisterForm>
            </div>
        </div>
    )
}
