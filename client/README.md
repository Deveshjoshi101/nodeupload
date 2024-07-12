# Upload files using node and react

You need `node js` and `MySQL server` installed in your system or container or cloud services.

### Steps to run

Step 1: `npm i` in root folder.  
Step 2: `cd api`.  
Step 3: `npm i` in root/api folder.  
Step 4: `cd ..` to come back to root folder.  
Step 5: Run the MySQL server and create a database with name `nodetest`.  
Step 6: Then in root folder run the command `npm run dev`.  
Step 7: Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  
Step 8: Enjoy, it`s working.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Database

### Create Database in MySQL

CREATE DATABASE `nodetest` 

/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
