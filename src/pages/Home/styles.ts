import styled from "styled-components";

import { Input as InputAnt } from "antd";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const SidebarContainer = styled.div`
  display: flex;
  width: 15%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-right: 1px solid var(--gray-50);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 100%;
  background-color: var(--purple-50);

  .centralizer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  padding: 3%;

  span {
    color: var(--gray-800);
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const MidContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;

  .upload_file {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5%;
    padding: 3%;
    border-bottom: 1px solid var(--gray-50);
  }

  .list_file {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 95%;
    padding: 3%;
  }
`;

export const Input = styled(InputAnt)`
  width: 60%;
`;
