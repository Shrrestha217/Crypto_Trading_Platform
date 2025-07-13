import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BookmarkFilledIcon, BookmarkIcon, DotIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import TradingForm from './TradingForm'
import StockChart from '../Home/StockChart'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCoinDetails } from '@/State/Coin/Action'
import axios from 'axios'
import api from '@/config/api'

const StockDetails = () => {
    const { coin } = useSelector(store => store)
    const dispatch = useDispatch()
    const { id } = useParams()

    const [isInWatchlist, setIsInWatchlist] = useState(false)

    // Fetch coin details from your API
    useEffect(() => {
        dispatch(fetchCoinDetails({ coinId: id, jwt: localStorage.getItem('jwt') }))
    }, [id])

    // Check if coin is already in watchlist
    useEffect(() => {
        const checkWatchlist = async () => {
            try {
                const res = await axios.get('/api/watchlist/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })

                const coins = res.data?.coins || []
                const isCoinInWatchlist = coins.some(c => c.id === id)
                setIsInWatchlist(isCoinInWatchlist)
            } catch (err) {
                console.error('Failed to check watchlist', err)
            }
        }

        checkWatchlist()
    }, [id])

    const handleWatchlistToggle = async () => {
        try {
            if (isInWatchlist) {
                await axios.delete(`/api/watchlist/remove/coin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
            } else {
                await api.patch(`/api/watchlist/add/coin/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
            }
            setIsInWatchlist(!isInWatchlist)
        } catch (err) {
            console.error('Failed to toggle watchlist:', err)
        }
    }

    return (
        <div className='p-5 mt-5'>
            <div className='flex justify-between'>
                <div className='flex gap-5 items-center'>
                    <Avatar>
                        <AvatarImage src={coin.coinDetails?.image.large} />
                    </Avatar>
                    <div>
                        <div className='flex items-center gap-2'>
                            <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
                            <DotIcon className='text-gray-400' />
                            <p className='text-gray-400'>{coin.coinDetails?.name}</p>
                        </div>
                        <div className='flex items-end gap-2'>
                            <p className='text-xl font-bold'>${coin.coinDetails?.market_data.current_price.usd}</p>
                            <p className='text-red-600'>
                                <span>-{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                                <span>(-{coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <Button onClick={handleWatchlistToggle}>
                        {isInWatchlist ? (
                            <BookmarkFilledIcon className='h-6 w-6' />
                        ) : (
                            <BookmarkIcon className='h-6 w-6' />
                        )}
                    </Button>
                    <Dialog>
                        <DialogTrigger>
                            <Button className="lg text-xl font-bold">Trade</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>How much do you want to spend</DialogTitle>
                            </DialogHeader>
                            <TradingForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='mt-10'>
                <StockChart coinId={id} />
            </div>
        </div>
    )
}

export default StockDetails
