# Handtrack Movie Browser

This is a web application that allows users to find movies like any generic movie browsing websites, but in addition it supports some basic navigation through the website through detected hand gestures using the [Handtrack libarary](https://github.com/victordibia/handtrack.js/)
 
## Getting Started

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2. You will need to install Angular through npm, you will do this by installing [Angular Command Line Interface (CLI)](https://angular.io/cli) globally with:

`npm install -g @angular/cli` 

run 'ng serve --open' and the program should open on your local browser `http://localhost:4200/

This web app needs the browser to have access to your webcam in order to detect hand gestures, so when first running the web app make sure to click allow access to camera

The currently supported hand gestures and their corresponding function is as follows:
one hand open = open menu
one hand close = close menu
one hand pointing = navigate down the menu
two hands open = go to page currently selected in menu
two hands closed = scroll up
two hands pointing = scroll down
one hand open, one hand pointing = next page
one hand closed, one hand pointing = prev page

