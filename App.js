import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer,useNavigationContainerRef }  from '@react-navigation/native';
import { Provider } from 'react-redux';

import NavigationService from './src/navigator/NavigationService';
import { store, persistor } from './src/redux/store';
import AppScreens from './src/navigator/AppScreens';
/**
 * 应用程序入口
 */
export default App = () => {

  //https://reactnavigation.org/docs/navigation-container
  const navigationRef = useNavigationContainerRef();
  NavigationService.setTopLevelNavigator(navigationRef);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <PaperProvider theme={DefaultTheme}> 
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <AppScreens/>
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );    
}