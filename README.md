
# connectED

Hello! Welcome to Kejal's connectED app. 

As part of the (CodeOp) Feature Extension project phase, I (Jess) have forked and cloned her app to work on a chat feature and an authentication feature. The notes route and front-end was also rejigged, so that each individual student has their own individual view of notes.

From Kejal's two original tables of reflection and note, the users table was created to keep track of users (students vs staff) and user information. The second table added is the messages table, to store chat messages from the chat function. 

Databases and Tables:
- The name of the database: student_reflection
- This app now has four tables: users, messages, reflection and notes. 
    - users: contains the username, password, isStaff (boolean) and email
    - messages: contains senderId, groupId, text and dateTime
    - reflection: contains the refDate,  studentid and 6 questions (questions are seen in the ReflectionView)
    - notes: contains the noteDate, title and note (added through the form in NoteView)

Please note that the notes table now also has a foreign key (user_id) so as to map each individual student/user to their own individual notes view.

## Install the app
There are four branches of the code(use `git branch` to see the branches):

- copy: second branch  
- main: first branch created
- stage 1: most upto date app
- stage 2: this is a copy of branch stage 1 (`git checkout stage 1`)

1. Open two terminals, one each for server and client. 
-Type `npm install` in each terminal to install dependencies( cd into client and npm install the client)

2. Create a DB: Log in to MySQL CLI (with `mysql -u root -p` and enter your password when prompted) and type: `create database student_reflection;` to create the DB. You can then exit the CLI with `quit`.

3. Create your `.env` file that contains connect info so that Express can communicate with MySQL. 
- your .env should look like:
    - `DB_HOST=localhost
    - DB_NAME=student_reflection
    - DB_USER=root
    - DB_PASS=root`

4. In the server folder terminal, type `npm run migrate`. This will create the DB table for the dapp and add a couple of default records. 


## Run the Demo

1. In the server terminal, type `npm start` to start the server.
1. In the client terminal, type `npm start` to start the client.
1. Point your browser at `http://localhost:3000`.

~Side note: feel free to create new branches and you can ignore anything that is commented out~



 _This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
