export type Coord = {
  x: number;
  y: number;
};

export const getSlope = (point1: Coord, point2: Coord): number => {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  return (y2 - y1) / (x2 - x1);
};

export const getPointRAwayAlongLine = (
  nearPoint: Coord,
  farPoint: Coord,
  R: number
): Coord => {
  const { x: x1, y: y1 } = nearPoint;
  const { x: x2, y: y2 } = farPoint;
  let deltaX, deltaY;
  if (x2 === x1) {
    deltaX = 0;
    deltaY = y2 > y1 ? R : -R;
  } else {
    const m = (y2 - y1) / (x2 - x1);
    deltaX = Math.sqrt(R ** 2 / (1 + m ** 2));
    if (x2 < x1) deltaX = -1 * deltaX;
    deltaY = m * deltaX;
  }

  return { x: x1 + deltaX, y: y1 + deltaY };
};

export const getPointsRAwayGivenSlope = (
  nearPoint: Coord,
  m: number,
  R: number
): Coord[] => {
  const { x, y } = nearPoint;

  let deltaX, deltaY;

  if (m === Infinity || m === -Infinity) {
    deltaX = 0;
    deltaY = R;
  } else {
    deltaX = Math.sqrt(R ** 2 / (1 + m ** 2));
    deltaY = m * deltaX;
  }

  return [
    { x: x + deltaX, y: y + deltaY },
    { x: x - deltaX, y: y - deltaY },
  ];
};

const getArrowCoords = (
  arrowOrigin: Coord,
  arrowDest: Coord,
  crossLength: number
): Coord[] => {
  const arrowCrossMidpoint = getPointRAwayAlongLine(
    arrowDest,
    arrowOrigin,
    crossLength / Math.sqrt(2)
  );
  const arrowCrossSlope = -1 / getSlope(arrowOrigin, arrowDest);
  const arrowCrossPoints = getPointsRAwayGivenSlope(
    arrowCrossMidpoint,
    arrowCrossSlope,
    0.5 * crossLength
  );
  return [
    arrowOrigin,
    arrowCrossMidpoint,
    arrowCrossPoints[0],
    arrowDest,
    arrowCrossPoints[1],
    arrowCrossMidpoint,
  ];
};

export const drawArrow = (
  startNodePos: Coord,
  nextNodePos: Coord,
  midpoints: Coord[],
  nodeSpacing: number
): Coord[] => {
  if (midpoints.length > 0) {
    const firstMidpoint = midpoints[0];
    const lastMidpoint = midpoints.slice(-1)[0];
    const allButLastMidpoints = midpoints.slice(0, -1);
    const arrowOrigin = getPointRAwayAlongLine(
      startNodePos,
      firstMidpoint,
      nodeSpacing
    );
    const arrowDest = getPointRAwayAlongLine(
      nextNodePos,
      lastMidpoint,
      nodeSpacing
    );
    return [
      arrowOrigin,
      ...allButLastMidpoints,
      ...getArrowCoords(lastMidpoint, arrowDest, 3),
    ];
  }

  const arrowOrigin = getPointRAwayAlongLine(
    startNodePos,
    nextNodePos,
    nodeSpacing
  );
  const arrowDest = getPointRAwayAlongLine(
    nextNodePos,
    startNodePos,
    nodeSpacing
  );
  return getArrowCoords(arrowOrigin, arrowDest, 3);
};

export const hexagon = (center: Coord, radius: number, offset = 0): Coord[] => {
  const points: Coord[] = [];

  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * (i + offset);
    points.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    });
  }

  return points;
};

export const pointInADirection = (
  point: Coord,
  direction: "left" | "right" | "up" | "down",
  distance: number
): Coord => {
  const { x, y } = point;
  switch (direction) {
    case "left":
      return { x: x - distance, y };
    case "right":
      return { x: x + distance, y };
    case "up":
      return { x, y: y - distance };
    case "down":
      return { x, y: y + distance };
  }
};

export const PHI = (1 + Math.sqrt(5)) / 2;
