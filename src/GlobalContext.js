import axios from "axios";
import { createContext, useEffect, useState } from "react";
import UsersApi from './api/UserApi'
import ProductApi from './api/ProductApi'
export const GlobalContext = createContext()

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [callBack, setCallBack] = useState(false)
    const [cart, setCart] = useState([])
    const [isLoggin, setIsLoggin] = useState(false)
    const [isBuyer, setIsBuyer] = useState(false)
    const getProducts = async () => {
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
        const res = JSON.parse(localStorage.getItem('login_admin_main'))
        if (res) {
            if (res.roles[0].authority === 'Admin' || res.roles[0].authority === 'user') setIsLoggin(true)
        }
        else setIsLoggin(false)

    }, [])
    useEffect(() => {
        getProducts()
    }, [callBack])

    const addCart = (id) => {

        const check = cart.every(item => {
            return item.id !== id
        })
        setTimeout(() => {
            if (check) {

                const item = products.filter(p => {
                    return p.id === id
                })
                setCart([...cart, ...item])
            }
            else {
                // swal({
                //     title: "Hay lắm ",
                //     text: "nothing",
                //     icon: "warning",
                //     buttons: true,
                //     dangerMode: false,
                //     html: true
                // })
            }
        }, 1500);


    }

    const data = {

        productsApi: ProductApi(),
        addCart: addCart,
        cart: [cart, setCart],
        isLoggin: [isLoggin, setIsLoggin],
        usersApi: UsersApi()
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