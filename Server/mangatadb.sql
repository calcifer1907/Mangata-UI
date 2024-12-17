-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2024 a las 01:05:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mangatadb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accompanist`
--

CREATE TABLE IF NOT EXISTS `accompanist` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_RESERVATION` varchar(12) NOT NULL,
  `NAME_ACCOMPANIST` varchar(100) NOT NULL,
  `ID_LUNCHES` int(2) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_LUNCHES` (`ID_LUNCHES`),
  KEY `ID_RESERVATION` (`ID_RESERVATION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `accompanist`:
--   `ID_LUNCHES`
--       `lunches` -> `ID`
--   `ID_RESERVATION`
--       `reservations` -> `CODE_RESERVATION`
--

--
-- Truncar tablas antes de insertar `accompanist`
--

TRUNCATE TABLE `accompanist`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lunches`
--

CREATE TABLE IF NOT EXISTS `lunches` (
  `ID` int(2) NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(50) NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `lunches`:
--

--
-- Truncar tablas antes de insertar `lunches`
--

TRUNCATE TABLE `lunches`;
--
-- Volcado de datos para la tabla `lunches`
--

INSERT INTO `lunches` (`ID`, `DESCRIPTION`, `CREATED_AT`, `UPDATED_AT`) VALUES
(1, 'Filete de pescado', '2024-12-11 23:59:51', '2024-12-11 23:59:51'),
(2, 'Pasta vegetariana', '2024-12-11 23:59:51', '2024-12-11 23:59:51'),
(3, 'Pechuga a la plancha', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(4, 'Pescado frito', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(5, 'Pasta boloñesa', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(6, 'Risotto', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(7, 'Pizza', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(8, 'Nuggets de pollo', '2024-12-12 00:00:54', '2024-12-12 00:00:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservations`
--

CREATE TABLE IF NOT EXISTS `reservations` (
  `CODE_RESERVATION` varchar(12) NOT NULL,
  `ID_EMPLOYEE` int(4) NOT NULL,
  `CREATED_AT` date NOT NULL,
  `STATUS_RESERVATION` varchar(20) DEFAULT 'Pendiente',
  `TELEPHONE` varchar(12) NOT NULL,
  PRIMARY KEY (`CODE_RESERVATION`),
  KEY `INDEX_ID_EMPLOYEE` (`ID_EMPLOYEE`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `reservations`:
--   `ID_EMPLOYEE`
--       `users` -> `ID`
--

--
-- Truncar tablas antes de insertar `reservations`
--

TRUNCATE TABLE `reservations`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `ID` int(1) NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(50) NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `roles`:
--

--
-- Truncar tablas antes de insertar `roles`
--

TRUNCATE TABLE `roles`;
--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`ID`, `DESCRIPTION`, `CREATED_AT`, `UPDATED_AT`) VALUES
(1, 'Administrador', '2024-12-11 23:57:31', '2024-12-11 23:57:31'),
(2, 'Empleado', '2024-12-11 23:57:31', '2024-12-11 23:57:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(4) NOT NULL AUTO_INCREMENT,
  `FIRST_NAME` varchar(50) NOT NULL,
  `LAST_NAME` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `BANK_ACCOUNT` varchar(14) DEFAULT NULL,
  `ROLE_ID` int(1) NOT NULL,
  `PASSWORD` varchar(80) NOT NULL,
  `IS_ACTIVE` tinyint(1) DEFAULT 1,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UNIQUE_EMAIL` (`EMAIL`),
  KEY `INDEX_EMAIL` (`EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `users`:
--   `ROLE_ID`
--       `roles` -> `ID`
--

--
-- Truncar tablas antes de insertar `users`
--

TRUNCATE TABLE `users`;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accompanist`
--
ALTER TABLE `accompanist`
  ADD CONSTRAINT `accompanist_ibfk_1` FOREIGN KEY (`ID_LUNCHES`) REFERENCES `lunches` (`ID`),
  ADD CONSTRAINT `accompanist_ibfk_2` FOREIGN KEY (`ID_RESERVATION`) REFERENCES `reservations` (`CODE_RESERVATION`);

--
-- Filtros para la tabla `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`ID_EMPLOYEE`) REFERENCES `users` (`ID`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`ROLE_ID`) REFERENCES `roles` (`ID`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
