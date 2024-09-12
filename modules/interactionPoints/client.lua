local points = {}

---@param id string
---@param coords table
---@param distance number
---@param label string
---@param key number
---@param keyLabel string
---@param onClick function
---@param canInteract function | boolean
local createInteractionPoint = function(id, coords, distance, label, key, keyLabel, onClick, canInteract)
    points[id] = lib.points.new({
        coords = coords,
        distance = distance,
        onEnter = function()
            if not canInteract then return end
            exports.mt_lib:showTextUI(label, keyLabel, 'bottom')
        end,
        onExit = function()
            exports.mt_lib:hideTextUI()
        end,
        nearby = function()
            if canInteract and IsControlJustPressed(0, key) then
                onClick()
            end
        end
    })
end
exports("createInteractionPoint", createInteractionPoint)

---@param id string
local removeInteractionPoint = function(id)
    if not points[id] then return end
    points[id]:remove()
    exports.mt_lib:hideTextUI()
end
exports("removeInteractionPoint", removeInteractionPoint)

---@return table | nil
local getCreatedPoints = function()
    return points
end
exports("getCreatedPoints", getCreatedPoints)