import React from "react";
import { useSelector } from "react-redux";
import { MapConfig, TrollType } from "../data/maps";
import { GameState } from "../store/slice";
import { drawArrow } from "../utils/geometryUtils";
import FlyingBee from "./FlyingBee";
import Hexagon from "./icons/Hexagon";
import Hive from "./icons/Hive";

const NODE_SIDE_LENGTH = 10;
const NODE_STROKE = 0.75;

type LevelMapProps = {
  config: MapConfig;
  portalLoc: number;
};

const LevelMap = ({ config, portalLoc }: LevelMapProps) => {
  const { nodes, paths, trollLocs } = config;
  const crystalsOnMapNode = useSelector(
    (state: GameState) => state.crystalsOnMapNode
  );
  const tokens = useSelector((state: GameState) => state.tokens);

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
      {/* helps with element inspector */}
      <rect x={0} y={0} width={100} height={100} fill="none" />
      {paths.map((path, i) => {
        let pointsArr = [];
        if (path.selfLoopDirection) {
          const a = 0.35;
          const b = 3;
          const S = NODE_SIDE_LENGTH;
          const N = nodes[path.nodeIdxs[0]];
          const sign = path.selfLoopDirection === "up" ? -1 : 1;
          pointsArr = [
            { x: N.x - a * S, y: N.y + (sign * S) / 2 },
            { x: N.x - a * S, y: N.y + sign * (S / 2 + b) },
            { x: N.x + a * S, y: N.y + sign * (S / 2 + b) },
            { x: N.x + a * S, y: N.y + (sign * S) / 2 },
          ];
        } else if (path.directional) {
          const start = nodes[path.nodeIdxs[0]];
          const end = nodes[path.nodeIdxs[1]];
          const midpoints = path.middleCoords || [];
          pointsArr = drawArrow(
            start,
            end,
            midpoints,
            NODE_SIDE_LENGTH / 2 + NODE_STROKE * 2
          );
          if (path.xOffset) {
            pointsArr = pointsArr.map(({ x, y }) => ({
              x: x + (path.xOffset || 0),
              y,
            }));
          }
        } else {
          const startCoords = nodes[path.nodeIdxs[0]];
          const endCoords = nodes[path.nodeIdxs[1]];
          const middleCoords = path.middleCoords || [];
          pointsArr = [startCoords, ...middleCoords, endCoords];
        }
        const points = pointsArr.map(({ x, y }) => `${x},${y}`).join(" ");
        return (
          <polyline
            key={`path${i}`}
            points={points}
            stroke={path.color}
            fill="none"
            strokeWidth={1.25}
          />
        );
      })}
      {nodes.map((node, i) => {
        const trollKeys = Object.keys(trollLocs) as TrollType[];
        const trollColor = trollKeys.find((c) => trollLocs[c].includes(i));
        const hasTrollColor =
          trollColor &&
          tokens.some(
            (t) =>
              t.type === "condition" &&
              t.token.tokenType === "troll" &&
              t.token.trollType === trollColor
          );

        const x = node.x - NODE_SIDE_LENGTH / 2;
        const y = node.y - NODE_SIDE_LENGTH / 2;

        const shapes = [
          <rect
            key={`node${i}`}
            width={NODE_SIDE_LENGTH}
            height={NODE_SIDE_LENGTH}
            x={x}
            y={y}
            stroke={hasTrollColor ? trollColor : "black"}
            strokeWidth={NODE_STROKE}
            fill="#efefef"
          />,
        ];

        if (i === portalLoc) {
          shapes.push(<Hive key="hive" center={node} radius={2.4} />);
        }

        const numCrystals = crystalsOnMapNode[i] || 0;
        for (let c = 0; c < numCrystals; c++) {
          const L = NODE_SIDE_LENGTH / 3.3;
          shapes.push(
            <Hexagon
              key={`crystal${c}`}
              center={{
                x: node.x - ((numCrystals - 1) * L) / 2 + L * c,
                y: node.y,
              }}
              radius={2.4 / Math.sqrt(3)}
              strokeWidth={0.25}
              fill="#f8cd05"
            />
          );
        }

        return shapes;
      })}
      <FlyingBee nodeSideLength={NODE_SIDE_LENGTH} />
    </svg>
  );
};

export default LevelMap;
