import decode from "jwt-decode";
import jwt from "jsonwebtoken";

export const TOKEN_KEY = "access-token";
export const TOKEN_SECRET_KEY = process.env.REACT_APP_ACCESS_TOKEN_SECRET || "";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const verifyToken = (): boolean => {
  const accessToken = getToken();
  if (accessToken === null) {
    return false;
  }
  try {
    jwt.verify(accessToken, TOKEN_SECRET_KEY);
    return true;
  } catch (err) {
    return false;
  }
};

export const decodeToken = (): any => {
  const accessToken = getToken();
  if (accessToken === null) {
    return null;
  }

  const user = decode<any>(accessToken);
  return user;
};

export const isAuthenticated = async () => {
  const token = getToken();
  if (token === null) {
    return false;
  }
  const isValid = await verifyToken();
  if (!isValid) {
    return false;
  }
  return true;
};

export const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
