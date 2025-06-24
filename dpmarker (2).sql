-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2025 at 02:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dpmarker`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(7, 'Caddles'),
(8, 'Car'),
(10, 'Shoes');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `coupon_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `discount` int(11) NOT NULL,
  `status` varchar(50) DEFAULT 'active',
  `valid_until` date DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `redeemedBy` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`coupon_id`, `vendor_id`, `title`, `discount`, `status`, `valid_until`, `created_date`, `redeemedBy`) VALUES
(36, 7, 'ZLK', 78, 'active', '9999-12-31', '2025-06-16 06:59:16', 'ali@example.com'),
(37, 7, 'GFYH', 67, 'active', '9999-12-31', '2025-06-16 06:59:16', 'ambreennd@gmail.com'),
(38, 7, 'TY', 12, 'active', '9999-12-31', '2025-06-16 06:59:16', 'ambreennd@gmail.com'),
(39, 7, 'HU', 34, 'active', '9999-12-31', '2025-06-16 06:59:16', 'sarah2@gmail.com'),
(40, 7, 'Jqq', 22, 'active', '9999-12-31', '2025-06-16 06:59:16', 'ambreennd@gmail.com'),
(41, 8, 'NU', 67, 'active', '9999-12-31', '2025-06-16 07:05:47', 'ambreennd@gmail.com'),
(42, 8, 'VYT', 32, 'active', '9999-12-31', '2025-06-16 07:05:47', 'ali@example.com'),
(43, 8, 'FG', 67, 'active', '9999-12-31', '2025-06-16 07:05:47', 'ambreennd@gmail.com'),
(44, 8, 'SEC', 18, 'active', '9999-12-31', '2025-06-16 07:05:47', 'ambreennd@gmail.com'),
(45, 8, 'HU', 48, 'active', '9999-12-31', '2025-06-16 07:05:47', 'ambreennd@gmail.com'),
(46, 8, 'HUs', 22, 'active', '9999-12-31', '2025-06-16 07:05:47', 'ali@example.com'),
(47, 9, 'NU', 67, 'active', '9999-12-31', '2025-06-16 08:07:15', 'ambreennd@gmail.com'),
(48, 9, 'JIS', 45, 'active', '9999-12-31', '2025-06-16 08:07:15', 'admin@example.com'),
(49, 9, 'NKFE', 56, 'active', '9999-12-31', '2025-06-16 08:07:15', 'ali@example.com'),
(50, 9, 'HI', 45, 'active', '9999-12-31', '2025-06-16 08:07:15', 'ali@example.com'),
(51, 9, 'IDE', 45, 'active', '9999-12-31', '2025-06-16 08:07:15', 'sarah2@gmail.com'),
(52, 9, 'DJO', 56, 'active', '9999-12-31', '2025-06-16 08:07:15', 'ambreennd@gmail.com'),
(53, 9, 'JKJODRF', 76, 'active', '9999-12-31', '2025-06-16 08:07:15', 'ali@example.com'),
(54, 9, 'SHWEU', 55, 'active', '9999-12-31', '2025-06-16 08:07:15', 'ali@example.com'),
(55, 9, 'IDEN', 34, 'active', '9999-12-31', '2025-06-16 08:07:15', 'ali@example.com'),
(56, 9, 'JI', 45, 'active', '9999-12-31', '2025-06-16 08:07:15', 'ambreennd@gmail.com'),
(57, 10, 'siAO', 89, 'active', '9999-12-31', '2025-06-17 13:25:06', 'admin@example.com'),
(58, 10, 'sw', 21, 'active', '9999-12-31', '2025-06-17 13:25:06', 'sarah2@gmail.com'),
(59, 10, 'sa', 89, 'active', '9999-12-31', '2025-06-17 13:25:06', 'ali@example.com'),
(60, 10, 'sa', 89, 'active', '9999-12-31', '2025-06-17 13:25:06', 'omreenaaltaf@gmail.com'),
(61, 10, 'siAO', 89, 'active', '9999-12-31', '2025-06-17 13:25:06', 'admin@example.com'),
(84, 14, 'siAO', 89, 'active', '9999-12-31', '2025-06-18 09:55:39', NULL),
(85, 14, 'JS*', 32, 'active', '9999-12-31', '2025-06-18 09:55:39', NULL),
(86, 14, 'AHU', 12, 'active', '9999-12-31', '2025-06-18 09:55:39', 'admin@example.com'),
(87, 14, 'HUS', 23, 'active', '9999-12-31', '2025-06-18 09:55:39', NULL),
(88, 15, 'FETTR', 89, 'active', '9999-12-31', '2025-06-18 09:58:19', NULL),
(89, 15, 'HUIMM', 23, 'active', '9999-12-31', '2025-06-18 09:58:19', 'omreenaaltaf@gmail.com'),
(90, 15, 'KSAO', 46, 'active', '9999-12-31', '2025-06-18 09:58:19', 'sarah2@gmail.com'),
(91, 15, 'AJIAS', 30, 'active', '9999-12-31', '2025-06-18 09:58:19', 'admin@example.com'),
(92, 15, 'JUSA', 23, 'active', '9999-12-31', '2025-06-18 09:58:19', 'sarah2@gmail.com'),
(93, 15, 'DECSIO', 70, 'active', '9999-12-31', '2025-06-18 09:58:19', NULL),
(94, 15, 'BAHH', 12, 'active', '9999-12-31', '2025-06-18 09:58:19', 'admin@example.com'),
(101, 17, 'FETTR', 89, 'active', '9999-12-31', '2025-06-19 11:51:35', NULL),
(102, 17, 'MINI', 78, 'active', '9999-12-31', '2025-06-19 11:51:35', NULL),
(103, 17, 'SAJI', 12, 'active', '9999-12-31', '2025-06-19 11:51:35', 'omreenaaltaf@gmail.com'),
(104, 17, 'AKOS', 49, 'active', '9999-12-31', '2025-06-19 11:51:35', NULL),
(105, 17, 'KSLA', 12, 'active', '9999-12-31', '2025-06-19 11:51:35', NULL),
(106, 17, 'SALK', 90, 'active', '9999-12-31', '2025-06-19 11:51:35', 'omreenaaltaf@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `first_name` varchar(191) NOT NULL,
  `last_name` varchar(191) NOT NULL,
  `plan_name` varchar(191) NOT NULL,
  `total_amount` double NOT NULL,
  `payment_method` varchar(191) DEFAULT NULL,
  `shipping_address` varchar(191) DEFAULT NULL,
  `agreed_to_terms` tinyint(1) DEFAULT NULL,
  `agreed_to_privacy` tinyint(1) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `email`, `first_name`, `last_name`, `plan_name`, `total_amount`, `payment_method`, `shipping_address`, `agreed_to_terms`, `agreed_to_privacy`, `created_at`) VALUES
