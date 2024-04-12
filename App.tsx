import React from "react";
import { SafeAreaView } from "react-native";
import Feedback from "./src/components/shipper/screen/Feedback";

const App =() => {
  return (
    <SafeAreaView style={{flex:1}}>
      {/* <UserProvider>
        <AppNavigation/>
      </UserProvider> */}
      {/* <DirectionsComponent/> */}
      <Feedback/>
    </SafeAreaView>
  )
}
export default App;