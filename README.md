# This is the repository for the COMP 324/424 project

## Title of the App: Buddy Up

## Description of the project.

We set out to build a project that will connect Loyola students with apartments close to campus, and for students looking for roommates from students that attend Loyola.

## Project Structure

├── Index.html - main HTML file acting as homepage and contain links to all other HTMLS
├── Header.html - contains header elemnts which are loaded on each page. 
├── Listing.html - Contains html elements for all the listings available, filter adn sorting
├── Listing-details.html - Contains html elemnts for individual listings
├── Community.html - Contains elemnts for community page, posting viewing etc
├── Message.html - Contains elemnts to view and send messages
├── Script Folder - contains the javascript files used in project
│   ├── Script.js - The script file used to handle main logic mostly for index.html
│   ├── Communit.js- Logic for community page- post , search  filter post and dynamically load them 
│   ├── Header.js- Logic for dynamically loading header and dynamically load them used in multiple pages.
│   ├── listing-details.js- Logic for lisitng detail page 
│   ├── listing-script.js- Logic for lsiting - filter sort and view each listing and dynamically load them 
│   ├── message.js- Logic for message page - send message , search them and dynamically load them 
│   ├── popuphandler.js- logic for footer pop up handling used in multiple pages
├── Style Folder - contains the CSS files used in the project
│   ├── global.css- Contains style for header, footer adn responsive screen and some more common elemnts
│   ├── style.css- The css file containing syles for index page
│   ├── listing-details.css- The css file containing syles for listing details page
│   ├── listing.css- The css file containing syles for listing
│   ├── message.css- The css file containing syles for message page
│   ├── community.css- The css file containing syles for community page
├── Docs Folder - Contains json files used in community and message page to fetch information
├── Media - Contains images, icons and logos used in the project
├── StyleGuide.md - Contains common style guide followed throught the project
├── architechture.md - decision document containg details about decisions made during development
├── Readme.md - Project Documentation

All the folders contains readme.md

## Development Process

Agile development process is followed. 
The tasks were clearly divided.
After every few weeks we connected and reviewd the tasks completed.
Modifications and changes were discussed and implemented before next connect.
Regular git commits were performed with clear commit messages
We have kep the project structure as modular as possible
Implemented the design priciples like Gestalt’s Principles and mental model
We have maintained uniformity in terms of colors, fonts and other styling
Created a stleguide and adhered to that.
Kepts structure seprate in order to avoid conflicts
We have maintained proper documentation of project structure, design and features
Version is maintained via git
