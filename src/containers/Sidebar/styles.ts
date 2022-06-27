import styled from "styled-components";

import { LogOut } from "../../styles/Icons";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 5%;
  background-color: var(--white);
`;

export const WorkspaceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85%;

  .centralizer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .repo {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 7%;
    border-radius: 15px;
    background-color: #f7f7f78f;
    color: #9ca1a9;
    font-weight: 500;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    transition: 0.2s;

    :hover {
      filter: contrast(0);
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    background-color: var(--pink-100);
    color: white;
    border-radius: 15px;
  }
`;

export const LogoutIcon = styled(LogOut)`
  width: 1.1rem;
  height: 1.1rem;
  color: white;
  margin-right: 5px;
`;
