DROP DATABASE IF EXISTS reviewData;

DATABASE reviewData;

USE reviewData;

CREATE TABLE products(
  id INT PRIMARY KEY NOT NULL,
)
CREATE TABLE allReviews(
  id INT PRIMARY KEY NOT NULL,
  body CHAR(1000) NOT NULL,
  review_date DATETIME NOT NULL,
  rating SMALLINT NOT NULL,
  recommend  BOOLEAN NOT NULL,
  reviewer_name CHAR(60) NOT NULL,
  email CHAR(60) NOT NULL,
  helpfulness INT DEFAULT 0 NOT NULL,
  response CHAR(1000) DEFAULT 'null',
  product_id INT FOREIGN KEY REFERENCES product(id)
)
CREATE TABLE photos(
  id INT PRIMARY KEY NOT NULL,
  photo_url CHAR(1000) DEFAULT 'null'
  review_id INT FOREIGN KEY REFERENCES allReviews(id)
)

CREATE TABLE characteristics(
  id INT PRIMARY KEY AUTO_INCREMENT,
  size SMALLINT ,
  width SMALLINT ,
  comfort SMALLINT ,
  quality SMALLINT,
  product_length SMALLINT,
  fit SMALLINT ,
  review_id INT FOREIGN KEY REFERENCES allReviews(id)
)

