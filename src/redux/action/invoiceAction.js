/**
 * 添加发票
 * @returns 
 */
export const addInvoice = (invoice) =>
({
    type: 'ADD_INVOICE',
    payload: { invoice }
});

/**
 * 删除发票
 * @returns 
 */
export const removeInvoice = (id) =>
({
    type: 'REMOVE_INVOICE',
    payload: { id }
});

/**
 * 添加ocr识别结果
 * @param {string} id 
 * @param {object} ocrInfo 
 * @returns 
 */
export const addOcrResult = (id, ocrInfo) =>
({
    type: "ADD_OCR_RESULT",
    payload: { id, ocrInfo }
})