cd ./01_basic_auth_server; 
npm install;

cd ..;

cd ./02_basic_security_express/01_end_code; 
npm install;

cd ../..;

node ./01_basic_auth_server/index.js & node ./02_basic_security_express/01_end_code/server.js;