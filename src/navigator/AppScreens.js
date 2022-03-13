import React from 'react';
import { createNativeStackNavigator }   from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { connect } from 'react-redux';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import {store} from "../redux/store";
import * as settingAction from "../redux/action/settingAction";

import Scanner from '../pages/scanner';
import AppHeader from "./AppHeader";
import Account, { Settings } from '../pages/account';
import Document,{Certificate,Invoice} from "../pages/documents";



// 二级明细路由(文档)
// https://reactnavigation.org/docs/tab-based-navigation  A native stack navigator for each tab​
const DocumentStackTab = () => {
    const MyInvoiceStack = createNativeStackNavigator();
    // 默认的头部导航栏高度
    const frame = useSafeAreaFrame();
    const insets = useSafeAreaInsets();
    const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);
    store.dispatch(settingAction.setHeaderHeight(headerHeight));
    return (
        <MyInvoiceStack.Navigator initialRouteName='Document' screenOptions={{
            headerShown:true,
            header: (props)=><AppHeader {...props}/>,
        }}>
            <MyInvoiceStack.Screen name="Document"      options={{title:"我的文档"}}  component={Document} />
            <MyInvoiceStack.Screen name="Invoice"       options={{title:"我的发票"}}  component={Invoice} />
            <MyInvoiceStack.Screen name="Certificate"   options={{title:"我的证书"}}  component={Certificate} />
        </MyInvoiceStack.Navigator>
      );
}


// 二级明细路由(账户)
// https://reactnavigation.org/docs/tab-based-navigation  A native stack navigator for each tab​
const AccountStackTab = () => {
    const AccountStack = createNativeStackNavigator();
    const frame = useSafeAreaFrame();
    const insets = useSafeAreaInsets();
    const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);
    store.dispatch(settingAction.setHeaderHeight(headerHeight));
    return (
        <AccountStack.Navigator initialRouteName='Account' screenOptions={{
            headerShown:true,
            header: (props)=><AppHeader {...props}/>,
        }}>
            <AccountStack.Screen name="Account"  options={{title:"账户信息"}}   component={Account} />
            <AccountStack.Screen name="Settings" options={{title:"应用设置"}}   component={Settings} />
            <AccountStack.Screen name="Invoice"  options={{title:"我的发票"}}   component={Invoice} />

        </AccountStack.Navigator>
      );
}

// 二级明细路由(扫描)
// https://reactnavigation.org/docs/tab-based-navigation  A native stack navigator for each tab​
const ScanStackTab = () => {
    const ScanStack = createNativeStackNavigator();
    return (
        <ScanStack.Navigator initialRouteName='Scanner' screenOptions={{
            headerShown:false
        }}>
            <ScanStack.Screen name="Scanner"      component={Scanner} />
        </ScanStack.Navigator>
      );
}


const AppTabScreen = (props)=>{
    // 一级导航主路由
    const Tab = createMaterialBottomTabNavigator();
    //console.log("AppTabScreen.props",props);
    return (
        <Tab.Navigator initialRouteName='ScanStackTab' activeColor="#f0edf6" inactiveColor="#3e2465"  barStyle={{display:props.tabBarVisiable||"flex"}}>
            <Tab.Screen name="DocumentStackTab"  component={DocumentStackTab}  options={{tabBarLabel:"我的文档",   tabBarIcon:"home", tabBarBadge: 3}}/>
            <Tab.Screen name="ScanStackTab"      component={ScanStackTab}      options={{tabBarLabel:"拍文档",     tabBarIcon:"camera"}}/>
            <Tab.Screen name="AccountStackTab"   component={AccountStackTab}   options={{tabBarLabel:"账户",       tabBarIcon:"account"}} />
        </Tab.Navigator>
    );
}
const mapStateToAppTabScreenProps = (state) => {
    const { setting:{tabBarVisiable} } = state;
    //console.log("redux.store.state=",state);
    return { tabBarVisiable }
};

export default connect(mapStateToAppTabScreenProps)(AppTabScreen);