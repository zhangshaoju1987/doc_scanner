/**
 * initialState 只有在app第一次初始化时,才会使用到,app后期动态给state新增的属性,由于原始state已经存在了,是不会持久化的,所以会取不到
 * 所以,后期动态新增的state属性,需要自己手动dispatch一次来持久化,才能被识别到
 */
const initialState =
{
	tabBarVisiable			:"flex",
	headerHeight			:56,
	bottomHeight			:54
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