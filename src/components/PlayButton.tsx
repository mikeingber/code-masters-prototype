import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsScrollFull } from "../store/selectors";
import {
  advancePlayer,
  GameState,
  resetLevel,
  setPlayback,
} from "../store/slice";
import useInterval from "../utils/useInterval";

const P_L = 20;
const P_C = { x: 100, y: 0 };

const PlayButton = () => {
  const isScrollFull = useSelector(selectIsScrollFull);
  const isPlaying = useSelector((state: GameState) => state.playbackInProgress);
  const dispatch = useDispatch();

  useInterval(() => dispatch(advancePlayer()), isPlaying ? 1500 : null);

  React.useEffect(() => {
    if (!isPlaying) {
      dispatch(resetLevel());
    }
  }, [isPlaying, dispatch]);

  if (!isScrollFull) {
    return null;
  }

  if (isPlaying) {
    return (
      <rect
        width={P_L}
        height={P_L}
        x={P_C.x - P_L / 2}
        y={P_C.y - P_L / 2}
        fill="black"
        onClick={() => dispatch(setPlayback(false))}
      />
    );
  }

  return (
    <polygon
      fill="black"
      onClick={() => dispatch(setPlayback(true))}
      points={`
        ${P_C.x + P_L / 2},${P_C.y}
        ${P_C.x - P_L / 2},${P_C.y + P_L / Math.sqrt(3)}
        ${P_C.x - P_L / 2},${P_C.y - P_L / Math.sqrt(3)}
      `}
    />
  );
};

export default PlayButton;
