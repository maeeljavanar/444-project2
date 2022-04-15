DROP DATABASE IF EXISTS books;
CREATE DATABASE books;

USE books;

CREATE TABLE user (
    userid INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password CHAR(64) NOT NULL,
    session CHAR(20) UNIQUE,
    expiration DATETIME,
    PRIMARY KEY(userid),
    CONSTRAINT session_has_expiration CHECK ((session IS NOT NULL AND expiration IS NOT NULL) OR session IS NULL)
);

CREATE TABLE book (
    bookid INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    isbn CHAR(13),
    pages INT,
    year INT,
    publisher VARCHAR(50),
    checkedoutby INT,
    PRIMARY KEY (bookid),
    CONSTRAINT fk_checkedoutby FOREIGN KEY (checkedoutby) REFERENCES user (userid) ON UPDATE CASCADE
);