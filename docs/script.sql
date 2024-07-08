DROP DATABASE IF EXISTS `tasklistdb`;
CREATE DATABASE IF NOT EXISTS `tasklistdb`;

USE `tasklistdb`;

CREATE TABLE IF NOT EXISTS `task` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(255) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT FALSE,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME
);

INSERT INTO `task` (`description`) VALUES
    ('Implementar função de login'),
    ('Corrigir bug na página de perfil'),
    ('Testar integração com API externa'),
    ('Revisar código do projeto'),
    ('Atualizar documentação');

CREATE TABLE `user` (
	`id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
   	`name` VARCHAR(50) NOT NULL,
	`username` VARCHAR(255) NOT NULL UNIQUE,
	`birthDate` DATE,
	`password` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`sex` ENUM('Masculino', 'Feminino', 'Outro', 'Prefiro não responder'),	
	`status` ENUM('Ativado', 'Desativado', 'Bloqueado') NOT NULL DEFAULT 'Ativado',
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
   	`updatedAt` DATETIME
);

INSERT INTO `user` (`name`, `username`, `birthDate`, `password`, `email`, `sex`, `status`, `createdAt`) VALUES
('João Silva', 'joaosilva', '1990-05-15', '$2a$10$YRLXJyD3aQwF9t3EKL93jedG/g.lxGOl5nEMKWzLOiTP37U0qDEgK', 'joaosilva@hotmail.com', 'Masculino', 'Ativado', '2015-06-01'),
('Maria Santos', 'mariasantos', '1995-08-21', '$2a$10$Pd6TXW4iANASJpl8.BK8YeemgIdmNbiJvufeiwYtKmWZUhT9ebIPu', 'maria@gmail.com', 'Feminino', 'Ativado', '2016-03-12'),
('Pedro Oliveira', 'pedrooliveira', '1988-12-03', '$2a$10$FJyKcWFiSztHn6LIOIwnWuA1GrR1cMopjHf8FsRrltHC4uhcZW7yW', 'pedro@outlook.com', 'Masculino', 'Ativado', '2017-09-25'),
('Ana Rodrigues', 'anarodrigues', '1992-06-28', '$2a$10$Hf.gWNoOz8Y/fyE3k01B3OJWEMLO.srKeb5mtbRBc9F8rIl5ycU7S', 'ana@yahoo.com', 'Feminino', 'Ativado', '2018-11-30'),
('Lucas Costa', 'lucascosta', '1997-02-10', '$2a$10$GZKcUKsEMRjXJt9OMaEVrOXFst2TY2iXMMWDEyKTJ3ohxj71JXf8K', 'lucas@costa.com.br', 'Masculino', 'Ativado', '2022-07-18');

SELECT * FROM `task`;

SELECT * FROM `user`;