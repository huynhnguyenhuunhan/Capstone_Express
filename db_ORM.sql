/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `noi_dung` varchar(50) NOT NULL,
  `nguoi_dung_id` int NOT NULL,
  `ngay_binh_luan` datetime NOT NULL,
  `hinh_id` int NOT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `hinh_id` (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(50) NOT NULL,
  `nguoi_dung_id` int NOT NULL,
  `duong_dan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mo_ta` varchar(50) NOT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `ngay_luu` datetime DEFAULT NULL,
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `mat_khau` varchar(100) NOT NULL,
  `ho_ten` varchar(50) NOT NULL,
  `tuoi` int NOT NULL,
  `anh_dai_dien` varchar(100) NOT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `noi_dung`, `nguoi_dung_id`, `ngay_binh_luan`, `hinh_id`) VALUES
(1, 'xịn', 1, '2023-10-10 00:00:00', 1);
INSERT INTO `binh_luan` (`binh_luan_id`, `noi_dung`, `nguoi_dung_id`, `ngay_binh_luan`, `hinh_id`) VALUES
(2, 'xịn', 3, '2023-11-10 00:00:00', 2);
INSERT INTO `binh_luan` (`binh_luan_id`, `noi_dung`, `nguoi_dung_id`, `ngay_binh_luan`, `hinh_id`) VALUES
(3, 'xịn', 2, '2023-10-10 00:00:00', 3);
INSERT INTO `binh_luan` (`binh_luan_id`, `noi_dung`, `nguoi_dung_id`, `ngay_binh_luan`, `hinh_id`) VALUES
(4, 'xịn', 6, '2023-11-10 00:00:00', 4),
(5, 'xịn', 3, '2023-11-10 00:00:00', 5),
(6, 'xịn', 4, '2023-10-10 00:00:00', 6),
(7, 'xịn', 5, '2023-11-10 00:00:00', 7),
(8, 'xịn', 7, '2023-10-10 00:00:00', 8);

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `nguoi_dung_id`, `duong_dan`, `mo_ta`) VALUES
(1, 'Con mèo', 1, 'https://www.pinterest.com/pin/847099011137325886/', 'Hình con mèo');
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `nguoi_dung_id`, `duong_dan`, `mo_ta`) VALUES
(2, 'Con chó', 2, 'https://hoangthuong.net/hinh-anh-cho-con-sieu-de-thuong/', 'Hình con chó');
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `nguoi_dung_id`, `duong_dan`, `mo_ta`) VALUES
(3, 'Siêu nhân', 3, 'https://thuthuatnhanh.com/anh-nguoi-sat-iron-man/', 'Hình iroman');
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `nguoi_dung_id`, `duong_dan`, `mo_ta`) VALUES
(4, 'Luffy', 4, 'https://mega.com.vn/70-hinh-nen-luffy-gear-5-cuc-ngau-cho-may-tinh-laptop-dien-thoai.html', 'Hình luffy'),
(5, 'Zoro', 5, 'https://thuthuatphanmem.vn/hinh-anh-zoro-ngau-3d-tuyet-dep/', 'Hình zoro'),
(6, 'Sanij', 6, 'https://www.pinterest.com/pin/626844841868591238/', 'Hình sanij'),
(7, 'Conan', 7, 'https://www.pinterest.com/pin/852376666963518024/', 'Hình conan'),
(8, 'Doctor Strange', 8, 'https://www.pinterest.com/pin/300404237648988331/', 'Hình ảnh doctor Strange');

INSERT INTO `luu_anh` (`ngay_luu`, `nguoi_dung_id`, `hinh_id`) VALUES
('2023-10-10 00:00:00', 1, 1);
INSERT INTO `luu_anh` (`ngay_luu`, `nguoi_dung_id`, `hinh_id`) VALUES
('2023-10-23 00:00:00', 2, 1);
INSERT INTO `luu_anh` (`ngay_luu`, `nguoi_dung_id`, `hinh_id`) VALUES
('2023-10-19 00:00:00', 3, 2);
INSERT INTO `luu_anh` (`ngay_luu`, `nguoi_dung_id`, `hinh_id`) VALUES
('2023-10-08 00:00:00', 4, 2),
('2023-08-12 00:00:00', 5, 3),
('2023-10-10 00:00:00', 6, 3),
('2023-02-21 00:00:00', 7, 1),
('2023-01-13 00:00:00', 8, 2),
('2023-05-21 00:00:00', 9, 4),
('2023-01-13 00:00:00', 10, 5);

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'abc@gmail.com', '123', 'Nguyễn Văn A', 23, 'img1');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'kai@gmail.com', '123', 'Nguyễn Văn B', 24, 'img2');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'abc@gmail.com', '123', 'Nguyễn Văn C', 12, 'img3');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(4, 'bcd@gmail.com', '123', 'Nguyễn Văn D', 32, 'img4'),
(5, 'hoan@gmail.com', '123', 'Nguyễn Văn E', 31, 'img5'),
(6, 'tom@gmail.com', '123', 'Nguyễn A', 25, 'img6'),
(7, 'ken@gmail.com', '123', 'Nguyễn B', 30, 'img7'),
(8, 'nhan@gmail.com', '123', 'Nguyễn C', 15, 'img8'),
(9, 'tuan@gmail.com', '123', 'Nguyễn D', 22, 'img9'),
(10, 'nghia@gmail.com', '123', 'Nguyễn E', 21, 'img10');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;