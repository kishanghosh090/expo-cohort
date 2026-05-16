import AsyncStorage from "@react-native-async-storage/async-storage";

export class Storage {
  constructor() {}
  storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (e) {
      // saving error
    }
  };

  getData = async (): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem("token");
      return value;
    } catch (e) {
      return null;
    }
  };

  removeData = async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem("token");
      return true;
    } catch (e) {
      // remove error
      return false;
    }
  };
}
