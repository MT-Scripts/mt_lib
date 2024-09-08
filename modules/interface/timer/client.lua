---@type currentTimerOnFinish function
local currentTimerOnFinish = nil

---@param label string
---@param time number
---@param position string
---@param onFinish function
local showTimer = function(label, time, position, onFinish)
    currentTimerOnFinish = onFinish
    SendNUIMessage({
        action = 'timer',
        data = {
            label = label,
            time = time,
            position = position,
        }
    })
    SendNUIMessage({
        action = 'setVisibleTimer',
        data = true
    })
end
exports("showTimer", showTimer)

local hideTimer = function()
    SendNUIMessage({
        action = 'setVisibleTimer',
        data = false
    })
    currentTimerOnFinish = nil
end
exports("hideTimer", hideTimer)

RegisterNuiCallback('finishTimer', function(data, cb)
    if currentTimerOnFinish then
        currentTimerOnFinish()
        hideTimer()
    end
    cb(true)
end)