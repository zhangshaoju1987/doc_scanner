const initialState =
{
	selectedWebcam          : null,
	tabBarVisiable			:"flex"
};

const settings = (state = initialState, action) =>
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
		
		default:
			return state;
	}
};

export default settings;