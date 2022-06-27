import React, { Dispatch, SetStateAction, useState } from "react";

import api from "../../services/api";

import {
  Container,
  Modal,
  Content,
  Form,
  FormItem,
  Input,
  Header,
  Col,
  Row,
  AddIcon,
} from "./styles";

import { message as messageAnt } from "antd";

interface IProps {
  shouldOpen: boolean;
  setShouldOpen: Dispatch<SetStateAction<boolean>>;
  setReloadWorkspaceList: Dispatch<SetStateAction<boolean>>;
}

const CreateWorkspace: React.FC<IProps> = ({
  shouldOpen,
  setShouldOpen,
  setReloadWorkspaceList,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onCreate = async () => {
    try {
      setLoading(true);
      const payload = form.getFieldsValue();
      await api.post("/workspace/create", payload);
      messageAnt.success("Workspace criado com sucesso");
      setReloadWorkspaceList(true);
      setShouldOpen(false);
    } catch (error: any) {
      messageAnt.error(
        error.response?.data?.message || "Falha ao criar workspace"
      );
    } finally {
      setLoading(false);
    }
  };

  const onClose = async () => {
    setShouldOpen(false);
  };

  return (
    <>
      <Container>
        Workspaces <AddIcon onClick={() => setShouldOpen(true)} />
      </Container>
      <Modal
        onOk={onCreate}
        onCancel={onClose}
        visible={shouldOpen}
        confirmLoading={loading}
        destroyOnClose
      >
        <Content>
          <Header>
            <h1>Cadastro Workspace</h1>
          </Header>
          <Form layout="vertical" onFinish={onCreate} form={form}>
            <Row>
              <Col sm={24} xs={24}>
                <FormItem
                  label="Nome"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Preencha o nome do workspace.",
                    },
                  ]}
                >
                  <Input
                    name="name"
                    placeholder="Digite o nome do workspace."
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Content>
      </Modal>
    </>
  );
};

export default CreateWorkspace;
