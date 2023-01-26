import React from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { selectMapNodes } from "../store/selectors";
import { GameState } from "../store/slice";
import Bee from "./icons/Bee";

type FlyingBeeProps = {
  nodeSideLength: number;
};

const FlyingBee = ({ nodeSideLength }: FlyingBeeProps) => {
  const playerLoc = useSelector((state: GameState) => state.playerLoc);
  const mapNodes = useSelector(selectMapNodes);
  const mapNode = mapNodes[playerLoc];
  const x = mapNode.x - nodeSideLength / 2;
  const y = mapNode.y - nodeSideLength / 2;

  const { transform } = useSpring({
    to: { transform: `translate(${x}, ${y}) scale(0.12)` },
  });

  if (!mapNode) {
    return null;
  }

  return (
    <animated.g transform={transform}>
      <Bee />
    </animated.g>
  );
};

export default FlyingBee;
