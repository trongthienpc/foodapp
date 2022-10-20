import AsyncStorage from "@react-native-async-storage/async-storage";

// set first time use
const setIsFirstTimeUse = () => {
  return AsyncStorage.setItem("isFirstTimeUse", "true");
};

// get first time use
const getFirstTimeUse = () => {
  return AsyncStorage.getItem("isFirstTimeUse");
};

// set token
const setToken = (token: string) => {
  return AsyncStorage.setItem("token", token);
};

// get token
const getToken = () => {
  return AsyncStorage.getItem("token");
};

export default { setIsFirstTimeUse, getFirstTimeUse, setToken, getToken };
