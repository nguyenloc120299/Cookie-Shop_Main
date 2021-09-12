import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'

export const ButtonAddCart = ({ id }) => {
    const context = useContext(GlobalContext)
    const addCart = context.addCart
    const [isLogin] = context.isLoggin
    return (
        <>
            {
                isLogin ?

                    <button className='btn btn-outline-dark w-100' onClick={() => addCart(id)} >
                        Mua ngay
                    </button> :

                    <Link to='/login' className='btn btn-outline-dark w-100'  >
                        Mua ngay
                    </Link>
            }
        </>
    )
}
