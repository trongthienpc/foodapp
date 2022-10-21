import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Images } from "../constants";
import { AuthenticationService } from "../services";
import Separator from "../components/Separator";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { Display } from "../utils";
import { setAppToken } from "../store/GeneralSlice";

// input style
const inputStyle = (state: string) => {
  switch (state) {
    case "valid":
      return {
        ...styles.inputContainer,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: Colors.SECONDARY_GREEN,
      };
    case "invalid":
      return {
        ...styles,
        marginHorizontal: 20,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_RED,
      };
    default:
      return styles.inputContainer;
  }
};

// show marker
const showMarker = (state: string) => {
  switch (state) {
    case "valid":
      return (
        <AntDesign
          name="checkcircle"
          color={Colors.SECONDARY_GREEN}
          size={18}
          style={{ marginLeft: 5 }}
        />
      );
    case "invalid":
      return (
        <AntDesign
          name="closecircle"
          color={Colors.DEFAULT_RED}
          size={18}
          style={{ marginLeft: 5 }}
        />
      );
    default:
      return (
        <AntDesign
          name="questioncircle"
          color={Colors.DEFAULT_GREY}
          size={18}
          style={{ marginLeft: 5 }}
        />
      );
  }
};

const SignUp = ({ navigation }: any) => {
  // console.log(userCheckResponse);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailState, setEmailState] = useState("default");
  const [usernameState, setUsernameState] = useState("default");
  const [passwordState, setPasswordState] = useState("default");

  // handle email text change and notification
  const handleEmailChange = async (text: string) => {
    setEmail(text.trim());
    if (text.length > 0) {
      // console.log(text);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setEmailState("invalid");
        setErrorMessage("The email not valid");
      } else {
        setErrorMessage(" ");
        await checkUserExist("email", text.trim());
      }
    } else setEmailState("default");
  };

  // handle username text change and notification
  const handleUsernameChange = async (text: string) => {
    setUsername(text);
    if (text.length > 0) {
      await checkUserExist("username", text.trim());
    } else {
      setUsernameState("default");
    }
  };

  // handle password event
  const handleUserPassword = (password: string) => {
    let passwordTrim = password.trim();
    if (passwordTrim.length < 6) {
      setPasswordErrorMessage("Password must be at least 6 characters");
      setPasswordState("invalid");
    } else {
      setPasswordErrorMessage("");
      setPassword(passwordTrim);
      setPasswordState("valid");
    }
  };
  // register user
  const register = () => {
    let user = {
      username,
      email,
      password,
    };
    setIsLoading(true);
    // AuthenticationService.register(user).then((response) => {
    //   setIsLoading(false);
    //   if (!response?.status) {
    //     setErrorMessage(response.message);
    //   } else {
    //     setAppToken(response.token);
    //     navigation.navigate("Home");
    //   }
    // });
    navigation.navigate("Home");
  };

  // check user is existed
  const checkUserExist = async (type: string, value: string) => {
    console.log(value);
    if (value?.length > 0) {
      AuthenticationService.checkUserExistService(type, value).then(
        (response) => {
          console.log(response);
          if (response?.status) {
            type === "email" && emailErrorMessage
              ? setEmailErrorMessage("")
              : null;

            type === "username" && userNameErrorMessage
              ? setUserNameErrorMessage("")
              : null;

            type === "email" ? setEmailState("valid") : null;
            type === "username" ? setUsernameState("valid") : null;
          } else {
            type === "email" ? setEmailErrorMessage(response?.message) : null;
            type === "username"
              ? setUserNameErrorMessage(response?.message)
              : null;
            type === "email" ? setEmailState("invalid") : null;
            type === "username" ? setUsernameState("invalid") : null;
          }
        }
      );
    } else {
      setEmailState("default");
      setUsernameState("default");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />

      {/* header */}
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>

      {/* slogan */}
      <Text style={styles.sloganTitle}>Create Account</Text>
      <Text style={styles.sloganContent}>
        Enter your email, choose a username and password
      </Text>

      {/* input fields */}
      {/* username */}
      <View style={inputStyle(usernameState)}>
        <View style={styles.inputField}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginLeft: 10 }}
          />
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            value={username}
            onChangeText={(text) => handleUsernameChange(text)}
          />
          {showMarker(usernameState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{userNameErrorMessage}</Text>

      {/* email */}
      <View style={inputStyle(emailState)}>
        <View style={styles.inputField}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginLeft: 10 }}
          />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) => handleEmailChange(text)}
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{emailErrorMessage}</Text>

      {/* password */}
      <View style={inputStyle(passwordState)}>
        <View style={styles.inputField}>
          <Feather
            name="lock"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginLeft: 10 }}
          />
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="Password"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) => handleUserPassword(text)}
          />
          <Feather
            name={isPasswordShow ? "eye" : "eye-off"}
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginLeft: 10 }}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      {usernameState === "valid" && emailState === "valid" ? (
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => register()}
        >
          {isLoading ? (
            <LottieView source={Images.LOADING} autoPlay />
          ) : (
            <Text style={styles.signInButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled
          style={styles.signInButtonDisabled}
          onPress={() => register()}
        >
          {isLoading ? (
            <LottieView source={Images.LOADING} autoPlay />
          ) : (
            <Text style={styles.signInButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity style={styles.signInButton} onPress={() => register()}>
        {isLoading ? (
          <LottieView source={Images.LOADING} autoPlay />
        ) : (
          <Text style={styles.signInButtonText}>Create Account</Text>
        )}
      </TouchableOpacity> */}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: "Poppins_300Light_Italic",
    fontSize: 20,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: "center",
  },
  sloganTitle: {
    fontSize: 28,
    fontFamily: "Poppins_300Light",
    lineHeight: 28 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    textAlign: "center",
  },
  sloganContent: {
    fontSize: 20,
    fontFamily: "Poppins_300Light_Italic",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: "center",
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 14,
    textAlignVertical: "center",
    paddingHorizontal: 10,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
    fontFamily: "Poppins_300Light_Italic",
  },
  errorMessage: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: "Poppins_400Regular",
    marginHorizontal: 20,
    marginVertical: 3,
  },
  signInButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(8),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signInButtonDisabled: {
    backgroundColor: Colors.DEFAULT_GREY,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(8),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signInButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: "Poppins_500Medium",
  },
});
