# Setup

Install `mongodb`.

Rename `env-sample` to `.env` and change it to your liking.


## Procfile
web: npm run start
web: node index.js
web: nodemon --exec babel-node -- src/index.js

https://github.com/heroku/node-js-getting-started
https://devcenter.heroku.com/articles/getting-started-with-nodejs
