import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors, Images, URL } from "../constants";
import RestaurantService from "../services/RestaurantService";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import {
  addBookmarkHelper,
  removeBookmarkHelper,
} from "../helpers/BookmarkHelper";
import { Display } from "../utils";
import Separator from "../components/Separator";
import FoodCard from "../components/FoodCard";
import StaticImageService from "../services/StaticImageService";
import CategoryListItem from "../components/CategoryListItem";
import { getRestaurantHelper } from "../helpers/RestaurantHelper";
import { getAllFoodItemsHelper } from "../helpers/FoodHelper";

const ListHeader = () => (
  <View
    style={{
      flexDirection: "row",
      flex: 1,
      width: 40,
      justifyContent: "flex-end",
    }}
  >
    <View
      style={{
        backgroundColor: Colors.LIGHT_YELLOW,
        width: 20,
        borderTopLeftRadius: 64,
        borderBottomLeftRadius: 64,
      }}
    />
  </View>
);

const ListFooter = () => (
  <View
    style={{
      flexDirection: "row",
      flex: 1,
      width: 40,
    }}
  >
    <View
      style={{
        backgroundColor: Colors.LIGHT_YELLOW,
        width: 20,
        borderTopRightRadius: 64,
        borderBottomRightRadius: 64,
      }}
    />
  </View>
);

const RestaurantScreen = ({
  navigation,
  route: {
    params: { restaurantId },
  },
}: {
  navigation: any;
  route: any;
}) => {
  // const [restaurant, setRestaurant] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useAppDispatch();
  const restaurantSelector = useAppSelector((state) => state.restaurant);
  const foodSelector = useAppSelector((state) => state.food);

  useEffect(() => {
    getRestaurantHelper({ dispatch, restaurantId });
    getAllFoodItemsHelper({ dispatch });

    // if (restaurantSelector) {
    //   const category = restaurantSelector?.restaurant?.categories[0];
    //   setSelectedCategory(category);
    // }
  }, []);

  // TODO: get bookmark
  const isBookmarked = useAppSelector(
    (state) =>
      state?.bookmark?.bookmarks?.filter(
        (item: any) => item?.restaurantId === restaurantId
      )?.length > 0
  );

  // TODO: add bookmark
  const addBookmark = () => {
    addBookmarkHelper({ dispatch, restaurantId });
  };

  // TODO: remove bookmark
  const removeBookmark = () => {
    removeBookmarkHelper({ dispatch, restaurantId });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      <>
        <Image
          source={{
            uri: StaticImageService.getGalleryImage(
              restaurantSelector?.restaurant?.images?.cover,
              URL.STATIC_IMAGE.SIZE.SQUARE
            ),
          }}
          style={styles.backgroundImage}
        />
        <ScrollView>
          <Separator height={Display.setHeight(35)} />
          <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {restaurantSelector?.restaurant?.name}
              </Text>
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                color={Colors.DEFAULT_YELLOW}
                size={24}
                onPress={() =>
                  isBookmarked ? removeBookmark() : addBookmark()
                }
              />
            </View>
            <Text style={styles.tagText}>
              {restaurantSelector?.restaurant?.tags?.join(" • ")}
            </Text>
            <View style={styles.ratingReviewsContainer}>
              <FontAwesome
                name="star"
                size={18}
                color={Colors.DEFAULT_YELLOW}
              />
              <Text style={styles.ratingText}>4.2</Text>
              <Text style={styles.reviewsText}>(455 Reviews)</Text>
            </View>
            <View style={styles.deliveryDetailsContainer}>
              <View style={styles.rowAndCenter}>
                <Image
                  style={styles.deliveryDetailIcon}
                  source={Images.DELIVERY_CHARGE}
                />
                <Text style={styles.deliveryDetailText}>Free Delivery</Text>
              </View>
              <View style={styles.rowAndCenter}>
                <Image
                  style={styles.deliveryDetailIcon}
                  source={Images.DELIVERY_TIME}
                />
                <Text style={styles.deliveryDetailText}>
                  {restaurantSelector?.restaurant?.time} min
                </Text>
              </View>
              <View style={styles.rowAndCenter}>
                <Image
                  style={styles.deliveryDetailIcon}
                  source={Images.MARKER}
                />
                <Text style={styles.deliveryDetailText}>
                  {restaurantSelector?.restaurant?.distance / 1000}km
                </Text>
              </View>
              <View style={styles.restaurantType}>
                <Text style={styles.restaurantTypeText}>
                  {restaurantSelector?.restaurant?.type}
                </Text>
              </View>
            </View>
            <View style={styles.categoriesContainer}>
              <FlatList
                data={restaurantSelector?.restaurant?.categories}
                keyExtractor={(item) => item}
                horizontal
                ListHeaderComponent={() => <ListHeader />}
                ListFooterComponent={() => <ListFooter />}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CategoryListItem
                    name={item}
                    isActive={
                      item === restaurantSelector?.restaurant?.categories[0]
                    }
                    selectCategory={(category: any) =>
                      setSelectedCategory(category)
                    }
                  />
                )}
              />
            </View>
            <View style={styles.foodList}>
              {foodSelector?.foods
                ?.filter(
                  (food: any) =>
                    food?.category ===
                    restaurantSelector?.restaurant?.categories[0]
                )
                ?.map((item: any) => (
                  <FoodCard
                    key={item?.id}
                    {...item}
                    navigate={() =>
                      navigation.navigate("Food", { foodId: item?.id })
                    }
                  />
                ))}
              <Separator height={Display.setHeight(2)} />
            </View>
          </View>
        </ScrollView>
      </>
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    height: Display.setWidth(100),
    width: Display.setWidth(100),
  },
  mainContainer: {
    backgroundColor: Colors.SECONDARY_WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 15,
  },
  title: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_BLACK,
  },
  tagText: {
    marginHorizontal: 25,
    marginTop: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_GREY,
  },
  ratingReviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 10,
    justifyContent: "space-between",
  },
  deliveryDetailText: {
    marginLeft: 3,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantType: {
    backgroundColor: Colors.LIGHT_YELLOW,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  restaurantTypeText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_YELLOW,
  },
  categoriesContainer: {
    marginVertical: 20,
  },
  foodList: {
    marginHorizontal: 15,
  },
});
