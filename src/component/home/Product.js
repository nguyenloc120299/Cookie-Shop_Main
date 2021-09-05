import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import './home.css'
const Product = () => {
    const context = useContext(GlobalContext)
    const [products] = context.productsApi.products
    const addCart = context.addCart

    return (

        <div className='products'>
            {
                products.map(product => (
                    <div className='card__product' key={product.id}>
                        <Link to={`detail/${product._id}`}>
                            <img src={product.avartar} alt='' />
                        </Link>
                        <div className='box'>
                            <Link to=''><h4>{product.name}</h4></Link>
                            <p>{product.sort_description}</p>
                            <h5>{product.price}</h5>
                            <button className='btn btn-outline-dark w-100' onClick={() => addCart(product.id)} >
                                Mua ngay
                            </button>

                        </div>
                    </div>
                ))
            }

        </div>

    )
}

export default Product
