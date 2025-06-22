# Mini Time Tracker App

This app is a mini time tracker done for a technical assessment. The app itself only has a frontend
using React + Typescript + Vite.

If not running deployed version of app, you can follow these steps to get it running:

- Open project in IDE of choice
- Open terminal and type the following if not already CDd to frontend folder.
- cd frontend
- npm install

The package manager should now install relevant packages. Once packages are installed type:

- npm run preview

This will first build the project, which will create a build in the dist folder, and then run the preview build for you. Ctrl+click on the link shown in terminal.

## What I would Improve with More Time

- Not use React Context, and would add a backend with MongoDB or PostgreSQL to handle task storage. Note I did not do that from the start since I figured Context would be the fastest solution to use within 2-3 hour limit.
- Given the backend, I would host the app on AWS since I already have apps hosted on there.
- Utilise jest for debugging
