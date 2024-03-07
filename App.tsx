import React from "react";
import ShipperStackNavigation from "./src/components/shipper/ShipperNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import AppNavigation from "./src/components/navigations/AppNavigation";
import { UserProvider } from "./src/components/user/UserContext";

const App =() => {
  return (
    <SafeAreaView style={{flex:1}}>
      <UserProvider>
        <AppNavigation/>
      </UserProvider>
    </SafeAreaView>
  )
}
export default App;