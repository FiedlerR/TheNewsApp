# The-News-App
Simple news app based on cordova and jquery. Uses webpack to bundle javascript modules.
All news are provided by NewsAPI.org(https://newsapi.org)

## Project setup
Install all dependencies with npm. https://nodejs.org
```
npm install
```

Add and install cordova plugins and platforms from package.json. https://cordova.apache.org
```
cordova prepare
```

Set your NewsAPI.org API Key in:
```
TheNewsApp\www\js\src\modules\newsFeedModule.js
```

Create javascript bundle with webpack. https://webpack.js.org
```
npm run build or npm run develop 
```

Start the app in browser or android emulator
```
cordova run browser or cordova run android
```

