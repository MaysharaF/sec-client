import React, { Dispatch, SetStateAction } from "react";
import crypto from "crypto-js";
import axios from "axios";

import api from "../../services/api";

import { FileDto } from "../../models/file";

import { message as messageAnt } from "antd";
import { Container } from "./styles";

interface IProps {
  file: FileDto;
  secret: string | undefined;
  setReloadWorkspaceFiles: Dispatch<SetStateAction<boolean>>;
}

const File: React.FC<IProps> = ({ file, setReloadWorkspaceFiles, secret }) => {
  const onDelete = async () => {
    try {
      if (!secret || !secret.length) {
        messageAnt.warning("Informe a secret");
        return;
      }

      await api.delete(`/file/delete/${file.id}`);
      setReloadWorkspaceFiles(true);
    } catch {
      messageAnt.warning("Secret inválida");
    }
  };

  const onDownload = async () => {
    try {
      if (!secret || !secret.length) {
        messageAnt.warning("Informe a secret");
        return;
      }
      const bytes = crypto.AES.decrypt(file.file, secret);
      const base64File = JSON.parse(bytes.toString(crypto.enc.Utf8));

      const { data: blob } = await axios({
        method: "GET",
        responseType: "blob",
        url: base64File,
      });

      const blog_url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = blog_url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      messageAnt.warning("Secret inválida");
    }
  };

  return (
    <Container>
      <h4>{file.name}</h4>
      <p onClick={onDelete}>Delete</p>
      <p onClick={onDownload}>Download</p>
    </Container>
  );
};

export default File;
