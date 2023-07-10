DROP SCHEMA IF EXISTS eatja;
CREATE SCHEMA IF NOT EXISTS eatja DEFAULT CHARACTER SET utf8;
USE eatja;

-- --------------------------------

DROP TABLE IF EXISTS eatja.user;

CREATE TABLE IF NOT EXISTS eatja.user (
  userId VARCHAR(30),
  userName VARCHAR(20),
  followerCount INT,
  followeeCount INT,
  tag1 TINYINT(1),
  tag2 TINYINT(1),
  PRIMARY KEY(userId)
);

-- --------------------------------

DROP TABLE IF EXISTS eatja.userRelation;

CREATE TABLE IF NOT EXISTS eatja.userRelation (
  userRelationId INT NOT NULL AUTO_INCREMENT,
  followerId VARCHAR(30),
  followeeId VARCHAR(30),
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY(userRelationId)
);

-- --------------------------------

DROP TABLE IF EXISTS eatja.review;

CREATE TABLE IF NOT EXISTS eatja.review (
  reviewId INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(30),
  imgUrl VARCHAR(200),
  locationUrl VARCHAR(200),
  tag TINYINT(1),
  description VARCHAR(200),
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY(reviewId)
);

-- --------------------------------

DROP TABLE IF EXISTS eatja.tag;

CREATE TABLE IF NOT EXISTS eatja.tag (
  tagId TINYINT(1),
  tagName VARCHAR(10),
  PRIMARY KEY(tagId)
);

-- --------------------------------


INSERT INTO eatja.tag(tagId, tagName) VALUES
(0, "전체"),
(1, "한식"),
(2, "양식"),
(3, "중식"),
(4, "일식"),
(5, "카페");

INSERT INTO eatja.user(userId, userName, followerCount, followeeCount, tag1, tag2) VALUES
("rmsdnjs518", "깨무렁", 1, 1, 1, 2),
("rootPark518", "박근원", 1, 1, 4, 5);

INSERT INTO eatja.userRelation(followerId,followeeId) VALUES
("rmsdnjs518", "rootPark518"),
("rootPark518", "rmsdnjs518");

INSERT INTO eatja.review(userId, imgUrl, locationUrl, tag, description) VALUES
("rmsdnjs518","https://pcmap.place.naver.com/restaurant/33068253/home?bookmarkId=551864873&from=map&fromPanelNum=1&ts=1688952209918#", "https://naver.me/5tj4jtol", 1, "여기 닭도리탕 마늘맛 좔좔" ),
("rootPark", "https://pcmap.place.naver.com/restaurant/793407871/home?bookmarkId=843473909&from=map&fromPanelNum=1&ts=1688952294901#", "https://naver.me/IMQppLwu", 1, "맛있긴 한디 공기밥 2천원 실화?");
