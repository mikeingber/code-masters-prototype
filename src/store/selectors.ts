import { createSelector } from "@reduxjs/toolkit";
import { mapConfigs } from "../data/maps";
import { scrolls } from "../data/scrolls";
import { GameState } from "./slice";

const selectTokens = (state: GameState) => state.tokens;
const selectLevelScroll = (state: GameState) => {
  return scrolls.find((s) => s.id === state.level?.scrollId);
};

export const selectMapNodes = (state: GameState) => {
  const mapId = state.level?.mapId;
  return mapConfigs.find((m) => m.id === mapId)?.nodes || [];
};

export const selectIsScrollFull = createSelector(
  [selectTokens, selectLevelScroll],
  (tokens, scroll) => {
    if (!scroll) return false;
    return scroll.nodes.every((_, i) => tokens.some((t) => t.scrollNode === i));
  }
);

export const selectNumCrystalsRemaining = (state: GameState) => {
  return Object.values(state.crystalsOnMapNode).reduce((a, b) => a + b, 0);
};
