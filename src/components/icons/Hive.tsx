import React from "react";
import { useSelector } from "react-redux";
import { selectNumCrystalsRemaining } from "../../store/selectors";
import { Coord, hexagon } from "../../utils/geometryUtils";
import Hexagon from "./Hexagon";

type HiveProps = {
  center: Coord;
  radius: number;
  fill?: string;
  ignoreEmpty?: boolean;
};

const Hive = ({ center, radius, fill = "#f8cd05", ignoreEmpty }: HiveProps) => {
  const emptyHexes = useSelector(selectNumCrystalsRemaining);
  const points = [...hexagon(center, radius, 1 / 2), center];

  return (
    <g>
      {points.map((point, i) => (
        <Hexagon
          key={`hex${i}`}
          center={point}
          radius={radius / Math.sqrt(3)}
          fill={i >= emptyHexes || ignoreEmpty ? fill : "none"}
          strokeWidth={radius / 10}
        />
      ))}
    </g>
  );
};

export default Hive;
