CREATE TABLE IF NOT EXISTS `permissions` (
  `permissionId` INT(11) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`permissionId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;




