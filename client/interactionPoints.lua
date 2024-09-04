---@type points table
local points = {}

---@param id string
---@param coords table
---@param distance number
---@param label string
---@param key number
---@param keyLabel string
---@param onClick function
---@param canInteract boolean
createInteractionPoint = function(id, coords, distance, label, key, keyLabel, onClick, canInteract)
    points[id] = lib.points.new({
        coords = coords,
        distance = distance,
        onEnter = function()
            if not canInteract then return end
            showTextUI(label, keyLabel, 'bottom')
        end,
        onExit = function()
            hideTextUI()
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
removeInteractionPoint = function(id)
    if not points[id] then return end
    points[id]:remove()
    hideTextUI()
end
exports("removeInteractionPoint", removeInteractionPoint)