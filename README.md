# React Forum Base

This is a final project for [Full Stack Open](https://fullstackopen.com/) - a web development course of the University of Helsinki. The application is running over at https://react-forum-base.herokuapp.com.

## Basics

The project is a full stack forum application. It has all of the features one would expect from a forum: boards, threads, posts, search functionality, user profiles and so forth. 

The forum is divided into boards, threads and posts. Posts can include text and pictures. Threads and posts can be edited, deleted, replied to and so forth. Accounts can be created, edited, followed and deleted as well. Admins and moderators have special privileges for forum management that other users lack. The forum has a simple spam prevention and word filter functionality. User passwords are encrypted and data sent into the backend is parsed. 

The project has a React frontend and a Node backend. Almost everything is made with TypeScript. Most important used packages include: Redux, React Router and Axios for the frontend, Express, Mongoose, Bcrypt, Jsonwebtoken for the backend and Cypress and Jest for testing. Forum and user data is stored into a mongoDB database. While post and profile pictures are stored with Amazon S3.

## Testing

The project has been tested both manually and automatically. Cypress based end to end tests test most of the core functionality while other features have been manually tested. Backend routing and database editing have been tested with Jest based unit tests as well as manual testing.

## Usage

First clone the repository

`git clone git@github.com:Keskimaki/react-custom-forum-base.git` 

Install both frontend and backend in their own folders

`cd frontend && npm install`

`cd backend && npm install`

Launch frontend

`cd frontend && npm start`

To use the backend you'll need to create a mongoDB cluster for forum data as well as publicly readable Amazon S3 buckets for post and profile pictures. Add the needed variables to backend/.env file. Change frontend urls in frontend/src/config.ts to point to your S3 buckets.

Run the backend in development mode

`cd backend && npm run dev`

Run backend tests

`cd backend && npm test`

Run Cypress tests in the root folder after setting up backend and frontend

`npm install`

`npm run test:server`

`npm run test:e2e`

[työaikakirjanpito](https://github.com/Keskimaki/react-custom-forum-base/blob/master/tuntikirjanpito.md)
