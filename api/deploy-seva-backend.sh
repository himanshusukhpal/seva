~/.nvm/versions/node/v18.16.0/bin/node -v;
if pgrep node > /dev/null
then
  echo "deployed";
else
  cd ~/public_html/seva/seva-backend;
  ~/.nvm/versions/node/v18.16.0/bin/node ~/.nvm/versions/node/v18.16.0/bin/npm install > seva-deploy.log 2> seva-deploy-error.log;
  ~/.nvm/versions/node/v18.16.0/bin/node ~/.nvm/versions/node/v18.16.0/bin/npm run build > seva-deploy.log 2> seva-deploy-error.log;
  exit;
  echo "started";
fi;