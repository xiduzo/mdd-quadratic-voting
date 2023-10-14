import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const Egg = (props: SvgProps) => (
  <Svg width={365} height={487} {...props}>
    <Path
      d="M182.501 0C81.6966 0 0 198.86 0 301.333C0 403.802 81.6966 487 182.501 487C283.301 487 365 403.802 365 301.333C365 198.86 283.301 0 182.501 0Z"
      fill={props.color ?? "#F6AE2D"}
    />
  </Svg>
);
export default Egg;
