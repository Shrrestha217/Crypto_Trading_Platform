import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import AssetTable from './AssetTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Cross1Icon, DotIcon } from '@radix-ui/react-icons'
import { MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea } from '@/components/ui/scroll-area'

const Home = () => {
    const [selectedCoinId, setSelectedCoinId] = React.useState("bitcoin");
    const [coinDetails, setCoinDetails] = React.useState(null);

    const [category, setCategory] = React.useState("all");
    const [inputValue, setInputValue] = React.useState("");
    const [isBotRelease, setIsBotRelease] = React.useState(false);
    const { coin } = useSelector(store => store)
    const dispatch = useDispatch()

    const handleBotRelease = () => setIsBotRelease(!isBotRelease);

    const handleCategory = (value) => {
        setCategory(value)
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key == "Enter") {
            console.log(inputValue)
        }
        setInputValue("")
    }

    useEffect(() => {
        dispatch(getTop50CoinList())
    }, [category])

    useEffect(() => {
        dispatch(getCoinList(1))
    }, [])

    return (
        <div className='relative'>
            <div className='lg:flex'>
                <div className='lg:w-[50%] lg:border-r'>
                    <div className='p-3 flex items-center gap-4'>
                        <Button
                            onClick={() => handleCategory("all")}
                            variant={category == "all" ? "default" : "outline"}
                            className='rounded-full'>All
                        </Button>
                        <Button
                            onClick={() => handleCategory("top50")}
                            variant={category == "top50" ? "default" : "outline"}
                            className='rounded-full'>Top 50
                        </Button>
                        <Button
                            onClick={() => handleCategory("topGainers")}
                            variant={category == "topGainers" ? "default" : "outline"}
                            className='rounded-full'>Top Gainers
                        </Button>
                        <Button
                            onClick={() => handleCategory("topLossers")}
                            variant={category == "topLossers" ? "default" : "outline"}
                            className='rounded-full'>Top Lossers
                        </Button>
                    </div>
                    <ScrollArea>
                        <AssetTable coin={category == "all" ? coin.coinList : coin.top50} category={category} />
                    </ScrollArea>
                </div>
                <div className='hidden lg:block lg:w-[50%] p-3'>
                    <StockChart coinId={selectedCoinId} onDetailsFetched={setCoinDetails} />

                    {coinDetails && (
                        <div className='flex gap-5 items-center mt-4'>
                            <Avatar>
                                <AvatarImage src={coinDetails.image} />
                            </Avatar>
                            <div>
                                <div className='flex items-center gap-2'>
                                    <p>{coinDetails.symbol?.toUpperCase()}</p>
                                    <DotIcon className='text-gray-400' />
                                    <p className='text-gray-400'>{coinDetails.name}</p>
                                </div>
                                <div className='flex items-end gap-2'>
                                    <p className='text-xl font-bold'>${coinDetails.price?.toLocaleString()}</p>
                                    <p className={coinDetails.percentChange < 0 ? 'text-red-600' : 'text-green-600'}>
                                        <span>{coinDetails.priceChange?.toFixed(2)}</span>
                                        <span> ({coinDetails.percentChange?.toFixed(2)}%)</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <section className='bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2 sticky'>

                {isBotRelease && <div className='rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900'>
                    <div className='flex justify-between items-center border-b px-6 h-[12%]'>
                        <p>Chat Bot</p>
                        <Button onClick={handleBotRelease} variant="ghost" siz="icon">
                            <Cross1Icon />
                        </Button>
                    </div>

                    <div className='h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container'>
                        <div className='self-start pb-5 w-auto'>
                            <div className='justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto text-left'>
                                <p>Hi, Seema Jain</p>
                                <p>You can ask crypto related any question</p>
                                <p>like, price, market cap extra...</p>
                            </div>
                        </div>

                        {[1, 1, 1, 1].map((item, i) => (
                            <div
                                key={i}
                                className={`${i % 2 == 0 ? "self-start" : "self-end"} 'pb-5 w-auto'`}>

                                {i % 2 == 0 ? <div className='justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto text-left'>
                                    <p>Prompt who are you</p>
                                </div> : <div className='justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-fit text-right'>
                                    <p>Ans, Hi, Seema Jain</p>
                                </div>}
                            </div>
                        ))}
                    </div>

                    <div className='h-[12%] border-t'>
                        <Input className='w-full h-full order-none outline-none '
                            placeholder='Write Prompt'
                            onChange={handleChange}
                            value={inputValue}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>}

                <div className='relative w-[10rem] cursor-pointer group'>
                    <Button
                        onClick={handleBotRelease}
                        className='w-full h-[3rem] gap-2 items-center'>
                        <MessageCircle size={30} className='fill-[#1e293b] -rotate-90 stroke-none group-hover:fill-[#1a1a1a] message' />
                        <span className='text-2xl'>Chat Bot</span>
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Home