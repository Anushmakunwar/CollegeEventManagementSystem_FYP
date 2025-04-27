import * as SecureStore from "expo-secure-store";

export const setToken = async (token: string): Promise<boolean> => {
  try {
    await SecureStore.setItemAsync("access_token", token);
    return true;
  } catch (error) {
    console.error("Error setting token:", error);
    return false;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync("access_token");
    console.log(token);
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync("access_token");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
