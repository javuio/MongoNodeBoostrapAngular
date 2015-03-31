CREATE TABLE IF NOT EXISTS `tempAuthKeys` (
  `key` char(36) NOT NULL,
  email varchar(60) NOT NULL,
  userId int(11) NOT NULL,
  createdOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  expiresOn datetime NOT NULL,
  PRIMARY KEY (`key`),
  CONSTRAINT `fk_tempAuthKey_userId_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;