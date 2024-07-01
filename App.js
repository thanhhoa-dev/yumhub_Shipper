import React from 'react';
import {SafeAreaView} from 'react-native';
import {UserProvider} from './src/components/user/UserContext';
import AppNavigation from './src/components/navigations/AppNavigation';
import SuccessOrder from './src/components/shipper/screen/SuccessOrder';
import SubmitReview from './src/components/shipper/screen/SubmitReview';
import CancelSuccessOrder from './src/components/shipper/screen/CancelSuccessOrder';
import Test from './src/components/shipper/screen/DropdownComponent';
import Revenue from './src/components/shipper/screen/Revenue';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
      {/* <Revenue/> */}
    </SafeAreaView>
  );
};
export default App;