(1, 'replace-with-actual-user-id', 'sarah2@gmail.com', 'kihan', 'sarah', 'Basic Plan', 199, 'COD', 'kihan sarah', 1, 1, '2025-06-13 18:18:53.474'),
(2, 'user-001', 'user001@example.com', 'Ali', 'Khan', 'Gold Subscription', 499.99, 'COD', '123 Main Street, Lahore', 1, 1, '2025-06-13 20:55:51.257'),
(3, 'replace-with-actual-user-id', 'sarah2@gmail.com', 'kihan', 'sarah', 'Standard Plan', 399, 'COD', 'kihan sarah', 1, 1, '2025-06-13 21:20:03.789'),
(4, 'replace-with-actual-user-id', 'sarah2@gmail.com', 'kihan', 'sarah', 'Standard Plan', 399, 'COD', 'kihan sarah', 1, 1, '2025-06-16 15:11:08.630'),
(5, 'replace-with-actual-user-id', 'omreenaaltaf@gmail.com', 'refhan', 'Omreena', 'Basic Plan', 199, 'COD', 'refhan Omreena', 1, 1, '2025-06-16 15:12:42.217'),
(6, 'user-002\r\n', 'ambreennd@gmail.com', 'refhan', 'rehan', 'Standard Plan', 399, 'COD', 'refhan rehan', 1, 1, '2025-06-16 15:13:54.586'),
(7, 'replace-with-actual-user-id', 'admin@example.com', 'Ali', 'Khann', 'Basic Plan', 199, 'COD', 'Ali Khann', 1, 1, '2025-06-16 16:00:30.443'),
(8, 'replace-with-actual-user-id', 'sarah2@gmail.com', 'kihan', 'sarah', 'Basic Plan', 199, 'COD', 'kihan sarah', 1, 1, '2025-06-17 13:05:12.195'),
(9, 'replace-with-actual-user-id', 'sarah2@gmail.com', 'kihan', 'sarah1221', 'Basic Plan', 199, 'COD', 'kihan sarah1221', 1, 1, '2025-06-17 16:51:18.098'),
(10, 'replace-with-actual-user-id', 'ali@example.com', 'Ali', 'Khann', 'Standard Plan', 399, 'COD', 'Ali Khann', 1, 1, '2025-06-17 16:57:05.975'),
(11, 'replace-with-actual-user-id', 'ambreennd@gmail.com', 'refhan', 'rehan', 'Standard Plan', 399, 'COD', 'refhan rehan', 1, 1, '2025-06-17 17:33:19.549'),
(12, 'replace-with-actual-user-id', 'omreenaaltaf@gmail.com', 'refhan', 'Omreena', 'Standard Plan', 399, 'COD', 'refhan Omreena', 1, 1, '2025-06-18 12:44:51.068'),
(13, 'replace-with-actual-user-id', 'admin@example.com', 'Ali', 'Khan', 'Standard Plan', 399, 'COD', 'Ali Khan', 1, 1, '2025-06-19 12:54:33.461'),
(14, 'replace-with-actual-user-id', 'alia@gmail.com', 'alia3434', 'Ligh', 'Standard Plan', 399, 'COD', 'alia3434 Ligh', 1, 1, '2025-06-19 16:25:15.620');

