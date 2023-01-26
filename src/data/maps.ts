import { Coord } from "../utils/geometryUtils";

export type PathColor = "green" | "red" | "blue";
export type TrollType = "orange" | "purple";

type Path = {
  color: PathColor;
  nodeIdxs: [number, number];
  directional?: boolean;
  middleCoords?: Coord[];
  selfLoopDirection?: "up" | "down";
  xOffset?: number;
};

export type MapConfig = {
  id: number;
  nodes: Coord[];
  paths: Path[];
  trollLocs: Record<TrollType, number[]>;
};

export const mapConfigs: MapConfig[] = [
  {
    id: 1,
    trollLocs: { orange: [5], purple: [0] },
    nodes: [
      { x: 10, y: 30 },
      { x: 50, y: 30 },
      { x: 90, y: 30 },
      { x: 10, y: 70 },
      { x: 50, y: 70 },
      { x: 90, y: 70 },
    ],
    paths: [
      {
        color: "red",
        nodeIdxs: [0, 1],
      },
      {
        color: "green",
        nodeIdxs: [0, 2],
        middleCoords: [{ x: 50, y: 20 }],
      },
      {
        color: "blue",
        nodeIdxs: [0, 4],
      },
      {
        color: "green",
        nodeIdxs: [1, 3],
      },
      {
        color: "blue",
        nodeIdxs: [1, 2],
      },
      {
        color: "red",
        nodeIdxs: [2, 5],
      },
      {
        color: "red",
        nodeIdxs: [3, 4],
      },
      {
        color: "blue",
        nodeIdxs: [3, 5],
        middleCoords: [{ x: 50, y: 80 }],
      },
      {
        color: "green",
        nodeIdxs: [4, 5],
      },
    ],
  },
  {
    id: 2,
    trollLocs: { orange: [1], purple: [2] },
    nodes: [
      { x: 40, y: 20 },
      { x: 20, y: 50 },
      { x: 40, y: 50 },
      { x: 60, y: 50 },
      { x: 80, y: 50 },
      { x: 60, y: 80 },
    ],
    paths: [
      {
        color: "red",
        nodeIdxs: [0, 2],
      },
      {
        color: "green",
        nodeIdxs: [0, 4],
      },
      {
        color: "blue",
        nodeIdxs: [0, 1],
      },
      {
        color: "red",
        nodeIdxs: [1, 5],
      },
      {
        color: "green",
        nodeIdxs: [1, 2],
      },
      {
        color: "blue",
        nodeIdxs: [2, 3],
      },
      {
        color: "red",
        nodeIdxs: [3, 4],
      },
      {
        color: "green",
        nodeIdxs: [3, 5],
      },
      {
        color: "blue",
        nodeIdxs: [4, 5],
      },
    ],
  },
  {
    id: 3,
    trollLocs: { orange: [4], purple: [0] },
    nodes: [
      { x: 10, y: 30 },
      { x: 50, y: 30 },
      { x: 90, y: 30 },
      { x: 10, y: 70 },
      { x: 50, y: 70 },
      { x: 90, y: 70 },
    ],
    paths: [
      {
        color: "red",
        nodeIdxs: [0, 1],
        middleCoords: [{ x: 30, y: 25 }],
      },
      {
        color: "green",
        nodeIdxs: [0, 1],
        middleCoords: [{ x: 30, y: 35 }],
      },
      {
        color: "blue",
        nodeIdxs: [0, 3],
      },
      {
        color: "blue",
        nodeIdxs: [1, 2],
      },
      {
        color: "red",
        nodeIdxs: [2, 3],
      },
      {
        color: "green",
        nodeIdxs: [2, 5],
      },
      {
        color: "green",
        nodeIdxs: [3, 4],
      },
      {
        color: "red",
        nodeIdxs: [4, 5],
        middleCoords: [{ x: 70, y: 65 }],
      },
      {
        color: "blue",
        nodeIdxs: [4, 5],
        middleCoords: [{ x: 70, y: 75 }],
      },
    ],
  },
  {
    id: 4,
    trollLocs: { purple: [0, 5], orange: [] },
    nodes: [
      { x: 20, y: 30 },
      { x: 20, y: 60 },
      { x: 50, y: 60 },
      { x: 70, y: 60 },
      { x: 90, y: 60 },
      { x: 70, y: 30 },
    ],
    paths: [
      {
        color: "blue",
        nodeIdxs: [0, 0],
        selfLoopDirection: "up",
      },
      {
        color: "red",
        nodeIdxs: [0, 1],
      },
      {
        color: "green",
        nodeIdxs: [0, 1],
      },
      {
        color: "blue",
        nodeIdxs: [1, 2],
      },
      {
        color: "red",
        nodeIdxs: [2, 3],
      },
      {
        color: "green",
        nodeIdxs: [2, 5],
      },
      {
        color: "green",
        nodeIdxs: [3, 4],
      },
      {
        color: "blue",
        nodeIdxs: [3, 5],
      },
      {
        color: "red",
        nodeIdxs: [4, 5],
      },
      {
        color: "blue",
        nodeIdxs: [4, 4],
        selfLoopDirection: "down",
      },
    ],
  },
  {
    id: 5,
    trollLocs: { purple: [3], orange: [0] },
    nodes: [
      { x: 16, y: 50 },
      { x: 32, y: 30 },
      { x: 32, y: 70 },
      { x: 50, y: 50 },
      { x: 68, y: 30 },
      { x: 84, y: 70 },
    ],
    paths: [
      {
        color: "green",
        nodeIdxs: [0, 1],
      },
      {
        color: "blue",
        nodeIdxs: [0, 4],
        middleCoords: [{ x: 20, y: 15 }],
      },
      {
        color: "red",
        nodeIdxs: [0, 5],
        middleCoords: [{ x: 24, y: 85 }],
      },
      {
        color: "red",
        nodeIdxs: [1, 2],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [1, 3],
      },
      {
        color: "green",
        nodeIdxs: [2, 3],
      },
      {
        color: "blue",
        nodeIdxs: [2, 5],
      },
      {
        color: "red",
        nodeIdxs: [3, 4],
      },
      {
        color: "green",
        nodeIdxs: [4, 5],
      },
    ],
  },
  {
    id: 6,
    trollLocs: { purple: [2], orange: [1, 4] },
    nodes: [
      { x: 14, y: 50 },
      { x: 34, y: 20 },
      { x: 34, y: 80 },
      { x: 66, y: 20 },
      { x: 66, y: 80 },
      { x: 86, y: 50 },
    ],
    paths: [
      {
        color: "red",
        nodeIdxs: [0, 1],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [1, 2],
        directional: true,
        xOffset: -1.5,
      },
      {
        color: "blue",
        nodeIdxs: [1, 3],
      },
      {
        color: "green",
        nodeIdxs: [1, 4],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [2, 0],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [2, 1],
        directional: true,
        xOffset: 1.5,
      },
      {
        color: "blue",
        nodeIdxs: [2, 4],
      },
      {
        color: "green",
        nodeIdxs: [3, 2],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [3, 4],
        directional: true,
        xOffset: 1.5,
      },
      {
        color: "green",
        nodeIdxs: [4, 3],
        directional: true,
        xOffset: -1.5,
      },
      {
        color: "red",
        nodeIdxs: [4, 5],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [5, 3],
        directional: true,
      },
    ],
  },
  {
    id: 7,
    trollLocs: { orange: [0], purple: [] },
    nodes: [
      { x: 14, y: 35 },
      { x: 14, y: 65 },
      { x: 40, y: 20 },
      { x: 40, y: 50 },
      { x: 40, y: 80 },
      { x: 66, y: 35 },
      { x: 66, y: 65 },
      { x: 86, y: 35 },
      { x: 86, y: 65 },
    ],
    paths: [
      {
        color: "green",
        nodeIdxs: [0, 1],
      },
      {
        color: "blue",
        nodeIdxs: [0, 2],
      },
      {
        color: "red",
        nodeIdxs: [0, 3],
      },
      {
        color: "red",
        nodeIdxs: [1, 4],
      },
      {
        color: "green",
        nodeIdxs: [2, 3],
      },
      {
        color: "red",
        nodeIdxs: [2, 5],
      },
      {
        color: "blue",
        nodeIdxs: [3, 4],
      },
      {
        color: "green",
        nodeIdxs: [4, 6],
      },
      {
        color: "blue",
        nodeIdxs: [5, 6],
      },
      {
        color: "green",
        nodeIdxs: [5, 7],
      },
      {
        color: "red",
        nodeIdxs: [6, 8],
      },
      {
        color: "blue",
        nodeIdxs: [7, 8],
      },
    ],
  },
  {
    id: 8,
    trollLocs: { orange: [3, 9, 10], purple: [] },
    nodes: [
      { x: 50, y: 16 },
      { x: 30, y: 30 },
      { x: 70, y: 30 },
      { x: 50, y: 44 },
      { x: 10, y: 60 },
      { x: 35, y: 65 },
      { x: 65, y: 65 },
      { x: 90, y: 60 },
      { x: 10, y: 85 },
      { x: 35, y: 85 },
      { x: 65, y: 85 },
      { x: 90, y: 85 },
    ],
    paths: [
      {
        color: "red",
        nodeIdxs: [0, 0],
        selfLoopDirection: "up",
      },
      {
        color: "green",
        nodeIdxs: [0, 1],
      },
      {
        color: "blue",
        nodeIdxs: [0, 2],
      },
      {
        color: "blue",
        nodeIdxs: [1, 3],
      },
      {
        color: "red",
        nodeIdxs: [1, 4],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [2, 1],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [2, 3],
      },
      {
        color: "green",
        nodeIdxs: [3, 6],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [4, 5],
      },
      {
        color: "green",
        nodeIdxs: [4, 8],
      },
      {
        color: "red",
        nodeIdxs: [4, 9],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [5, 3],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [5, 9],
      },
      {
        color: "blue",
        nodeIdxs: [6, 5],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [6, 7],
      },
      {
        color: "green",
        nodeIdxs: [6, 10],
      },
      {
        color: "green",
        nodeIdxs: [7, 2],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [7, 11],
      },
      {
        color: "blue",
        nodeIdxs: [8, 8],
        selfLoopDirection: "down",
      },
      {
        color: "red",
        nodeIdxs: [8, 9],
      },
      {
        color: "blue",
        nodeIdxs: [9, 10],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [10, 7],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [10, 11],
      },
      {
        color: "green",
        nodeIdxs: [11, 11],
        selfLoopDirection: "down",
      },
    ],
  },
  {
    id: 9,
    trollLocs: { orange: [1], purple: [] },
    nodes: [
      { x: 50, y: 6.69872981078 },
      { x: 37.5, y: 28.349364905389038 },
      { x: 62.5, y: 28.349364905389024 },
      { x: 25, y: 50 },
      { x: 50, y: 50 },
      { x: 75, y: 50 },
      { x: 12.5, y: 71.65063509461098 },
      { x: 37.5, y: 71.65063509461098 },
      { x: 62.5, y: 71.65063509461096 },
      { x: 87.5, y: 71.65063509461098 },
    ],
    paths: [
      {
        color: "blue",
        nodeIdxs: [0, 1],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [0, 6],
        middleCoords: [{ x: 12.5, y: 28.349364905400012 }],
      },
      {
        color: "red",
        nodeIdxs: [0, 9],
        middleCoords: [{ x: 87.5, y: 28.349364905400012 }],
      },
      {
        color: "red",
        nodeIdxs: [1, 2],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [1, 3],
        middleCoords: [{ x: 24.019237886466836, y: 35 }],
      },
      {
        color: "blue",
        nodeIdxs: [1, 3],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [2, 0],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [2, 4],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [2, 5],
        middleCoords: [{ x: 75.98076211353316, y: 35 }],
      },
      {
        color: "red",
        nodeIdxs: [3, 4],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [3, 6],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [4, 1],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [4, 5],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [4, 7],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [5, 2],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [5, 8],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [6, 7],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [6, 9],
        middleCoords: [{ x: 50, y: 93.3012701892 }],
      },
      {
        color: "green",
        nodeIdxs: [7, 3],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [7, 8],
        directional: true,
      },
      {
        color: "blue",
        nodeIdxs: [7, 8],
        middleCoords: [{ x: 50, y: 80 }],
      },
      {
        color: "green",
        nodeIdxs: [8, 4],
        directional: true,
      },
      {
        color: "red",
        nodeIdxs: [8, 9],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [9, 5],
        directional: true,
      },
    ],
  },
  {
    id: 10,
    trollLocs: { orange: [7, 10], purple: [4] },
    nodes: [
      { x: 15, y: 35 }, // 0
      { x: 32.5, y: 25 },
      { x: 50, y: 15 }, // 2
      { x: 67.5, y: 25 },
      { x: 85, y: 35 }, // 4
      { x: 40, y: 50 },
      { x: 60, y: 50 }, // 6
      { x: 15, y: 65 },
      { x: 32.5, y: 75 }, // 8
      { x: 50, y: 85 },
      { x: 67.5, y: 75 }, // 10
      { x: 85, y: 65 },
    ],
    paths: [
      {
        color: "red",
        nodeIdxs: [0, 1],
      },
      {
        color: "green",
        nodeIdxs: [0, 7],
        directional: true,
      },
      {
        color: "green",
        nodeIdxs: [1, 2],
      },
      {
        color: "blue",
        nodeIdxs: [1, 5],
      },
      {
        color: "red",
        nodeIdxs: [2, 2],
        selfLoopDirection: "up",
      },
      {
        color: "blue",
        nodeIdxs: [2, 3],
      },
      {
        color: "red",
        nodeIdxs: [3, 4],
      },
      {
        color: "green",
        nodeIdxs: [3, 6],
      },
      {
        color: "green",
        nodeIdxs: [4, 11],
        directional: true,
        middleCoords: [{ x: 92, y: 50 }],
      },
      {
        color: "red",
        nodeIdxs: [5, 6],
      },
      {
        color: "green",
        nodeIdxs: [5, 8],
      },
      {
        color: "blue",
        nodeIdxs: [6, 10],
      },
      {
        color: "blue",
        nodeIdxs: [7, 0],
        directional: true,
        middleCoords: [{ x: 8, y: 50 }],
      },
      {
        color: "red",
        nodeIdxs: [7, 8],
      },
      {
        color: "blue",
        nodeIdxs: [8, 9],
      },
      {
        color: "red",
        nodeIdxs: [9, 9],
        selfLoopDirection: "down",
      },
      {
        color: "green",
        nodeIdxs: [9, 10],
      },
      {
        color: "red",
        nodeIdxs: [10, 11],
      },
      {
        color: "blue",
        nodeIdxs: [11, 4],
        directional: true,
      },
    ],
  },
];
