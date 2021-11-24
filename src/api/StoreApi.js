import axios from "axios"
import { useEffect, useState } from "react"


function StoreApi() {

    const [stores, setStores] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getStores = async () => {

        const res = await axios.get("/stores")
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
