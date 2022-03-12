/**
 * 添加发票
 * @returns 
 */
 export const addInvoice = (invoice) =>
 ({
     type: 'ADD_INVOICE',
     payload: {invoice}
 });
 
 /**
  * 删除发票
  * @returns 
  */
 export const removeInvoice = (id) =>
 ({
     type: 'REMOVE_INVOICE',
     payload: {id}
 });