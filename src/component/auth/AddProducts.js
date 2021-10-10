import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import valid from '../../valid/ProductsValid'
const AddProducts = () => {

    const context = useContext(GlobalContext)
    const [callback, setCallBack] = context.productsApi.callBack
    const [callback1, setCallBack1] = context.usersApi.callBack
    const [img, setImg] = useState(false)

    const [categories] = context.untillApi.categories
    const [suppliers] = context.untillApi.suppliers
    const [isLoading, setIsLoading] = useState(false)
    const { id } = JSON.parse(localStorage.getItem('login_admin_main'))
    const history = useHistory()
    const [err, setErr] = useState('')
    const [productValue, setProductValue] = useState({
        name: '',
        code: '',
        sort_description: '',
        detail_description: '',
        price: '',
        avartar: '',
        quantity: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target
        setProductValue({ ...productValue, [name]: value })
    }

    const handleUploadImg = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0];
            if (!file) return alert("file không tồn tại")
            if (file.type !== 'image/jpg' && file.type !== 'image/png') return alert('file không đúng định dạng')
            let formData = new FormData()
            formData.append('file', file)
            setIsLoading(true)

            const res = await axios.post('https://polar-woodland-25756.herokuapp.com/upload', formData, { headers: { 'content-type': 'multipart/form-data' } })
            setIsLoading(false)
            setImg(res.data)
        } catch (err) {

        }
    }
    const handleDestroy = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await axios.post('https://polar-woodland-25756.herokuapp.com/destroy', { public_id: img.public_id })
            setIsLoading(false)
            setImg(false)
        } catch (err) {
            return err.response.data.msg
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {

            const check = valid(productValue)

            if (check.errLength > 0) return setErr(check.errMsg)
            else {
                setIsLoading(true)
                await axios.post(`/products/categories/${productValue.category}/suppliers/${productValue.supplier}/users/${id} `, {
                    ...productValue,
                    avartar: img.url,
                    featured: 0,
                    status: 0,
                    ban_nhanh: 0,
                    competitive_price: 0,
                    date_sale: new Date(),
                    promotion: 0

                })


                setIsLoading(false)

                setCallBack(!callback)
                setCallBack1(!callback1)
                history.push('/my-shop')

            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='add__product w-100 d-flex justify-content-around'>

            <form className='w-50' onSubmit={onSubmit}>
                <h2 style={{
                    textAlign: 'left'
                }}>Thông tin cơ bản</h2>
                <div className='mb-3'>

                    <input type='text' className='form-control' placeholder='Tên sản phẩm'
                        name='name'
                        value={productValue.name}
                        onChange={onChangeInput}
                    />
                    <small id="emailHelp" className="form-text text-danger ">
                        {err.name ? err.name : ''}
                    </small >

                </div>
                <div className='mb-3'>
                    <input type='text' className='form-control' placeholder='Mã Code'
                        name='code'
                        value={productValue.code}
                        onChange={onChangeInput}
                    />
                    <small id="emailHelp" className="form-text text-danger ">
                        {err.code ? err.code : ''}
                    </small >

                </div>
                <div className='mb-3'>
                    <textarea type='text' className='form-control' placeholder='Mô tả ngắn'
                        name='sort_description'
                        rows={3} role
                        value={productValue.sort_description}
                        onChange={onChangeInput}
                    />
                    <small id="emailHelp" className="form-text text-danger ">
                        {err.sort_description ? err.sort_description : ''}
                    </small >
                </div>
                <div className='mb-3'>
                    <textarea type='text' className='form-control' placeholder='Mô tả chi tiết'
                        name='detail_description' rows={5} role
                        value={productValue.detail_description}
                        onChange={onChangeInput}
                    />
                    <small id="emailHelp" className="form-text text-danger ">
                        {err.detail_description ? err.detail_description : ''}
                    </small >
                </div>
                {/* {isEdit &&
                <div className='mb-3'>
                    <input type='text' className='form-control' placeholder='Khuyến mãi'
                        name='promotion'
                    // value={value.promotion}
                    // onChange={onChangeInput} 
                    />

                </div>

            } */}
                <div className='mb-3'>
                    <input type='text' className='form-control' placeholder='Giá'
                        name='price'
                        value={productValue.price}
                        onChange={onChangeInput}
                    />
                    <small id="emailHelp" className="form-text text-danger ">
                        {err.price ? err.price : ''}
                    </small >
                </div>
                <div className='mb-3'>
                    <input type='text' className='form-control' placeholder='Số lượng'
                        name='quantity'
                        value={productValue.quantity}
                        onChange={onChangeInput}
                    />
                    <small id="emailHelp" className="form-text text-danger ">
                        {err.quantity ? err.quantity : ''}
                    </small >
                </div>

                <div className='mb-3'>
                    <select className='form-control' placeholder=''
                        name='category'
                        value={productValue.quantity}
                        onChange={onChangeInput}
                    >
                        <option>Chọn loại sản phẩm</option>
                        {
                            categories.map((item) => (
                                <option value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>

                </div>
                <div className='mb-3'>
                    <select className='form-control' placeholder=''
                        name='supplier'
                        value={productValue.quantity}
                        onChange={onChangeInput}
                    >
                        <option>Chọn nhà cung cấp</option>
                        {
                            suppliers.map((item) => (
                                <option value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>

                </div>
                <div className='button__add d-flex' >
                    <button className='btn btn-outline-dark '>Thêm sản phẩm</button>
                </div>
                <Link to='/my-shop'>Trở lại</Link>
            </form >
            <div className='img__product'>
                <h5>Hình ảnh sản phẩm</h5>

                <div className='img__product position-relative'>

                    {
                        img ?
                            <>
                                <img src={img.url}
                                    alt='avartar' style={{
                                        width: '250px',
                                        height: '300px'
                                    }} />
                                <div className='destroy position-absolute' style={{
                                    top: '0',
                                    right: '10px',
                                    color: 'red',
                                    fontWeight: 'bold',
                                    fontSize: '30px',
                                    cursor: 'pointer'
                                }} onClick={() => handleDestroy(img.public_id)} >X</div>

                            </>
                            :
                            <>
                                <label htmlFor="fileInput">
                                    <i className="fas fa-camera" style={{
                                        fontSize: '50px'
                                    }} />

                                    <input type='file' onChange={handleUploadImg} id='fileInput' style={{ display: 'none' }} />
                                </label>
                                <small id="emailHelp" className="text-danger ">
                                    {err.avartar ? err.avartar : ''}
                                </small >
                            </>
                    }


                </div>

            </div>

        </div >
    )
}


export default AddProducts
