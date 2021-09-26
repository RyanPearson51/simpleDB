CREATE TABLE appusers (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	fullname CHAR(25),
	username CHAR(25),
	email char(50)
	
);

INSERT INTO appusers 
	(id, fullname, username, email) VALUES
		(001, 'Ryan Pearson', 'RyanPearson51', 'Ryanpearson@gmail.com'),
