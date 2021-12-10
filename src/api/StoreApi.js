import { useEffect, useState } from "react"
import { apiInstance } from "../baseApi"


function StoreApi() {

    const [stores, setStores] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getStores = async () => {

        const res = await apiInstance.get("/stores")
        if (res && res.data) {

            setStores(res.data)
        }

    }
    useEffect(() => {
        getStores()

    }, [callBack])


    return {
        stores: [stores, setStores],
        callBack: [callBack, setCallBack],

    }
}

export default StoreApi