-- --------------------------------------------------------

--
-- Table structure for table `redeemed_coupons`
--

CREATE TABLE `redeemed_coupons` (
  `id` int(11) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `coupon_code` varchar(191) NOT NULL,
  `discount` float NOT NULL,
  `redeemed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `redeemed_coupons`
--

INSERT INTO `redeemed_coupons` (`id`, `user_id`, `coupon_code`, `discount`, `redeemed_at`) VALUES
(1, 'user-001', 'SAVE20', 0.2, '2025-06-13 20:20:49'),
(2, 'user-001', 'WELCOME10', 0.1, '2025-06-13 20:20:49'),
(3, 'user-002', 'FESTIVE15', 0.15, '2025-06-13 20:20:49');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `subsc_title` varchar(191) NOT NULL,
  `subsc_price` double NOT NULL,
  `subsc_image` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `subsc_title`, `subsc_price`, `subsc_image`) VALUES
(1, 'Basic Plan', 199, NULL),
(2, 'Standard Plan', 399, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `first_name` varchar(191) NOT NULL,
  `last_name` varchar(191) NOT NULL,
  `address` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `address`, `created_at`, `updated_at`) VALUES
('458c1846-6da8-47a5-b239-8dd7a04c41e8', 'alia@gmail.com', 'Alia', '', '', '2025-06-19 10:34:38', '2025-06-19 10:34:38'),
('4a76f0d7-069f-4a6e-b3bd-1a3074a7dd5e', 'sarah2@gmail.com', 'Sarah', 'Omreena', '123 Main Street', '2025-06-17 11:46:14', '2025-06-17 15:23:35'),
('b733c0fc-1098-41da-a8dc-c99b4238ae84', 'admin@example.com', 'Admin', '', '', '2025-06-17 12:09:24', '2025-06-17 12:09:24'),
('d4ec9169-7c97-4390-83d5-8e45d6d95715', 'omreenaaltaf@gmail.com', 'Omreenaaltaf', 'Khan', '123 Main Street', '2025-06-17 11:58:28', '2025-06-18 07:45:26'),
('user-001', 'ali@example.com', 'Ali', 'Khan', '123 Main Street', '2025-06-13 20:19:58', '2025-06-13 20:19:58'),
('user-002', 'ambreennd@gmail.com', 'Sana', 'Ahmed', '456 Park Lane', '2025-06-13 20:19:58', '2025-06-16 13:32:24');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `vendor_id` int(11) NOT NULL,
  `vendor_title` varchar(255) NOT NULL,
  `vendor_description` text DEFAULT NULL,
  `otp_code` varchar(20) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active',
  `commission_rate` decimal(5,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `vendor_img` varchar(255) DEFAULT NULL,
  `vendor_logo` varchar(255) DEFAULT NULL,
  `facebookLink` varchar(255) DEFAULT NULL,
  `whatsappLink` varchar(255) DEFAULT NULL,
  `twitterLink` varchar(255) DEFAULT NULL,
  `featured` tinyint(4) DEFAULT 0,
  `created_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`vendor_id`, `vendor_title`, `vendor_description`, `otp_code`, `email`, `phone`, `address`, `status`, `commission_rate`, `payment_method`, `vendor_img`, `vendor_logo`, `facebookLink`, `whatsappLink`, `twitterLink`, `featured`, `created_date`) VALUES
