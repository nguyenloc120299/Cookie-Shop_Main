import React from 'react'
const Loading = () => {
    return (
        <div className='d-flex justofy-content-center align-items-center position-absolute' style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)'
        }}>
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

    )
}

export default Loading
