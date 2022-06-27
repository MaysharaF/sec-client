import styled from "styled-components";

import { Modal as ModalAnt } from "antd";

export const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
  height: 3rem;
  border-radius: 15px;
  font-size: 0.9rem;
  color: white;
  background-color: #1c1185;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export const Modal = styled(ModalAnt)``;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 30%;

  h1 {
    font-size: 2.5rem;
    color: var(--orange-250);
    font-weight: bold;
  }

  @media only screen and (max-width: 1366px) {
    h1 {
      font-size: 2rem;
    }
  }

  @media only screen and (max-width: 1280px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  @media only screen and (max-width: 800px) {
    height: 25%;
    h1 {
      font-size: 1.2rem;
    }
  }

  @media only screen and (max-width: 578px) {
    height: 20%;
    h1 {
      font-size: 2rem;
    }
  }
`;
