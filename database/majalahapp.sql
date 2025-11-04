CREATE DATABASE  IF NOT EXISTS `majalahapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `majalahapp`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: majalahapp
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `histori_majalah`
--

DROP TABLE IF EXISTS `histori_majalah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `histori_majalah` (
  `id_histori` int NOT NULL AUTO_INCREMENT,
  `id_majalah` int NOT NULL,
  `id_pengunjung` int NOT NULL,
  PRIMARY KEY (`id_histori`),
  KEY `id_majalah` (`id_majalah`),
  KEY `id_pengunjung` (`id_pengunjung`),
  CONSTRAINT `histori_majalah_ibfk_1` FOREIGN KEY (`id_majalah`) REFERENCES `rakmajalah` (`id_majalah`) ON DELETE CASCADE,
  CONSTRAINT `histori_majalah_ibfk_2` FOREIGN KEY (`id_pengunjung`) REFERENCES `pengunjung` (`id_pengunjung`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `histori_majalah`
--

LOCK TABLES `histori_majalah` WRITE;
/*!40000 ALTER TABLE `histori_majalah` DISABLE KEYS */;
INSERT INTO `histori_majalah` VALUES (1,1,2),(2,2,4),(3,3,4),(4,1,5),(5,2,5),(6,2,11),(7,3,11),(8,1,14),(9,1,15),(10,2,15),(12,2,16),(13,3,16);
/*!40000 ALTER TABLE `histori_majalah` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengunjung`
--

DROP TABLE IF EXISTS `pengunjung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengunjung` (
  `id_pengunjung` int NOT NULL AUTO_INCREMENT,
  `nm_pengunjung` varchar(50) DEFAULT NULL,
  `pekerjaan` varchar(50) DEFAULT NULL,
  `alamat` varchar(250) DEFAULT NULL,
  `tgl_kunjung` date DEFAULT NULL,
  PRIMARY KEY (`id_pengunjung`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengunjung`
--

LOCK TABLES `pengunjung` WRITE;
/*!40000 ALTER TABLE `pengunjung` DISABLE KEYS */;
INSERT INTO `pengunjung` VALUES (1,'Hafidz','Mahasiswa','Handil Bakti','2025-01-10'),(2,'Adi','Petani','Bandung','2025-01-10'),(3,'Galuh','Swasta','Kayutangi','2025-01-10'),(4,'Meal','PNS','Banjar','2025-01-20'),(5,'Nafi','PNS','Banjarbaru','2025-01-21'),(11,'Uwa','PNS','Kayutangi','2025-01-21'),(14,'Daffa','Admin Garuda','Jl. Belitung No 13','2025-01-22'),(15,'Awi','Swasta','Ngawi','2025-01-22'),(16,'Waluh','Pengangguran','Ngawi','2025-01-22');
/*!40000 ALTER TABLE `pengunjung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rakmajalah`
--

DROP TABLE IF EXISTS `rakmajalah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rakmajalah` (
  `id_majalah` int NOT NULL AUTO_INCREMENT,
  `nm_majalah` varchar(50) DEFAULT NULL,
  `deskripsi` varchar(250) DEFAULT NULL,
  `gambar_demo` varchar(250) DEFAULT NULL,
  `jml_hal` int DEFAULT NULL,
  `tgl_periode` varchar(50) DEFAULT NULL,
  `lokasigambar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_majalah`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rakmajalah`
--

LOCK TABLES `rakmajalah` WRITE;
/*!40000 ALTER TABLE `rakmajalah` DISABLE KEYS */;
INSERT INTO `rakmajalah` VALUES (1,'Aura','Majalah Aura memang jadi salah satu majalah remaja wanita populer di masanya. Selain dari beritanya, Aura juga memiliki ajang pencarian model tahunan, bertajuk Aura Sampul yang banyak diminati oleh semua wanita.','1738890597222_IMG_20250123_111027.jpg',208,'Februari - Maret 2007','/uploads/1738890597222_IMG_20250123_111027.jpg'),(2,'Komputek','Majalah Komputek berisi tentang produk-produk teknologi terbaru. Juga beberapa berita mengenai teknologi informasi.','1738890832038_IMG_20250123_111101.jpg',404,'Maret - Juli 2007','/uploads/1738890832038_IMG_20250123_111101.jpg'),(3,'Lezat Koki Saji','Majalah Lezat Koki Saji membahas beragam aneka masakan dan kuliner. Serta cara penyajian menu hidang makanan yang menarik.','1738891012390_IMG_20250123_111226.jpg',328,'November 2006 - Januari 2007','/uploads/1738891012390_IMG_20250123_111226.jpg'),(4,'Bola','Majalah Bola membahas tentang berita olahraga baik itu turnamen bola, bulu tangkis, dan lain-lain. Juga membahas tentang artis terkenal dibidang olahraga','1738891144486_IMG_20250123_111259.jpg',774,'April - Agustus 2007','/uploads/1738891144486_IMG_20250123_111259.jpg'),(5,'Nyata','Majalah Nyata berisi tentang berita mengenai artis yang ada di indonesia maupun luar negeri. Juga isi majalah nyata berisi curhatan, info lowongan kerja, serta promosi film, dan lain-lain','1738891356269_IMG_20250123_111449.jpg',504,'Januari - Februari 2007','/uploads/1738891356269_IMG_20250123_111449.jpg');
/*!40000 ALTER TABLE `rakmajalah` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-16 22:38:51
