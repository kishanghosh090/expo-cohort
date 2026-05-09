import React from "react";
import Svg, { Rect, G } from "react-native-svg";

const GreenPlusLogo = ({ size = 100, ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <G>
        {/* Top capsule */}
        <Rect x="40" y="8" width="20" height="34" rx="10" fill="#94D12C" />

        {/* Bottom capsule */}
        <Rect x="40" y="58" width="20" height="34" rx="10" fill="#94D12C" />

        {/* Left capsule */}
        <Rect x="8" y="40" width="34" height="20" rx="10" fill="#94D12C" />

        {/* Right capsule */}
        <Rect x="58" y="40" width="34" height="20" rx="10" fill="#94D12C" />
      </G>
    </Svg>
  );
};

export default GreenPlusLogo;
