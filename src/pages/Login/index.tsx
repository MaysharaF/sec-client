import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { login } from "../../services/auth";
import api from "../../services/api";

import { message as messageAnt } from "antd";

import {
  Container,
  Content,
  Form,
  FormItem,
  Input,
  Button,
  Header,
  Col,
  Row,
} from "./styles";

interface IProps extends RouteComponentProps {}

const Login: React.FC<IProps> = ({ history }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onLogin = async () => {
    try {
      setLoading(true);
      const payload = form.getFieldsValue();
      const {
        data: { access_token },
      } = await api.post("/user/login", payload);
      login(access_token);
      messageAnt.success(`Bem-vindo ${payload.username}`);
      history.push("/home");
    } catch (error: any) {
      messageAnt.error(
        error.response?.data?.message || "Falha ao realizar o login"
      );
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async () => {
    try {
      setLoading(true);
      const payload = form.getFieldsValue();
      await api.post("/user/create", payload);
      const {
        data: { access_token },
      } = await api.post("/user/login", payload);
      login(access_token);
      messageAnt.success(`Bem-vindo ${payload.username}`);
      history.push("/home");
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
      {step === 1 ? (
        <Content>
          <Header>
            <h1>Login</h1>
          </Header>
          <Form layout="vertical" onFinish={onLogin} form={form}>
            <Row>
              <Col sm={24} xs={24}>
                <FormItem
                  label="Usuário"
                  name="username"
                  rules={[{ required: true, message: "Preencha seu usuário." }]}
                >
                  <Input name="username" placeholder="Digite seu usuário" />
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col sm={24} xs={24}>
                <FormItem
                  label="Senha"
                  name="password"
                  rules={[{ required: true, message: "Preencha sua senha." }]}
                >
                  <Input
                    name="password"
                    placeholder="Digite sua senha"
                    type="password"
                  />
                </FormItem>
              </Col>
            </Row>

            <Button htmlType="submit" type="primary" loading={loading}>
              Entrar
            </Button>

            <Button type="primary" loading={loading} onClick={() => setStep(2)}>
              Cadastre-se
            </Button>
          </Form>
        </Content>
      ) : (
        <Content>
          <Header>
            <h1>Cadastre-se</h1>
          </Header>
          <Form layout="vertical" onFinish={onRegister} form={form}>
            <Row>
              <Col sm={24} xs={24}>
                <FormItem
                  label="Usuário"
                  name="username"
                  rules={[{ required: true, message: "Preencha seu usuário." }]}
                >
                  <Input name="username" placeholder="Digite seu usuário" />
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col sm={24} xs={24}>
                <FormItem
                  label="Senha"
                  name="password"
                  rules={[{ required: true, message: "Preencha sua senha." }]}
                >
                  <Input
                    name="password"
                    placeholder="Digite sua senha"
                    type="password"
                  />
                </FormItem>
              </Col>
            </Row>

            <Button htmlType="submit" type="primary" loading={loading}>
              Cadastrar
            </Button>
            <Button type="primary" loading={loading} onClick={() => setStep(1)}>
              Voltar
            </Button>
          </Form>
        </Content>
      )}
    </Container>
  );
};

export default withRouter(Login);
