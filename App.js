import React from 'react';
import {SafeAreaView} from 'react-native';
import {UserProvider} from './src/components/user/UserContext';
import AppNavigation from './src/components/navigations/AppNavigation';
import Login from './src/components/user/screens/Login';
import DirectionsComponent from './src/components/shipper/screen/DirectionsComponent';
import Feedback from './src/components/shipper/screen/Feedback';
import HistoryFeedback from './src/components/shipper/screen/HistoryFeedback';
import Goong from './src/components/shipper/screen/Goong';
import Test from './src/components/shipper/screen/Test';
import YourComponent from './src/components/shipper/screen/Test2';
import Text2 from './src/components/shipper/screen/Test2';
import SuccessOrder from './src/components/shipper/screen/SuccessOrder';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <AppNavigation/>
      </UserProvider>
      {/* <NavigationContainer>
        <Goong />
      </NavigationContainer> */}
      {/* <Text2/> */}
    </SafeAreaView>
  );
};
export default App;
