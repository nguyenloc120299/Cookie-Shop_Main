import { useEffect, useState } from 'react'
import { apiInstance } from '../baseApi'

function CategoriesApi() {
    const [suppliers, setSuppliers] = useState([])
    const [categories, setCategories] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getCategories = async () => {
        //  let arr = []
        const res = await apiInstance.get("/suppliers")
        const resCate = await apiInstance.get("/categories")
        if (res && res.data) {
            // res.data.forEach(data => {
            //     if (data.status === 1) arr.push(data)
            // });
            setSuppliers(res.data)
        }
        if (resCate && resCate.data) {
            // res.data.forEach(data => {
            //     if (data.status === 1) arr.push(data)
            // });
            setCategories(resCate.data)
        }
    }
    useEffect(() => {
        getCategories()
    }, [callBack])


    return {
        categories: [categories, setCategories],
        suppliers: [suppliers, setSuppliers],
        callBack: [callBack, setCallBack],

    }
}

export default CategoriesApi
