
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dataImg } from '../../assets/img/imgData'
import { apiInstance } from '../../baseApi'
import { GlobalContext } from '../../GlobalContext'

const Feedback = ({ id }) => {
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const [isLoggin, setIsLoggin] = context.isLoggin
    const [content, setContent] = useState('')
    const [callBack, setCallBack] = useState(false)
    const [index, setIndex] = useState(5)

    const handleIndex = () => {
        setIndex(index + 2)
    }
    const [user] = users.filter(item => {
        if (isLoggin) {
            const { id } = JSON.parse(localStorage.getItem('login_admin_main'))

            return item.id === id
        }
    })
    console.log(user);
    const [feedBack, setFeedback] = useState([])
    const getComment = async (id) => {
        const res = await apiInstance.get(`/comments/product/${id}`)
        if (res && res.data) setFeedback(res.data)
    }
    useEffect(() => {
        if (id) getComment(id)
    }, [id, callBack])
    const onSubmitComment = async () => {
        setFeedback([...feedBack, {
            name: user && user.name,
            avatar: user && user.avartar,
            content: content,
            userId: user && user.id,
            productId: id
        }])
        await apiInstance.post('/comments', {
            name: user && user.name,
            avatar: user && user.avartar,
            content: content,
            userId: user && user.id,
            productId: id
        })
        setCallBack(!callBack)
        setContent('')
    }
    return (
        <div className='feedback mb-3'>
            <h3>Đánh giá - Nhận xét từ khách hàng</h3>
            {
                feedBack && feedBack.slice(0, index).map(item => (
                    <div className='content mt-3 mb-3' key={item.id}>
                        <div className='des_content d-flex'>
                            <img src={item.avatar} alt='' style={{
                                width: "60px",
                                height: '60px',
                                borderRadius: '50%'
                            }} />
                            <div className='des_cmt' style={{
                                marginLeft: "2rem"
                            }}>
                                <div className='name_cmt ' style={{
                                    fontWeight: '700'
                                }}>
                                    {item.name}
                                </div>
                                <div className='comment_des'>
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                feedBack.length > 5 &&
                <Link to='#' style={{
                    fontWeight: 'bold'
                }} onClick={() => handleIndex()}>Xem thêm</Link>
            }
            <div className='form_cmt d-flex mt-3'>

                <textarea className='form-control w-50 text-cmt'
                    rows={3} placeholder='Thêm bình luận sản phẩm này...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {
                    isLoggin && <img src={dataImg.send} alt='' style={{
                        width: "50px",
                        height: '50px',
                        marginLeft: "3rem",
                        display: 'flex',
                        alignItems: 'center'
                    }} onClick={() => onSubmitComment()} />
                }

            </div>
        </div>
    )
}

export default Feedback
