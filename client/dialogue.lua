---@type number | nil
local cam = nil
---@type string | nil
local currentDialogue = nil

---@param ped number
createCam = function(ped)
    local coords = GetEntityCoords(ped, true)
    local x, y, z = coords.x + GetEntityForwardX(ped) * 1.2, coords.y + GetEntityForwardY(ped) * 1.2, coords.z + 0.52
    local camRot = GetEntityRotation(ped, 2)
    cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", x, y, z, camRot.x, camRot.y, camRot.z + 181.0, GetGameplayCamFov(), false, 0)
    SetCamActive(cam, true)
    RenderScriptCams(true, true, 2000, true, true)
end

destroyCamera = function()
    RenderScriptCams(false, true, 2000, true, false)
    DestroyCam(cam, false)
end

---@param data table
showDialogue = function(data)
    if data.ped then
        createCam(data.ped)
    end

    currentDialogue = data

    SetEntityAlpha(cache.ped, 0, true)

    SendNUIMessage({
        action = 'dialogue',
        data = {
            label = data.label,
            speech = data.speech,
            options = data.options,
        }
    })
    SendNUIMessage({
        action = 'setVisibleDialogue',
        data = true
    })
    SetNuiFocus(true, true)
end
exports("showDialogue", showDialogue)

hideDialogue = function()
    SendNUIMessage({
        action = 'setVisibleDialogue',
        data = false
    })
    SetNuiFocus(false, false)
    destroyCamera()
    ResetEntityAlpha(cache.ped)
    currentDialogue = nil
end
exports("hideDialogue", hideDialogue)

RegisterNuiCallback('executeAction', function(data, cb)
    if data.options then
        for ok, ov in pairs(currentDialogue.options) do
            if ov.id == data.id then
                if ov.action then
                    ov.action()
                end
            end
        end
    end

    if data.close then
        SendNUIMessage({
            action = 'setVisibleDialogue',
            data = false
        })
        SetNuiFocus(false, false)
        destroyCamera()
        ResetEntityAlpha(cache.ped)
        currentDialogue = nil
    end
    cb(true)
end)

RegisterNuiCallback('hideFrame', function(data, cb)
    SendNUIMessage({
        action = data.name,
        data = false
    })
    SetNuiFocus(false, false)

    if data.name then
        destroyCamera()
        ResetEntityAlpha(cache.ped)
        currentDialogue = nil
    end
    cb(true)
end)
