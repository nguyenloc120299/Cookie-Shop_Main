import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'

const History = () => {
    const context = useContext(GlobalContext)
    const [history, setHistory] = context.ordersApi.history

    return (
        <div className='history'>

        </div>
    )
}

export default History
