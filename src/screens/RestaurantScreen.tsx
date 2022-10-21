import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants";
import RestaurantService from "../services/RestaurantService";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import {
  addBookmarkHelper,
  removeBookmarkHelper,
} from "../helpers/BookmarkHelper";

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
  const [restaurant, setRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    RestaurantService.getOneRestaurantById(restaurantId).then((response) => {
      setSelectedCategory(response?.data?.categories[0]);
      setRestaurant(response?.data);
    });
  }, []);
  const dispatch = useAppDispatch();

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
    <View>
      <Text>RestaurantScreen</Text>
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({});
