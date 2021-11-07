import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import ModalAuth from '../auth/ModalAuth'
export const ButtonAddCart = ({ id }) => {
    const context = useContext(GlobalContext)
    const addCart = context.addCart
    const [isLogin] = context.isLoggin

    const [isShowModal, setIsShowModal] = useState(false)
    return (
        <>
            {
                isLogin ?

                    <button className='btn btn-primary w-100 btn-buy-now' onClick={() => addCart(id)} >
                        Mua ngay
                    </button> :

                    <Link to='#' onClick={() => setIsShowModal(true)} className='btn btn-primary w-100 d-flex justify-content-center'  >
                        Mua ngay
                    </Link>
            }
            {
                isShowModal && <ModalAuth setIsShow={setIsShowModal} />
            }
        </>

    )
}
