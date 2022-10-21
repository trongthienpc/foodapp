import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Mock } from "../constants";
import RestaurantService from "../services/RestaurantService";
import { Display } from "../utils";
import Separator from "../components/Separator";
import RestaurantMediumCard from "../components/RestaurantMediumCard";
import RestaurantCard from "../components/RestaurantCard";
import CategoryMenuItem from "../components/CategoryMenuItem";
import { TextInput } from "react-native-gesture-handler";

const sortStyle = (isActive: boolean) =>
  isActive
    ? styles.sortListItem
    : { ...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE };

const HomeScreen = ({ navigation }: any) => {
  const [activeCategory, setActiveCategory] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [activeSortItem, setActiveSortItem] = useState("recent");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      RestaurantService.getRestaurants().then((response) => {
        if (response?.status) {
          setRestaurants(response?.data);
        }
      });
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
          <Ionicons
            name="location-outline"
            size={15}
            color={Colors.DEFAULT_WHITE}
          />
          <Text style={styles.locationText}>Delivered to</Text>
          <Text style={styles.selectedLocationText}>HOME</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={16}
            color={Colors.DEFAULT_YELLOW}
          />
          <Feather
            name="bell"
            size={24}
            color={Colors.DEFAULT_WHITE}
            style={{ position: "absolute", right: 0 }}
          />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <Ionicons
              name="search-outline"
              size={25}
              color={Colors.DEFAULT_GREY}
            />
            <TextInput
              style={styles.searchText}
              placeholder="Search here ...!"
            />
          </View>
          <Feather
            name="sliders"
            size={20}
            color={Colors.DEFAULT_YELLOW}
            style={{ marginRight: 10 }}
          />
        </View>
        <View style={styles.categoriesContainer}>
          {Mock.CATEGORIES.map(
            ({ name, logo }: { name: string; logo: any }) => (
              <CategoryMenuItem
                key={name}
                name={name}
                logo={logo}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            )
          )}
        </View>
      </View>
      <ScrollView style={styles.listContainer}>
        <View style={styles.horizontalListContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>Top Rated</Text>
            <Text style={styles.listHeaderSubtitle}>See All</Text>
          </View>
          <FlatList
            data={restaurants}
            keyExtractor={(item: any) => item?.id}
            horizontal
            ListHeaderComponent={() => <Separator width={20} />}
            ListFooterComponent={() => <Separator width={20} />}
            ItemSeparatorComponent={() => <Separator width={10} />}
            renderItem={({ item }: any) => (
              <RestaurantCard
                {...item}
                navigate={(restaurantId: any) =>
                  navigation.navigate("Restaurant", { restaurantId })
                }
              />
            )}
          />
        </View>
        <View style={styles.sortListContainer}>
          <TouchableOpacity
            style={sortStyle(activeSortItem === "recent")}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem("recent")}
          >
            <Text style={styles.sortListItemText}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === "favorite")}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem("favorite")}
          >
            <Text style={styles.sortListItemText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === "rating")}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem("rating")}
          >
            <Text style={styles.sortListItemText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === "popular")}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem("popular")}
          >
            <Text style={styles.sortListItemText}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === "trending")}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem("trending")}
          >
            <Text style={styles.sortListItemText}>Trending</Text>
          </TouchableOpacity>
        </View>
        {restaurants?.map((item: any) => (
          <RestaurantMediumCard {...item} key={item?.id} />
        ))}
        <Separator height={Display.setHeight(5)} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 2000,
    position: "absolute",
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: "center",
    zIndex: -1,
  },
  headerContainer: {
    justifyContent: "space-evenly",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  locationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins_400Regular",
  },
  selectedLocationText: {
    color: Colors.DEFAULT_YELLOW,
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: "Poppins_400Regular",
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: Colors.DEFAULT_YELLOW,
    justifyContent: "center",
    alignItems: "center",
    height: 16,
    width: 16,
    position: "absolute",
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins_400Regular",
  },
  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  searchText: {
    color: Colors.DEFAULT_GREY,
    width: "80%",
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: "Poppins_400Regular",
    marginLeft: 10,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 5,
    zIndex: -5,
  },
  horizontalListContainer: {
    marginTop: 30,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 5,
  },
  listHeaderTitle: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: "Poppins_400Regular",
  },
  listHeaderSubtitle: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins_400Regular",
  },
  sortListContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEFAULT_YELLOW,
    height: 40,
  },
  sortListItemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins_400Regular",
  },
});
