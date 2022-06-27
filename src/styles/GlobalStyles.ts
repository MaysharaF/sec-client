import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  :root {
    --white: #FFFFFF;
    --purple-50: #f2f2fb;
    --pink-100: #aa7596;
    --gray-50: #e5e5e5;
    --gray-800: #2e2c32;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }

  html, body, #root {
    max-height: 100vh;
    max-width: 100vw;

    width: 100%;
    height: 100%;
    font: 400 1rem "Roboto", sans-serif;
    -webkit-text-size-adjust: none;
    -webkit-font-smoothing: antialiased;

    .ant-breadcrumb-link {
      font-weight: 400;
      font-size: 1rem;
      color: var(--black-opacity-2);
      cursor: pointer;
    }

    .ant-breadcrumb-separator {
      color: var(--orange-100);
      font-weight: bolder;
    }
  }

  *, button, input{
    border: 0;
    background: none;
    outline: none;
  }

  html {
    color: black;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  
`;
