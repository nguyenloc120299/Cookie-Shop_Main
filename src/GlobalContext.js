
import { createContext, useEffect, useState } from "react";
import UsersApi from './api/UserApi'
import ProductApi from './api/ProductApi'
import UntillApi from './api/untill'
import swal from "sweetalert";
import OrderApi from "./api/OrderApi";
import StoreApi from './api/StoreApi'
import { apiInstance } from "./baseApi";
export const GlobalContext = createContext()

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [productSearch, setProductSearch] = useState([])
    const [supplier, setSupplier] = useState([])
    const [callBack, setCallBack] = useState(false)
    const [cart, setCart] = useState([])
    const [isLoggin, setIsLoggin] = useState(false)
    const [isBuyer, setIsBuyer] = useState(false)
    const [callBackcart, setCallBackCart] = useState(false)
    const res = JSON.parse(localStorage.getItem('login_admin_main'))
    const [isLoading, setIsLoading] = useState(false)
    const getProducts = async () => {
        let arr = []
        const res = await apiInstance.get("/products")
        if (res && res.data) {
            res.data.forEach(data => {
                if (data.status === 1) arr.push(data)
            });
            setProducts(arr)
        }
    }

    const getCategories = async () => {
        const res = await apiInstance.get("/categories")
        if (res && res.data) setCategories(res.data)
    }
    const getSuplliers = async () => {
        const res = await apiInstance.get("/suppliers")
        if (res && res.data) setSupplier(res.data)
    }
    useEffect(() => {
        if (res) {
            if (res.listroles[0].role === 'Admin' || res.listroles[0].role === 'user') setIsLoggin(true)
        }
        else setIsLoggin(false)

    }, [])
    useEffect(() => {
        getProducts()
        getCategories()
        getSuplliers()
    }, [callBack])

    const addCart = (id) => {

        const check = cart.every(item => {
            return item.id !== id
        })
        setTimeout(() => {
            let cartArr = []
            if (check) {

                const [item] = products.filter(p => {
                    return p.id === id
                })
                if (item.quantity === 0) {
                    swal('Sản phẩm đã hết', '', 'warning')
                } else {
                    // cartArr.push({
                    //     id: item.id,
                    //     name: item.name,
                    //     price: item.price,
                    //     quantity: 0,
                    //     quality: item.price
                    // })
                    // console.log(item);
                    setCart([...cart, {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        totalCost: item.price,
                        avartar: item.avartar,
                        competitive_price: item.competitive_price
                    }])
                    swal({
                        title: "Thêm thành công!",
                        icon: "success",
                    });
                }
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
                swal({
                    title: "Sản phẩm này đã được thêm vào giỏ!",
                    icon: "warning",
                });
            }
        }, 1200);


    }

    const data = {
        storesApi: StoreApi(),
        productsApi: ProductApi(),
        ordersApi: OrderApi(res),
        addCart: addCart,
        cart: [cart, setCart],
        isLoggin: [isLoggin, setIsLoggin],
        usersApi: UsersApi(),
        untillApi: UntillApi(),
        callBackcart: [callBackcart, setCallBackCart],
        categories: [categories, setCategories],
        suppliers: [supplier, setSupplier],
        productSearch: [productSearch, setProductSearch],
        isLoading: [isLoading, setIsLoggin]
    }
    useEffect(() => {
        const dataCart = JSON.parse(localStorage.getItem('cart'))
        if (dataCart) return setCart(dataCart)
    }, [callBackcart])
    useEffect(() => {
        let cartArr = []
        cart.forEach(element => {
            cartArr.push({
                id: element.id,
                name: element.name,
                avartar: element.avartar,
                quantity: 1,
                price: element.price,
                totalCost: element.price,
                competitive_price: element.competitive_price
            })
        });
        localStorage.setItem('cart', JSON.stringify(cartArr))
    }, [cart])
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}