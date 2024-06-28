import React from 'react';
import {SafeAreaView} from 'react-native';
import {UserProvider} from './src/components/user/UserContext';
import AppNavigation from './src/components/navigations/AppNavigation';
import SuccessOrder from './src/components/shipper/screen/SuccessOrder';
import SubmitReview from './src/components/shipper/screen/SubmitReview';
import CancelSuccessOrder from './src/components/shipper/screen/CancelSuccessOrder';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
      {/* <CancelSuccessOrder/> */}
    </SafeAreaView>
  );
};
export default App;
