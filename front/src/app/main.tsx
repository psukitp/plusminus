import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.less'
import { ThemeProvider } from 'styled-components'
import { theme } from '@shared/lib'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { ConfigProvider } from 'antd'

const queryClient = new QueryClient()

const container = document.getElementById('root')!

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#E05A29',
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <ToastContainer draggable stacked />
            <App />
          </ThemeProvider>
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
