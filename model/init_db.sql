
DROP TABLE IF EXISTS reflection;
CREATE TABLE reflection (
 id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 refDate DATE,
 question1 VARCHAR(5000),
 question2 VARCHAR(5000),
 question3 VARCHAR(5000),
 question4 VARCHAR(5000),
 question5 VARCHAR(5000),
 question6 VARCHAR(100)

);
INSERT INTO reflection (refDate, question1, question2, question3, question4, question5, question6) 
 VALUES ('2022-09-02', 'Found the concept of databases difficult', 'Read the extra resources and now feel a little more confident',' Getting the syntax right
', 'How cats age','Saw a funny meme on programming', 'Neutral'), ('22-09-09','No major problems', 'My knowledge on databases is improving ', 'Asking for help when I need it', 'Creating websites/apps', 'Made a really yummy cake', 'Amazing',), ('22-09-16', 'Had laptop issues, had a hard time understanding the new topic', 'Managed my disappointment well', 'Accepting bad days happen, we can’t control everything', 'Learnt how to implement animation using CSS', 'The person at the laptop repair show was really kind', 'Could have been better');

 
 





 



