import React from 'react'
import "./Auth.css"
import SignupForm from './SignupForm'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import SigninForm from './SigninForm'
import ForgotPasswordForm from './ForgotPasswordForm'

const Auth = () => {
    const navigate = useNavigate()

    return (
        <div className='h-screen relative authContainer p-0'>
            <div className='absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50'>
                <div className='bgBlur absolute top-24 left-1/3 transform --translate-x-1/2-translate-y-1/2 
                    flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black 
                    bg-opacity-50 shadow-2xl shadow-white'>
                    <h1 className='text-6xl font-bold pb-9'><span className='text-red-700'>Crypto</span> Trade</h1>

                    {location.pathname == "/signup" ? 
                    <section className='w-full'>
                        <SignupForm/>
                        <div className='flex items-center justify-center'>
                            <span>Already have account?</span>
                            <Button onClick={() => navigate("/signin")} variant="ghost">
                                Signin
                            </Button>
                        </div>
                    </section>
                    : location.pathname == "/forgot-password" ? 
                    <section className='w-full'>
                        <ForgotPasswordForm/>
                        <div className='flex items-center justify-center mt-2'>
                            <span>Back to login?</span>
                            <Button onClick={() => navigate("/signup")} variant="ghost">
                                Signup
                            </Button>
                        </div>
                    </section> : 
                    <section className='w-full'>
                        <SigninForm/>
                        <div className='flex items-center justify-center'>
                            <span>Don't have account?</span>
                            <Button onClick={() => navigate("/signup")} variant="ghost">
                                Signup
                            </Button>
                        </div>

                        <div className="mt-10">
                            <Button className='py-5 px-36 mx-12' onClick={() => navigate("/forgot-password")} variant="outline">
                                Forgot Password
                            </Button>
                        </div>
                    </section>}
                </div>
            </div>
        </div>
    )
}

export default Auth