import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { GeneralAction } from "../store/actions";
import { Store } from "../store/Store";
import SignUp from "../screens/signup";
const stack = createStackNavigator();

const Navigators = () => {
  const { isAppLoading, token, isFirstTimeUse } = useSelector(
    (state: any) => state?.generalState
  );

  //   useEffect(() => {
  //     Store.dispatch(GeneralAction.appStart());
  //   }, []);
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="SignUp" component={SignUp} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;

const styles = StyleSheet.create({});
