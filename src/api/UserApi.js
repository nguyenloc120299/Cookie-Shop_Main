import { useEffect, useState } from 'react'
import { apiInstance } from '../baseApi'

function CategoriesApi() {
    const [users, setUsers] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getUsers = async () => {
        let arr = []
        const res = await apiInstance.get("/users")
        if (res && res.data) {

            setUsers(res.data)
        }

    }
    useEffect(() => {
        getUsers()
    }, [callBack])


    return {
        users: [users, setUsers],
        callBack: [callBack, setCallBack],

    }
}

export default CategoriesApi
