import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConditionalToken, Level } from "../data/levels";
import { MapConfig, mapConfigs, PathColor } from "../data/maps";
import { scrolls } from "../data/scrolls";

interface ITokenState {
  type: "path" | "condition";
  scrollNode?: number;
}

interface PathTokenState extends ITokenState {
  type: "path";
  color: PathColor;
}

interface ConditionalTokenState extends ITokenState {
  type: "condition";
  token: ConditionalToken;
}

export type TokenState = PathTokenState | ConditionalTokenState;

export type GameState = {
  crystalsOnMapNode: Record<number, number>;
  tokens: TokenState[];
  playerLoc: number;
  level: Level | null;
  playingScrollNode: number;
  playbackInProgress: boolean;
};

const initialState: GameState = {
  crystalsOnMapNode: {},
  tokens: [],
  playerLoc: -1,
  playingScrollNode: 0,
  level: null,
  playbackInProgress: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetState: () => initialState,
    loadLevel: (state, action: PayloadAction<Level>) => {
      const { crystalLocs, colorTokens, conditionalTokens, startLoc } =
        action.payload;

      state.crystalsOnMapNode = {};
      crystalLocs.forEach((loc) => {
        state.crystalsOnMapNode[loc] = state.crystalsOnMapNode[loc] || 0;
        state.crystalsOnMapNode[loc]++;
      });

      state.tokens = [
        ...colorTokens.map((color) => ({ color, type: "path" as const })),
        ...conditionalTokens.map((token) => ({
          token,
          type: "condition" as const,
        })),
      ];

      state.playerLoc = startLoc;
      state.level = action.payload;
    },
    // some but not all the stuff from above. TODO refactor
    resetLevel: (state) => {
      if (!state.level) return;
      const { crystalLocs, startLoc } = state.level;

      state.crystalsOnMapNode = {};
      crystalLocs.forEach((loc) => {
        state.crystalsOnMapNode[loc] = state.crystalsOnMapNode[loc] || 0;
        state.crystalsOnMapNode[loc]++;
      });

      state.playerLoc = startLoc;
    },
    moveToken: (
      state,
      action: PayloadAction<{
        tokenIdx: number;
        scrollNodeIdx?: number;
      }>
    ) => {
      // TODO validate token type/node type? validate node is full?
      const { tokenIdx, scrollNodeIdx } = action.payload;
      if (typeof scrollNodeIdx === "number") {
        state.tokens[tokenIdx].scrollNode = scrollNodeIdx;
      } else {
        delete state.tokens[tokenIdx].scrollNode;
      }
    },
    setPlayback: (state, action: PayloadAction<boolean>) => {
      state.playbackInProgress = action.payload;
    },
    advancePlayer: (state) => {
      if (!state.playbackInProgress) return;

      // do nothing if at end of scroll
      if (state.playingScrollNode < 0) return;

      const scroll = scrolls.find((s) => s.id === state.level?.scrollId);
      const map = mapConfigs.find((m) => m.id === state.level?.mapId);
      const scrollNode = scroll?.nodes[state.playingScrollNode];
      const token = state.tokens.find(
        (t) => t.scrollNode === state.playingScrollNode
      );

      if (scrollNode?.type === "path" && token?.type === "path") {
        const path = map?.paths.find((p) => {
          const colorMatch = p.color === token?.color;
          const nodeMatch = p.directional
            ? p.nodeIdxs[0] === state.playerLoc
            : p.nodeIdxs.includes(state.playerLoc);

          return colorMatch && nodeMatch;
        });
        // stop playback if no path is found
        if (!path) {
          state.playbackInProgress = false;
          return;
        }

        const newLoc =
          path.nodeIdxs[0] === state.playerLoc
            ? path.nodeIdxs[1]
            : path.nodeIdxs[0];
        if (typeof newLoc === "number") {
          state.playerLoc = newLoc;
          // remove a crystal if there is one
          if (state.crystalsOnMapNode[state.playerLoc]) {
            state.crystalsOnMapNode[state.playerLoc]--;
          }
        }
        state.playingScrollNode = scrollNode.next.index;
      } else if (
        scrollNode?.type === "condition" &&
        token?.type === "condition"
      ) {
        state.playingScrollNode = evaluateCondition(state, token.token, map)
          ? scrollNode.nextIf.index
          : scrollNode.nextElse.index;
      }
    },
  },
});

const evaluateCondition = (
  state: GameState,
  token: ConditionalToken,
  map?: MapConfig
) => {
  if (!state.level) return false;

  if (token.tokenType === "troll") {
    return map?.trollLocs[token.trollType].includes(state.playerLoc);
  } else if (token.tokenType === "crystal") {
    const crystalsLeft = Object.values(state.crystalsOnMapNode).reduce(
      (a, b) => a + b,
      0
    );
    const numCrystals = state.level.crystalLocs.length - crystalsLeft;
    return numCrystals === token.amount;
  }
  return false;
};

export const {
  loadLevel,
  moveToken,
  advancePlayer,
  resetLevel,
  setPlayback,
  resetState,
} = gameSlice.actions;

export default gameSlice.reducer;
