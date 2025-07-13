import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { DollarSignIcon } from 'lucide-react'
import dayjs from 'dayjs'

const Activity = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/api/orders', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })

                console.log('Response from /api/orders:', res.data)

                // Ensure response is always an array
                const fetchedOrders = Array.isArray(res.data) ? res.data : []

                setOrders(fetchedOrders)
            } catch (error) {
                console.error('Failed to fetch orders:', error)
                setOrders([]) // fallback to empty array
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    return (
        <div className='p-5 lg:p-20'>
            <h1 className='font-bold text-2xl text-left pb-5 flex items-center gap-2'>
                <DollarSignIcon />
                Trading History
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No trading activity yet.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Trading Coins</TableHead>
                            <TableHead>Buy Price</TableHead>
                            <TableHead>Sell Price</TableHead>
                            <TableHead>Order Type</TableHead>
                            <TableHead>Profit/Loss</TableHead>
                            <TableHead className='text-right'>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order, index) => {
                            const coin = order.coin || {}
                            const date = dayjs(order.createdAt).format('DD/MM/YYYY')
                            const time = dayjs(order.createdAt).format('HH:mm:ss')
                            const buyPrice = order.price || 0
                            const quantity = order.quantity || 0
                            const currentPrice = coin.currentPrice || 0
                            const value = currentPrice * quantity
                            const profitLoss = (currentPrice - buyPrice) * quantity
                            const orderType = order.orderType?.toUpperCase()

                            return (
                                <TableRow key={index}>
                                    <TableCell className="text-left text-gray-400">
                                        <p>{date}</p>
                                        <p>{time}</p>
                                    </TableCell>
                                    <TableCell className="font-medium text-left flex items-center gap-2">
                                        <Avatar className='z-50'>
                                            <AvatarImage src={coin.image || '/placeholder.png'} alt={coin.name} />
                                        </Avatar>
                                        <span>{coin.name || 'Unknown'}</span>
                                    </TableCell>
                                    <TableCell className="text-left">${buyPrice.toLocaleString()}</TableCell>
                                    <TableCell className="text-left">${currentPrice.toLocaleString()}</TableCell>
                                    <TableCell className="text-left">{orderType}</TableCell>
                                    <TableCell className={`text-left ${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}

export default Activity
