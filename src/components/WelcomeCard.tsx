import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Display } from "../utils";
import { Images } from "../constants";

const WelcomeCard = ({
  title,
  content,
  image,
}: {
  title: string;
  content: string;
  image: any;
}) => {
  let url = Images[image as keyof typeof Images];
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={url} resizeMode="contain" />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Display.setWidth(100),
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  titleText: {
    fontSize: 22,
    fontFamily: "Poppins_400Regular",
  },
  contentText: {
    fontSize: 18,
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default WelcomeCard;
