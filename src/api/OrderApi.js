import axios from 'axios'
import React, { useEffect, useState } from 'react'

function OrderApi() {
    const [orders, setOrders] = useState([])
    const [history, setHistory] = useState([])
    const [callBack, setCallBack] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = JSON.parse(localStorage.getItem('login_admin_main'))
    const getOrders = async () => {
        setIsLoading(true)
        let data = []
        let history = []
        const res = await axios.get(`/orders/users/${id}`)
        if (res && res.data) {

            res.data.forEach(item => {
                item.listOrderDetail.forEach(element => {
                    if (element.status != 5) {
                        data.push({
                            name: element.name,
                            dateOrder: item.dateorder,
                            quantity: element.quantity,
                            total: element.totalmoney,
                            avartar: element.avartar,
                            payments: item.payments,
                            status: element.status
                        })
                    } else {
                        history.push({
                            name: element.name,
                            dateOrder: item.dateorder,
                            quantity: element.quantity,
                            total: element.totalmoney,
                            avartar: element.avartar,
                            payments: item.payments,
                            status: element.status
                        })
                    }
                });
            });
            setOrders(data)
            setHistory(history)
            setIsLoading(false)

        }
    }
    useEffect(() => {
        getOrders()
    }, [callBack])


    return {
        orders: [orders, setOrders],
        callBack: [callBack, setCallBack],
        history: [history, setHistory],
        isLoading: [isLoading, setIsLoading]

    }
}

export default OrderApi
