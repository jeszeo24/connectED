
DROP TABLE IF EXISTS reflection;
DROP TABLE IF EXISTS notes;

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

 CREATE TABLE notes (
 id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 noteDate DATE,
 title MEDIUMTEXT,
 note LONGTEXT
 );

--  CREATE TABLE student (
--      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--      firstname VARCHAR (100),
--      lastname VARCHAR (100),
--      studentid TINYINT
--  )

INSERT INTO reflection (refDate, studentid, question1, question2, question3, question4, question5, question6)
VALUES ('2022-09-02', 15, 'Found the concept of databases difficult','Read the extra resources and now feel a little more confident','Getting the syntax right','How cats age','Saw a funny meme on programming','Neutral'), ('22-09-09', 15, 'No major problems','My knowledge on databases is improving','Asking for help when I need it','Creating websites/apps','Made a really yummy cake','Amazing'), ('22-09-16', 14, 'Had laptop issues, had a hard time understanding the new topic','Managed my disappointment well','Accepting bad days happen, we can’t control everything','Learnt how to implement animation using CSS','The person at the laptop repair shop was really kind','Could have been better');

INSERT INTO notes (noteDate, title, note)
VALUES ('2022-09-03', 'Lorem Ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')



 





 




 










 
 





 



