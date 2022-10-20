import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import SignUp from "../screens/signup";
import { FirstTimeUse, GetAppToken } from "../helpers/generalHelper";
import HomeTabs from "./BottomTabs";
import Loading from "../screens/loading";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/welcome";
import RegisterPhoneScreen from "../screens/RegisterPhoneScreen";
import VerificationScreen from "../screens/VerificationScreen";
import HomeScreen from "../screens/HomeScreen";

const stack = createStackNavigator();

const Navigators = () => {
  const { isAppLoading, token, isFirstTimeUse } = useAppSelector(
    (state) => state.general
  );
  const generalSelector = useAppSelector((state) => state.general);
  console.log(generalSelector);
  console.log();
  console.log(isAppLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    FirstTimeUse(dispatch);
    GetAppToken(dispatch);
  }, []);
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {isAppLoading ? (
          <stack.Screen name="loading" component={SplashScreen} />
        ) : !token || token === null || token.length === 0 ? (
          <stack.Screen name="SignUp" component={SignUp} />
        ) : (
          <stack.Screen name="Home" component={Home} />
        )} */}
        <stack.Screen name="Welcome" component={WelcomeScreen} />
        <stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
        <stack.Screen name="Verification" component={VerificationScreen} />
        <stack.Screen name="HomeTabs" component={HomeTabs} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;

const styles = StyleSheet.create({});
