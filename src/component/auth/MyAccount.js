
import React, { useContext, useState } from 'react'
import { apiInstance } from '../../baseApi'
// import { Link } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import { AiOutlineCamera } from 'react-icons/all'
import './login.css'
import { imageUpload } from '../../api/uploadImage'
import swal from 'sweetalert'
import Loading from '../view/Loading'
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
            status: 1

        })
        setIsEdit(!isEdit)
    }
    const handleUploadImg = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0];
            if (!file) return swal('File không đúng định dạng', '', 'warning')
            if (file.type !== 'image/jpg' && file.type !== 'image/png') return swal('file không đúng định dạng', '', 'warning')
            let formData = new FormData()
            formData.append('file', file)


            // const res = await apiInstance.post('https://polar-woodland-25756.herokuapp.com/upload', formData, { headers: { 'content-type': 'multipart/form-data' } })

            setImg(file)
        } catch (err) {

        }
    }

    const onSubmitEdit = async () => {
        try {

            if (valueInput.phone.length > 10) return swal('Số điện thoại có 10 chữ số', '', 'info')
            else {
                if (img) {
                    setIsLoading(true)
                    let media
                    media = await imageUpload([img])
                    await apiInstance.put('/users', {
                        ...valueInput, avartar: media[0].url
                    })
                    setCallback(!callback)
                    setIsLoading(false)
                }
                else {

                    await apiInstance.put('/users', {
                        ...valueInput,
                        avartar: info.avartar
                    })
                    setCallback(!callback)
                }
                setIsEdit(!isEdit)
                swal('Cập nhật thành công', '', 'success')
            }
        } catch (error) {
            setIsLoading(false)
            swal(`Có lỗi xảy ra thử lại sao`, '', 'error')
        }
    }
    return (
        <>
            <div className='my__account'>

                {
                    isLoading && <Loading />
                }

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

                    {!isEdit ? <button className='btn btn-primary mb-3' onClick={() => handleOnchangeEdit()}>Thay đổi</button> :
                        <button className='btn btn-primary btn_edit-info mb-3' onClick={() => onSubmitEdit()} >Lưu Thay đổi</button>
                    }
                </div>

                <div className='position-relative info_avt'>

                    <img src={img ? URL.createObjectURL(img) : info?.avartar} style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }} />

                    {
                        isEdit &&

                        <span className='d-flex justify-content-center'>
                            <label htmlFor="fileInput">
                                <AiOutlineCamera style={{
                                    fontSize: '50px'
                                }} />
                                <input type='file' onChange={handleUploadImg} id='fileInput' style={{ display: 'none' }} />
                            </label>
                        </span>
                    }
                </div>


            </div>

        </>
    )
}

export default MyAccount
