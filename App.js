import React, {useEffect} from 'react';
import {Alert, BackHandler, SafeAreaView} from 'react-native';
import {UserProvider} from './src/components/user/UserContext';
import AppNavigation from './src/components/navigations/AppNavigation';
import {useNavigationState} from '@react-navigation/native';
import HistoryTransaction from './src/components/shipper/screen/HistoryTransaction';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
      {/* <HistoryTransaction/> */}
    </SafeAreaView>
  );
};
export default App;
