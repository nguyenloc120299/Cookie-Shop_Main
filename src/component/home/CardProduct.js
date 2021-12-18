import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonAddCart } from '../view/ButtonAddCart';
import Promotion from '../view/Promotion'

const CardProduct = ({ product, isShowBtn }) => {
    const numberFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <div className='card__product' key={product.id}>

            {/* <Link className='card__product__img' to={`/detail/${product.id}`}> */}
            <Link to={`/detail/${product.id}`}>
                <img src={product.avartar} alt='' />
            </Link>
            {/* </Link> */}
            <div className='box'>
                {product.promotion > 0 && <Promotion value={product.promotion} />}
                <Link to={`/detail/${product.id}`}>
                    <div className='name_product'>
                        <h5>{product.name}</h5>
                    </div>
                </Link>
                <p>{product.sort_description}</p>
                <div className='d-flex justify-content-around'>
                    <h5>{numberFormat.format(product.competitive_price)}</h5>
                    <p className='text-dark' style={{
                        color: 'rgb(120, 120, 120)'
                    }}>Đã bán {product.ban_nhanh}</p>
                </div>
                {
                    !isShowBtn && <ButtonAddCart id={product.id} />
                }


            </div>

        </div>
    )
}

export default CardProduct
