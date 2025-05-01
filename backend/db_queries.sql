ALTER TABLE `health_sentinel_db`.`users` 
ADD COLUMN `is_initial_login` TINYINT NULL DEFAULT 1 AFTER `updated_at`;

CREATE TABLE `health_sentinel_db`.`locations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `case_id` INT NULL,
  `longitude` FLOAT NULL,
  `latitude` FLOAT NULL,
  `address` TEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_locations_case_idx` (`case_id` ASC) VISIBLE,
  CONSTRAINT `fk_locations_case`
    FOREIGN KEY (`case_id`)
    REFERENCES `health_sentinel_db`.`cases` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `health_sentinel_db`.`lab_reports` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `case_id` INT NULL,
  `file` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_lab_reports_case_idx` (`case_id` ASC) VISIBLE,
  CONSTRAINT `fk_lab_reports_case`
    FOREIGN KEY (`case_id`)
    REFERENCES `health_sentinel_db`.`cases` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

ALTER TABLE `health_sentinel_db`.`lab_reports` 
CHANGE COLUMN `file` `file` TEXT NULL DEFAULT NULL ;


ALTER TABLE `health_sentinel_db`.`notifications` 
ADD COLUMN `title` VARCHAR(45) NULL AFTER `is_read`;


ALTER TABLE `health_sentinel_db`.`notifications` 
CHANGE COLUMN `message` `message` TEXT NULL DEFAULT NULL ;
