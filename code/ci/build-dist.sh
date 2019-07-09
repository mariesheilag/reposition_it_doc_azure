rm -rf ./dist
./node_modules/.bin/tsc
./node_modules/@repositionit/ui/node_modules/.bin/next build ui
rm -rf ./dist/ui/.next
cp -R ./ui/.next dist/ui/
cp ./ui/package.json ./dist/ui/package.json
cd ./dist
#npm install --production 
