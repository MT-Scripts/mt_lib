fx_version 'cerulean'
game 'gta5'
author 'Marttins'
description 'Library with some UIs and useful functions'
lua54 'yes'

shared_scripts {
    '@ox_lib/init.lua',
}

client_scripts {
    'modules/**/client.lua'
}

server_scripts {
    'modules/**/server.lua'
}

ui_page 'web/build/index.html'

files {
	'web/build/index.html',
	'web/build/**/*',
    'web/assets/**/*',
}