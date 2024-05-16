import React from "react";
import { SafeAreaView } from "react-native";
import { UserProvider } from "./src/components/user/UserContext";
import AppNavigation from "./src/components/navigations/AppNavigation";
import Login from "./src/components/user/screens/Login";
import DirectionsComponent from "./src/components/shipper/screen/DirectionsComponent";
import Feedback from "./src/components/shipper/screen/Feedback";
import HistoryFeedback from "./src/components/shipper/screen/HistoryFeedback";
import Goong from "./src/components/shipper/screen/Goong";
import Test from "./src/components/shipper/screen/Test";
const App =() => {
  return (
    <SafeAreaView style={{flex:1}}>
      {/* <UserProvider>
        <AppNavigation/>
      </UserProvider> */}
      <Goong/>
    </SafeAreaView>
  )
}
export default App;