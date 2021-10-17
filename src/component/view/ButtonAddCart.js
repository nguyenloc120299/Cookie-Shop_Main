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

                    <button className='btn btn-outline-dark w-50 btn-buy-now' onClick={() => addCart(id)} >
                        <AiOutlineShoppingCart /> Mua ngay
                    </button> :

                    <Link to='/login' className='btn btn-outline-dark w-50 d-flex'  >
                        <AiOutlineShoppingCart /> Mua ngay
                    </Link>
            }
        </>
    )
}
