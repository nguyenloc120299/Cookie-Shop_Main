const validProduct = ({
    name,
    code,
    sort_description,
    detail_description,
    price,
    avartar,
    quantity,
}) => {
    const err = {}
    if (!name) {
        err.name = 'Vui lòng nhập tên đầy đủ'
    } else if (name.length > 25) {
        err.name = 'Tên phải dưới 25 kí tự'
    }

    if (!code) {
        err.code = 'Vui lòng nhập code'
    } else if (code.length > 10) {
        err.code = 'Code phải dưới 10 kí tự'
    }


    if (!sort_description) {
        err.sort_description = 'Vui lòng nhập mô tả'
    } else if (sort_description.length > 80) {
        err.sort_description = 'Mô tả quá dài'
    }
    if (!detail_description) {
        err.detail_description = 'Vui lòng nhập mô tả'
    } else if (detail_description.length > 120) {
        err.detail_description = 'Mô tả quá dài'
    }
    if (!price) {
        err.price = 'Vui lòng nhập giá sản phẩm'
    } else if (!validatePrice(price)) {
        err.price = 'Giá không đúng'
    }

    if (!quantity) {
        err.quantity = 'Vui lòng nhập số lượng'
    }

    if (!avartar) {
        err.avartar = 'Chưa thêm ảnh'
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }

}
function validatePrice(input) {
    return /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(input);
}

export default validProduct