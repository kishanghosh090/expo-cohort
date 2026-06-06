const IS_DEV = process.env.APP_VARIENT == "development";
const IS_PREVIEW = process.env.APP_VARIENT == "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.kishanranaghosh.easdemo.dev";
  if (IS_PREVIEW) return "com.kishanranaghosh.easdemo.preview";
  return "com.kishanranaghosh.easdemo.prod";
};

export default {
  expo: {
    name: "easdemo",
    slug: "easdemo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "easdemo",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/expo.icon",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
      package: getUniqueIdentifier(),
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          android: {
            image: "./assets/images/splash-icon.png",
            imageWidth: 76,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "98d0834e-cfcb-4e92-8754-884e8071eb06",
      },
    },
  },
};
