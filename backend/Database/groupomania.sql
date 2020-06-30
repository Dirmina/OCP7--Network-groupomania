-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 30 juin 2020 à 16:58
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` smallint(5) UNSIGNED NOT NULL,
  `postId` smallint(5) UNSIGNED NOT NULL,
  `date_creation` datetime NOT NULL,
  `content` text NOT NULL,
  `likes` smallint(5) UNSIGNED DEFAULT NULL,
  `usersLiked` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `date_creation`, `content`, `likes`, `usersLiked`) VALUES
(9, 11, 12, '2020-06-29 19:11:34', 'azeaze', 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` smallint(5) UNSIGNED NOT NULL,
  `postId` smallint(5) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` smallint(5) UNSIGNED NOT NULL,
  `date_creation` datetime NOT NULL,
  `date_modify` datetime NOT NULL,
  `content` text NOT NULL,
  `likes` smallint(5) UNSIGNED DEFAULT '0',
  `usersLiked` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `date_creation`, `date_modify`, `content`, `likes`, `usersLiked`) VALUES
(8, 7, '2020-06-29 18:06:05', '2020-06-29 18:06:05', 'Monkey D Garp', 0, NULL),
(9, 8, '2020-06-29 18:06:19', '2020-06-29 18:06:19', 'Sanji', 0, NULL),
(10, 6, '2020-06-29 18:07:01', '2020-06-29 18:07:01', 'Roronoa Zoro', 0, NULL),
(11, 10, '2020-06-29 18:34:50', '2020-06-29 18:34:50', 'azeaze', 0, NULL),
(12, 11, '2020-06-29 19:11:15', '2020-06-29 19:11:15', 'azeaze', 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(320) NOT NULL,
  `imageUrl` text,
  `modo` tinyint(4) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `imageUrl`, `modo`) VALUES
(6, 'John', 'Do', 'rule@laposte.net', '$2b$10$FxawdtyKoZGOAP9jNI2bYOkMOZ6DhOssLcRwIvf39r25AQ2Z35YHe', NULL, 0),
(7, 'jean', 'dupont', 'julducrocq@laposte.net', '$2b$10$w.E/IQfRAMr/czIcE8e//OB8fnvrOuiJwX8h.lF88FdKC7KEX8n6K', NULL, 1),
(8, 'henry', 'Charles', 'HChar@mail.com', '$2b$10$NPYQJifKLy3E9knk/vHjzeISaEl7SfI./vAcMtQaNgT3TjYlKgsza', NULL, 0),
(9, 'Kata', 'Koto', 'abcd@laposte.net', '$2b$10$m8dI/qKoiCkz28kEKca6R.IQq9y.VMM7c9toQ6LIYj75lfZgpkQMG', NULL, 0),
(10, 'jeanne', 'calment', 'jeanne@mail.com', '$2b$10$TJkSY0MQ6T4pnY9xEyB7Ven1N0hioPOxASyE7lQgKtf6240KoYO5e', NULL, 0),
(11, 'guillaume', 'carl', 'guillaume@mail.com', '$2b$10$micV.i5X8w4N5WaVklAghO1YQgM0G/F5f5L9dno47ATtD4Ii11V46', NULL, 0),
(12, 'Francois', 'Far', 'francois@mail.com', '$2b$10$5MgdGjUaw5AbX78MMqlTW.9W72e.jhhCasPqjVeJjPqWIVmXa9TtS', NULL, 0),
(14, 'Derrick', 'Polar', 'derick@mail.com', '$2b$10$7y/MGY/hlyjE53tk81Fk.ug3snoIIElS3njqH4NQx5KNWCT9cI8Uq', NULL, 0),
(15, 'alice', 'glacon', 'alice@mail.com', '$2b$10$crSw6mT.cef8GU/arRV1puGbrogK7k.Qg/KuPjBLEntTq5Sn62iAK', NULL, 0),
(16, 'mario', 'luigi', 'mario@mail.com', '$2b$10$1uPi5LxI.sJIwdXYBLHdyOgoaielqKzXLfm4KcuToR7scOcG.m26q', NULL, 0),
(17, 'Monique', 'Rales', 'monique@mail.com', '$2b$10$LACk5sWMSqBLQ3CHzbkCOemS6Aii7oDlY237MCFRxLn/hkMg00K3y', NULL, 0),
(19, 'admin', 'Administrator', 'admin@groupomania.com', '$2b$10$MQbAnhX0IzKz8ZR44yWZQ.XZGScMaH3i2hx7e/oKXGQjD4hX8l6tm', NULL, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
