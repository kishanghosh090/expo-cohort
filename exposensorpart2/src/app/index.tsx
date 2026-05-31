import { DeviceMotion } from "expo-sensors";
import { useEffect } from "react";
import Compass from "../../magnetometer/components/Compass";

export default function Index() {
  useEffect(() => {
    (async () => {
      const isAvailable = await DeviceMotion.isAvailableAsync();

      console.log(isAvailable);

      if (!isAvailable) {
        return;
      }
    })();
  }, []);
  return <Compass />;
}
