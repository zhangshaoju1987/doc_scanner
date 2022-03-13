const initialState =
{
	invoiceList			:[]
};

const invoice = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'ADD_INVOICE':
		{
			const {invoice} = action.payload;
            const {invoiceList} = state;
            invoiceList.push(invoice);
			return {...state,invoiceList};
		}
        case 'REMOVE_INVOICE':
		{
			const {id} = action.payload;
            const {invoiceList} = state;
            const newList = invoiceList.filter((item)=>item.id != id);
			return {...state,invoiceList:newList};
		}
		case 'ADD_OCR_RESULT':
		{
			const {id,ocrInfo} = action.payload;
            const {invoiceList} = state;
            const invoice = invoiceList.find((item)=>item.id == id);
			if(invoice){
				invoice.ocrInfo = ocrInfo;
			}
			return {...state,invoiceList};
		}
		
		
		default:
			return state;
	}
};

export default invoice;