 let _topLevelNavigator;
 
 /**
  * 设置顶层路由导航
  * @param _topLevelNavigator
  */
 function setTopLevelNavigator(topLevelNavigator) {
    //console.log("navigatorRef=",topLevelNavigator);
    _topLevelNavigator = topLevelNavigator;
 }
 
 
 /**
  * 跳转到指定页面
  * @param routeName
  * @param params
  */
 function navigate(routeName, params) {
    _topLevelNavigator.navigate({
        routeName,
        params,
    });
 }
 
 export default {
     setTopLevelNavigator,
     navigate,
 }