INSTALLATION INSTRUCTIONS

First you should download the source files from google drive or clone the project from the github or download attached source code.

github link - https://github.com/Chasith-Randima/LAYOUTindex_assesment
google drive link - https://drive.google.com/drive/folders/13wCu2uWHjjPUK2gUugKtoyROzGGJagdk?usp=sharing

In order to app to work you need backend and frontend both running at the same
time.first setup the backend.

in order to app to work you need backend and frontend both running at the same time.first setup the backend.

Backend

first you should open your code editor(continuing assuming you are using vs code).
then open the backend folder in vs code or any editor you use.
then open a terminal and make sure you are inside the backend directory in terminal(where index.js is located in the backend).
then run  "npm install" command.it will download all the required packages.
then run "npm run dev"  command.then you will be able to see messages "server running on port 3000" and "DB connection successfull" lines in the terminal.(in this step please make sure you dont have any other app running on port 3000.in case you do you have to change the config file PORT to other port you are using)
for database connection you are connecting to my mongodb database using a temporary user account i created.i will delete it within few weeks.if there are any problems related to database connection you can use your local mongodb server.to use local mongodb server you will have to change DATABASE variable in index.js mongodb connection to DATABASE_LOCAL.then you have to start running mongodb server on locally.(usually this can be done entering "mongod" command in a cmd or terminal.then you have to run "npm run dev"  command in the vs code terminal where you opened the backend)"

Frontend

you should open the front end folder in new vs code inctance or the same vscode.(in this case you have to navigate to correct project directry before running the commands"
then open a terminal and make sure you are in the frontend directory.(or split terminal so you could see both backend and frontend in the same window)
then run "npm install" command.it will download all the required packages.
then run "npm run dev" in the terminal.then you will see messages about process in the terminal.(make sure you started backend before running frontend.because frontend use backend address to connect.i have set it to port 3000.if you run frontend first it will start running in port 3000.in that case you have to manually change frontend .env.local file NEXT_PUBLIC_API_DEVELOPMENT variable  to  whatever port number backend running on your computer)
then you will see compiling message in frontend terminal.you will see the local server frontend is running.
you can ctrl+click to open it in webbrowser.or copy and paste address in the web browser.


if you do all of these successfully you will be redirected to login page of the website.
you can use following pre created account to login to website.

email - admin@gmail.com
password - 1234567890

if you want, you can signup using signup page.

after successfully login you will be redirected to main page.
in there you can see all the locations.by clicking location name you can navigate to single location page.
in single location page you can see details about that location.
also you can see all the devices assigned to that perticular location in the botoom of the page.
by clicking create device button you can create a device for that perticular location.
by clicking remote button on the devices you can remove device from that perticular location.
by clicking update button you can update that perticular device infor.
by clicking delete button you can delete that device from entire database.

going back to main location page by clicking update button you can update that perticular location.
by clicking delete button you can delete that perticular location.

in the side bar you can click create location button and go to create location page and create location.
by clciking create device in sidebar you can go to create device page.in here you can select location from all the locations available on the database.

by clicking logout button in the top right corner you can logout from the website.

If you have any problems related to the project installation and setup please contact me.

phone - 0703363122
email - chasith19@gmail.com











