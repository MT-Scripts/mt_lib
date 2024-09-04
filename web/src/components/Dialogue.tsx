import React, { useState, useRef } from "react"
import { DEFAULT_THEME, Paper, Text, Divider, Stack, Button } from '@mantine/core'
import { fetchNui } from "../utils/fetchNui"
import { useNuiEvent } from "../hooks/useNuiEvent"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const Dialogue: React.FC = () => {
    const theme = DEFAULT_THEME
    const [options, setOptions] = useState([])
    const [label, setLabel] = useState('')
    const [speech, setSpeech] = useState('')
    
    useNuiEvent<any>('dialogue', (data) => {
        setOptions(data.options)
        setLabel(data.label)
        setSpeech(data.speech)
    })

    const getIconByName = (iconName: string) => {
        const formattedName = `fa${iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-./g, (m) => m[1].toUpperCase())}`
        return Icons[formattedName as keyof typeof Icons] || Icons.faQuestionCircle
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                margin: -8, 
                position: 'fixed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                background: `linear-gradient(180deg, rgba(255, 255, 255, 0) 75%, rgba(0, 0, 0, 0.80) 100%)`
            }}
        >
            <Stack miw={500} maw={1000} m={50} spacing={5}>
                <Text size="xl" fw={700} color="white">{label}</Text>
                <Paper withBorder p={5} pl={10}>
                    <Text color="white" size="lg" fw={500}>{speech}</Text>
                </Paper>
                <Divider />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 10
                    }}
                >
                    {options.length > 0 && options.map(({ label, icon, id, close }) => (
                        <Button
                            color="gray"
                            bg={theme.colors.dark[7]}
                            leftIcon={<FontAwesomeIcon icon={getIconByName(icon) as IconProp} />}
                            style={{
                                border: `1px solid ${theme.colors.dark[4]}`
                            }}
                            onClick={() => fetchNui('executeAction', { id, options, close })}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </Stack>
        </div>
    )
}

export default Dialogue