---@param title string
---@param text string
local showMissionStatus = function(title, text)
    SendNUIMessage({
        action = 'missionStatus',
        data = {
            title = title,
            text = text,
        }
    })
    SendNUIMessage({
        action = 'setVisibleMissionStatus',
        data = true
    })
end
exports("showMissionStatus", showMissionStatus)

local hideMissionStatus = function()
    SendNUIMessage({
        action = 'setVisibleMissionStatus',
        data = false
    })
end
exports("hideMissionStatus", hideMissionStatus)