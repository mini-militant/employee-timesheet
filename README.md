This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

The app uses a mock API from `mocky.io`.
There are two users and valid dates available from 1st Sept 2020 to 10th Sept 2020. For the rest of days it shows no record found.

Have also used `react-calendar` to give a calendar to choose a date from.

Application flow:
-- The dashboard is opened with a table of users that are mapped from the mock API. (mocky.io)
-- When the user clicks on any of the record, the corresponding start-time and end-time is shown and the date can be selected from the calendar and the login details of the user is visible.