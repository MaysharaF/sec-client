import styled from "styled-components";

import { AddCircle } from "../../styles/Icons";

import {
  Modal as ModalAnt,
  Input as InputAnt,
  Form as FormAnt,
  Col as ColAnt,
  Row as RowAnt,
} from "antd";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: bold;
  color: #2e2c32;
`;

export const Modal = styled(ModalAnt)``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const AddIcon = styled(AddCircle)`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  color: #bac1cb;
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
`;

export const FormItem = styled(FormAnt.Item)`
  label {
    font-size: 1rem;
    color: var(--gray-700);
  }
`;

export const Input = styled(InputAnt)``;
