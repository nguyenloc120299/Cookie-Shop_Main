
import { useEffect, useState } from 'react'
import { apiInstance } from '../baseApi'
function CategoriesApi() {
    const [products, setProducts] = useState([])
    const [callBack, setCallBack] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const getCategories = async () => {
        //  let arr = []
        setIsLoading(true)
        const res = await apiInstance.get("/products")
        if (res && res.data) {
            // res.data.forEach(data => {
            //     if (data.status === 1) arr.push(data)
            // });
            setProducts(res.data)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        getCategories()
    }, [callBack])


    return {
        products: [products, setProducts],
        callBack: [callBack, setCallBack],
        isLoading: [isLoading, setIsLoading]

    }
}

export default CategoriesApi
