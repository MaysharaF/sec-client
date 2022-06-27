import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { decodeToken } from "../../services/auth";
import api from "../../services/api";
import User from "../../components/User";

import { WorkspaceDto } from "../../models/workspace";
import { UserDto } from "../../models/user";

import { Container, Modal, Header } from "./styles";
import { Spin, message as messageAnt } from "antd";

interface IProps {
  selectedWorkspace: WorkspaceDto | null;
  shouldOpen: boolean;
  setShouldOpen: Dispatch<SetStateAction<boolean>>;
}

const UserList: React.FC<IProps> = ({
  shouldOpen,
  setShouldOpen,
  selectedWorkspace,
}) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const {
        data: { content },
      } = await api.get("/user/list");

      const {
        data: { content: contentGuests },
      } = await api.get(`/workspace/${selectedWorkspace?.id}/guests`);
      if (contentGuests.length) {
        setUsers(
          content.filter(
            (user) => !contentGuests.some((guests) => guests.id === user.id)
          )
        );
      } else {
        setUsers(content);
      }
      setLoading(false);
    }
    if (shouldOpen) {
      fetchUsers();
    }
  }, [shouldOpen, selectedWorkspace]);

  const onOpenUserModal = () => {
    if (!selectedWorkspace) {
      messageAnt.warning("Selecione um workspace");
      return;
    }
    setShouldOpen(true);
  };

  return (
    <>
      <Container onClick={onOpenUserModal}>Adicionar Usuário</Container>
      <Modal
        visible={shouldOpen}
        onCancel={() => setShouldOpen(false)}
        onOk={() => setShouldOpen(false)}
        destroyOnClose
      >
        <Header>
          <h1>Lista de Usuários</h1>
        </Header>
        {loading ? (
          <Spin />
        ) : (
          <>
            {users
              .filter((user) => user.id !== decodeToken().id)
              .filter((user) => user.id !== selectedWorkspace?.id)
              .map((user) => (
                <User
                  key={user.id}
                  user={user}
                  selectedWorkspace={selectedWorkspace}
                  setShouldOpen={setShouldOpen}
                />
              ))}
          </>
        )}
      </Modal>
    </>
  );
};

export default UserList;
