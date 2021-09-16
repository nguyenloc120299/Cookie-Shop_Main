import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import img from '../../../assets/img/data'
const Slider = () => {
    const [slide] = useState(img)
    const [index, setIndex] = useState(0)
    const leftOnClick = () => {
        setIndex(() => {
            let newIndex = index + 1;
            if (newIndex > slide.length - 1) return 0;
            return newIndex
        });
    };
    const rightOnClick = () => {
        setIndex(() => {
            let newIndex = index - 1;
            if (newIndex < 0) return slide.length - 1;
            return newIndex
        })
    }
    useEffect(() => {
        const timout = setTimeout(() => {
            setIndex(() => {
                let newIndex = index + 1;
                if (newIndex > slide.length - 1) return 0;
                return newIndex
            });
        }, 4000);
        return () => clearTimeout(timout);
    }, [index, slide])
    return (
        <div className='slider'>
            <div className='slide-show'>
                <img src={slide[index].url} alt='' />
                <div className='info'>
                    <h2 style={{ color: `${slide[index].type}` }}>{slide[index].title}</h2>
                    <span style={{ color: `${slide[index].type}` }}>Nguyễn Lộc</span>
                    <Link to='/home' style={{ backgroundColor: `${slide[index].color}` }}>Mua sắm ngay</Link>
                </div>

                <FaChevronLeft className='prev' onClick={leftOnClick} />


                <FaChevronRight className='next' onClick={rightOnClick} />

            </div>

        </div>
    )
}

export default Slider
