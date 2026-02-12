import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/activities.css'
import './styles/activityGrid.css'
import './styles/admin.css'
import App from './App.tsx'
import { UserProvider } from './context/UserContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider> 
      <App />
    </UserProvider>
  </StrictMode>,
)
