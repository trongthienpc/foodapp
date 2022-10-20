import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Separator = ({
  height,
  width,
  ...extraProps
}: {
  height: number;
  width: number;
}) => {
  return <View style={{ height, width, ...extraProps }}></View>;
};

Separator.defaultProps = {
  height: 0,
  width: 0,
};

export default Separator;

const styles = StyleSheet.create({});
