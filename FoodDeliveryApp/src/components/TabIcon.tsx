import * as React from "react";
import { Animated, Easing, Text, View, Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { TAB_CONFIG } from "../constants/tabConfig";

export function TabIcon({
  focused,
  config,
}: {
  focused: boolean;
  config: (typeof TAB_CONFIG)[keyof typeof TAB_CONFIG];
}) {
  const animation = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: focused ? 1 : 0,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [animation, focused]);

  const animatedWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [46, 100],
  });

  const labelOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const labelTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });

  const labelSpacing = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  return (
    <Animated.View
      style={{
        width: animatedWidth,
        height: 44,
        borderRadius: 22,
        backgroundColor: focused ? "rgba(255,122,61,0.14)" : "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Ionicons
        name={focused ? config.activeIcon : config.inactiveIcon}
        size={22}
        color={focused ? "#ff7a3d" : "#94a3b8"}
      />

      {focused && (
        <Animated.Text
          numberOfLines={1}
          style={{
            marginLeft: labelSpacing,
            color: "#ff7a3d",
            fontSize: 13,
            fontWeight: "600",
            opacity: labelOpacity,
            transform: [
              {
                translateX: labelTranslate,
              },
            ],
          }}
        >
          {config.label}
        </Animated.Text>
      )}
    </Animated.View>
  );
}
