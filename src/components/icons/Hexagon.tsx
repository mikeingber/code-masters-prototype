import React from "react";
import { Coord, hexagon } from "../../utils/geometryUtils";

type HexagonProps = {
  center: Coord;
  radius: number;
  fill: string;
  strokeWidth: number;
};

const Hexagon = ({ center, radius, fill, strokeWidth }: HexagonProps) => {
  const points = hexagon(center, radius)
    .map(({ x, y }) => `${x}, ${y}`)
    .join(" ");

  return (
    <polygon
      points={points}
      stroke="black"
      fill={fill}
      strokeWidth={strokeWidth}
    />
  );
};

export default Hexagon;
