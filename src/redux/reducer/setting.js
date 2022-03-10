const initialState =
{
	selectedWebcam          : null,
	
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
		
		default:
			return state;
	}
};

export default settings;