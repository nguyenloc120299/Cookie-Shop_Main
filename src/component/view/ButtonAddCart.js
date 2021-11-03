import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import { AiOutlineShoppingCart } from 'react-icons/all'
export const ButtonAddCart = ({ id }) => {
    const context = useContext(GlobalContext)
    const addCart = context.addCart
    const [isLogin] = context.isLoggin
    return (
        <>
            {
                isLogin ?

                    <button className='btn btn-primary w-100 btn-buy-now' onClick={() => addCart(id)} >
                        Mua ngay
                    </button> :

                    <Link to='/login' className='btn btn-primary w-100 d-flex justify-content-center'  >
                        Mua ngay
                    </Link>
            }
        </>
    )
}
