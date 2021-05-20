import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigators/DrawerNavigator';
import { Provider } from "react-redux";
import {store, persistor} from "./Redux/Store";
import { PersistGate } from 'redux-persist/lib/integration/react';
import {setCustomText} from 'react-native-global-props'
import RNBootSplash from "react-native-bootsplash";

export default function App() {

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  setCustomText({
    style : {
      color : 'black',
    }
  })

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <DrawerNavigator/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
