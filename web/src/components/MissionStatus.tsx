import React, { useState } from "react"
import { DEFAULT_THEME, Paper, Text, Divider, TypographyStylesProvider } from '@mantine/core'
import { useNuiEvent } from "../hooks/useNuiEvent"

const MissionStatus: React.FC = () => {
    const theme = DEFAULT_THEME
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    
    useNuiEvent<any>('missionStatus', (data) => {
        setTitle(data.title)
        setText(data.text)
    })

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                margin: -8, 
                position: 'fixed',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <div
                style={{
                    maxWidth: 400,
                    position: 'absolute',
                    left: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: 5
                }}
            >
                <Text size="xl" color="white" fw={700}>{title}</Text>
                <Divider
                    color="dark.0"
                    size="lg"
                    style={{
                        borderRadius: theme.radius.md
                    }}
                />
                <Paper p={10} withBorder radius="sm">
                    <TypographyStylesProvider
                        style={{
                            textAlign: 'left'
                        }}
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    </TypographyStylesProvider>
                </Paper>
            </div>
        </div>
    )
}

export default MissionStatus