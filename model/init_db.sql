
DROP TABLE IF EXISTS reflection;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

-- FOR USERS.JS
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    isStaff BOOLEAN NOT NULL DEFAULT 0,
    email VARCHAR(200) NOT NULL
);

-- user1 has password pass1 (etc)
INSERT INTO users (username, password, isStaff, email)
VALUES 
    ('user1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 0, 'user1@acme.com'),
    ('user2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6', 1, 'user2@acme.com'),
    ('user3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy', 0, 'user3@acme.com');

CREATE TABLE reflection (
 id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 refDate DATE,
 studentid TINYINT,
 question1 MEDIUMTEXT,
 question2 MEDIUMTEXT,
 question3 MEDIUMTEXT,
 question4 MEDIUMTEXT,
 question5 MEDIUMTEXT,
 question6 VARCHAR(100)
 );

INSERT INTO reflection (refDate, studentid, question1, question2, question3, question4, question5, question6)
VALUES ('2022-09-02', 15, 'Found the concept of databases difficult','Read the extra resources and now feel a little more confident','Getting the syntax right','How cats age','Saw a funny meme on programming','Neutral'), ('22-09-09', 15, 'No major problems','My knowledge on databases is improving','Asking for help when I need it','Creating websites/apps','Made a really yummy cake','Amazing'), ('22-09-16', 14, 'Had laptop issues, had a hard time understanding the new topic','Managed my disappointment well','Accepting bad days happen, we can’t control everything','Learnt how to implement animation using CSS','The person at the laptop repair shop was really kind','Could have been better');

CREATE TABLE notes (
 id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 noteDate DATE,
 title MEDIUMTEXT,
 note LONGTEXT,
 user_id INT NOT NULL,
 FOREIGN KEY (user_id) REFERENCES users(id) on DELETE CASCADE
 );

INSERT INTO notes (noteDate, title, note, user_id)
VALUES ('2022-09-03', 'Lorem Ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1),
('2022-09-03', 'User 3 here', 'Testing User 3', 3);
--  CREATE TABLE student (
--      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--      firstname VARCHAR (100),
--      lastname VARCHAR (100),
--      studentid TINYINT
--  )

-- FOR CHAT.JS
CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  senderId INT NOT NULL,
  groupId INT NOT NULL,
  text VARCHAR(1000) NOT NULL,
  dateTime DATETIME DEFAULT CURRENT_TIMESTAMP
);


 





 




 










 
 





 



