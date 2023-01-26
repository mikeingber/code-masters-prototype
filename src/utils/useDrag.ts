import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Scroll } from "../data/scrolls";
import { moveToken, TokenState } from "../store/slice";
import { Coord } from "./geometryUtils";

export const useDrag = (
  scroll: Scroll,
  tokens: TokenState[],
  nodeRadius: number
) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragTokenIdx, setDragTokenIdx] = useState(-1);
  const [dragStart, setDragStart] = useState<Coord | null>(null);
  const [dragCenter, setDragCenter] = useState<Coord | null>(null);
  const [closeNodeIdx, setCloseNodeIdx] = useState(-1);
  const dispatch = useDispatch();

  const startDrag = (event: React.MouseEvent<SVGElement>, tokenIdx: number) => {
    event.preventDefault();
    let point = new DOMPoint(event.clientX, event.clientY);
    point = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());
    setDragTokenIdx(tokenIdx);
    setDragStart({
      x: point.x,
      y: point.y,
    });

    // hacky af but works, i think
    let closeNodeIdxTemp = closeNodeIdx;

    const mousemove = (e: MouseEvent) => {
      e.preventDefault();
      const point = new DOMPoint(e.clientX, e.clientY);
      const cursor = point.matrixTransform(
        svgRef.current?.getScreenCTM()?.inverse()
      );
      const center = {
        x: cursor.x - (dragStart?.x || 0),
        y: cursor.y - (dragStart?.y || 0),
      };
      setDragCenter(center);

      const closeEnough = scroll.nodes.findIndex((node, i) => {
        // if node is occupied it can't be dropped into
        // TODO: also do if node is of different type than token
        if (tokens.some((t, tIdx) => tIdx !== tokenIdx && t.scrollNode === i)) {
          return false;
        }

        const dSquared =
          (node.coords.x - center.x) ** 2 + (node.coords.y - center.y) ** 2;
        return dSquared < nodeRadius ** 2;
      });

      if (closeEnough !== closeNodeIdxTemp) {
        closeNodeIdxTemp = closeEnough;
        setCloseNodeIdx(closeEnough);
      }
    };

    const mouseup = () => {
      if (closeNodeIdxTemp > -1) {
        dispatch(
          moveToken({
            tokenIdx,
            scrollNodeIdx: closeNodeIdxTemp,
          })
        );
        setCloseNodeIdx(-1);
      } else {
        dispatch(moveToken({ tokenIdx }));
      }

      setDragTokenIdx(-1);
      setDragCenter(null);
      setDragStart(null);
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  return {
    dragTokenIdx,
    startDrag,
    svgRef,
    dragCenter,
    closeNodeIdx,
  };
};
