import {NavigationActions} from 'react-navigation';
 
 let _navigator;
 let _routers;
 let _navigation;
 
 /**
  * 设置顶层路由导航
  * @param navigatorRef
  */
 function setTopLevelNavigator(navigatorRef) {
     _navigator = navigatorRef;
 }
 
 /**
  * 设置当前路由栈和导航对象
  * @param routers
  * @param navigation
  */
 function setRouters(routers, navigation) {
     _routers = routers;
     _navigation = navigation;
 }
 
 /**
  * 跳转到指定页面
  * @param routeName
  * @param params
  */
 function navigate(routeName, params) {
     _navigator.dispatch(
         NavigationActions.navigate({
             type: NavigationActions.NAVIGATE,
             routeName,
             params,
         })
     );
 }
 
 /**
  * 返回到顶层
  */
 function popToTop() {
     _navigator.dispatch(NavigationActions.popToTop())
 }
 
 /**
  * 返回第n个页面
  * @param n
  */
 function popToN(n) {
     if (n <= 0) {
         return;
     }
     let len = _routers.length;
     if (len < n || n === len - 1) {
         this.popToTop();
         return;
     }
     _navigation.goBack(_routers[len - n].key);
 
 }
 
 /**
  * 返回
  */
 function goBack() {
     _navigator.dispatch(NavigationActions.back({type: NavigationActions.BACK}));
 }
 
 /**
  * 返回到任意页面
  * @param routeName
  */
 function popToRouter(routeName) {
     if (!routeName) {
         this.goBack();
         return;
     }
     let len = _routers.length;
     for (let i = 0; i < len - 1; i++) {
         let route = _routers[i];
         if (routeName === route.routeName && i !== len - 1) {
             _navigation.goBack(_routers[i + 1].key);
             return;
         }
     }
 }
 
 export default {
     setTopLevelNavigator,
     setRouters,
     navigate,
     popToRouter,
     goBack,
     popToTop,
     popToN
 }