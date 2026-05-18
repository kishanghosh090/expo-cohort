import * as React from "react";
import { createStaticNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "./src/screens/onboarding/Onboarding";
import Splash from "./src/screens/splash/Splash";
import { Storage } from "./src/utils/asyncStorage";
import SignUpScreen from "./src/screens/signup/SignUp";
import SignInScreen from "./src/screens/signin/SignIn";
import MainScreen from "./src/screens/main/Main";
import { ThemeProvider } from "./src/theme/ThemeProvider";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [initialRoute, setInitialRoute] = React.useState<"Onboarding" | "Home">(
    "Onboarding",
  );

  React.useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const storage = new Storage();
        const seen = await storage.getData();
        if (isMounted) {
          setInitialRoute(seen != null ? "Home" : "Onboarding");
        }
      } catch (error) {
        if (isMounted) {
          setInitialRoute("Onboarding");
        }
      } finally {
        if (isMounted) {
          setTimeout(() => setIsLoading(false), 700);
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const Stack = React.useMemo(
    () =>
      createStackNavigator({
        initialRouteName: initialRoute,
        screens: {
          Onboarding: {
            screen: Onboarding,
            options: {
              headerShown: false,
            },
          },
          Login: {
            screen: SignInScreen,
            options: {
              headerShown: false,
            },
          },
          SignUp: {
            screen: SignUpScreen,
            options: {
              headerShown: false,
            },
          },
          Home: { screen: MainScreen, options: { headerShown: false } },
        },
      }),
    [initialRoute],
  );

  const Navigation = React.useMemo(
    () => createStaticNavigation(Stack),
    [Stack],
  );

  return (
    <ThemeProvider>{isLoading ? <Splash /> : <Navigation />}</ThemeProvider>
  );
}
