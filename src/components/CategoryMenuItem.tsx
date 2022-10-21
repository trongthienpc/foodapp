import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Colors, Images } from "../constants";

const CategoryMenuItem = ({
  name,
  logo,
  activeCategory,
  setActiveCategory,
}: {
  name: string;
  logo: string;
  activeCategory: any;
  setActiveCategory: any;
}) => {
  return (
    <TouchableOpacity
      onPress={() => setActiveCategory(name)}
      style={styles.category()}
    >
      <Image
        source={Images[logo as keyof typeof Images]}
        style={styles.categoryIcon(activeCategory === name)}
      />
      <Text style={styles.categoryText(activeCategory === name)}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryMenuItem;

const styles = {
  category: (marginTop = 0): ViewStyle => ({
    alignItems: "center",
    marginTop,
  }),
  categoryIcon: (isActive: boolean): ImageStyle => ({
    height: 30,
    width: 30,
    opacity: isActive ? 1 : 0.5,
  }),
  categoryText: (isActive: boolean): TextStyle => ({
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_WHITE,
    marginTop: 5,
    opacity: isActive ? 1 : 0.5,
  }),
};

// const styles = StyleSheet.create({
//   category: (marginTop = 0): TextStyle => ({
//     alignItems: "center",
//     marginTop,
//   }),

//   categoryIcon: (isActive: boolean): ViewStyle => ({
//     height: 30,
//     width: 30,
//     opacity: isActive ? 1 : 0.5,
//   }),
//   categoryText: (isActive) => ({
//     fontSize: 10,
//     lineHeight: 10 * 1.4,
//     fontFamily: "Poppins_400Regular",
//     color: Colors.DEFAULT_WHITE,
//     marginTop: 5,
//     opacity: isActive ? 1 : 0.5,
//   }),
// });
