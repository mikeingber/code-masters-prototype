import React from "react";
import { useSelector } from "react-redux";
import {
  Coord,
  drawArrow,
  PHI,
  pointInADirection,
} from "../utils/geometryUtils";
import PlayButton from "./PlayButton";
import { GameState } from "../store/slice";
import { NextNode, Scroll } from "../data/scrolls";
import Token from "./Token";
import { useDrag } from "../utils/useDrag";
import Bee from "./icons/Bee";
import Hive from "./icons/Hive";

type GameScrollProps = {
  scroll: Scroll;
};

const NODE_RADIUS = 8;
const NODE_STROKE_WIDTH = 1;
const W = 200;

const GameScroll = ({ scroll }: GameScrollProps) => {
  const tokens = useSelector((state: GameState) => state.tokens);
  const [tokensFlashing, setTokensFlashing] = React.useState(true);
  const { dragTokenIdx, startDrag, svgRef, closeNodeIdx, dragCenter } = useDrag(
    scroll,
    tokens,
    NODE_RADIUS
  );
  const tokenContainerHeight = W * (1 / PHI - 0.5);
  const dragToken = dragTokenIdx > -1 && tokens[dragTokenIdx];

  return (
    <svg
      viewBox={`0 0 ${W} ${W / PHI}`}
      preserveAspectRatio="xMinYMax"
      ref={svgRef}
    >
      {/* helps with element inspector */}
      <rect x={0} y={0} width={W} height={W / PHI} fill="none" />
      {/* token container */}
      <rect
        x={2}
        y={W / 2 + 2}
        width={W - 4}
        height={tokenContainerHeight - 4}
        rx={2}
        stroke="black"
        strokeWidth={0.5}
        fill="none"
      />
      {tokens.map((token, i) => {
        const isEmpty =
          i === dragTokenIdx || typeof token.scrollNode === "number";

        const x = (W / tokens.length) * (i + 1 / 2);
        const y = W / 2 + tokenContainerHeight / 2;

        return (
          <Token
            key={`tokens${i}`}
            tokenState={token}
            center={{ x, y }}
            size={NODE_RADIUS * 2}
            isEmpty={isEmpty}
            onMouseDown={(e) => {
              setTokensFlashing(false);
              startDrag(e, i);
            }}
            isFlashing={tokensFlashing}
          />
        );
      })}
      {scroll.nodes.map((node, i) => {
        const shapes = [];

        const renderArrow = (
          next: NextNode,
          origin: { coords: Coord } = node,
          key = ""
        ) => {
          const arrowPoints = drawArrow(
            origin.coords,
            scroll.nodes[next.index].coords,
            next.midpoints || [],
            NODE_RADIUS + NODE_STROKE_WIDTH / 2
          );
          shapes.push(
            <polyline
              key={`arrow${i}${key}`}
              points={arrowPoints.map(({ x, y }) => `${x}, ${y}`).join(" ")}
              stroke="black"
              fill="none"
              strokeWidth={0.2}
            />
          );
        };

        if (node.type === "path" && node.next.index > -1) {
          renderArrow(node.next);
        }

        if (
          (node.type === "path" && node.next.index === -1) ||
          (node.type === "condition" && node.nextIf.index === -1) ||
          (node.type === "condition" && node.nextElse.index === -1)
        ) {
          const portalCenter = pointInADirection(
            node.coords,
            scroll.portalPos || "right",
            30
          );
          shapes.push(
            <Hive key="hive" center={portalCenter} radius={5} ignoreEmpty />
          );
          const arrowPoints = drawArrow(
            node.coords,
            portalCenter,
            [],
            NODE_RADIUS
          );
          shapes.push(
            <polyline
              key="arrow-hive"
              points={arrowPoints.map(({ x, y }) => `${x}, ${y}`).join(" ")}
              stroke="black"
              fill="none"
              strokeWidth={0.2}
            />
          );
        }

        if (node.type === "condition") {
          if (node.nextIf.index > -1) {
            // TODO: check and x
            renderArrow(node.nextIf, node, "-if");
          }
          if (node.nextElse.index > -1) {
            renderArrow(node.nextElse, node, "-else");
          }
        }

        const filledIdx = tokens.findIndex((t) => t.scrollNode === i);
        if (filledIdx > -1 && dragTokenIdx !== filledIdx) {
          shapes.push(
            <Token
              key={`node-filled${i}`}
              tokenState={tokens[filledIdx]}
              center={node.coords}
              size={NODE_RADIUS * 2}
              onMouseDown={(e) => startDrag(e, filledIdx)}
            />
          );
        }

        if (node.type === "path") {
          shapes.push(
            <circle
              key={`node${i}`}
              r={NODE_RADIUS}
              cx={node.coords.x}
              cy={node.coords.y}
              stroke="black"
              strokeWidth={
                closeNodeIdx === i ? NODE_STROKE_WIDTH * 2 : NODE_STROKE_WIDTH
              }
              fill="none"
            />
          );
        }

        if (node.type === "condition") {
          shapes.push(
            <rect
              key={`node${i}`}
              width={2 * NODE_RADIUS}
              height={2 * NODE_RADIUS}
              x={node.coords.x - NODE_RADIUS}
              y={node.coords.y - NODE_RADIUS}
              stroke="black"
              strokeWidth={NODE_STROKE_WIDTH}
              fill="none"
            />
          );
        }

        if (node.isStart) {
          const beeCenter = pointInADirection(
            node.coords,
            scroll.playerPos || "left",
            30
          );
          shapes.push(
            <g
              key="bee"
              transform={`translate(${beeCenter.x - 9}, ${
                beeCenter.y - 9
              }) scale(0.2222222)`}
            >
              <Bee />
            </g>
          );
          renderArrow({ index: 0 }, { coords: beeCenter }, "-start");
        }

        return shapes;
      })}
      {dragToken && dragCenter && (
        <Token
          key="draggable"
          tokenState={dragToken}
          center={dragCenter}
          size={NODE_RADIUS * 2}
        />
      )}
      <PlayButton />
    </svg>
  );
};

export default GameScroll;
