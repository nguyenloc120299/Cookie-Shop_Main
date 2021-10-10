import axios from 'axios'
import { useEffect, useState } from 'react'

function CategoriesApi() {
    const [suppliers, setSuppliers] = useState([])
    const [categories, setCategories] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getCategories = async () => {
        //  let arr = []
        const res = await axios.get("/suppliers")
        const resCate = await axios.get("/categories")
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
