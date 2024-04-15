import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../config";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(true);
  const [error, setError] = useState("");

  const register = async (
    name,
    email,
    password,
    confirmPassword,
    navigation
  ) => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await client.post(
        "/create-user",
        { fullname: name, email, password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data.success) {
        await AsyncStorage.setItem("userInfo", JSON.stringify(data)).catch(
          (e) => console.log(`AsyncStorage setItem error: ${e}`)
        );
        setUserInfo(data);
        navigation.replace("Login");
      } else {
        setError(data.message);
      }
    } catch (e) {
      setError(`Register error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await client.post(
        "/sign-in",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data.success) {
        await AsyncStorage.setItem("userInfo", JSON.stringify(data)).catch(
          (e) => console.log(`AsyncStorage setItem error: ${e}`)
        );
        setUserInfo(data);
      } else {
        setError(data.message);
      }
    } catch (e) {
      setError(`Login error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError("");
    try {
      await client.post(
        "/sign-out",
        {},
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      await AsyncStorage.removeItem("userInfo").catch((e) =>
        console.log(`AsyncStorage removeItem error: ${e}`)
      );
      setUserInfo({});
    } catch (e) {
      setError(`Logout error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      let storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (e) {
      console.log(`IsLoggedIn error: ${e}`);
    } finally {
      setSplashLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
