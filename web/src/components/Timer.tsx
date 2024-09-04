import React, { useState, useEffect } from "react"
import { DEFAULT_THEME, Paper, Text, Progress } from '@mantine/core'
import { fetchNui } from "../utils/fetchNui"
import { useNuiEvent } from "../hooks/useNuiEvent"

const Timer: React.FC = () => {
    const theme = DEFAULT_THEME
    const [time, setTime] = useState(0)
    const [maxTime, setMaxTime] = useState(60)
    const [position, setPosition] = useState('')
    const [label, setLabel] = useState('')

    useNuiEvent<any>('timer', (data) => {
        setLabel(data.label)
        setTime(data.time)
        setMaxTime(data.time)
        setPosition(data.position)
    })

    useEffect(() => {
        if (time > 0) {
            const timerInterval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerInterval)
                        fetchNui('finishTimer')
                        return 0
                    }
                    return prevTime - 1
                })
            }, 1000)

            return () => clearInterval(timerInterval)
        }
    }, [time])

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
            <Paper
                withBorder
                radius="sm"
                p={10}
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
                <Text fw={700}>{label}: {time}s</Text>
                <Progress w="100%" value={(time / maxTime) * 100} />
            </Paper>
        </div>
    )
}

export default Timer
