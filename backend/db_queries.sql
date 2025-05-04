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

CREATE TABLE `health_sentinel_db`.`house_hold_contacts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `report_id` INT NULL,
  `name` VARCHAR(45) NULL,
  `age` INT NULL,
  `disposition` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `health_sentinel_db`.`other_contacts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `report_id` INT NULL,
  `name` VARCHAR(45) NULL,
  `age` INT NULL,
  `disposition` VARCHAR(45) NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `health_sentinel_db`.`house_hold_contacts` 
ADD INDEX `fk_house_hold_contacts_report_idx` (`report_id` ASC) VISIBLE;
;
ALTER TABLE `health_sentinel_db`.`house_hold_contacts` 
ADD CONSTRAINT `fk_house_hold_contacts_report`
  FOREIGN KEY (`report_id`)
  REFERENCES `health_sentinel_db`.`report` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `health_sentinel_db`.`other_contacts` 
ADD INDEX `fk_other_contacts_report_idx` (`report_id` ASC) VISIBLE;
;
ALTER TABLE `health_sentinel_db`.`other_contacts` 
ADD CONSTRAINT `fk_other_contacts_report`
  FOREIGN KEY (`report_id`)
  REFERENCES `health_sentinel_db`.`report` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `health_sentinel_db`.`house_hold_contacts` 
ADD COLUMN `date` DATETIME NULL AFTER `disposition`;


CREATE TABLE `health_sentinel_db`.`reset_password_request` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `is_reset` TINYINT NULL DEFAULT 0,
  `request_date` VARCHAR(45) NULL,
  `updated_date` VARCHAR(45) NULL,
  `is_user_details_correct` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`));


