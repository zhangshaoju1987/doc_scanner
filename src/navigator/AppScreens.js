import React from 'react';
import { createNativeStackNavigator }   from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Scanner from '../pages/home/Scanner';
import AppHeader from "./AppHeader";
import Account, { Settings } from '../pages/account';
import Document,{Certificate,Invoice} from "../pages/documents";


// 二级明细路由(文档)
// https://reactnavigation.org/docs/tab-based-navigation  A native stack navigator for each tab​
const DocumentStackTab = () => {
    const MyInvoiceStack = createNativeStackNavigator();
    return (
        <MyInvoiceStack.Navigator initialRouteName='Document' screenOptions={{
            headerShown:true,
            header: (props)=><AppHeader {...props}/>,
        }}>
            <MyInvoiceStack.Screen name="Document"      component={Document} />
            <MyInvoiceStack.Screen name="Invoice"       component={Invoice} />
            <MyInvoiceStack.Screen name="Certificate"   component={Certificate} />
        </MyInvoiceStack.Navigator>
      );
}


// 二级明细路由(账户)
// https://reactnavigation.org/docs/tab-based-navigation  A native stack navigator for each tab​
const AccountStackTab = () => {
    const AccountStack = createNativeStackNavigator();
    return (
        <AccountStack.Navigator initialRouteName='Account' screenOptions={{
            headerShown:true,
            header: (props)=><AppHeader {...props}/>,
        }}>
            <AccountStack.Screen name="Account"      component={Account} />
            <AccountStack.Screen name="Settings"     component={Settings} />
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


const AppTabScreen = ()=>{
    // 一级导航主路由
    const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName='DocumentStackTab' activeColor="#f0edf6" inactiveColor="#3e2465" 
            screenOptions={{
                header: (props)=><AppHeader {...props}/>,
            }}
        >
            <Tab.Screen name="DocumentStackTab"  component={DocumentStackTab}  options={{tabBarLabel:"我的文档",   tabBarIcon:"home"}}/>
            <Tab.Screen name="ScanStackTab"      component={ScanStackTab}      options={{tabBarLabel:"扫描",       tabBarIcon:"camera"}}/>
            <Tab.Screen name="AccountStackTab"   component={AccountStackTab}   options={{tabBarLabel:"账户",       tabBarIcon:"account"}} />
        </Tab.Navigator>
    );
}

export {AppTabScreen};