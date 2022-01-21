DROP DATABASE IF EXISTS reviewData;

DATABASE reviewData;

USE reviewData;

CREATE TABLE products(
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_name CHAR(60)
)

CREATE TABLE reviews(
  id INT PRIMARY KEY AUTO_INCREMENT,
  body CHAR(1000) NOT NULL,
  review_date DATETIME NOT NULL,
  rating SMALLINT NOT NULL,
  recommend  BOOLEAN NOT NULL,
  reviewer_name CHAR(60) NOT NULL,
  email CHAR(60) NOT NULL,
  helpfulness INT DEFAULT 0 NOT NULL,
  response CHAR(1000) DEFAULT 'null',
  product_id INT FOREIGN KEY REFERENCES products(id)

)
CREATE TABLE photos(
  id INT PRIMARY KEY AUTO_INCREMENT,
  photo_url CHAR(1000) NOT NULL,
  review_id INT FOREIGN KEY REFERENCES reviews(id)
)

CREATE TABLE characteristics(
  id INT PRIMARY KEY AUTO_INCREMENT,
  char_name CHAR(50) NOT NULL,
  product_id INT FOREIGN KEY REFERENCES products(id)
)

CREATE TABLE characteristics_ratings(
  id INT PRIMARY KEY AUTO_INCREMENT,
  rating SMALLINT,
  characteristics INT FOREIGN KEY REFERENCES characteristics(id)
  review_id INT FOREIGN KEY REFERENCES reviews(id)
)

