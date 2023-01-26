import { useSpring, animated, config } from "react-spring";
import React from "react";
import { TokenState } from "../store/slice";
import { Coord } from "../utils/geometryUtils";

type TokenProps = {
  tokenState: TokenState;
  center: Coord;
  size: number;
  isEmpty?: boolean;
  isFlashing?: boolean;
  onMouseDown?: (e: React.MouseEvent<SVGElement>) => void;
};

// const shadowColor = "#00e6da";
// const shadowColor = "#e2e600";
const shadowColor = "#F8CD0E"; // spelling-bee-yellow

const Token = ({
  tokenState,
  center,
  size,
  isEmpty,
  onMouseDown,
  isFlashing,
}: TokenProps) => {
  const { filter } = useSpring({
    from: { filter: `drop-shadow(0 0 0 ${shadowColor})` },
    to: [
      { filter: `drop-shadow(0 0 3 ${shadowColor})` },
      { filter: `drop-shadow(0 0 0 ${shadowColor})` },
    ],
    loop: true,
    config: config.slow,
  });

  if (tokenState.type === "path") {
    // render color circle
    return (
      <animated.circle
        cx={center.x}
        cy={center.y}
        r={size / 2}
        fill={isEmpty ? "none" : tokenState.color}
        stroke={isEmpty ? "black" : "none"}
        strokeWidth={0.2}
        strokeDasharray={isEmpty ? "1 1" : "none"}
        onMouseDown={onMouseDown}
        filter={isFlashing ? filter : "none"}
      />
    );
  }

  if (tokenState.type === "condition") {
    if (tokenState.token.tokenType === "crystal") {
      // background color?
      return (
        <g onMouseDown={onMouseDown} pointerEvents="bounding-box">
          <rect
            x={center.x - size / 2}
            y={center.y - size / 2}
            width={size}
            height={size}
            fill="none"
            stroke="black"
            strokeWidth={isEmpty ? 0.2 : 0.5}
            strokeDasharray={isEmpty ? "1 1" : ""}
          />
          {!isEmpty && (
            <text
              x={center.x}
              y={center.y}
              alignmentBaseline="central"
              textAnchor="middle"
              fontSize={8}
              cursor="default"
            >
              {tokenState.token.amount}
            </text>
          )}
        </g>
      );
    }

    if (tokenState.token.tokenType === "troll") {
      return (
        <rect
          x={center.x - size / 2}
          y={center.y - size / 2}
          width={size}
          height={size}
          fill={isEmpty ? "none" : tokenState.token.trollType}
          stroke={isEmpty ? "black" : "none"}
          strokeWidth={0.2}
          strokeDasharray="1 1"
          onMouseDown={onMouseDown}
        />
      );
    }
  }

  return null;
};

export default Token;
