fx_version 'cerulean'
game 'gta5'
author 'Marttins'
description 'Library with some UIs and functions'
lua54 'yes'

shared_scripts {
    '@ox_lib/init.lua',
    'config.lua',
}

client_scripts {
    'client/*'
}

server_scripts {
    'server/*'
}

ui_page 'web/build/index.html'

files {
	'web/build/index.html',
	'web/build/**/*',
    'web/assets/**/*',
}