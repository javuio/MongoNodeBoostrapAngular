CREATE TABLE IF NOT EXISTS `rolePermissions` (
  `roleId` INT(11) NOT NULL,
 `permissionId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  CONSTRAINT `fk_rolePermissions_permissionId_permissions` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`permissionId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rolePermissions_roleId_roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;