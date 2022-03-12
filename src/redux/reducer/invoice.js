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
		
		default:
			return state;
	}
};

export default invoice;