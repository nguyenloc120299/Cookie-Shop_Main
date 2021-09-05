import axios from "axios";
import { createContext, useEffect, useState } from "react";

import ProductApi from './api/ProductApi'
export const GlobalContext = createContext()

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [callBack, setCallBack] = useState(false)
    const [cart, setCart] = useState([])

    const getCategories = async () => {
        let arr = []
        const res = await axios.get("/products")
        if (res && res.data) {
            res.data.forEach(data => {
                if (data.status === 1) arr.push(data)
            });
            setProducts(arr)
        }
    }
    useEffect(() => {
        getCategories()
    }, [callBack])

    const addCart = (id) => {

        const check = cart.every(item => {
            return item.id !== id
        })

        if (check) {

            const item = products.filter(p => {
                return p.id === id
            })
            setCart([...cart, ...item])
        }
        else {
            alert("San phẩm đã thêm")
        }

    }

    const data = {

        productsApi: ProductApi(),
        addCart: addCart,
        cart: [cart, setCart]
    }
    useEffect(() => {
        const dataCart = JSON.parse(localStorage.getItem('cart'))
        if (dataCart) return setCart(dataCart)
    }, [])
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}