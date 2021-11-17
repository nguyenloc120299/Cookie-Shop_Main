import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../GlobalContext'

const AmountCart = ({ p, removeProduct }) => {
    const context = useContext(GlobalContext)
    const [cart, setCart] = context.cart
    const [callBack, setCallback] = context.callBackcart
    const [quantity, setQuantity] = useState(1)
    const chageCart = (quantity, id) => {
        const newCart = cart.map(item => (
            (item.id === id ? {
                id: item.id,
                name: item.name,
                avartar: item.avartar,
                quantity: quantity,
                price: item.price,
                totalCost: item.price * quantity
            } : item)
        ))
        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCallback(!callBack)
    }
    useEffect(() => {
        chageCart(quantity, p.id)
    }, [quantity])
    const reduction = id => {
        setQuantity((quantity) => {
            let newQuantity = quantity - 1
            if (newQuantity < 1) return 1;
            return newQuantity
        })

    }

    const increase = id => {
        setQuantity((quantity) => {
            let newQuantity = quantity + 1

            return newQuantity
        })


    }

    console.log(quantity);
    return (
        <div className="amount" >
            <button className="btn btn-outline-dark" onClick={() => reduction(p.id)}> - </button>
            <span style={{
                marginLeft: '20px',
                marginRight: '20px'
            }}>{quantity}</span>
            <button className="btn btn-outline-dark" onClick={() => increase(p.id)}> + </button>
        </div>
    )
}

export default AmountCart
