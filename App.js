import React from 'react';
import {SafeAreaView} from 'react-native';
import {UserProvider} from './src/components/user/UserContext';
import AppNavigation from './src/components/navigations/AppNavigation';
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
