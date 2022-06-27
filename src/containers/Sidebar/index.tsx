import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { logout } from "../../services/auth";
import api from "../../services/api";

import { message as messageAnt, Spin, Empty } from "antd";

import { WorkspaceDto } from "../../models/workspace";
import { WorkspaceGuestDto } from "../../models/workspaceGuest";

import CreateWorkspace from "../CreateWorkspace";

import {
  Container,
  WorkspaceContainer,
  Content,
  Footer,
  LogoutIcon,
} from "./styles";

interface IProps extends RouteComponentProps {
  openAddWorkspace: boolean;
  setOpenAddWorkspace: Dispatch<SetStateAction<boolean>>;
  setReloadWorkspaceFiles: Dispatch<SetStateAction<boolean>>;
  setSelectedWorkspace: Dispatch<SetStateAction<WorkspaceDto | null>>;
}

const Sidebar: React.FC<IProps> = ({
  openAddWorkspace,
  setOpenAddWorkspace,
  setSelectedWorkspace,
  setReloadWorkspaceFiles,
  history,
}) => {
  const [loadingWorkspaceList, setLoadingWorkspaceList] = useState(true);
  const [reloadWorkspaceList, setReloadWorkspaceList] = useState(true);

  const [workspaces, setWorkspaces] = useState<{
    workspaces: WorkspaceDto[];
    workspacesGuest: WorkspaceGuestDto[];
  }>({
    workspaces: [],
    workspacesGuest: [],
  });

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        setLoadingWorkspaceList(true);
        const {
          data: { content },
        } = await api.get("/workspace/list");
        setWorkspaces(content);
        setReloadWorkspaceList(false);
      } catch (error: any) {
        messageAnt.error(
          error.response?.data?.message || "Falha ao criar workspace"
        );
      } finally {
        setLoadingWorkspaceList(false);
      }
    };
    if (reloadWorkspaceList) {
      fetchWorkspaces();
    }
  }, [reloadWorkspaceList]);

  return (
    <Container>
      <WorkspaceContainer>
        <CreateWorkspace
          shouldOpen={openAddWorkspace}
          setShouldOpen={setOpenAddWorkspace}
          setReloadWorkspaceList={setReloadWorkspaceList}
        />
      </WorkspaceContainer>

      <Content>
        {loadingWorkspaceList ? (
          <div className="centralizer">
            <Spin />
          </div>
        ) : (
          <>
            {workspaces.workspaces.length !== 0 ||
            workspaces.workspacesGuest.length !== 0 ? (
              <>
                {workspaces.workspaces.map((workspace) => (
                  <p
                    className="repo"
                    onClick={() => {
                      setSelectedWorkspace(workspace);
                      setReloadWorkspaceFiles(true);
                    }}
                    key={workspace.id}
                  >
                    {workspace.name}
                  </p>
                ))}
                {workspaces.workspacesGuest.map((workspaceGuest) => (
                  <p
                    className="repo"
                    onClick={() =>
                      setSelectedWorkspace(workspaceGuest.workspace)
                    }
                    key={workspaceGuest.id}
                  >
                    {workspaceGuest.workspace.name}
                  </p>
                ))}
              </>
            ) : (
              <div className="centralizer">
                <Empty description="Nenhum workspace cadastrado" />
              </div>
            )}
          </>
        )}
      </Content>

      <Footer>
        <button
          onClick={() => {
            logout();
            history.push("/login");
          }}
        >
          <LogoutIcon />
          Sair
        </button>
      </Footer>
    </Container>
  );
};

export default withRouter(Sidebar);
