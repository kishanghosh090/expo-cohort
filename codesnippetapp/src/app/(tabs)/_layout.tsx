import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";

interface IconProperty<GLYPHS extends string> {
  name: GLYPHS;
  focused: boolean;
  color?: string;
  size?: number;
}

function AnimatedTabIcon({ name, focused, color, size }: IconProperty<any>) {
  const scale = React.useRef(new Animated.Value(focused ? 1.12 : 1)).current;

  React.useEffect(() => {
    Animated.timing(scale, {
      toValue: focused ? 1.12 : 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [focused, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 12,
    flex: 1,
    flexDirection: "row",
    gap: 9,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  headerButton: {
    backgroundColor: "#9de6b8",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  headerButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600", marginBottom: 2 },
        tabBarStyle: {
          height: 64,
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <AnimatedTabIcon
              name={focused ? "home" : "home-outline"}
              focused={focused}
              color={color}
              size={size}
            />
          ),
          headerRight: () => {
            return (
              <View style={styles.headerRight}>
                <Pressable
                  onPress={() => {
                    // TODO: hook up save action
                  }}
                  style={({ pressed }) => [
                    styles.headerButton,
                    pressed && styles.headerButtonPressed,
                  ]}
                >
                  <Ionicons name="folder" size={20} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    // TODO: hook up save action
                  }}
                  style={({ pressed }) => [
                    styles.headerButton,
                    pressed && styles.headerButtonPressed,
                  ]}
                >
                  <Ionicons name="file-tray-full" size={20} />
                </Pressable>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="fav"
        options={{
          title: "Favourite",
          tabBarIcon: ({ color, focused, size }) => (
            <AnimatedTabIcon
              name={focused ? "heart" : "heart-outline"}
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
