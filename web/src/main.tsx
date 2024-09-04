import React from 'react'
import ReactDOM from 'react-dom/client'
import { VisibilityProvider } from './providers/VisibilityProvider'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { DatesProvider } from '@mantine/dates'
import Dialogue from './components/Dialogue'
import MissionStatus from './components/MissionStatus'
import Timer from './components/Timer'
import TextUI from './components/TextUI'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme:'dark' }}>
      <ModalsProvider>
        <VisibilityProvider componentName="Dialogue">
          <Dialogue />
        </VisibilityProvider>
        <VisibilityProvider componentName="MissionStatus">
          <MissionStatus />
        </VisibilityProvider>
        <VisibilityProvider componentName="Timer">
          <Timer />
        </VisibilityProvider>
        <VisibilityProvider componentName="TextUI">
          <TextUI />
        </VisibilityProvider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
)