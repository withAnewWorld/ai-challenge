drop DATABASE selsGame;

CREATE DATABASE selsGame;

Use selsGame;


CREATE TABLE textBook(
  `id` INT AUTO_INCREMENT primary key,
  `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP NOT NULL,
  `name` VARCHAR(50),
  `grade` VARCHAR(10) 
);

CREATE TABLE wordInfo(
  `id` INT AUTO_INCREMENT primary key,
  `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP NOT NULL,
  `spell` TEXT,
  `meaning` TEXT,
  `score` INT,
  `textBookId` INT,
  FOREIGN KEY (textBookId) REFERENCES textBook(id)     
);

CREATE TABLE user(
  `id` INT AUTO_INCREMENT primary key,
  `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP NOT NULL,
  `userNickName` VARCHAR(50),
  `score` INT 
);

CREATE TABLE game(
  `id` INT AUTO_INCREMENT primary key,
  `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP NOT NULL,
  `gameName` VARCHAR(50),
  `userId` INT,
  `textBookId` INT,
  foreign key (userId) REFERENCES user(id),
  foreign key (textBookId) REFERENCES textBook(id) 
);