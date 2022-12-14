import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { Colors } from "../constants";
import StaticImageService from "../services/StaticImageService";
import {
  addBookmarkHelper,
  removeBookmarkHelper,
} from "../helpers/BookmarkHelper";

const RestaurantCard = ({
  id,
  name,
  images: { poster },
  tags,
  distance,
  time,
  navigate,
}: {
  id: any;
  name: string;
  images: any;
  tags: any;
  distance: number;
  time: any;
  navigate: any;
}) => {
  const dispatch = useAppDispatch();
  const isBookmarked = useAppSelector((state) =>
    state.bookmark.bookmarks?.filter((item) => item?.restaurantId?.length > 0)
  );
  const addBookmark = () => {
    addBookmarkHelper({ dispatch, id });
  };
  const removeBookmark = () => {
    removeBookmarkHelper({ dispatch, id });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigate(id)}
    >
      <Ionicons
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        color={Colors.DEFAULT_YELLOW}
        size={24}
        style={styles.bookmark}
        onPress={() => (isBookmarked ? removeBookmark() : addBookmark())}
      />
      <Image
        source={{ uri: StaticImageService.getPoster(poster) }}
        style={styles.posterStyle}
      />
      <Text style={styles.titleText}>{name}</Text>
      <Text style={styles.tagText}>{tags?.join(" • ")}</Text>
      <View style={styles.footerContainer}>
        <View style={styles.rowAndCenter}>
          <FontAwesome name="star" size={14} color={Colors.DEFAULT_YELLOW} />
          <Text style={styles.ratingText}>4</Text>
          <Text style={styles.reviewsText}>({10})</Text>
        </View>
        <View style={styles.rowAndCenter}>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="location-outline"
              color={Colors.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{distance}</Text>
          </View>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="ios-time-outline"
              color={Colors.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 5,
  },
  posterStyle: {
    width: 1920 * 0.15,
    height: 1080 * 0.15,
    borderRadius: 10,
    margin: 5,
  },
  titleText: {
    marginLeft: 8,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_BLACK,
  },
  tagText: {
    marginLeft: 8,
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_GREY,
    marginBottom: 5,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 6,
    justifyContent: "space-between",
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeAndDistanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: Colors.LIGHT_YELLOW,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  timeAndDistanceText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_YELLOW,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins_400Regular",
    color: Colors.DEFAULT_BLACK,
  },
  bookmark: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
