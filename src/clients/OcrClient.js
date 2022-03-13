import axios from "axios";

/**
 * 
 * @param {string} image 
 */
async function vatInvoice(image){
    
    try{
        const resp = await axios.post("http://192.168.1.2:8000/vat",image);
        return resp.data;
    }catch(err){
        console.log("ocr识别异常",err);
        return {};
    }
}

export default {
    vatInvoice
}