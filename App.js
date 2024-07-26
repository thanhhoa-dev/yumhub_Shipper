import React, {useEffect} from 'react';
import {Alert, BackHandler, SafeAreaView} from 'react-native';
import {UserProvider} from './src/components/user/UserContext';
import AppNavigation from './src/components/navigations/AppNavigation';
import {useNavigationState} from '@react-navigation/native';
import HistoryTransaction from './src/components/shipper/screen/HistoryTransaction';
import Demo from './src/components/shipper/screen/Demo';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <UserProvider>
        <AppNavigation />
      </UserProvider> */}
      <Demo />
    </SafeAreaView>
  );
};
export default App;
