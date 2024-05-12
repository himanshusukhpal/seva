~/.nvm/versions/node/v18.16.0/bin/node -v;
if pgrep node > /dev/null
then
  echo "running";
else
  cd ~/public_html/seva/seva-backend;
  ~/.nvm/versions/node/v18.16.0/bin/node dist/server.js > seva-backend.log 2> seva-backend-error.log;
  exit;
  echo "started";
fi;