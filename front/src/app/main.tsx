import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.less'
import { ThemeProvider } from 'styled-components'
import { theme } from '@shared/lib'
import { ToastContainer } from 'react-toastify'
import { ConfigProvider } from 'antd'

const container = document.getElementById('root')!

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#E05A29',
            fontFamily: 'RobotoRegular',
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <ToastContainer draggable stacked />
          <App />
        </ThemeProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
