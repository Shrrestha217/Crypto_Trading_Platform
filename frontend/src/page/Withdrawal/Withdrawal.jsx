import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getWithdrawalHistory } from '@/State/Withdrawal/Action'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Withdrawal = () => {
    const dispatch = useDispatch();
    const {wallet, withdrawal} = useSelector(store => store)

    useEffect(() => {
        dispatch(getWithdrawalHistory(localStorage.getItem("jwt")))
    }, [])

    return (
        <div className='p-5 lg:p-20'>
            <h1 className='font-bold text-2xl text-left pb-5 flex items-center gap-2'>
                Withdrawal</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {withdrawal.withdrawalHistory.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell className="text-left text-gray-400">
                                <p>{item.data.toString()}</p>
                            </TableCell>
                            <TableCell className="font-medium text-left flex items-center gap-2">
                                Bank Account
                            </TableCell>
                            <TableCell className="text-left">${item.amount}</TableCell>
                            <TableCell className="text-right">{item.status}</TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </div>
    )
}

export default Withdrawal