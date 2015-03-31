CREATE TABLE IF NOT EXISTS users (
  userId int(11) NOT NULL AUTO_INCREMENT,
  username varchar(60) NOT NULL,
  password nvarchar(250) DEFAULT NULL,
  loginMethod varchar(3) DEFAULT NULL,
  isActive bit(1) DEFAULT b'1',
  firstName nvarchar(150) DEFAULT NULL,
  lastName nvarchar(150) DEFAULT NULL,
  userToken char(36) NOT NULL,
  accessToken char(36) NOT NULL,
  lastUpdatedOn datetime ,
  lastUpdatedBy int(11) DEFAULT NULL,
  createdOn timestamp not null default CURRENT_TIMESTAMP,
  createdBy int(11) DEFAULT NULL,
  deletedOn datetime DEFAULT NULL,
  deletedBy int(11) DEFAULT NULL,
  PRIMARY KEY (userId),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `userToken_UNIQUE` (`userToken`),
  KEY `userId_idx` (`userId`),
  KEY `fk_users_deletedBy_users_idx` (`deletedBy`),
  KEY `fk_users_createdBy_users_idx` (`createdBy`),
  KEY `fk_users_lastUpdatedBy_users_idx` (`lastUpdatedBy`),
  CONSTRAINT `fk_users_createdBy_users` FOREIGN KEY (`createdBy`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_deletedBy_users` FOREIGN KEY (`deletedBy`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_lastUpdatedBy_users` FOREIGN KEY (`lastUpdatedBy`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Add Access Token Column
DELIMITER $$
DROP PROCEDURE IF EXISTS add_column $$
CREATE PROCEDURE add_column()
BEGIN
IF NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE()
        AND COLUMN_NAME='accessToken' AND TABLE_NAME='users') ) THEN
    ALTER TABLE users ADD accessToken char(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
END IF;
END $$
CALL add_column() $$
DELIMITER ;


insert ignore into users (username, password, loginMethod, firstName, lastName,  userToken, accessToken, createdOn)
values	('fb@javu.io', null, 'fb', 'FaceBook', 'user',  '11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', UTC_TIMESTAMP());

insert ignore into users (username, password, loginMethod, firstName, lastName,  userToken, accessToken, createdOn)
values	('CommonUser@javu.io', 'ecb6e2bdc7977e013b5c7c06c3406635', 'std', 'Common', 'User',  UUID(), UUID(), UTC_TIMESTAMP());

insert ignore into users (username, password, loginMethod, firstName, lastName,  userToken, accessToken, createdOn)
values	('CPUser@javu.io', 'ecb6e2bdc7977e013b5c7c06c3406635', 'std', 'CP', 'User', UUID(), UUID(),UTC_TIMESTAMP());

insert ignore into users(username, password, loginMethod, firstName, lastName,  userToken, accessToken, createdOn)
values	('AdminUser@javu.io', 'ecb6e2bdc7977e013b5c7c06c3406635', 'std', 'Admin', 'User', UUID(), UUID(),UTC_TIMESTAMP());
