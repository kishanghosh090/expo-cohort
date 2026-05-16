import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";

const DetailedScreen = ({ route }: any) => {
  const { username } = route.params;
  // useLayoutEffect(()=>{
  //   navigation.setOptions({

  //   })
  // })
  return (
    <View>
      <Text>DetailedScreen {username}</Text>
    </View>
  );
};

export default DetailedScreen;
