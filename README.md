# TodoForU
A Todo list application.  Tech Stack: jQuerey, AJAX, MongoDB,Monk, Node/Express, Pug template engine,SASS, Bootstrap and Underscore.  Features a fully functioning database, with adding deleting and updating of data via ajax calls to the database.  Also features Bootstrap navbars and modals to navigate and change data.

To install and run on your computer clone down the repo.  After you have cloned it on to your machine you will need to run the database and also start node.  First install mongodb, you will need ruby as well for this if you dont already have it.  Dont forget to install it as a global.

Next open a terminal do mongod --dbpath homedirectory/....../TodoForU/data.  Home directory is just whatever your top level directory is.  Once that is running and working, open another terminal, for this one we are just going to run mongo, and once it starts type: use TodoForU.

Now leave those 2 terminals running and open up a third terminal, in this terminal you will navigate to the TodoForU folder and do npm install to get all of the dependencies.  Follow that with npm start and it should run the server. Now go to localhost:3000 and you should see a fully functioning to do list!
