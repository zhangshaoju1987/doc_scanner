 let _topLevelNavigator = undefined;
 
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
  * @param {string} routeName 
  * @param {object} params 
  */
 function navigate(routeName, params = {}) {
    _topLevelNavigator.navigate({
        name:routeName,
        params,
    });
 }

 function goBack(){
    _topLevelNavigator.goBack();
 }
 
 export default {
     setTopLevelNavigator,
     navigate,
     goBack,
 }