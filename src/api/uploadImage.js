
export const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
        const formData = new FormData()

        // if (item.camera) {
        //     formData.append("file", item.camera)
        // } else {
        formData.append("file", item)
        // }

        formData.append("upload_preset", "bjcwnnri")
        formData.append("cloud_name", "loc120299")

        const res = await fetch("https://api.cloudinary.com/v1_1/loc120299/image/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        //  console.log(data);
        imgArr.push({ public_id: data.public_id, url: data.secure_url })
    }
    // console.log(imgArr);
    return imgArr;
}