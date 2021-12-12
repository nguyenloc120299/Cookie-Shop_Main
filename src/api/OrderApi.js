
import { useEffect, useState } from 'react'
import { apiInstance } from '../baseApi'
function OrderApi(res1) {
    const [orders, setOrders] = useState([])
    const [history, setHistory] = useState([])
    const [callBack, setCallBack] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const getOrders = async () => {

        if (res1) {

            const { id } = res1
            setIsLoading(true)
            let data = []
            let history = []
            const res = await apiInstance.get(`/orders/users/${id}`)

            if (res && res.data) {

                res.data.forEach(item => {
                    item.listOrderDetail.forEach(element => {
                        if (element.status != 5 && element.status != 4) {
                            data.push({
                                name: element.name,
                                dateOrder: item.dateorder,
                                quantity: element.quantity,
                                total: element.totalmoney,
                                avartar: element.avartar,
                                payments: item.payments,
                                status: element.status
                            })
                        }
                        if (element.status == 4) {

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
