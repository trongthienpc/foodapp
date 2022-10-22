import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { FirstTimeUse, GetAppToken } from "../helpers/GeneralHelper";
import HomeTabs from "./BottomTabs";
import {
  ForgotPasswordScreen,
  LoginScreen,
  RegisterPhoneScreen,
  SignUpScreen,
  SplashScreen,
  VerificationScreen,
  WelcomeScreen,
} from "../screens";
import RestaurantScreen from "../screens/RestaurantScreen";

const stack = createStackNavigator();

const Navigators = () => {
  const { isAppLoading, token, isFirstTimeUse, userData } = useAppSelector(
    (state) => state.general
  );
  console.log(["token :", token]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    FirstTimeUse({ dispatch });
    GetAppToken({ dispatch });
  }, []);
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        {isAppLoading ? (
          <stack.Screen name="loading" component={SplashScreen} />
        ) : !token || token === null || token === "" ? (
          <>
            {isFirstTimeUse && (
              <stack.Screen name="Welcome" component={WelcomeScreen} />
            )}
            <stack.Screen name="Login" component={LoginScreen} />
            <stack.Screen name="SignUp" component={SignUpScreen} />
            <stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <stack.Screen
              name="RegisterPhone"
              component={RegisterPhoneScreen}
            />
            <stack.Screen name="Verification" component={VerificationScreen} />
          </>
        ) : (
          <>
            <stack.Screen name="HomeTabs" component={HomeTabs} />
            <stack.Screen name="Restaurant" component={RestaurantScreen} />
          </>
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;

const styles = StyleSheet.create({});
