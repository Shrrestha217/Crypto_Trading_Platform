import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VerifiedIcon } from 'lucide-react'
import React from 'react'
import AccountVerificationForm from './AccountVerificationForm'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {auth} = useSelector(store => store)

    const handleEnableTwoStepVerification = ()=> {
        console.log("Two step verification")
    }

    return (
        <div className='flex flex-col items-center mb-5'>
            <div className='pt-10 w-full lg:w-[60%]'>
                <Card>
                    <CardHeader className='pb-9 text-left text-xl pl-10'>
                        <CardTitle>Your Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='lg:flex gap-40'>
                            <div className='space-y-7'>
                                <div className='flex'>
                                    <p className='w-[9rem] pl-4 text-left'>Email :</p>
                                    <p className='text-gray-500'>{auth.user?.email}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-[9rem] pl-4 text-left'>Full Name :</p>
                                    <p className='text-gray-500'>{auth.user?.fullName}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-[9rem] pl-4 text-left'>Date of Birth :</p>
                                    <p className='text-gray-500'>25/09/1999</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-[9rem] pl-4 text-left'>Nationality :</p>
                                    <p className='text-gray-500'>Indian</p>
                                </div>
                            </div>

                            <div className='space-y-7'>
                                <div className='flex'>
                                    <p className='w-[9rem] text-left pl-4'>Address :</p>
                                    <p className='text-gray-500'>Salt Lake</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-[9rem] text-left pl-4'>City :</p>
                                    <p className='text-gray-500'>Kolkata</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-[9rem] text-left pl-4'>Postcode :</p>
                                    <p className='text-gray-500'>831002</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-[9rem] text-left pl-4'>Country :</p>
                                    <p className='text-gray-500'>India</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className='mt-6'>
                    <Card className="w-full">
                        <CardHeader className="pb-7">
                            <div className='flex items-center gap-3'>
                                <CardTitle>2 Step Verification</CardTitle>
                                
                                {false ? <Badge className={"space-x-2 text-white bg-green-600 px-5 text-lg"}>
                                    <VerifiedIcon />
                                    <span>Enable</span>
                                </Badge> :
                                <Badge className="bg-orange-500 text-lg mx-2 px-5">
                                    Disable
                                </Badge>}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className='flex justify-start'>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button>Enable Two Step-Verification</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Verify Your Account</DialogTitle>
                                        </DialogHeader>
                                        <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification}/>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Profile