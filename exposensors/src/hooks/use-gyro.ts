import { DeviceMotion } from "expo-sensors";
import { useEffect, useRef, useState } from "react";

export function useGyro() {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const baseline = useRef<{ x: number; y: number; z: number } | null>(null);

  useEffect(() => {
    let subs: any;
    (async () => {
      const isAv = await DeviceMotion.isAvailableAsync();
      setAvailable(isAv);
      if (!isAv) return;

      DeviceMotion.setUpdateInterval(16);
      const smoothing = 0.2;
      subs = DeviceMotion.addListener((data) => {
        const gravity = data.accelerationIncludingGravity;

        if (!baseline.current) {
          baseline.current = { x: gravity.x, y: gravity.y, z: gravity.z };
        }

        const offset = baseline.current;
        const rawX = gravity.x - offset.x;
        const rawY = gravity.y - offset.y;
        const rawZ = gravity.z - offset.z;

        setX((current) => current + (rawX - current) * smoothing);
        setY((current) => current + (rawY - current) * smoothing);
        setZ((current) => current + (rawZ - current) * smoothing);
      });
    })();

    return () => subs?.remove?.();
  }, []);

  return {
    available,
    x,
    y,
    z,
  };
}
