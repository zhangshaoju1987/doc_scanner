import React from 'react';
import { createNativeStackNavigator }   from '@react-navigation/native-stack';
import Scanner from '../pages/home/Scanner';

export default AppScreens = ()=>{
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Scanner">
            <Stack.Screen name="Scanner" component={Scanner} />
        </Stack.Navigator>
    );
}