const initialState =
{
	tabBarVisiable			:"flex",
	headerHeight				:56
};

const setting = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_IOS_DEVICE_TOKEN':
		{
			const {token} = action.payload;
			const iosDeviceToken = state.iosDeviceToken;
			iosDeviceToken[token] = true;
			return {...state,iosDeviceToken};
		}
		case 'SHOW_TAB_BAR':
		{
			return {...state,tabBarVisiable:"flex"};
		}

		case 'HIDE_TAB_BAR':
		{
			return {...state,tabBarVisiable:"none"};
		}

		case 'SET_HEADER_HEIGHT':
		{
			const {headerHeight} = action.payload;
			return {...state,headerHeight};
		}
		
		default:
			return state;
	}
};

export default setting;