---@param label string
---@param key string
---@param position string
showTextUI = function(label, key, position)
    SendNUIMessage({
        action = 'textUI',
        data = {
            label = label,
            key = key,
            position = position,
        }
    })
    SendNUIMessage({
        action = 'setVisibleTextUI',
        data = true
    })
end
exports("showTextUI", showTextUI)

hideTextUI = function()
    SendNUIMessage({
        action = 'setVisibleTextUI',
        data = false
    })
end
exports("hideTextUI", hideTextUI)