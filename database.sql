SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

create schema netrip;
use netrip;
-- Table structure for table `nt_data`
CREATE TABLE `nt_data` (
  `id` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL ,
  `category` varchar(50) NOT NULL,
  `images` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `nt_data`
INSERT INTO `nt_data` (`id`,`username`, `title`, `state`, `category`,`images`,`description`,`update_time`) VALUES
(1,'user1','xxx', 'Sikkim', 'Events','Sikkim.jpg','lorem ipsum', '2020-09-11 07:34:41');


-- Table structure for table `client`
CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(1000) NOT NULL
 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `client`
INSERT INTO `client` (`id`, `username`, `email`, `password`) VALUES
(1, 'user1', 'trip1@gmail.com', 'Netrip'),
(2, 'user2', 'trip2@gmail.com', 'Netrip');
-- Table structure for table `sessions`
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `sessions`
INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('pc6TN8FWkWtQbwo4HB7t0i8YbM4FxsYb', 1599900055, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":false,\"path\":\"/\"},\"flash\":{},\"email\":\"user1@gmail.com\",\"username\":\"user1\":1}');
-- Indexes for table `nt_data`
ALTER TABLE `nt_data`
  ADD PRIMARY KEY (`id`);
 
  
-- Indexes for table `client`
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);
-- Indexes for table `sessions`
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);
-- AUTO_INCREMENT for table `nt_data`
ALTER TABLE `nt_data`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
  
-- AUTO_INCREMENT for table `client`
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
