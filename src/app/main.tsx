import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
// import '@shared/lib/fonts/Roboto/Roboto-Regular.ttf'
import './index.less'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'styled-components'
import { themeLight } from '@shared/lib/index.ts'
import { GlobalStyle } from '@shared/lib'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#fb7a01",
            fontFamily: "RobotoRegular, sans-serif"
          }
        }}  >
        <ThemeProvider theme={themeLight}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
