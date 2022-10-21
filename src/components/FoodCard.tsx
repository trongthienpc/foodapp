import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Display from "../utils/Display";
import { Colors, URL } from "../constants";
import StaticImageService from "../services/StaticImageService";
import { useAppDispatch, useAppSelector } from "../store/Hooks";

const FoodCard = ({
  id,
  name,
  description,
  price,
  image,
  navigate,
}: {
  id: any;
  name: string;
  description: string;
  price: number;
  image: any;
  navigate: any;
}) => {
  const dispatch = useAppDispatch();
  const itemCount = 0;
  //   const itemCount = useAppSelector();
  //   const addToCart = (foodId: any) => dispatch(CartAction.addToCart({ foodId }));
  const removeFromCart = (foodId: any) => {};
  // dispatch(CartAction.removeFromCart({ foodId }));
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
        <Image
          style={styles.image}
          source={{
            uri: StaticImageService.getGalleryImage(
              image,
              URL.STATIC_IMAGE.SIZE.SQUARE
            ),
          }}
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
          <Text numberOfLines={1} style={styles.titleText}>
            {name}
          </Text>
          <Text numberOfLines={2} style={styles.descriptionText}>
            {description}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.priceText}>$ {price}</Text>
          <View style={styles.itemAddContainer}>
            {itemCount > 0 ? (
              <>
                <AntDesign
                  name="minus"
                  color={Colors.DEFAULT_YELLOW}
                  size={18}
                  onPress={() => removeFromCart(id)}
                />
                <Text style={styles.itemCountText}>{itemCount}</Text>
              </>
            ) : null}

            <AntDesign
              name="plus"
              color={Colors.DEFAULT_YELLOW}
              size={18}
              //   onPress={() => addToCart(id)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
    backgroundColor: Colors.LIGHT_GREY,
  },
  image: {
    height: 100,
    width: 100,
    margin: 6,
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: Display.setWidth(60),
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: Display.setWidth(60),
    color: Colors.DEFAULT_GREY,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    lineHeight: 10 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  itemAddContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
});
