---@param model string
---@param coords table
---@param heading number
---@return prop number
local createProp = function(model, coords, heading)
    lib.requestModel(model, 5)
    local prop = CreateObject(GetHashKey(model), coords.x, coords.y, coords.z, false, false, false)
    if DoesEntityExist(prop) then
        SetEntityHeading(prop, heading)
        FreezeEntityPosition(prop, true)
        return prop
    else
        print("Failed to create prop: " .. model)
        return nil
    end
end
exports("createProp", createProp)