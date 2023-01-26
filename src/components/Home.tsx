import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Level, levels } from "../data/levels";
import { mapConfigs } from "../data/maps";
import { scrolls } from "../data/scrolls";
import { resetState } from "../store/slice";

const isDisabled = (level: Level) => {
  return scrolls.every((scroll) => scroll.id !== level.scrollId);
};

const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  return (
    <Container>
      {levels.map((level) => (
        <Link key={level.id} to={`/level/${level.id}`}>
          <Item disabled={isDisabled(level)}>{level.id}</Item>
        </Link>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${mapConfigs.length}, 1fr);
  grid-gap: 10px;
  padding: 20px;

  a {
    text-decoration: none;
  }
`;

const Item = styled.button`
  border-radius: 4px;
  border: 1px solid black;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  cursor: pointer;
`;

export default Home;
