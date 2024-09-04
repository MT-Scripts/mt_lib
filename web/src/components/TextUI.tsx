import React, { useState } from "react"
import { DEFAULT_THEME, Paper, Text, Kbd } from '@mantine/core'
import { useNuiEvent } from "../hooks/useNuiEvent"

const TextUI: React.FC = () => {
    const theme = DEFAULT_THEME
    const [key, setKey] = useState('')
    const [label, setLabel] = useState('')
    const [position, setPosition] = useState('')
    
    useNuiEvent<any>('textUI', (data) => {
        setKey(data.key)
        setLabel(data.label)
        setPosition(data.position)
    })

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                margin: -8, 
                position: 'fixed',
                display: 'flex',
                justifyContent: ((position == 'bottom' || position == 'top') ? 'center' : ''),
                alignItems: ((position == 'right' || position == 'left') ? 'center' : '')
            }}
        >
            <div
                style={{
                    maxWidth: 400,
                    position: 'absolute',
                    bottom: (position == 'bottom' ? 20 : 'auto'),
                    top: (position == 'top' ? 20 : 'auto'),
                    right: (position == 'right' ? 20 : 'auto'),
                    left: (position == 'left' ? 20 : 'auto'),
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: 5
                }}
            >
                <Paper
                    withBorder
                    radius="sm"
                    p={5}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 5
                    }}
                >
                    <Kbd>{key}</Kbd>
                    <Text fw={700}>{label}</Text>
                </Paper>
            </div>
        </div>
    )
}

export default TextUI