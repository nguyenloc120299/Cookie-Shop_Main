import React, { useContext, useEffect, useRef, useState } from 'react'
import Abount from './abount/Abount'
import './landing.css'
import Slider from './Slider/Slider'
import { GlobalContext } from '../../GlobalContext'
import CardSlide from './Slider/CardSlide'
import ButtonSlide from './Slider/ButtonSlide'
const Langding = () => {
    const context = useContext(GlobalContext)
    const [products] = context.productsApi.products
    const [listSlide, setListSlide] = useState([])
    const listRef = useRef()
    useEffect(() => {
        let arr = []
        products.forEach(p => {
            if (p.featured === 1) arr.push(p)
        });
        setListSlide(arr)
    }, [products])
    return (
        <div className='landing'>
            <Slider />

            <div className='w-100 abount home-slider mt-5'>

                <h4 style={{
                    textAlign: 'left',
                    margin: '10px'
                }}>Sản phẩm nổi bật</h4>
                <div className='landing-slider mt-5' >
                    <div className='slider__products' ref={listRef}>
                        {
                            listSlide.map((item, i) => (
                                <>
                                    <CardSlide item={item} key={item.id} />

                                </>
                            ))

                        }

                    </div>
                    <ButtonSlide listRef={listRef} />
                </div>

            </div>

            <div className='row w-100 abount mt-5'>
                <Abount />
            </div>

        </div>
    )
}

export default Langding
