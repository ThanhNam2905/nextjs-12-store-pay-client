export const validateEmail = (email) => {
    const regextSt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regextSt.test(email);
};

export const validateCreateProduct = (product, images) => {
    let sizes = product.sizes;
    let details = product.details;
    let questions = product.questions;
    const checks = [
        {
            msg: `Tên sản phẩm, mô tả sản phẩm, thương hiệu sản phẩm.`,
            type: "success",
        }
    ];
    if(images.length < 4) {
        checks.push({
            msg: `Vui lòng chọn ít nhất 4 hình ảnh sản phẩm (còn thiếu ${4 - images.length} hình ảnh).`,
            type: "error",
        });
    }
    else {
        checks.push({
            msg: `Hình ảnh sản phẩm.`,
            type: "success",
        })
    }
    if(!product.color.color) {
        checks.push({
            msg: `Vui lòng chọn màu sắc cho sản phẩm.`,
            type: "error",
        })
    }
    else {
        checks.push({
            msg: `Màu sắc sản phẩm.`,
            type: "success",
        })
    }
    if(!product.color.image) {
        checks.push({
            msg: `Vui lòng chọn hình ảnh màu sắc cho sản phẩm.`,
            type: "error",
        })
    }
    else {
        checks.push({
            msg: `Hình ảnh màu sắc sản phẩm.`,
            type: "success",
        })
    }

    for (let index = 0; index < sizes.length; index++) {
        if(sizes[index].size === "" || sizes[index].qty === "" || sizes[index].price === "") {
            checks.push({
                msg: `Vui lòng chọn kích cỡ cho sản phẩm và nhập số lượng, giá tiền của sản phẩm.`,
                type: "error",
            })
        }
        else {
            checks.push({
                msg: `Kích cỡ sản phẩm, số lượng và giá tiền của sản phẩm.`,
                type: "success",
            })
        }
    }
    for (let index = 0; index < details.length; index++) {
        if(details[index].name === "" || details[index].value === "") {
            checks.push({
                msg: `Vui lòng điền tên chi tiết và thông số chi tiết sản phẩm.`,
                type: "error",
            })
        }
        else {
            checks.push({
                msg: `Chi tiết và thông số chi tiết sản phẩm.`,
                type: "success",
            })
        }
    }
    for (let index = 0; index < questions.length; index++) {
        if(questions[index].question === "" || questions[index].answer === "") {
            checks.push({
                msg: `Vui lòng điền câu hỏi và câu trả lời sản phẩm.`,
                type: "error",
            })
        }
        else {
            checks.push({
                msg: `Câu hỏi và câu trả lời sản phẩm.`,
                type: "success",
            })
        }
    }
    let is_check = checks.find((item) => item.type === "error");
    if(is_check) {
        return checks;
    }
    else {
        return "valid";
    }
};