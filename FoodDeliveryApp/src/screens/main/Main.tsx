import * as React from "react";
import { Alert, Platform, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TAB_CONFIG } from "../../constants/tabConfig";
import { TabIcon } from "../../components/TabIcon";
import { Storage } from "../../utils/asyncStorage";
import ProfileScreen from "../profile/Profile";
import { SearchScreen } from "../search/Search";
import { OrdersScreen } from "../orders/Orders";
import { HomeScreen } from "../Home/Home";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const baseTabBarStyle = {
  height: 90,
  backgroundColor: "#ffffff",
  borderTopWidth: 0,
  elevation: 0,
  paddingHorizontal: 15,
  paddingTop: 10,
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  ...(Platform.OS === "android" && {
    elevation: 10,
  }),
};

function DrawerAwareScreen({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation<any>();
  const drawerStatus = useDrawerStatus();

  React.useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        ...baseTabBarStyle,
        display: drawerStatus === "open" ? "none" : "flex",
      },
    });
  }, [drawerStatus, navigation]);

  return <>{children}</>;
}

function HomeDrawer() {
  const insets = useSafeAreaInsets();
  const handleLogout = React.useCallback(async () => {
    const storage = new Storage();
    await storage.removeData();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top }}
        >
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            labelStyle={{ color: "#ef4444", fontWeight: "600" }}
            icon={({ size }) => (
              <Ionicons name="log-out" size={size} color="#ef4444" />
            )}
            style={{ marginTop: "auto" }}
            onPress={() => {
              Alert.alert("Log out", "Are you sure you want to log out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log out",
                  style: "destructive",
                  onPress: async () => {
                    await handleLogout();
                    const rootNavigation = props.navigation
                      .getParent()
                      ?.getParent();
                    rootNavigation?.reset({
                      index: 0,
                      routes: [{ name: "Onboarding" }],
                    });
                  },
                },
              ]);
            }}
          />
        </DrawerContentScrollView>
      )}
      screenOptions={({ navigation }) => ({
        headerTitle: "Home",
        headerShadowVisible: false,
        drawerStyle: {
          backgroundColor: "#ffffff",
        },
        drawerActiveTintColor: "#ff7a3d",
        drawerInactiveTintColor: "#ff7a3d",
        backgroundColor: "#f8fafc",
        SceneContainerStyle: {
          backgroundColor: "#f8fafc",
        },
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ paddingHorizontal: 16 }}
          >
            <Ionicons name="menu" size={24} color="#ff7a3d" />
          </Pressable>
        ),
      })}
      initialRouteName="HomeRoot"
    >
      <Drawer.Screen
        name="HomeRoot"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <DrawerAwareScreen>
            <HomeScreen />
          </DrawerAwareScreen>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="MyOrders"
        options={{
          title: "My Orders",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <DrawerAwareScreen>
            <HomeScreen />
          </DrawerAwareScreen>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Settings"
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <DrawerAwareScreen>
            <HomeScreen />
          </DrawerAwareScreen>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Help"
        options={{
          title: "Help",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <DrawerAwareScreen>
            <HomeScreen />
          </DrawerAwareScreen>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];

        return {
          tabBarShowLabel: false,
          tabBarStyle: {
            ...baseTabBarStyle,
          },

          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },

          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} config={config} />
          ),
        };
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeDrawer}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen name="Search" component={SearchScreen} />

      <Tab.Screen name="Orders" component={OrdersScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
