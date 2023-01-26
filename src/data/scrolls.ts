import { Coord } from "../utils/geometryUtils";

export type NextNode = {
  index: number;
  isGoal?: boolean;
  midpoints?: Coord[];
};

interface IScrollNode {
  type: "path" | "condition";
  coords: Coord;
  isStart?: boolean;
}

interface PathScrollNode extends IScrollNode {
  type: "path";
  next: NextNode;
}

interface ConditionScrollNode extends IScrollNode {
  type: "condition";
  nextIf: NextNode;
  nextElse: NextNode;
}

type ScrollNode = PathScrollNode | ConditionScrollNode;

type Direction = "up" | "down" | "left" | "right";

export type Scroll = {
  id: number;
  nodes: ScrollNode[];
  playerPos?: Direction;
  portalPos?: Direction;
};

export const scrolls: Scroll[] = [
  {
    id: 1,
    nodes: [
      {
        type: "path",
        isStart: true,
        coords: { x: 46, y: 50 },
        next: { index: 1 },
      },
      {
        type: "path",
        coords: { x: 82, y: 50 },
        next: { index: 2 },
      },
      {
        type: "path",
        coords: { x: 118, y: 50 },
        next: { index: 3 },
      },
      {
        type: "path",
        coords: { x: 154, y: 50 },
        next: { index: -1, isGoal: true },
      },
    ],
  },
  {
    id: 2,
    nodes: [
      {
        type: "path",
        isStart: true,
        coords: { x: 46, y: 35 },
        next: { index: 1 },
      },
      {
        type: "path",
        coords: { x: 82, y: 35 },
        next: { index: 2 },
      },
      {
        type: "path",
        coords: { x: 118, y: 35 },
        next: { index: 3 },
      },
      {
        type: "path",
        coords: { x: 118, y: 65 },
        next: { index: 4 },
      },
      {
        type: "path",
        coords: { x: 154, y: 65 },
        next: { index: -1, isGoal: true },
      },
    ],
  },
  {
    id: 3,
    nodes: [
      {
        type: "path",
        isStart: true,
        coords: { x: 46, y: 25 },
        next: { index: 1 },
      },
      {
        type: "path",
        coords: { x: 82, y: 25 },
        next: { index: 2 },
      },
      {
        type: "path",
        coords: { x: 82, y: 50 },
        next: { index: 3 },
      },
      {
        type: "path",
        coords: { x: 118, y: 50 },
        next: { index: 4 },
      },
      {
        type: "path",
        coords: { x: 118, y: 75 },
        next: { index: 5 },
      },
      {
        type: "path",
        coords: { x: 154, y: 75 },
        next: { index: -1, isGoal: true },
      },
    ],
  },
  {
    id: 4,
    nodes: [
      {
        type: "path",
        isStart: true,
        coords: { x: 46, y: 60 },
        next: { index: 1 },
      },
      {
        type: "path",
        coords: { x: 82, y: 60 },
        next: { index: 2 },
      },
      {
        type: "path",
        coords: { x: 118, y: 60 },
        next: { index: 3 },
      },
      {
        type: "condition",
        coords: { x: 154, y: 60 },
        nextIf: { index: -1, isGoal: true },
        nextElse: {
          index: 0,
          midpoints: [
            { x: 154, y: 35 },
            { x: 46, y: 35 },
          ],
        },
      },
    ],
  },
  {
    id: 5,
    nodes: [
      {
        type: "path",
        isStart: true,
        coords: { x: 46, y: 25 },
        next: { index: 1 },
      },
      {
        type: "path",
        coords: { x: 82, y: 25 },
        next: { index: 2 },
      },
      {
        type: "path",
        coords: { x: 82, y: 50 },
        next: { index: 3 },
      },
      {
        type: "path",
        coords: { x: 82, y: 75 },
        next: { index: 4 },
      },
      {
        type: "path",
        coords: { x: 118, y: 75 },
        next: { index: 5 },
      },
      {
        type: "path",
        coords: { x: 154, y: 75 },
        next: { index: 6 },
      },
      {
        type: "path",
        coords: { x: 154, y: 50 },
        next: { index: -1, isGoal: true },
      },
    ],
  },
  {
    id: 6,
    portalPos: "down",
    nodes: [
      {
        type: "path",
        isStart: true,
        coords: { x: 40, y: 50 },
        next: { index: 1 },
      },
      {
        type: "path",
        coords: { x: 70, y: 50 },
        next: { index: 2 },
      },
      {
        type: "path",
        coords: { x: 100, y: 50 },
        next: { index: 3 },
      },
      {
        type: "path",
        coords: { x: 130, y: 50 },
        next: { index: 4 },
      },
      {
        type: "condition",
        coords: { x: 160, y: 50 },
        nextElse: { index: -1, isGoal: true },
        nextIf: {
          index: 0,
          midpoints: [
            { x: 160, y: 25 },
            { x: 40, y: 25 },
          ],
        },
      },
    ],
  },
  {
    id: 7,
    nodes: [
      {
        type: "path",
        isStart: true,
        coords: { x: 40, y: 50 },
        next: { index: 1 },
      },
      {
        type: "condition",
        coords: { x: 70, y: 50 },
        nextIf: { index: 2 },
        nextElse: {
          index: 5,
          midpoints: [{ x: 70, y: 75 }],
        },
      },
      {
        type: "path",
        coords: { x: 100, y: 50 },
        next: { index: 3 },
      },
      {
        type: "path",
        coords: { x: 130, y: 50 },
        next: { index: 4 },
      },
      {
        type: "path",
        coords: { x: 160, y: 50 },
        next: {
          index: 1,
          midpoints: [
            { x: 160, y: 25 },
            { x: 70, y: 25 },
          ],
        },
      },
      {
        type: "path",
        coords: { x: 100, y: 75 },
        next: { index: 6 },
      },
      {
        type: "path",
        coords: { x: 130, y: 75 },
        next: { index: -1, isGoal: true },
      },
    ],
  },
  {
    id: 8,
    nodes: [
      {
        type: "condition",
        isStart: true,
        coords: { x: 60, y: 50 },
        nextIf: {
          index: 1,
          midpoints: [{ x: 60, y: 35 }],
        },
        nextElse: {
          index: 2,
          midpoints: [{ x: 60, y: 65 }],
        },
      },
      {
        type: "path",
        coords: { x: 90, y: 35 },
        next: {
          index: 3,
          midpoints: [{ x: 120, y: 35 }],
        },
      },
      {
        type: "path",
        coords: { x: 90, y: 65 },
        next: {
          index: 3,
          midpoints: [{ x: 120, y: 65 }],
        },
      },
      {
        type: "path",
        coords: { x: 120, y: 50 },
        next: { index: 4 },
      },
      {
        type: "condition",
        coords: { x: 150, y: 50 },
        nextIf: { index: -1, isGoal: true },
        nextElse: {
          index: 0,
          midpoints: [
            { x: 150, y: 20 },
            { x: 45, y: 20 },
            { x: 45, y: 50 },
          ],
        },
      },
    ],
  },
  {
    id: 9,
    nodes: [
      {
        type: "condition",
        isStart: true,
        coords: { x: 40, y: 50 },
        nextIf: {
          index: 5,
          midpoints: [{ x: 40, y: 75 }],
        },
        nextElse: { index: 1 },
      },
      {
        type: "path",
        coords: { x: 70, y: 50 },
        next: { index: 2 },
      },
      {
        type: "path",
        coords: { x: 100, y: 50 },
        next: { index: 3 },
      },
      {
        type: "path",
        coords: { x: 130, y: 50 },
        next: { index: 4 },
      },
      {
        type: "path",
        coords: { x: 160, y: 50 },
        next: {
          index: 0,
          midpoints: [
            { x: 160, y: 25 },
            { x: 40, y: 25 },
          ],
        },
      },
      {
        type: "path",
        coords: { x: 70, y: 75 },
        next: { index: 6 },
      },
      {
        type: "path",
        coords: { x: 100, y: 75 },
        next: { index: 7 },
      },
      {
        type: "path",
        coords: { x: 130, y: 75 },
        next: { index: -1, isGoal: true },
      },
    ],
  },
  {
    id: 10,
    portalPos: "down",
    nodes: [
      {
        type: "path",
        isStart: true,
        coords: { x: 40, y: 50 },
        next: { index: 1 },
      },
      {
        type: "path",
        coords: { x: 70, y: 50 },
        next: { index: 2 },
      },
      {
        type: "path",
        coords: { x: 100, y: 50 },
        next: { index: 3 },
      },
      {
        type: "path",
        coords: { x: 130, y: 50 },
        next: { index: 4 },
      },
      {
        type: "condition",
        coords: { x: 160, y: 50 },
        nextIf: { index: -1, isGoal: true },
        nextElse: {
          index: 0,
          midpoints: [
            { x: 160, y: 25 },
            { x: 40, y: 25 },
          ],
        },
      },
    ],
  },
  {
    id: 11,
    nodes: [
      {
        type: "path",
        isStart: true,
        coords: { x: 40, y: 50 },
        next: { index: 1 },
      },
      {
        type: "condition",
        coords: { x: 70, y: 50 },
        nextIf: {
          index: 2,
          midpoints: [{ x: 70, y: 35 }],
        },
        nextElse: {
          index: 3,
          midpoints: [{ x: 70, y: 65 }],
        },
      },
      {
        type: "path",
        coords: { x: 100, y: 35 },
        next: {
          index: 4,
          midpoints: [{ x: 130, y: 35 }],
        },
      },
      {
        type: "path",
        coords: { x: 100, y: 65 },
        next: {
          index: 4,
          midpoints: [{ x: 130, y: 65 }],
        },
      },
      {
        type: "path",
        coords: { x: 130, y: 50 },
        next: { index: 5 },
      },
      {
        type: "condition",
        coords: { x: 160, y: 50 },
        nextIf: { index: -1, isGoal: true },
        nextElse: {
          index: 0,
          midpoints: [
            { x: 160, y: 20 },
            { x: 40, y: 20 },
          ],
        },
      },
    ],
  },
];
