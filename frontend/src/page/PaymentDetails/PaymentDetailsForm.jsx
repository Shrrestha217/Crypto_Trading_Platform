import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addPaymentDetails } from '@/State/Withdrawal/Action'
import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentDetails } from '@/State/Withdrawal/Action'

const PaymentDetailsForm = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const paymentDetails = useSelector(store => store)

    useEffect(() => {
        dispatch(getPaymentDetails(jwt))
    }, [dispatch, jwt])

    useEffect(() => {
    if (paymentDetails) {
        form.reset({
            accountHolderName: paymentDetails.accountHolderName || "",
            ifsc: paymentDetails.ifsc || "",
            accountNumber: paymentDetails.accountNumber || "",
            bankName: paymentDetails.bankName || ""
        })
    }
}, [paymentDetails])


    const form = useForm({
        resolver: "",
        defaultValues: {
            accountHolderName: "",
            ifsc: "",
            accountNumber: "",
            bankName: ""
        }
    })

    const onSubmit = (data) => {
        dispatch(addPaymentDetails({
            paymentDetails: data,
            jwt: localStorage.getItem("jwt")
        }))
        console.log(data)
    }

    return (
        <div className='px-10 py-2'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField control={form.control} name="accountHolderName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account Holder Name</FormLabel>
                            <FormControl>
                                <Input className="border w-full border-gray-700 p-5"
                                    placeholder="Veer Kumar" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="ifsc" render={({ field }) => (
                        <FormItem>
                            <FormLabel>IFSC Code</FormLabel>
                            <FormControl>
                                <Input className="border w-full border-gray-700 p-5"
                                    placeholder="XXXX-XXXX-XXXX" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="accountNumber" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                                <Input className="border w-full border-gray-700 p-5"
                                    placeholder="***********1652" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="confirmAccountNumber" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Account Number</FormLabel>
                            <FormControl>
                                <Input className="border w-full border-gray-700 p-5"
                                    placeholder="***********1652" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="bankName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                                <Input className="border w-full border-gray-700 p-5"
                                    placeholder="Yes Bank" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <DialogClose className='w-full'>
                        <Button type="submit" className="w-full py-5 text-xl">
                            Submit
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}

export default PaymentDetailsForm