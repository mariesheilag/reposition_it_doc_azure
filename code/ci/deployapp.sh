#!/bin/sh
sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo npm install -g pm2
sudo cd $script_dir
sudo pm2 startup upstart
sudo cd dist/
npm install --production
sudo cd ..
sudo su -c "env PATH=$PATH:/usr/bin /home/admin123/npm/lib/node_modules/pm2/bin/pm2 startup ubuntu -u admin123 --hp /home/admin123"
pm2 start ci/ecosystem.config.js -u admin123
sudo pm2 save
