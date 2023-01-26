import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import GameScroll from "./GameScroll";
import { PHI } from "../utils/geometryUtils";
import LevelMap from "./LevelMap";
import { levels } from "../data/levels";
import { mapConfigs } from "../data/maps";
import { scrolls } from "../data/scrolls";
import { GameState, loadLevel } from "../store/slice";

const Game = () => {
  // TODO: this looks like nonsense
  const { levelId } = useParams();
  const levelIdNumber = levelId && parseInt(levelId, 10);
  const level = levels.find((l) => l.id === levelIdNumber);
  const dispatch = useDispatch();
  const loadedLevel = useSelector((state: GameState) => state.level);

  React.useEffect(() => {
    if (level) {
      dispatch(loadLevel(level));
    }
  }, [level, dispatch]);

  if (!loadedLevel) {
    return null;
  }

  const { mapId, scrollId, portalLoc } = loadedLevel;

  const mapConfig = mapConfigs.find((m) => m.id === mapId);
  const scroll = scrolls.find((s) => s.id === scrollId);

  if (!mapConfig || !scroll) {
    return null;
  }

  return (
    <Container>
      <svg viewBox={`0 0 100 ${100 * PHI}`} width="500px">
        <LevelMap config={mapConfig} portalLoc={portalLoc} />
        <GameScroll scroll={scroll} />
      </svg>
    </Container>
  );
};

export default Game;

const Container = styled.div`
  padding: 24px;
  display: flex;
  justify-content: center;

  > svg {
    max-width: 500px;
    background-color: #efefef;
    border: 1px solid black;
  }
`;
