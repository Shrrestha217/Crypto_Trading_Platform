import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

const ForgotPasswordForm = () => {
    const form = useForm({
            resolver: "",
            defaultValues: {
                email: ""
            }
        })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className='px-10 py-2'>
            <h1 className='text-xl font-bold text-center pb-3'>Forgot Password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="border w-full border-gray-700 p-5"
                                    placeholder="Enter Email Id" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <Button type="submit" className="w-full py-5 text-xl">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ForgotPasswordForm