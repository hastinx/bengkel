-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_456tuvqwe123
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `bkl_balance`
--

DROP TABLE IF EXISTS `bkl_balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_balance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `deskripsi` varchar(65) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `piutang` int DEFAULT NULL,
  `debet` int DEFAULT NULL,
  `kredit` int DEFAULT NULL,
  `log_createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `log_act` varchar(200) DEFAULT NULL,
  `log_createdBy` varchar(45) DEFAULT NULL,
  `is_deleted` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_balance`
--

LOCK TABLES `bkl_balance` WRITE;
/*!40000 ALTER TABLE `bkl_balance` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_balance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_cart`
--

DROP TABLE IF EXISTS `bkl_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kode_produk` varchar(45) DEFAULT NULL,
  `harga_satuan` int DEFAULT NULL,
  `stok_terjual` int DEFAULT NULL,
  `total_harga` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_cart`
--

LOCK TABLES `bkl_cart` WRITE;
/*!40000 ALTER TABLE `bkl_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_mst_customer`
--

DROP TABLE IF EXISTS `bkl_mst_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_mst_customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(65) DEFAULT NULL,
  `hp` varchar(45) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `is_deleted` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedBy` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_mst_customer`
--

LOCK TABLES `bkl_mst_customer` WRITE;
/*!40000 ALTER TABLE `bkl_mst_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_mst_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_mst_kendaraan`
--

DROP TABLE IF EXISTS `bkl_mst_kendaraan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_mst_kendaraan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `merk` varchar(45) DEFAULT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `is_deleted` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedBy` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_mst_kendaraan`
--

LOCK TABLES `bkl_mst_kendaraan` WRITE;
/*!40000 ALTER TABLE `bkl_mst_kendaraan` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_mst_kendaraan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_mst_layanan`
--

DROP TABLE IF EXISTS `bkl_mst_layanan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_mst_layanan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(65) DEFAULT NULL,
  `harga` int DEFAULT NULL,
  `is_deleted` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedBy` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_mst_layanan`
--

LOCK TABLES `bkl_mst_layanan` WRITE;
/*!40000 ALTER TABLE `bkl_mst_layanan` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_mst_layanan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_mst_mekanik`
--

DROP TABLE IF EXISTS `bkl_mst_mekanik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_mst_mekanik` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `hp` varchar(45) DEFAULT NULL,
  `umur` int DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `keahlian` varchar(45) DEFAULT NULL,
  `is_deleted` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedBy` int DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_mst_mekanik`
--

LOCK TABLES `bkl_mst_mekanik` WRITE;
/*!40000 ALTER TABLE `bkl_mst_mekanik` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_mst_mekanik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_mst_produk`
--

DROP TABLE IF EXISTS `bkl_mst_produk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_mst_produk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) DEFAULT NULL,
  `kode` varchar(45) DEFAULT NULL,
  `harga_modal` varchar(45) DEFAULT NULL,
  `stok_input` int DEFAULT NULL,
  `stok` int DEFAULT NULL,
  `stok_terjual` int DEFAULT NULL,
  `stok_sisa` int DEFAULT NULL,
  `is_deleted` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedBy` int DEFAULT NULL,
  `harga_jual` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_mst_produk`
--

LOCK TABLES `bkl_mst_produk` WRITE;
/*!40000 ALTER TABLE `bkl_mst_produk` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_mst_produk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_transaction`
--

DROP TABLE IF EXISTS `bkl_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(65) DEFAULT NULL,
  `customer` varchar(45) DEFAULT NULL,
  `noHp` varchar(45) DEFAULT NULL,
  `alamat` varchar(200) DEFAULT NULL,
  `kendaraan` varchar(45) DEFAULT NULL,
  `no_plat` varchar(25) DEFAULT NULL,
  `km_masuk` int DEFAULT NULL,
  `km_keluar` int DEFAULT NULL,
  `tipe_transaksi` varchar(25) DEFAULT NULL,
  `status_pembayaran` varchar(25) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(45) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedBy` varchar(45) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `deletedBy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_transaction`
--

LOCK TABLES `bkl_transaction` WRITE;
/*!40000 ALTER TABLE `bkl_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_transaction_mekanik`
--

DROP TABLE IF EXISTS `bkl_transaction_mekanik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_transaction_mekanik` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kode_transaksi` varchar(45) DEFAULT NULL,
  `mekanik` varchar(45) DEFAULT NULL,
  `ongkos` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_transaction_mekanik`
--

LOCK TABLES `bkl_transaction_mekanik` WRITE;
/*!40000 ALTER TABLE `bkl_transaction_mekanik` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_transaction_mekanik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_transaction_produk`
--

DROP TABLE IF EXISTS `bkl_transaction_produk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_transaction_produk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kode_transaksi` varchar(45) DEFAULT NULL,
  `kode_produk` varchar(45) DEFAULT NULL,
  `stok_terjual` int DEFAULT NULL,
  `total_harga` int DEFAULT NULL,
  `harga_satuan` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_transaction_produk`
--

LOCK TABLES `bkl_transaction_produk` WRITE;
/*!40000 ALTER TABLE `bkl_transaction_produk` DISABLE KEYS */;
/*!40000 ALTER TABLE `bkl_transaction_produk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkl_users`
--

DROP TABLE IF EXISTS `bkl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkl_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) DEFAULT NULL,
  `password` text,
  `email` varchar(45) DEFAULT NULL,
  `refresh_token` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkl_users`
--

LOCK TABLES `bkl_users` WRITE;
/*!40000 ALTER TABLE `bkl_users` DISABLE KEYS */;
INSERT INTO `bkl_users` VALUES (1,'admin','$2b$10$cPwRF.jzsxE4IvaAH6K0qOCLb72Sbk9qSDsKCN7qrIPMrtn53Gbr2','hastinxv@gmail.com',NULL,NULL,NULL),(2,'dev','$2b$10$hZOCDdoenfefJUQwsjHSxuI0DIbUDg91/qb7IkmHhwoQiVKWQS5/S','dev@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiZGV2QGdtYWlsLmNvbSIsImlhdCI6MTY5NTU0OTU1NiwiZXhwIjoxNjk1NjM1OTU2fQ.fQBC2s3xGc8H-DB5_1QPp5upDezZWWV3OyuJdlsc74Y','2023-09-17 08:53:41',NULL);
/*!40000 ALTER TABLE `bkl_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-27 20:29:40
