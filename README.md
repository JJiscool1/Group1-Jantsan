# Group1-Jantsan

<!--How to use, make it work-->
Use XAMPP as a database(Download from
https://www.apachefriends.org/download.html (Windows)
https://www.wampserver.com/en/ (mac))

Download node.js(https://nodejs.org/en/)

Step 1: Download all from above
Step 2: Open XAMPP/WAMP server to Create database
Step 3: Intall npm/Nodemon/ in terminal use code npm install
Step 4: npm start
<!--/How-->

<!--Database-->
<!--Create Database-->

CREATE DATABASE [IF NOT EXISTS] loginnj;

<!--/Create Database-->
<!--Create Tables-->

CREATE TABLE users (
id int NOT NULL AUTO_INCREMENT,
name varchar(255),
email varchar(255),
password varchar(255),
PRIMARY KEY (id)
);

CREATE TABLE userploads (
up_id int NOT NULL AUTO_INCREMENT,
user_id int NOT NULL AUTO_INCREMENT,
header_f varchar(255), <!--Header for the main page before in index which dispaied as "/"-->
highlight_f varchar(255),<!--Highlight for the main page before in index which dispaied as "/"-->
main_f varchar(255),<!--Main for the main page before in index which dispaied as "/"-->
image_f varchar(255),<!-- Image for the main page before in index which dispaied as "/"-->
header varchar(255),<!--Header on main story page-->
firstp varchar(255),<!--First paragraph on main story page-->
secondp varchar(255),
thirdp varchar(255),
endp varchar(255),
imagem1 varchar(255),<!--images for main page/post-->
imagem2 varchar(255),
link varchar(255),
PRIMARY KEY (up_id)
FOREIGN KEY (user_is) REFERENCES users(id)
);

CREATE TABLE admin (
id int NOT NULL AUTO_INCREMENT,
email varchar(255),
password varchar(255),
PRIMARY KEY (id)
);
<!--Create Table-->
<!--/Database-->

<!--How to use-->
<!--/How-->

<!--Features-->
--Dynamic website
1)/Profile page
  1.1)Uses coockie to remember user in case of anything.
  1.2)Delete user
  1.3)Manage user
      1.3.1)See users, 
      1.3.2)See user email,
      1.3.3)See users profile picture,
      1.3.4)See what did the user post,
      1.3.5)Update which is change user name and email,
  1.4)Update User
      1.4.1)Change username, 
      1.4.2)See users email,
  1.5)Add user/ same as register/
  1.6)Post blog
  1.7)Edit blog / same as update user
  1.8)LogOut
  
2)A beautiful blog site.
  2.1)Able to Upload.
  2.2)See the post right away no need to wait.

<!--/Features-->
