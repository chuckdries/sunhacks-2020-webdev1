-- Up
CREATE TABLE Messages (
  id INTEGER PRIMARY KEY,
  messageText STRING,
  authorId INTEGER,
  date INTEGER,
  FOREIGN KEY (authorId) REFERENCES Users (id)
);
CREATE TABLE Users (
  id INTEGER PRIMARY KEY,
  email STRING,
  password STRING,
  name STRING
);
CREATE TABLE accessTokens (
  id INTEGER PRIMARY KEY,
  userId INTEGER,
  token STRING
);

-- Down
DROP TABLE Messages;
DROP TABLE Users;
DROP TABLE accessTokens;
