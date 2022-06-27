import React, { Dispatch, SetStateAction, useState } from "react";
import api from "../../services/api";

import { UserDto } from "../../models/user";
import { WorkspaceDto } from "../../models/workspace";

import { message as messageAnt, Spin } from "antd";
import { Container } from "./styles";

interface IProps {
  user: UserDto;
  selectedWorkspace: WorkspaceDto | null;
  setShouldOpen: Dispatch<SetStateAction<boolean>>;
}

const User: React.FC<IProps> = ({ user, selectedWorkspace, setShouldOpen }) => {
  const [loading, setLoading] = useState(false);

  const onAddUserToWorkspace = async () => {
    try {
      await api.post("/workspace-guest/create", {
        user_id: user.id,
        workspace_id: selectedWorkspace?.id,
      });
      setShouldOpen(false);
    } catch (error: any) {
      messageAnt.error(
        error.response?.data?.message || "Falha ao realizar o login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <Spin />
      ) : (
        <>
          <h3>{user.username}</h3>
          <p onClick={onAddUserToWorkspace}>add</p>
        </>
      )}
    </Container>
  );
};

export default User;
