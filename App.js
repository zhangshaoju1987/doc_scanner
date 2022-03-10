import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';

import AppScreen from './src/navigator/AppScreen';  //界面
import NavigationService from './src/navigator/NavigationService';
import { store, persistor } from './src/redux/store';

const AppNavigator = createStackNavigator(AppScreen, 
                                                {
                                                  mode: "card",
                                                  headerMode: 'none'
                                                });
const AppContainer = createAppContainer(AppNavigator);

/**
 * 应用程序入口
 */
export default class App extends React.Component {

  componentWillUnmount(){
    this.setState = ()=>{}
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} >
          <PaperProvider theme={DefaultTheme}> 
            <SafeAreaProvider>
              <AppContainer ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef)
              }} />
            </SafeAreaProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}