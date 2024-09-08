---@param coords table
---@param model string
---@param anim table
local createPed = function(coords, model, anim)
    lib.requestModel(model, 5)
    local ped = CreatePed(4, GetHashKey(model), coords.x, coords.y, coords.z, coords.w, false, true)
    if DoesEntityExist(ped) then
        SetEntityHeading(ped, coords.w)
        FreezeEntityPosition(ped, true)
        SetEntityInvincible(ped, true)
        SetBlockingOfNonTemporaryEvents(ped, true)
        if anim.scenario then
            TaskStartScenarioInPlace(ped, anim.scenario, 0, true)
        elseif anim.dict and anim.clip then
            lib.requestAnimDict(anim.dict, 5)
            TaskPlayAnim(ped, anim.dict, anim.clip, 8.0, 0.0, -1, 1, 0.0, 0, 0, 0)
        end
        return ped
    else
        print("Failed to create ped: " .. model)
        return nil
    end
end
exports("createPed", createPed)