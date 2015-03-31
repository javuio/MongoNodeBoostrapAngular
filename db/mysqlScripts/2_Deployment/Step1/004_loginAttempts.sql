CREATE TABLE IF NOT EXISTS `loginAttempts` (
  `loginAttemptId` int(11) NOT NULL AUTO_INCREMENT,
  `username` nvarchar(60) NOT NULL,
  `timestamp` datetime NOT NULL,
  `ipAddress` varchar(45) NOT NULL,
  PRIMARY KEY (`loginAttemptId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
