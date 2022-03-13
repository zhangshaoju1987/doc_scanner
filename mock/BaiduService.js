const OcrClient =  require("baidu-aip-sdk").ocr;
const express = require("express");
var APP_ID = "25755756";
var API_KEY = "v7kkfqFOQgAEGReM2PZnp12a";
var SECRET_KEY = "6ZotKe5sNDEvOndemkOcX1V5XBKyBIpx";
const ocrClient = new OcrClient(APP_ID, API_KEY, SECRET_KEY);
const app = express();
app.post("/vat",(req,res)=>{
    let image = "";
    req.on('data', (chunk) => {
        image += chunk;
    });

    req.on('end', async () => {
        if (!image.length) {
            res.status(400);
            res.end();
            return reject(new Error('缺失图片数据'));
        }
        ocrClient.vatInvoice(image)
        .then((resp)=>{
            console.log("发票识别结果",resp);
            res.send(resp);
        })
        .catch(err=>{
            console.log("发票识别异常",err);
            res.send(err);
        })
    });
});
app.listen("8000",()=>{
    console.log("服务器启动成功:http://192.168.1.2:8000/vat");
});