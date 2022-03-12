import React from 'react';
import { createNativeStackNavigator }   from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Scanner from '../pages/home/Scanner';
import MyInvoice from '../pages/invoice/MyInvoice';
import AppHeader from "../components/headers/AppHeader";
import Settings from '../pages/Settings';
const AppStackScreen = ()=>{
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='MyInvoice' 
            screenOptions={{
                header: (props)=><AppHeader {...props}/>,
            }}
        >
            <Stack.Screen name="Scanner" component={Scanner} />
            <Stack.Screen name="MyInvoice" component={MyInvoice}/>
        </Stack.Navigator>
    );
}





const AppTabScreen = ()=>{
    const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName='MyInvoice' activeColor="#f0edf6" inactiveColor="#3e2465" 
            screenOptions={{
                header: (props)=><AppHeader {...props}/>,
            }}
        >
            <Tab.Screen name="MyInvoice"  component={MyInvoice} />
            <Tab.Screen name="Scanner"    component={Scanner} />
            <Tab.Screen name="Setting"    component={Settings} />
        </Tab.Navigator>
    );
}

export {AppStackScreen,AppTabScreen};