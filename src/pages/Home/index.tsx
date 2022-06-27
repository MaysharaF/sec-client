import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import crypto from "crypto-js";
import api from "../../services/api";

import Sidebar from "../../containers/Sidebar";
import UserList from "../../containers/UserList";
import File from "../../components/File";

import { Spin, message as messageAnt, Empty } from "antd";

import {
  Container,
  SidebarContainer,
  Content,
  MidContent,
  TopContent,
  Input,
} from "./styles";
import { FileDto } from "../../models/file";
import { WorkspaceDto } from "../../models/workspace";

const Home: React.FC = () => {
  const [secret, setSecret] = useState<string | undefined>(undefined);
  const [sendingFile, setSendingFile] = useState(false);
  const [reloadFile, setReloadFile] = useState(true);
  const [openAddWorkspace, setOpenAddWorkspace] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<WorkspaceDto | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(undefined);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [files, setFiles] = useState<FileDto[]>([]);
  const [openUserList, setOpenUserList] = useState(false);

  useEffect(() => {
    async function fetchFiles() {
      setLoadingFiles(true);
      const {
        data: { content },
      } = await api.get(`/file/workspace/${selectedWorkspace?.id}/list`);
      setFiles(content);
      setReloadFile(false);
      setLoadingFiles(false);
    }
    if (selectedWorkspace && reloadFile) {
      fetchFiles();
    }
  }, [selectedWorkspace, reloadFile]);

  useEffect(() => {
    function clearInputFile() {
      const input = document.getElementById("uploadInputFile");
      //@ts-ignore
      input.value = "";
      setSelectedFile(undefined);
    }

    function getBase64(file) {
      setSendingFile(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async function () {
        const ciphertext = crypto.AES.encrypt(
          JSON.stringify(reader.result),
          secret
        ).toString();

        await api.post("/file/create", {
          file: ciphertext,
          name: selectedFile.name,
          type: selectedFile.type,
          workspace_id: selectedWorkspace,
        });

        console.log({
          file: reader.result,
          ciphertext,
        });

        setSelectedFile(undefined);
        setSendingFile(false);
        setReloadFile(true);
        messageAnt.success("Arquivo enviado com sucesso");
      };
      reader.onerror = function (error) {
        messageAnt.error(error);
        clearInputFile();
        selectedFile(undefined);
        setSendingFile(false);
      };
    }

    if (selectedFile) {
      if (selectedFile.size > 73935) {
        messageAnt.warning("Arquivo muito grande");
        clearInputFile();
        return;
      }
      if (!secret || !secret.length) {
        messageAnt.warning("Informe a secret");
        clearInputFile();
        return;
      } else {
        getBase64(selectedFile);
      }
    }
  }, [selectedFile, secret, selectedWorkspace]);

  return (
    <Container>
      <SidebarContainer>
        <Sidebar
          setReloadWorkspaceFiles={setReloadFile}
          setSelectedWorkspace={setSelectedWorkspace}
          openAddWorkspace={openAddWorkspace}
          setOpenAddWorkspace={setOpenAddWorkspace}
        />
      </SidebarContainer>

      <Content>
        {selectedWorkspace ? (
          <>
            <TopContent>
              <span>{selectedWorkspace.name}</span>

              <UserList
                shouldOpen={openUserList}
                setShouldOpen={setOpenUserList}
                selectedWorkspace={selectedWorkspace}
              />
            </TopContent>

            <MidContent>
              <div className="upload_file">
                <input
                  id="uploadInputFile"
                  type="file"
                  //@ts-ignore
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />

                <Input
                  value={secret}
                  onChange={({ target: { value } }) => setSecret(value)}
                  placeholder="Digite a secret"
                  type="password"
                />
              </div>

              <div className="list_file">
                {loadingFiles ? (
                  <div className="centralizer">
                    <Spin />
                  </div>
                ) : (
                  <>
                    {files.length !== 0 ? (
                      <>
                        {" "}
                        {files.map((file) => (
                          <File
                            key={file.id}
                            file={file}
                            secret={secret}
                            setReloadWorkspaceFiles={setReloadFile}
                          />
                        ))}
                      </>
                    ) : (
                      <div className="centralizer">
                        <Empty description="Nenhum arquivo para ser listado" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </MidContent>
          </>
        ) : (
          <div className="centralizer">
            <Empty description="Nenhum repositório selecionado" />
          </div>
        )}
      </Content>
    </Container>
  );
};

export default withRouter(Home);
