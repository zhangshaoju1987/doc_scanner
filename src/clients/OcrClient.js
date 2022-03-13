import axios from "axios";

/**
 * 
 * @param {string} image 
 */
async function vatInvoice(image){
    
    try{
        const resp = await axios.post("https://signaling1001.msokd.com:50050/ocr/vatInvoice",{image});
        return resp.data;
    }catch(err){
        console.log("ocr识别异常",err);
        return {};
    }
}

export default {
    vatInvoice
}