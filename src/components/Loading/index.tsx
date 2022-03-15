import React from "react";

import { green500 } from "config/styles";
import Spinner from "./loading.svg";

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

const LoadingSpinner = ({
  color = green500,
  width = 24,
  height = 24,
}: Props) => <Spinner stroke={color} width={width} height={height} />;

export default LoadingSpinner;
