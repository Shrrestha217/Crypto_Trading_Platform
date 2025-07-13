import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button' 

const AssetTable = ({ coin = [], category }) => {
    const navigate = useNavigate()

    const itemsPerPage = 8
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(coin.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentItems = coin.slice(startIndex, startIndex + itemsPerPage)

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
    }

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Coin</TableHead>
                        <TableHead>SYMBOL</TableHead>
                        <TableHead>VOLUME</TableHead>
                        <TableHead>MARKET CAP</TableHead>
                        <TableHead>24H</TableHead>
                        <TableHead className="text-right">PRICE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell
                                onClick={() => navigate(`/market/${item.id}`)}
                                className="font-medium text-left flex items-center gap-2 cursor-pointer"
                            >
                                <Avatar>
                                    <AvatarImage src={item.image} />
                                </Avatar>
                                <span>{item.name}</span>
                            </TableCell>
                            <TableCell>{item.symbol?.toUpperCase()}</TableCell>
                            <TableCell>{item.total_volume?.toLocaleString()}</TableCell>
                            <TableCell>{item.market_cap?.toLocaleString()}</TableCell>
                            <TableCell>{item.price_change_percentage_24h?.toFixed(2)}%</TableCell>
                            <TableCell className="text-right">${item.current_price?.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            {coin.length > 9 && (
                <div className="flex justify-between items-center">
                    <Button onClick={handlePrevious} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <p>
                        Page {currentPage} of {totalPages}
                    </p>
                    <Button onClick={handleNext} disabled={currentPage === totalPages} className="mr-2">
                        Next
                    </Button>
                </div>
            )}

        </div>
    )
}

export default AssetTable
