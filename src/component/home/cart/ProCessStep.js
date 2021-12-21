import React from 'react'

const ProCessStep = ({ status }) => {

    return (

        <div className="modal-body" >
            <ul className="progressbar">
                <li className={status === 0 ? 'active' : 'complete'}>Chờ xác nhận</li>
                <li className={status === 1 ? 'active' : (status === 0 ? '' : 'complete')}>Chuẩn bị hàng</li>
                <li className={status === 2 ? 'active' : ((status === 1 || status === 0) ? ' ' : 'complete')}>Đang giao</li>
                <li className={status === 3 ? 'active' : ((status === 0 || status === 1 || status === 2) ? '' : 'complete')} >Đã giao</li>

            </ul>
        </div >

    )
}

export default ProCessStep