(7, 'Caddle', 'Caddle Baby — Gentle Comfort for Your Little One\r\n\r\nCaddle Baby is designed to provide cozy support and soothing comfort to newborns and infants. Made from ultra-soft, breathable materials, it gently cradles your baby, helping them feel safe and secure. Perfect for naps, tummy time, and play, Caddle Baby promotes healthy posture while giving your little bundle of joy a calm and peaceful environment.\r\n\r\nWhether at home or on the go, Caddle Baby is an essential companion for happy, comfortable babies and peace of mind for parents.', '1111', 'sarah2@gmail.com', '03277140659', 'sa', 'active', 23.00, 'paypal', '/uploads/1750057156893-image.png', '/uploads/logo-1750057156897-image (5).png', '', '', '', 1, '2025-06-16 11:59:16'),
(8, 'Mercedes', 'Mercedes-Benz vehicle delivers a driving experience that is both exhilarating and refined.\r\n\r\nFrom its sleek aerodynamic contours to its meticulously crafted interiors, Mercedes-Benz offers unmatched comfort, advanced technology, and class-leading safety. Whether you\'re behind the wheel of a dynamic sedan, a bold SUV, or a powerful coupe, you’ll feel the perfect harmony of power and elegance.\r\n\r\nDriven by innovation, Mercedes-Benz continues to set new standards in mobility — with cutting-edge features like intelligent drive systems, hybrid and electric options, and immersive digital experiences.\r\n\r\nMercedes-Benz. The Best or Nothing.', '1112', 'ambreennd@gmail.com', '0902393213', 'sadman colony st4', 'active', NULL, 'paypal', '/uploads/1750057547089-Mercedes-Benz-Sports-Cars.webp', '/uploads/logo-1750057547100-Mercedes-Benz-Logo-1989-2009.png', '', '', '', 1, '2025-06-16 12:05:47'),
(9, 'Mercedes', 'Mercedes-Benz vehicle delivers a driving experience that is both exhilarating and refined.\r\n\r\nFrom its sleek aerodynamic contours to its meticulously crafted interiors, Mercedes-Benz offers unmatched comfort, advanced technology, and class-leading safety. Whether you\'re behind the wheel of a dynamic sedan, a bold SUV, or a powerful coupe, you’ll feel the perfect harmony of power and elegance.\r\n\r\nDriven by innovation, Mercedes-Benz continues to set new standards in mobility — with cutting-edge features like intelligent drive systems, hybrid and electric options, and immersive digital experiences.\r\n\r\nMercedes-Benz. The Best or Nothing.', '9999', 'ambreennd@gmail.com', '0902393213', '123 Main Street', 'active', NULL, 'paypal', '/uploads/1750061235856-OIP (2).jpg', '/uploads/logo-1750061235860-R.jpg', '', '', '', 1, '2025-06-16 13:07:15'),
(10, 'Shoes', 'Bata Shoes – Comfort That Moves With You\r\nStep into everyday comfort and timeless style with Bata shoes. Designed for durability and crafted with care, Bata offers the perfect blend of fashion, function, and affordability. Whether you’re heading to work, school, or a \r\n\r\nWalk smart. Walk confident. Walk with Bata.', '3333', 'ambreennd@gmail.com', '0902393213', '123 Main Street', 'active', 22.00, 'paypal', '/uploads/1750166706172-OIP (1).jpg', '/uploads/logo-1750166706174-1349139.webp', '', '', '', 1, '2025-06-17 18:25:06'),
(14, 'Shoes', 'Step into everyday comfort and timeless style with Bata shoes. Designed for durability and crafted with care, Bata offers the perfect blend of fashion, function, and affordability. Whether you’re heading to work, school, or a casual outing, Bata has a pair for every step of your journey.\r\n\r\nFrom sleek formal shoes to comfortable everyday wear and sporty casuals, Bata combines quality materials with ergonomic designs to keep your feet supported and stylish all day long.\r\n\r\n\r\nWalk smart. Walk confident. Walk with Bata.', '4455', 'ambreennd@gmail.com', '0902393213', 'sadman colony st4', 'active', 22.00, 'paypal', '/uploads/1750240539898-OIP.jpg', '/uploads/logo-1750240539906-unnamed.jpg', '', '', '', 0, '2025-06-18 14:55:39'),
(15, 'Shoes', 'Step into everyday comfort and timeless style with Bata shoes. Designed for durability and crafted with care, Bata offers the perfect blend of fashion, function, and affordability. Whether you’re heading to work, school, or a casual outing, Bata has a pair for every step of your journey.\r\n\r\nFrom sleek formal shoes to comfortable everyday wear and sporty casuals, Bata combines quality materials with ergonomic designs to keep your feet supported and stylish all day long.\r\nWalk with Bata.', '2220', 'ambreennd@gmail.com', '0902393213', '123 Main Street', 'active', 22.00, 'paypal', '/uploads/1750240699371-photo-1542291026-7eec264c27ff.jpg', '/uploads/logo-1750240699390-unnamed.jpg', '', '', '', 1, '2025-06-18 14:58:19'),
(17, 'Mini Cooper', 'Mini Cooper Mini Cooper Mini Cooper Mini Cooper Mini Cooper Mini Cooper ', '7777', 'sarah2@gmail.com', '0902393213', '123 Main Street', 'active', 22.00, 'paypal', '/uploads/1750333895030-R.jpeg', '/uploads/logo-1750333895036-R.png', '', '', '', 1, '2025-06-19 16:51:35');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_categories`
--

CREATE TABLE `vendor_categories` (
  `vendor_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_categories`
--

INSERT INTO `vendor_categories` (`vendor_id`, `category_id`) VALUES
(7, 7),
(8, 8),
(10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('a6a8be00-2f25-4d1a-a0b9-9b2cfbf62dde', '34ea8b403e3b8cea3e4dfa1d6e769d2d92e1828d9d8b2f8c2d702de5f1d5b67d', '2025-06-13 12:10:45.037', '20250613121042_add_vendor_id_to_redeemed_coupon', NULL, NULL, '2025-06-13 12:10:43.212', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`coupon_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `redeemed_coupons`
--
ALTER TABLE `redeemed_coupons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`vendor_id`);

--
-- Indexes for table `vendor_categories`
--
ALTER TABLE `vendor_categories`
  ADD PRIMARY KEY (`vendor_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `redeemed_coupons`
--
ALTER TABLE `redeemed_coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `vendor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coupons`
--
ALTER TABLE `coupons`
  ADD CONSTRAINT `coupons_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE;

--
-- Constraints for table `redeemed_coupons`
--
ALTER TABLE `redeemed_coupons`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_categories`
--
ALTER TABLE `vendor_categories`
  ADD CONSTRAINT `vendor_categories_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vendor_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
