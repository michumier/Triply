CREATE DATABASE  IF NOT EXISTS `triply` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `triply`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: triply
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `idactivity` int NOT NULL AUTO_INCREMENT,
  `iddestination` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `activitydate` date DEFAULT NULL,
  `starttime` time DEFAULT NULL,
  `endtime` time DEFAULT NULL,
  `location` varchar(300) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `category` enum('transport','accommodation','food','sightseeing','entertainment','other') DEFAULT 'other',
  `iscompleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idactivity`),
  KEY `iddestination` (`iddestination`),
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`iddestination`) REFERENCES `destinations` (`iddestination`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `iddestination` int NOT NULL AUTO_INCREMENT,
  `idtrip` int NOT NULL,
  `cityname` varchar(150) NOT NULL,
  `countryname` varchar(150) NOT NULL,
  `arrivaldate` date DEFAULT NULL,
  `departuredate` date DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `notes` text,
  `displayorder` int DEFAULT '0',
  PRIMARY KEY (`iddestination`),
  KEY `idtrip` (`idtrip`),
  CONSTRAINT `destinations_ibfk_1` FOREIGN KEY (`idtrip`) REFERENCES `trips` (`idtrip`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tripparticipants`
--

DROP TABLE IF EXISTS `tripparticipants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tripparticipants` (
  `idparticipant` int NOT NULL AUTO_INCREMENT,
  `idtrip` int NOT NULL,
  `iduser` int NOT NULL,
  `role` enum('owner','editor','viewer') DEFAULT 'viewer',
  `joinedat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idparticipant`),
  UNIQUE KEY `unique_trip_user` (`idtrip`,`iduser`),
  KEY `iduser` (`iduser`),
  CONSTRAINT `tripparticipants_ibfk_1` FOREIGN KEY (`idtrip`) REFERENCES `trips` (`idtrip`) ON DELETE CASCADE,
  CONSTRAINT `tripparticipants_ibfk_2` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tripparticipants`
--

LOCK TABLES `tripparticipants` WRITE;
/*!40000 ALTER TABLE `tripparticipants` DISABLE KEYS */;
/*!40000 ALTER TABLE `tripparticipants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `idtrip` int NOT NULL AUTO_INCREMENT,
  `iduserowner` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `budget` decimal(10,2) DEFAULT NULL,
  `coverimage` varchar(500) DEFAULT NULL,
  `status` enum('planning','confirmed','ongoing','completed','cancelled') DEFAULT 'planning',
  `createdat` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idtrip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL,
  `username` varchar(90) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `fullname` varchar(150) DEFAULT NULL,
  `profileimage` varchar(500) DEFAULT NULL,
  `createdat` datetime DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(200) NOT NULL,
  `lastaccess` datetime DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `iduser_UNIQUE` (`iduser`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@triply.com','admin',NULL,'2025-12-07 17:55:50','admin',NULL,1),(2,'test','test@triply.com','Test User',NULL,'2025-12-07 18:14:54','$2a$11$LmDK8vSFNeHMZcaf7jwTCe.ueIq22xiog/O8rxeCNrVeGxFsegGoC',NULL,1),(3,'michu','michu@gmail.com','michumi',NULL,'2025-12-08 11:35:58','$2a$11$hesoLxzvDuhkiBgej3FnzeIJlYzCupVgZigxD9lSj57.GhFcc6Zea',NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-08 20:46:13
