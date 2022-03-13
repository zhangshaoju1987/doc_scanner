/**
 * 展示底部导航栏
 * @returns 
 */
export const showTabBar = () =>
({
	type: 'SHOW_TAB_BAR',
	payload: ""
});

/**
 * 隐藏底部导航栏
 * @returns 
 */
export const hideTabBar = () =>
({
	type: 'HIDE_TAB_BAR',
	payload: ""
});

/**
 * 设置头部高度
 * @returns 
 */
 export const setHeaderHeight = (headerHeight) =>
 ({
	 type: 'SET_HEADER_HEIGHT',
	 payload: {headerHeight:headerHeight}
 });