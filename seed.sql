CREATE TABLE users (
  userId SERIAL PRIMARY KEY,
  username varchar NOT NULL,
  password varchar NOT NULL,
  createDate timestamptz DEFAULT NOW()
);

CREATE TABLE messages (
  messageId SERIAL PRIMARY KEY,
  message varchar NOT NULL,
  createDate timestamptz DEFAULT NOW(),
  userId int REFERENCES users(userId) NOT NULL
);