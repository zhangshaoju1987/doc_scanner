import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme, BottomNavigation } from 'react-native-paper';
import { NavigationContainer,useNavigationContainerRef }  from '@react-navigation/native';
import { Provider } from 'react-redux';

import NavigationService from './src/navigator/NavigationService';
import { store, persistor } from './src/redux/store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {StackAppScreens,TabAppScreens} from './src/navigator/AppScreens';
import MyInvoice from './src/pages/invoice/MyInvoice';
import Scanner from './src/pages/home/Scanner';
/**
 * 应用程序入口
 */
export default App = () => {

  //https://reactnavigation.org/docs/navigation-container
  const navigationRef = useNavigationContainerRef();
  NavigationService.setTopLevelNavigator(navigationRef);
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <PaperProvider theme={DefaultTheme}> 
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <TabAppScreens/>
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );    
}