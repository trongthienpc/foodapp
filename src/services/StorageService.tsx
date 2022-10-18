import AsyncSorage from "@react-native-async-storage/async-storage";

// set first time use
const setIsFirstTimeUse = () => {
  return AsyncSorage.setItem("isFirstTimeUse", "true");
};

// get first time use
const getFirstTimeUse = () => {
  return AsyncSorage.getItem("isFirstTimeUse");
};

// set token
const setToken = (token: string) => {
  return AsyncSorage.setItem("token", token);
};

// get token
const getToken = () => {
  return AsyncSorage.getItem("token");
};

export default { setIsFirstTimeUse, getFirstTimeUse, setToken, getToken };
