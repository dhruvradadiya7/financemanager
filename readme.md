#### Available Scripts
- ```npm run dev```  : Use while developing app (provided hot-reloading).
- ```npm run build```  : Use to build app while production.
- ```npm run start```  : Use to start app to render form server side (without hot-reloading).
- ```npm run serve```  : Use to start app with pm2 (for production purpose only).


#### Things are included into app
- Added eslint support
- Module resolver added to resolve individual directory
- Global scss variables and mixin added with example
- Scss loader added with styles in JSX.
- Env variable added from ```next.config.js```
- SVG and Images support
- Versioning of build files


#### Needs to check
- Add dynamic loading for code splitting
- Add redux setup with react app


#### Notes
- ```/icons``` will contain only svg icons.
- ```/public/images``` will contain static images like png/jpg/jpeg.
- On production serving port can be change from ```start``` script of ```package.json``` ( 8080 default ).
- PM2 app name can be change from ```serve``` script of ```package.json``` .
- Environment variables can be defined in ```.env``` (Not available - duplicate from .env.option) file, 
    - Development variables will be defined with ```NEXT_DEV_``` like ```NEXT_DEV_APP_NAME = next-boilerplate``` 
    - and Production variable will be defined with ```NEXT_PROD_``` like ```NEXT_PROD_APP_NAME = next-prod-boilerplate``` 
    - Use it as ```process.env.APP_NAME```