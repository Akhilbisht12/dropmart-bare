import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigators/DrawerNavigator';
import { Provider } from "react-redux";
import {store, persistor} from "./Redux/Store";
import { PersistGate } from 'redux-persist/lib/integration/react';

export default function App() {
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
