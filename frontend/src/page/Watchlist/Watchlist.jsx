import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchWatchlist = async () => {
        try {
            const res = await axios.get('http://localhost:5455/api/watchlist/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                }
            })
            setWatchlist(res.data || [])
        } catch (error) {
            console.error('Error fetching watchlist:', error)
            setWatchlist([])
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveFromWatchlist = async (coinId) => {
        try {
            await axios.delete(`http://localhost:5455/api/watchlist/remove/coin/${coinId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                }
            })
            setWatchlist(prev => prev.filter(coin => coin.id !== coinId))
        } catch (error) {
            console.error('Error removing coin from watchlist:', error)
        }
    }

    useEffect(() => {
        fetchWatchlist()
    }, [])

    return (
        <div className='p-5 lg:p-20'>
            <h1 className='font-bold text-2xl text-left pb-5 flex items-center gap-2'>
                <BookmarkFilledIcon className='w-9 h-9' />
                <span>Watchlist</span>
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : watchlist.length === 0 ? (
                <p>No coins in watchlist.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Coin</TableHead>
                            <TableHead>Symbol</TableHead>
                            <TableHead>24H Change</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Remove</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {watchlist.map((coin, index) => (
                            <TableRow key={coin.id || index}>
                                <TableCell className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src={coin.image} />
                                    </Avatar>
                                    {coin.name}
                                </TableCell>
                                <TableCell>{coin.symbol?.toUpperCase()}</TableCell>
                                <TableCell className={coin.priceChangePercentage24h >= 0 ? "text-green-500" : "text-red-500"}>
                                    {coin.priceChangePercentage24h?.toFixed(2)}%
                                </TableCell>
                                <TableCell>${coin.currentPrice?.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleRemoveFromWatchlist(coin.id)}
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <BookmarkFilledIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}

export default Watchlist
