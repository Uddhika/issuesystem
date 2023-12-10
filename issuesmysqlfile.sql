-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: issues
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `all_issues`
--

DROP TABLE IF EXISTS all_issues;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE all_issues (
  id bigint NOT NULL,
  idate varchar(255) DEFAULT NULL,
  idesc varchar(255) DEFAULT NULL,
  iname varchar(255) DEFAULT NULL,
  issuestatus varchar(255) DEFAULT NULL,
  itype varchar(255) DEFAULT NULL,
  statusid varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_issues`
--

LOCK TABLES all_issues WRITE;
/*!40000 ALTER TABLE all_issues DISABLE KEYS */;
/*!40000 ALTER TABLE all_issues ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `allissues_views`
--

DROP TABLE IF EXISTS allissues_views;
/*!50001 DROP VIEW IF EXISTS allissues_views*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `allissues_views` AS SELECT 
 1 AS isid,
 1 AS isdate,
 1 AS isdesc,
 1 AS isname,
 1 AS istatus,
 1 AS istype,
 1 AS isstatus*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `issue_with_status_view`
--

DROP TABLE IF EXISTS issue_with_status_view;
/*!50001 DROP VIEW IF EXISTS issue_with_status_view*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `issue_with_status_view` AS SELECT 
 1 AS issueid,
 1 AS issue_name,
 1 AS issue_description,
 1 AS issue_date,
 1 AS issue_type,
 1 AS statusid,
 1 AS issue_status*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS issues;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE issues (
  issueid bigint NOT NULL AUTO_INCREMENT,
  issue_date varchar(255) DEFAULT NULL,
  issue_description varchar(255) DEFAULT NULL,
  issue_name varchar(255) DEFAULT NULL,
  issue_status varchar(255) DEFAULT NULL,
  issue_type varchar(255) DEFAULT NULL,
  PRIMARY KEY (issueid)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues`
--

LOCK TABLES issues WRITE;
/*!40000 ALTER TABLE issues DISABLE KEYS */;
INSERT INTO issues VALUES (16,'12/9/2023','Can\'t connect to internet','Network Issue','Resolved','Bug'),(17,'12/9/2023','add a Christmas theme to website','Add Christmas Theme ','Open','Improvement'),(26,'12/10/2023','MySQL server is not working. please fix it','MySQL server is not working','In-Progress','Bug'),(27,'12/10/2023','How do i configure db in mysql?','Configure DB in MySQL','Waiting On Client','Question'),(28,'12/10/2023','IntelliJ Dependency Error ','IntelliJ Dependency Error','Open','Bug');
/*!40000 ALTER TABLE issues ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issuestatus`
--

DROP TABLE IF EXISTS issuestatus;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE issuestatus (
  statusid int NOT NULL AUTO_INCREMENT,
  issueid int DEFAULT NULL,
  issue_status varchar(100) DEFAULT NULL,
  PRIMARY KEY (statusid)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issuestatus`
--

LOCK TABLES issuestatus WRITE;
/*!40000 ALTER TABLE issuestatus DISABLE KEYS */;
INSERT INTO issuestatus VALUES (27,16,'Open'),(28,17,'Open'),(29,16,'In-Progress'),(36,16,'Waiting On Client'),(37,16,'Resolved'),(44,26,'Open'),(45,26,'In-Progress'),(46,27,'Open'),(47,27,'In-Progress'),(48,27,'Waiting On Client'),(49,28,'Open');
/*!40000 ALTER TABLE issuestatus ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `allissues_views`
--

/*!50001 DROP VIEW IF EXISTS allissues_views*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=root@localhost SQL SECURITY DEFINER */
/*!50001 VIEW allissues_views AS select issues.issueid AS isid,issues.issue_date AS isdate,issues.issue_description AS isdesc,issues.issue_name AS isname,issues.issue_status AS istatus,issues.issue_type AS istype,issuestatus.statusid AS isstatus from (issues left join issuestatus on((issues.issueid = issuestatus.issueid))) union select issues.issueid AS isid,issues.issue_date AS isdate,issues.issue_description AS isdesc,issues.issue_name AS isname,issues.issue_status AS istatus,issues.issue_type AS istype,issuestatus.statusid AS isstatus from (issuestatus left join issues on((issues.issueid = issuestatus.issueid))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `issue_with_status_view`
--

/*!50001 DROP VIEW IF EXISTS issue_with_status_view*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=root@localhost SQL SECURITY DEFINER */
/*!50001 VIEW issue_with_status_view AS select i.issueid AS issueid,i.issue_name AS issue_name,i.issue_description AS issue_description,i.issue_date AS issue_date,i.issue_type AS issue_type,s.statusid AS statusid,s.issue_status AS issue_status from (issues i left join issuestatus s on((i.issueid = s.issueid))) order by i.issueid desc,s.statusid desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10 20:09:00
