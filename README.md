# myFlix React app

## https://cfmovieapp.netlify.app/

## Project Description

Using React, build the client-side for an app called myFlix based on its existing server-side code (REST API and database).

## API used

https://github.com/l-linn/a2-movie-api.git

## App Views & Features

-   Main view

    -   Returns ALL movies to the user (each movie item with an image, title, and description)
    -   Filtering the list of movies with a “search” feature
    -   Ability to select a movie for more details
    -   Ability to log out
    -   Ability to navigate to Profile view

-   Single Movie view
    -   Returns data (description, genre, director, image) about a single movie to the user
    -   Allows users to add a movie to their list of favorites
-   Login view
    -   Allows users to log in with a username and password
-   Signup view
    -   Allows new users to register (username, password, email, date of birth)
-   Profile view
    -   Displays user registration details
    -   Allows users to update their info (username, password, email, date of birth)
    -   Displays favorite movies
    -   Allows users to remove a movie from their list of favorites
    -   Allows existing users to deregister

## Dependencies

-   React
-   ReactDOM
-   React-Router-Dom
-   Bootstrap
-   React-Bootstrap
-   React-Bootstrap-Icons
-   Prop-Types
-   Moment
-   Parcel/Transformer-Sass (v.2.11.0)
-   Parcel (v.2.111.0)
-   Process

## To Set up this App

Clone this repository
Navigate to the movie_api-client folder and run npm install
Run parcel src/index.html
