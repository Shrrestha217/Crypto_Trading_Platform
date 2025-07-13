import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PaymentDetailsForm from "./PaymentDetailsForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getPaymentDetails } from "@/State/Withdrawal/Action"

const PaymentDetails = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const paymentDetails = useSelector(store => store.withdrawal.paymentDetails)

    useEffect(() => {
        dispatch(getPaymentDetails({jwt}))
    }, [dispatch, jwt])

    const isEmpty = !paymentDetails || !paymentDetails.accountNumber


    return (
        <div className="px-20 text-left">
            <h1 className="text-3xl font-bold py-10 text-left">Payment Details</h1>

            {!isEmpty ? <Card>
                <CardHeader>
                    <CardTitle>
                        {paymentDetails.bankName}
                    </CardTitle>
                    <CardDescription>
                        A/C No. : ***********{paymentDetails.accountNumber?.slice(-4)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <p className="w-32">A/C Holder</p>
                        <p className="text-gray-400"> : {paymentDetails.accountHolderName}</p>
                    </div>
                    <div className="flex items-center">
                        <p className="w-32">IFSC</p>
                        <p className="text-gray-400"> : {paymentDetails.ifsc}</p>
                    </div>
                </CardContent>
            </Card>
                : <Dialog>
                    <DialogTrigger>
                        <Button className="py-6 mt-3">Add Payment Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Payment Details</DialogTitle>
                        </DialogHeader>
                        <PaymentDetailsForm />
                    </DialogContent>
                </Dialog>
            }
        </div>
    )
}

export default PaymentDetails