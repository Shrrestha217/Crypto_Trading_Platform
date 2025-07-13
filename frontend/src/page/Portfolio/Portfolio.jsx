import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

const Portfolio = () => {
    const [assets, setAssets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const res = await axios.get('/api/asset', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })

                // Debugging output to confirm data structure
                console.log('Fetched assets:', res.data)

                // Make sure the response is an array
                if (Array.isArray(res.data)) {
                    setAssets(res.data)
                } else {
                    setAssets([]) // fallback if not array
                }
            } catch (error) {
                console.error('Error fetching portfolio:', error)
                setAssets([]) // fallback in case of error
            } finally {
                setLoading(false)
            }
        }

        fetchAssets()
    }, [])

    return (
        <div className="p-5 lg:p-20">
            <h1 className="font-bold text-2xl text-left pb-5">Portfolio.</h1>

            {loading ? (
                <p>Loading...</p>
            ) : assets.length === 0 ? (
                <p>No assets found.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Assets</TableHead>
                            <TableHead>SYMBOL</TableHead>
                            <TableHead>UNIT</TableHead>
                            <TableHead>PRICE</TableHead>
                            <TableHead>CHANGE(%)</TableHead>
                            <TableHead className="text-right">VOLUME</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assets.map((asset, index) => {
                            const coin = asset.coin || {}
                            const quantity = asset.quantity || 0
                            const price = coin.currentPrice || 0
                            const volume = quantity * price

                            return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-left flex items-center gap-2">
                                        <Avatar className="z-50">
                                            <AvatarImage
                                                src={coin.image || '/placeholder.png'}
                                                alt={coin.name || 'Asset'}
                                            />
                                        </Avatar>
                                        <span>{coin.name || 'Unknown'}</span>
                                    </TableCell>
                                    <TableCell className="text-left">
                                        {coin.symbol?.toUpperCase() || '-'}
                                    </TableCell>
                                    <TableCell className="text-left">{quantity}</TableCell>
                                    <TableCell className="text-left">
                                        ${price.toLocaleString()}
                                    </TableCell>
                                    <TableCell
                                        className={`text-left ${
                                            coin.priceChangePercentage24h >= 0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                        }`}
                                    >
                                        {coin.priceChangePercentage24h?.toFixed(2) || 0}%
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${volume.toLocaleString(undefined, {
                                            maximumFractionDigits: 2
                                        })}
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

export default Portfolio
