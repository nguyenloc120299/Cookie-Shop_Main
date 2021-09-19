import axios from 'axios'
import { useEffect, useState } from 'react'

function CategoriesApi() {
    const [users, setUsers] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getUsers = async () => {
        let arr = []
        const res = await axios.get("/users")
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