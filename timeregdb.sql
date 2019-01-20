-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 20, 2019 at 01:10 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timeregdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `borgere`
--

CREATE DATABASE timeregdb;

CREATE TABLE `borgere` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `address` varchar(100) CHARACTER SET latin1 NOT NULL,
  `companyId` int(11) UNSIGNED NOT NULL,
  `active` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `borgere`
--

INSERT INTO `borgere` (`id`, `name`, `address`, `companyId`, `active`) VALUES
(1, 'Hans Henrik', '', 3, 0),
(2, 'Mostafa Sattar', '', 3, 0),
(3, 'Mohammed Ashraf', '', 3, 0),
(4, 'Lars Larsen', '', 3, 1),
(5, 'Brian Jensen', '', 3, 1),
(6, 'Muhittin Fouad', '', 3, 1),
(7, 'Kasper Larsen', '', 3, 1),
(8, 'Mads Madsen', '', 3, 1),
(9, 'Børge Henriksen', '', 3, 1),
(10, 'Helle Bodilsen', '', 3, 1),
(11, 'Yama Hussein', '', 3, 1),
(12, 'Abdul Halla', '', 1, 1),
(13, 'Ulla Jensen', '', 1, 1),
(14, 'Christian Larsen', '', 1, 1),
(15, 'Ole Sølvsten', '', 1, 1),
(16, 'Henrik Larsen', '', 3, 1),
(17, 'Folmer Fugt', '', 3, 1),
(18, '', '', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET latin1 NOT NULL,
  `email` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `phone` varchar(25) CHARACTER SET latin1 DEFAULT NULL,
  `licenseQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `email`, `phone`, `licenseQuantity`) VALUES
(1, 'Crossworkers', 'info@crossworkers.dk', '+45 12 345 678', 50),
(2, 'MV-K', 'info@mv-k.dk', '+45 12 345 678', 25),
(3, 'Allgeier E-S', 'Info@Allgeier.eu', '+45 12 345 678', 100);

-- --------------------------------------------------------

--
-- Table structure for table `timeregistrations`
--

CREATE TABLE `timeregistrations` (
  `id` int(11) NOT NULL,
  `userId` int(11) UNSIGNED NOT NULL,
  `companyId` int(11) UNSIGNED NOT NULL,
  `borgerId` int(11) UNSIGNED NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `timeInterval` int(11) NOT NULL,
  `description` text COLLATE utf8_danish_ci,
  `attendance` enum('Mødt','Udeblevet','Aflyst','Ferie') COLLATE utf8_danish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `timeregistrations`
--

INSERT INTO `timeregistrations` (`id`, `userId`, `companyId`, `borgerId`, `date`, `create_date`, `timeInterval`, `description`, `attendance`) VALUES
(1, 4, 3, 1, '2018-11-19 17:38:50', '2019-01-17 20:26:03', 15, 'Hjalp Hans til læge.', 'Mødt'),
(2, 4, 3, 2, '2018-11-19 17:38:55', '2019-01-17 20:26:03', 15, 'Hjalp Mostafa til skole.', 'Mødt'),
(3, 4, 3, 3, '2018-11-19 17:39:00', '2019-01-17 20:26:03', 15, 'Ringede og vækkede Mohammed', 'Mødt'),
(4, 4, 3, 4, '2018-11-19 17:39:03', '2019-01-17 20:26:03', 60, 'Hjalp Lars med lektier.', 'Mødt'),
(5, 4, 3, 5, '2018-11-19 17:39:05', '2019-01-17 20:26:03', 30, 'Hjalp Brian med lektier.', 'Mødt'),
(6, 4, 3, 6, '2018-11-19 17:39:17', '2019-01-17 20:26:03', 30, 'Hjalp Muhittin med at komme hjem fra skole.', 'Udeblevet'),
(7, 4, 3, 7, '2018-11-19 17:39:20', '2019-01-17 20:26:03', 30, 'Hjalp Kasper til badminton.', 'Udeblevet'),
(8, 4, 3, 8, '2018-11-19 17:39:26', '2019-01-17 20:26:03', 30, 'Hjalp Mads til bordtennis.', 'Aflyst'),
(9, 4, 3, 9, '2018-11-19 17:39:29', '2019-01-17 20:26:03', 60, 'Hjalp Børge med at komme hjem fra SFO.', 'Ferie'),
(10, 4, 3, 10, '2018-11-19 17:39:32', '2019-01-17 20:26:03', 60, 'Hjalp Helle til Bingo.', 'Aflyst'),
(11, 5, 1, 12, '2018-11-19 17:39:36', '2019-01-17 20:26:03', 30, 'Hjalp Abdul til Moskeén', 'Udeblevet'),
(12, 5, 1, 13, '2018-11-19 17:39:39', '2019-01-17 20:26:03', 30, 'Hjalp Ulla med at gøre rent.', 'Mødt'),
(13, 5, 1, 14, '2018-11-19 17:39:41', '2019-01-17 20:26:03', 60, 'Hjalp Christian med lektier.', 'Mødt'),
(14, 5, 1, 15, '2018-11-19 17:39:43', '2019-01-17 20:26:03', 60, 'Hjalp Ole med at handle ind.', 'Mødt'),
(15, 4, 3, 1, '2018-12-03 09:37:28', '2019-01-17 20:26:03', 15, '', 'Udeblevet'),
(16, 4, 3, 1, '2018-12-03 09:59:29', '2019-01-17 20:26:03', 60, '', 'Udeblevet'),
(17, 4, 3, 1, '2018-12-03 10:00:33', '2019-01-17 20:26:03', 15, '', 'Udeblevet'),
(18, 4, 3, 2, '2018-12-03 10:01:32', '2019-01-17 20:26:03', 60, '', 'Mødt'),
(19, 4, 3, 4, '2018-12-03 10:05:46', '2019-01-17 20:26:03', 15, '', 'Udeblevet'),
(20, 4, 3, 5, '2018-12-03 10:06:28', '2019-01-17 20:26:03', 30, '', 'Udeblevet'),
(21, 4, 3, 5, '2018-12-03 10:07:02', '2019-01-17 20:26:03', 15, '', 'Udeblevet'),
(22, 4, 3, 1, '2018-12-03 10:13:49', '2019-01-17 20:26:03', 15, '', 'Udeblevet'),
(23, 4, 3, 1, '2018-12-03 10:15:55', '2019-01-17 20:26:03', 15, '', 'Udeblevet'),
(24, 4, 3, 2, '2018-12-03 10:18:43', '2019-01-17 20:26:03', 15, '', 'Udeblevet'),
(25, 4, 3, 1, '2018-12-03 10:20:15', '2019-01-17 20:26:03', 30, '', 'Udeblevet'),
(26, 4, 3, 1, '2018-12-03 10:20:38', '2019-01-17 20:26:03', 60, '', 'Ferie'),
(27, 4, 3, 5, '2018-12-03 10:20:57', '2019-01-17 20:26:03', 60, '', 'Mødt'),
(28, 4, 3, 8, '2018-12-03 10:23:46', '2019-01-17 20:26:03', 30, '', 'Mødt'),
(29, 4, 3, 6, '2018-12-03 10:53:41', '2019-01-17 20:26:03', 45, '', 'Udeblevet'),
(30, 4, 3, 5, '2018-12-03 10:54:12', '2019-01-17 20:26:03', 75, '', 'Aflyst'),
(31, 4, 3, 5, '2018-12-03 10:55:13', '2019-01-17 20:26:03', 45, '', 'Aflyst'),
(32, 4, 3, 5, '2018-12-03 10:55:39', '2019-01-17 20:26:03', 30, '', 'Aflyst'),
(33, 4, 3, 5, '2018-12-03 10:56:36', '2019-01-17 20:26:03', 45, '', 'Aflyst'),
(34, 4, 3, 5, '2018-12-03 10:57:18', '2019-01-17 20:26:03', 45, '', 'Ferie'),
(35, 4, 3, 4, '2018-12-03 10:58:57', '2019-01-17 20:26:03', 30, '', 'Ferie'),
(36, 4, 3, 4, '2018-12-03 11:01:27', '2019-01-17 20:26:03', 45, '', 'Ferie'),
(37, 4, 3, 7, '2018-12-03 11:02:17', '2019-01-17 20:26:03', 60, 'sdcasasasd', 'Udeblevet'),
(38, 4, 3, 6, '2018-12-03 11:03:44', '2019-01-17 20:26:03', 45, '', 'Aflyst'),
(39, 4, 3, 4, '2018-12-03 11:04:42', '2019-01-17 20:26:03', 30, '', 'Udeblevet'),
(40, 4, 3, 4, '2018-12-03 11:05:43', '2019-01-17 20:26:03', 60, '', 'Ferie'),
(41, 4, 3, 5, '2018-12-03 11:05:56', '2019-01-17 20:26:03', 90, '', 'Mødt'),
(42, 4, 3, 5, '2018-12-03 11:06:51', '2019-01-17 20:26:03', 45, '', 'Udeblevet'),
(43, 4, 3, 9, '2018-12-26 11:07:27', '2019-01-17 20:26:03', 60, 'asdasd', 'Aflyst'),
(44, 4, 3, 7, '2018-12-03 11:07:55', '2019-01-17 20:26:03', 60, 'asdasd', 'Aflyst'),
(45, 4, 3, 5, '2018-12-03 11:08:13', '2019-01-17 20:26:03', 45, 'asdasfsfgfgd', 'Aflyst'),
(46, 4, 3, 4, '2018-12-03 11:40:15', '2019-01-17 20:26:03', 45, '', 'Ferie'),
(47, 4, 3, 4, '2019-01-17 08:30:00', '2019-01-17 20:26:03', 30, 'Det her er dato test', 'Mødt'),
(48, 4, 3, 9, '2019-01-17 06:00:00', '2019-01-17 20:26:03', 60, '', 'Mødt'),
(49, 4, 3, 8, '2019-01-17 08:30:00', '2019-01-17 20:26:03', 120, '', 'Aflyst'),
(50, 4, 3, 5, '2019-01-17 07:00:00', '2019-01-17 20:26:03', 30, '', 'Aflyst'),
(51, 4, 3, 5, '2019-01-17 09:00:00', '2019-01-17 20:26:03', 30, '', 'Aflyst'),
(52, 4, 3, 5, '2019-01-17 08:00:00', '2019-01-17 20:26:03', 45, '', 'Udeblevet'),
(53, 4, 3, 5, '2019-01-17 08:00:00', '2019-01-17 20:26:03', 105, '', 'Aflyst'),
(54, 4, 3, 6, '2019-01-17 08:00:00', '2019-01-17 20:26:03', 120, '', 'Ferie'),
(55, 4, 3, 7, '2019-01-17 09:00:00', '2019-01-17 20:26:03', 150, '', 'Aflyst'),
(56, 4, 3, 7, '2019-01-17 08:00:00', '2019-01-17 20:26:03', 75, '', 'Ferie'),
(57, 4, 3, 5, '2019-01-17 18:55:23', '2019-01-17 20:26:03', 105, '', 'Aflyst'),
(58, 4, 3, 7, '2019-01-17 08:00:00', '2019-01-17 20:26:03', 90, '', 'Ferie'),
(59, 4, 3, 6, '2019-01-17 08:00:00', '2019-01-17 20:26:03', 90, '', 'Aflyst'),
(60, 4, 3, 5, '2019-01-17 08:00:00', '2019-01-17 20:26:03', 105, '', 'Aflyst'),
(61, 4, 3, 7, '2019-01-17 19:08:12', '2019-01-17 20:26:03', 105, '', 'Aflyst'),
(62, 4, 3, 6, '2019-01-17 08:00:00', '2019-01-17 20:26:03', 90, '', 'Aflyst'),
(63, 4, 3, 4, '2019-01-17 08:00:00', '2019-01-17 20:26:03', 75, '', 'Ferie'),
(64, 4, 3, 6, '2019-01-17 20:12:21', '2019-01-17 20:26:03', 90, '', 'Ferie'),
(65, 4, 3, 5, '2019-01-17 09:00:00', '2019-01-17 20:26:03', 75, '', 'Aflyst'),
(66, 4, 3, 7, '2019-01-19 09:00:00', '2019-01-19 22:47:17', 60, '', 'Mødt'),
(67, 4, 3, 4, '2019-01-19 10:00:00', '2019-01-19 22:47:31', 45, '', 'Aflyst'),
(68, 4, 3, 5, '2019-01-19 10:45:00', '2019-01-19 22:47:41', 120, '', 'Ferie'),
(69, 4, 3, 11, '2019-01-19 12:45:00', '2019-01-19 22:47:55', 15, '', 'Mødt'),
(70, 4, 3, 17, '2019-01-19 13:00:00', '2019-01-19 22:48:04', 60, '', 'Mødt'),
(71, 4, 3, 5, '2019-01-20 09:30:00', '2019-01-19 23:12:51', 60, '', 'Mødt'),
(72, 4, 3, 7, '2019-01-20 10:30:00', '2019-01-19 23:13:00', 60, '', 'Mødt'),
(73, 4, 3, 7, '2019-01-20 11:30:00', '2019-01-19 23:13:08', 60, '', 'Mødt'),
(74, 4, 3, 10, '2019-01-20 12:30:00', '2019-01-19 23:13:15', 60, '', 'Mødt'),
(75, 4, 3, 6, '2019-01-18 09:30:00', '2019-01-19 23:13:41', 60, '', 'Mødt'),
(76, 4, 3, 7, '2019-01-18 10:30:00', '2019-01-19 23:13:59', 30, '', 'Mødt'),
(77, 4, 3, 9, '2019-01-18 11:00:00', '2019-01-19 23:14:06', 30, '', 'Mødt'),
(78, 4, 3, 9, '2019-01-18 11:00:00', '2019-01-19 23:14:06', 30, '', 'Mødt'),
(79, 4, 3, 16, '2019-01-18 12:00:00', '2019-01-19 23:14:19', 30, '', 'Udeblevet');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(100) CHARACTER SET latin1 NOT NULL,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `email` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `phone` varchar(25) CHARACTER SET latin1 DEFAULT NULL,
  `superuser` tinyint(1) NOT NULL,
  `companyId` int(11) UNSIGNED NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_danish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `phone`, `superuser`, `companyId`, `password`, `token`) VALUES
(4, 'AMS', 'Anthon Mølgaard Steiness', 'Anthon@Steiness.info', '+45 60 66 79 57', 1, 3, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', 'ssIDk25rQItlhA2Xz5TUN3fktAaTlICLjunZ8ZSQ18VDlovia0xHTB1PNAkX7BGn2rrZIkyiySq'),
(5, 'PST', 'Peter Steiness', 'Peter@Steiness.info', '+45 20 13 25 20', 1, 1, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', '1GgMapuZK4RiVPGqwoPUPFv5XN6064I2V5EdxOATqjNZ6sGGvbfZjWgTRxg52uYSedr9CiZ9NJf'),
(6, 'GMØ', 'Gitte Mølgaard', 'Gitte@Mølgaard.info', '+45 60 88 79 57', 0, 1, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(7, 'DMS', 'Dagmar Mølgaard Steiness', 'Dagmar@Steiness.info', '+45 60 77 79 57', 0, 1, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(8, 'AFI', 'Adrian Field', 'Adrian@Field.info', '+45 12 34 56 78', 0, 1, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(9, 'SKA', 'Sanne Karlshøj', 'Sanne@Karlshøk.info', '+45 12 34 56 78', 0, 1, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(10, 'LKA', 'Line Karlshøj', 'Line@Karlshøj.info', '+45 12 34 56 78', 0, 1, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(30, 'ØÆV_8141', 'Åjvind Æversen', 'Åjvind@Æversen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(33, 'VMS_8458', 'Victor Mølgaard Steiness', 'Victor@Steiness.info', '+45 60 77 79 57', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(34, 'KFR_7473', 'Kasper Frederiksen', 'Kasper@Frederiksen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(35, 'JJE_8383', 'Jonas Jensen123', 'Jonas@Jensen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(36, 'ELU_3119', 'Emil Lund', 'Emil@Lund.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(39, 'RLA_6930', 'Rene Larsen', 'Rene@Larsen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(40, 'SDU_4687', 'Simone Dunager', 'Simone@Dunager.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(41, 'NJE_3949', 'Nanna Jensen', 'Nanna@Jensen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(42, 'MJO_3795', 'Mie Johansen', 'Mie@Johansen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(43, 'MMI_3733', 'Mac Milelr', 'Mac@Miller.com', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(44, 'SDO_8139', 'Snoop Dogg', 'Snoop@Dogg.com', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(45, 'NNA_7726', 'Navn Navnesen', 'Navn@Navnesen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(48, 'TES_7362', 'TESTER123', 'TESTER123@test.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(50, 'WKH_5717', 'Wiz Khalifa', 'Wiz@Khalifa.com', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(51, 'EMI_4257', 'Eminem', 'Eminem@Eminem.com', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(52, 'CB._7324', 'Cardi B.', 'Cardi@B.com', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(53, 'JLU_2056', 'Joyner Lucas', 'Joyner@Lucas.com', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(54, 'CBR_8824', 'Chris Brown', 'Chris@Brown.com', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(55, '123_1260', 'Helle Christensen', 'Helle@Hotmail.dk', '+45 12 34 56 78', 0, 3, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', NULL),
(56, 'QWE_7222', 'Børge Keld', 'Børge@Hotmail.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(57, 'ASD_4091', 'Jonas Stenger', 'Jonas@Hotmail.dk', '+45 12 34 56 78', 0, 3, '688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6', NULL),
(58, 'ZXC_3407', 'zxc', 'zxc', '+45 ', 0, 3, '657f18518eaa2f41307895e18c3ba0d12d97b8a23c6de3966f52c6ba39a07ee4', NULL),
(59, 'RTY_4322', 'rty', 'rty', '+45 ', 0, 3, '2ec9b234f9794947d51f3528eb36c37d340f7da1d4ca00030649aabd3172bb5b', NULL),
(60, 'GHJ_7811', 'ghj', 'ghj', '+45 ', 0, 3, '2f75ad19416b54cdf23bf37d58650b4414ce75a6a3694b18ad703ef682775cef', NULL),
(61, 'SDF_4974', 'sdfg', 'sdfg', '+45 ', 0, 3, '11cd8a380e8d5fd3ac47c1f880390341d40b11485e8ae946d8fa3d466f23fe89', NULL),
(62, 'FGH_9972', 'fghj', 'fghj', '+45 ', 0, 3, 'f1eeaec73d2efec32e94842f0f42b643ec1511ca4b14e37b2a9c79bf4dc136ad', NULL),
(63, 'GHJ_6694', 'ghjk', 'ghjk', '+45 ', 0, 3, 'b31d2e73cf2b013e59a63dc6db0c9f5e3c218eb8167f428af17d8be83c330898', NULL),
(64, 'JKL_6740', 'jkl', 'jkl', '+45 ', 0, 3, '268f277c6d766d31334fda0f7a5533a185598d269e61c76a805870244828a5f1', NULL),
(65, 'IOP_5165', 'iop', 'iop', '+45 ', 0, 3, '18fd1bbc0207603d84f9cd6434b477baa88d8636459c18520b2488a79249fe68', NULL),
(66, 'KLÆ_2497', 'klæ', 'klæ', '+45 ', 0, 3, '56c2ac29439142a42ce364cb7d1e1e82581cb29c0cdadc0e6fae66ef7c04a3b6', NULL),
(67, 'VBM_4699', 'vbm', 'vbm', '+45 ', 0, 3, '111b05a45b89d8d16c195dba0da3aa7a9a516eecfe11e06daa7477627f27cfdb', NULL),
(68, 'DFH_5747', 'dfh', 'dfh', '+45 ', 0, 3, '0557da73fb444cd64425fcf9706c83dac610419e5a8cbd86934af9f453911052', NULL),
(69, 'DFJ_5505', 'dfj', 'dfj', '+45 ', 0, 3, '849a1771f210ab95cc09cbfeced75eb8a64f48f0a47b04e00caec71bdbf9782d', NULL),
(70, 'HJÆ_2372', 'hjæ', 'hjæ', '+45 ', 0, 3, 'b0de3f7330abcf1de525943542e5c7d5c774ed12d8410df9c50e5806339ea9d6', NULL),
(72, 'QW_2604', 'qw', 'qw', '+45 ', 0, 3, 'd876d59095f13054c120f77202c5378aa25d7787d4adf70980dbb3f2a7125ac1', NULL),
(73, 'WE_8496', 'we', 'we', '+45 ', 0, 3, 'dc7c811b9561739d9b75bb3e9e1715970a868834e62251b0b9ca02e74d0f42c9', NULL),
(74, 'ER_6091', 'er', 'er', '+45 ', 0, 3, 'cc7e4412564ba8a761bd32ab4cc6086bac3c2c9e580367e0b0eb32a4316f9154', NULL),
(75, 'RT_7596', 'rt', 'rt', '+45 ', 0, 3, 'cdffd5dd8ca8126c0482ba994814b9014cc9e973435d399f1cf1f69479e6b907', NULL),
(76, 'TY_9196', 'ty', 'ty', '+45 ', 0, 3, '4f9db7f8e5068a3ed09c4bdf2ddd980a290126b497155aba1b4a385622d13144', NULL),
(77, 'YU_7570', 'yu', 'yu', '+45 ', 0, 3, '5109f6dc636d70687d8b270014344827f75164ff2aa421def3df6812df33181b', NULL),
(78, 'UI_1013', 'ui', 'ui', '+45 ', 0, 3, 'd3ef7de562f9a4a34a9a0b05a112955fdecdd0102c3faae5eeb03a195091a5e4', NULL),
(79, 'IO_1045', 'io', 'io', '+45 ', 0, 3, '4021fadf187fd2c8277aad0fbc5e8fc4e7f1c75fbb38b6337160f125444790b2', NULL),
(80, 'OP_3442', 'op', 'op', '+45 ', 0, 3, '037aeaeaf4bbf26ddabe7256a8294dc52da48d575a1247b5c2598c47de7aebab', NULL),
(81, 'PÅ_9076', 'på', 'på', '+45 ', 0, 3, 'e14241b8cf7ac93aca2d1f9ab794f68114f23ae9f4cd33ac0219c1ce044c2d1e', NULL),
(82, 'NM_4955', 'nm', 'nm', '+45 ', 0, 3, '2ca7289b5248632c8fe5386b972e8fde6585068c5cb8e2948489e10e7be6d4d8', NULL),
(83, 'AS_5955', 'as', 'as', '+45 ', 0, 3, 'f4bf9f7fcbedaba0392f108c59d8f4a38b3838efb64877380171b54475c2ade8', NULL),
(86, 'FG_8815', 'fg', 'fg', '+45 ', 0, 3, 'c380779f6175766fdbe90940851fff3995d343c63bbb82f816843c1d5100865e', NULL),
(87, 'GH_5008', 'gh', 'gh', '+45 ', 0, 3, 'fb2b7fce0940161406a6aa3e4d8b4aa6104014774ffa665743f8d9704f0eb0ec', NULL),
(88, 'HJ_8945', 'hj', 'hj', '+45 ', 0, 3, 'ec77807ae750d94151d4ff049868ba2719ff6d24fd87d96ffef72fd56d58cf82', NULL),
(89, 'JK_1324', 'jk', 'jk', '+45 ', 0, 3, '31b25869b39f1baa9e7fc279255901b696c36629e57294d4455f479534139852', NULL),
(90, 'KL_2535', 'kl', 'kl', '+45 ', 0, 3, 'd3f3fa6892497db10a2417fce9b553464cc5d07718419de8b67e73e460c7daab', NULL),
(91, 'LÆ_5927', 'læ', 'læ', '+45 ', 0, 3, '70f72e8d10dde711e88ebe06081ccf63a0556984991e5ac1b9236561fc41273b', NULL),
(92, 'ÆØ_5740', 'æø', 'æø', '+45 ', 0, 3, '529908270c72e6190bf68714951f93d7b698c9d377faf633ebb4a665367596dd', NULL),
(93, 'ZX_5416', 'zx', 'zx', '+45 ', 0, 3, 'b2ab54fd83e5770a4f755bd8d556a8b0815ad072db3cd9bae4a86827b995edee', NULL),
(94, 'XC_7178', 'xc', 'xc', '+45 ', 0, 3, '207f5c1d8a3ec09f296b468caaa73f5900e1b2d668e05dfa4dcc638b1e2d868d', NULL),
(95, 'CV_5901', 'cv', 'cv', '+45 ', 0, 3, '29cdee48e28d8104186513c96be32955f6203cffa61833e36a88a37ecbff7989', NULL),
(96, 'VB_9663', 'vb', 'vb', '+45 ', 0, 3, '88d2f47e5eec541d907a3951ea1586732930d4a84510624b48c5e259c51d139b', NULL),
(97, 'BN_4912', 'bn', 'bn', '+45 ', 0, 3, 'c81b021331344adcdd57a84413824fe14faa33769d9982e13d00c260e643b0f7', NULL),
(98, 'SJO_9691', 'Simone Johansen', 'Simone@Johansen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(99, 'SJE_3069', 'Simon Jensen', 'Simon@Jensen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(100, 'THA_1024', 'Tobias Hansen', 'Tobias@Hansen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(101, 'AMS', 'Tobi', 'Tobi@Mail.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(102, 'YOL_4087', 'Yvonne Olsen', 'Yvonne@Olsen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(103, 'JJE_5809', 'Jakob Jensen', 'Jakob@Jensen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(104, 'DVE_2751', 'Daniel Venders', 'Daniel@Venders.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(105, 'HHA_7742', 'Hans Hansen', 'Hans@Hansen.dk', '+45 ', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(106, 'PHA_4700', 'Peter Hansen', 'Peter@Hansen.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(107, 'MHE_1821', 'Mads Heilberg', 'Mads.Heilberg@gmail.com', '+45 12 34 56 78', 1, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', 'WlnBc8dUUKuMK2LFlglJVkewonCC1a6mKVYt5cfEXXOJoHMlF4dbp1L0aUIKwDw4cvQ3quRrqcC'),
(108, 'OHE_7263', 'Ole Henriksen', 'Ole@Henrikes1.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(109, 'OHE_8911', 'Ole Henriksen', 'Ole@Henrikes2.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(111, 'OHE_7347', 'Ole Henriksen', 'Ole@Henrikes4.dk', '+45 12 34 56 78', 0, 3, '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', NULL),
(112, 'PJØ_5979', 'Peter Jørgensen', 'Peter@xn--jrgesen-q1a.dk', '+45 12 34 56 78', 0, 3, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(113, 'BNI_6503', 'Brian Nielsen', 'Brian@Hotmail.dk', '+45 12 34 56 78', 0, 3, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(114, 'KJE_7347', 'Knud Jensen', 'Knud@Hotmail.dk', '+45 12 34 56 78', 0, 3, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(115, 'MKN_6800', 'Mia Knudsen', 'Mia@Yahoo.dk', '+45 12 34 56 78', 0, 3, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(116, 'SAM_4897', 'Simone Amager', 'Simone@Yahoo.dk', '+45 12 34 56 78', 0, 3, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL),
(117, 'SJØ_1585', 'Simon Jørgensen', 'Simon@Hotmail.dk', '+45 12 34 56 78', 0, 3, 'ce91f4454b670f985d46d507ef016b0e17aa47d12586f3e78cde78778817e4ce', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borgere`
--
ALTER TABLE `borgere`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeregistrations`
--
ALTER TABLE `timeregistrations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `borgerId` (`borgerId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `borgere`
--
ALTER TABLE `borgere`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `timeregistrations`
--
ALTER TABLE `timeregistrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `borgere`
--
ALTER TABLE `borgere`
  ADD CONSTRAINT `borgere_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`);

--
-- Constraints for table `timeregistrations`
--
ALTER TABLE `timeregistrations`
  ADD CONSTRAINT `timeregistrations_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `timeregistrations_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `timeregistrations_ibfk_3` FOREIGN KEY (`borgerId`) REFERENCES `borgere` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
