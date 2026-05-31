import { Magnetometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export function useMagnetometer() {
  const [ava, setAva] = useState<boolean | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    let subs: { remove: () => void } | undefined;

    (async () => {
      const isAva = await Magnetometer.isAvailableAsync();
      setAva(isAva);
      if (!isAva) {
        return;
      }

      Magnetometer.setUpdateInterval(100);

      subs = Magnetometer.addListener((data) => {
        setX(data.x);
        setY(data.y);
        setZ(data.z);
        setHeading(getHeading(data.x, data.y));
      });
    })();

    function getHeading(x: number, y: number) {
      const radians =
        Platform.OS == "ios" ? Math.atan2(x, y) : Math.atan2(-x, -y);

      const degree = (radians * 180) / Math.PI;

      return (degree + 360) % 360;
    }
    return () => subs?.remove();
  }, []);
  return { x, y, z, heading, isAvailable: ava };
}
