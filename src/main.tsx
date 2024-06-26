import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './fonts/Roboto/Roboto-Regular.ttf'
import './index.less'
import { ConfigProvider } from 'antd'

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
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
