DROP SCHEMA IF EXISTS eatja;
CREATE SCHEMA IF NOT EXISTS eatja DEFAULT CHARACTER SET utf8;
USE eatja;

-- --------------------------------

DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user (
  userId VARCHAR(60),
  userName VARCHAR(20),
  profileImg VARCHAR(200),
  followerCount INT DEFAULT 0,
  followeeCount INT DEFAULT 0,
  PRIMARY KEY(userId)
);

-- --------------------------------

DROP TABLE IF EXISTS userRelation;

CREATE TABLE IF NOT EXISTS userRelation (
  userRelationId INT NOT NULL AUTO_INCREMENT,
  followerId VARCHAR(60),
  followeeId VARCHAR(60),
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY(userRelationId)
);

-- --------------------------------

DROP TABLE IF EXISTS review;

CREATE TABLE IF NOT EXISTS review (
  reviewId INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(60),
  reviewName VARCHAR(30),
  imgUrl VARCHAR(200),
  locationUrl VARCHAR(200),
  tag TINYINT(1),
  description VARCHAR(200),
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY(reviewId)
);

-- --------------------------------

DROP TABLE IF EXISTS tag;

CREATE TABLE IF NOT EXISTS tag (
  tagId TINYINT(1),
  tagName VARCHAR(10),
  PRIMARY KEY(tagId)
);

-- --------------------------------


INSERT INTO tag(tagId, tagName) VALUES
(0, "전체"),
(1, "한식"),
(2, "양식"),
(3, "중식"),
(4, "일식"),
(5, "카페");

INSERT INTO user(userId, userName, followerCount, followeeCount) VALUES
("rmsdnjs518", "깨무렁", 1, 1),
("rootPark518", "박근원", 2, 1),
("sudo", "수두두", 0, 1);

INSERT INTO user(userId, userName) VALUES
("asd", "사람");

INSERT INTO userRelation(followerId,followeeId) VALUES
("rmsdnjs518", "rootPark518"),
("rootPark518", "rmsdnjs518"),
("sudo", "rootPark518");

INSERT INTO review(userId, reviewName, imgUrl, locationUrl, tag, description) VALUES
("Fgg2WajUD8XArOru7HEfdlDjYoS7KkoBlGb4wkNmUlg", "계림","https://pcmap.place.naver.com/restaurant/33068253/home?bookmarkId=551864873&from=map&fromPanelNum=1&ts=1688952209918#", "https://naver.me/5tj4jtol", 1, "여기 닭도리탕 마늘맛 좔좔" ),
("Fgg2WajUD8XArOru7HEfdlDjYoS7KkoBlGb4wkNmUlg", "게방식당","https://pcmap.place.naver.com/restaurant/793407871/home?bookmarkId=843473909&from=map&fromPanelNum=1&ts=1688952294901#", "https://naver.me/IMQppLwu", 1, "맛있긴 한디 공기밥 2천원 실화?"),
("Fgg2WajUD8XArOru7HEfdlDjYoS7KkoBlGb4wkNmUlg", "성천막국수","https://pcmap.place.naver.com/restaurant/20601121/home?bookmarkId=655360159&from=map&fromPanelNum=1&ts=1688957113485#", "https://naver.me/xTeSlxcE", 1, "맛있는 동치미맛 막국수");
