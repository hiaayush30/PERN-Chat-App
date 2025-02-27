import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SocketContextProvider } from './context/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
)
