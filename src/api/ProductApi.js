import axios from 'axios'
import { useEffect, useState } from 'react'

function CategoriesApi() {
    const [products, setProducts] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getCategories = async () => {
        //  let arr = []
        const res = await axios.get("/products")
        if (res && res.data) {
            // res.data.forEach(data => {
            //     if (data.status === 1) arr.push(data)
            // });
            setProducts(res.data)
        }
    }
    useEffect(() => {
        getCategories()
    }, [callBack])


    return {
        products: [products, setProducts],
        callBack: [callBack, setCallBack],

    }
}

export default CategoriesApi
