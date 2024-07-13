import React, {useEffect} from 'react';
import {Alert, BackHandler, SafeAreaView} from 'react-native';
import {UserProvider} from './src/components/user/UserContext';
import AppNavigation from './src/components/navigations/AppNavigation';
import {useNavigationState} from '@react-navigation/native';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
    </SafeAreaView>
  );
};
export default App;
