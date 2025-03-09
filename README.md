# version-finder-frontend
frontend version to visualize results from version-finder-api https://github.com/yeticek/version-finder-api

## Available Scripts
* on windows i prefer to use yarn instead of npm
* usage simply build docker image and run it
* local usage expose port 9998

### Windows
In the project directory, you can run:
```
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm install
npm run build
$env:PORT=9998; npm start
```