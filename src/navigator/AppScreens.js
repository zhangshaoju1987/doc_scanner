import React from 'react';
import { createNativeStackNavigator }   from '@react-navigation/native-stack';
import Scanner from '../pages/home/Scanner';
import MyInvoice from '../pages/invoice/MyInvoice';

export default AppScreens = ()=>{
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Scanner">
            <Stack.Screen name="Scanner" component={Scanner} />
            <Stack.Screen name="MyInvoice" component={MyInvoice}/>
        </Stack.Navigator>
    );
}