import styled from "styled-components";

import {
  Input as InputAnt,
  Form as FormAnt,
  Button as ButtonAnt,
  Col as ColAnt,
  Row as RowAnt,
} from "antd";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--purple-50);
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
`;

export const Col = styled(ColAnt)``;

export const Row = styled(RowAnt)`
  width: 100%;
  align-items: center;
  justify-content: center;
  grid-gap: 5px;
`;

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
`;

export const Form = styled(FormAnt)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;

  p {
    color: var(--gray-300);
    margin-top: 0.3rem;

    span {
      color: var(--purple-150);
    }
  }

  .ant-form-item {
    margin-bottom: 15px;
  }

  @media only screen and (max-width: 1366px) {
    p {
      font-size: 0.8rem;

      span {
        font-size: 0.8rem;
      }
    }
  }

  @media only screen and (max-width: 1280px) {
    p {
      font-size: 0.7rem;

      span {
        font-size: 0.7rem;
      }
    }
  }

  @media only screen and (max-width: 800px) {
    height: 65%;
    .ant-form-item-required {
      font-size: 14px;
    }

    p {
      font-size: 0.6rem;

      span {
        font-size: 0.6rem;
      }
    }

    .ant-form-item {
      margin-bottom: 10px;
    }
  }

  @media only screen and (max-width: 578px) {
    width: 80%;
    height: 70%;
  }
`;

export const FormItem = styled(FormAnt.Item)`
  label {
    font-size: 1rem;
    color: var(--gray-700);
  }
`;

export const Input = styled(InputAnt)``;

export const Button = styled(ButtonAnt)`
  height: 2.7rem;
  width: 100%;
  border-radius: 0.7rem;
  border: none;
  font-size: 1.4rem;
  font-weight: 500;
  margin: 5px 0;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: var(--pink-100);

  :hover {
    background-color: var(--pink-100);
  }
`;
