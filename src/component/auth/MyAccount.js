import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'

import './login.css'
const MyAccount = () => {
    const [isEdit, setIsEdit] = useState(false)
    const { id } = JSON.parse(localStorage.getItem('login_admin_main'))
    const [isLoading, setIsLoading] = useState(false)

    const [valueInput, setValueInput] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })
    const handleOnchane = (e) => {
        const { name, value } = e.target

        setValueInput({ ...valueInput, [name]: value })
    }


    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const [callback, setCallback] = context.usersApi.callBack
    const [info] = users && users.filter((item, index) => {
        return item.id === id
    })
    const [img, setImg] = useState(false)
    const handleOnchangeEdit = () => {
        setValueInput({
            id: info.id,
            name: info.name,
            email: info.email,
            phone: info.phone,
            address: info.address,

        })
        setIsEdit(!isEdit)
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
    const handleDestroy = async () => {

        try {
            setIsLoading(true)
            await axios.post('https://polar-woodland-25756.herokuapp.com/destroy', { public_id: img.public_id })
            setIsLoading(false)
            setImg(false)
        } catch (err) {
            return err.response.data.msg
        }
    }
    const onSubmitEdit = async () => {
        console.log({ ...valueInput, avartar: img.url });
        if (img) {
            console.log(1);
            await axios.put('/users', {
                ...valueInput, avartar: img.url
            })
            setCallback(!callback)
        }
        else {
            console.log({ ...valueInput, avartar: info.avartar });
            await axios.put('/users', {
                ...valueInput, avartar: info.avartar
            })
            setCallback(!callback)
        }
        setIsEdit(!isEdit)
    }
    return (
        <>
            <div className='my__account'>



                <div className='input-profile-account'>
                    <h2 className='mb-3'>Hồ sơ của tôi</h2>
                    <div className='info_account mb-3'>
                        <h5>Tên đăng nhập:  {info && info.username} </h5>
                    </div>
                    <div className='info_account mb-3'>
                        {!isEdit ? <span> Họ và tên : {info && info.name} </span> : <input className='form-control' type='text'
                            name='name' onChange={handleOnchane} value={valueInput.name} />


                        }

                    </div>
                    <div className='info_account mb-3'>
                        {!isEdit ? <span>Email :  {info && info.email}</span> : <input className='form-control' type='text'
                            name='email' onChange={handleOnchane} value={valueInput.email} />}

                    </div>
                    <div className='info_account mb-3'>
                        {!isEdit ? <span> Số điện thoại :  {info && info.phone}</span> : <input className='form-control ' type='text'
                            name='phone' onChange={handleOnchane} value={valueInput.phone} />}
                    </div>
                    <div className='info_account mb-3'>
                        {!isEdit ? <span> Địa chỉ :  {info && info.address}</span> : <input className='form-control ' type='text'
                            name='address' onChange={handleOnchane} value={valueInput.address} />}
                    </div>

                    {!isEdit ? <button className='btn btn-outline-dark mb-3' onClick={() => handleOnchangeEdit()}>Thay đổi</button> :
                        <button className='btn btn-outline-dark btn_edit-info mb-3' onClick={() => onSubmitEdit()} >Lưu Thay đổi</button>
                    }
                </div>
                {!isEdit ? <img src={info && info.avartar} style={{
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                }} />
                    :
                    <>
                        <div className='avt_info position-relative'>

                            {
                                img ?
                                    <>
                                        <img src={img.url}
                                            alt='avartar' style={{
                                                width: '300px',
                                                height: '250px'
                                            }} />
                                        <div className='destroy position-absolute' style={{
                                            top: '0',
                                            right: '10px',
                                            color: 'red',
                                            fontWeight: 'bold',
                                            fontSize: '30px',
                                            cursor: 'pointer'
                                        }} onClick={() => handleDestroy(img.public_id)}>X</div>

                                    </>
                                    :
                                    <label htmlFor="fileInput">
                                        <i className="fas fa-camera" style={{
                                            fontSize: '50px'
                                        }} />
                                        <input type='file' onChange={handleUploadImg} id='fileInput' style={{ display: 'none' }} />
                                    </label>
                            }



                        </div>

                    </>
                }
            </div>

        </>
    )
}

export default MyAccount
