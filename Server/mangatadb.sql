-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-01-2025 a las 20:34:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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

CREATE TABLE `accompanist` (
  `ID` int(11) NOT NULL,
  `ID_RESERVATION` varchar(16) NOT NULL,
  `NAME_ACCOMPANIST` varchar(100) NOT NULL,
  `ID_LUNCHES` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lunches`
--

CREATE TABLE `lunches` (
  `ID` int(2) NOT NULL,
  `DESCRIPTION` varchar(50) NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `menu_roles`
--

CREATE TABLE `menu_roles` (
  `ID` int(1) NOT NULL,
  `ROLE_ID` int(1) DEFAULT NULL,
  `TITLE` varchar(50) NOT NULL,
  `PATH` varchar(50) NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `menu_roles`
--

INSERT INTO `menu_roles` (`ID`, `ROLE_ID`, `TITLE`, `PATH`, `CREATED_AT`, `UPDATED_AT`) VALUES
(1, 1, 'Ventas', 'Reservations', '2024-12-15 01:10:05', '2024-12-15 01:26:58'),
(2, 1, 'Creación usuarios', 'CreateUser', '2024-12-15 01:10:05', '2024-12-15 01:25:35'),
(3, 2, 'Generar Reserva', 'GenerateReservation', '2024-12-15 01:10:48', '2024-12-15 01:26:03'),
(4, 2, 'Mis Comisiones', 'MyCommissions', '2024-12-15 01:10:48', '2024-12-15 01:26:11'),
(5, 1, 'Cerrar sesión', 'Logout', '2024-12-15 01:45:47', '2024-12-15 01:45:47'),
(6, 2, 'Cerrar sesión', 'Logout', '2024-12-15 01:45:47', '2024-12-15 01:45:47'),
(7, 3, 'Creación usuarios', 'CreateUser', '2024-12-15 01:10:05', '2024-12-15 01:25:35'),
(8, 3, 'Ventas', 'Reservations', '2024-12-15 01:10:05', '2024-12-15 01:26:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `min_max`
--

CREATE TABLE `min_max` (
  `ID` int(1) NOT NULL,
  `MAX` varchar(7) NOT NULL,
  `MIN` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `min_max`
--

INSERT INTO `min_max` (`ID`, `MAX`, `MIN`) VALUES
(1, '400000', '280000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservations`
--

CREATE TABLE `reservations` (
  `CODE_RESERVATION` varchar(16) NOT NULL,
  `ID_EMPLOYEE` int(4) NOT NULL,
  `TELEPHONE` varchar(12) NOT NULL,
  `STATUS_RESERVATION` varchar(20) DEFAULT 'pendiente',
  `CURRENT_COMMISSION` varchar(6) NOT NULL,
  `COMMISSION_EMPLOYEE` varchar(6) NOT NULL,
  `CREATED_AT` date NOT NULL,
  `UPDATED_AT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `ID` int(1) NOT NULL,
  `DESCRIPTION` varchar(50) NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`ID`, `DESCRIPTION`, `CREATED_AT`, `UPDATED_AT`) VALUES
(1, 'Administrador', '2024-12-11 23:57:31', '2024-12-11 23:57:31'),
(2, 'Empleado', '2024-12-11 23:57:31', '2024-12-11 23:57:31'),
(3, 'System', '2024-12-15 01:24:46', '2024-12-15 01:24:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID` int(4) NOT NULL,
  `FIRST_NAME` varchar(50) NOT NULL,
  `LAST_NAME` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `BANK_ACCOUNT` varchar(14) DEFAULT NULL,
  `ROLE_ID` int(1) NOT NULL,
  `PASSWORD` varchar(80) NOT NULL,
  `IS_ACTIVE` tinyint(1) DEFAULT 1,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`ID`, `FIRST_NAME`, `LAST_NAME`, `EMAIL`, `BANK_ACCOUNT`, `ROLE_ID`, `PASSWORD`, `IS_ACTIVE`, `CREATED_AT`, `UPDATED_AT`) VALUES
(16, 'Mangata', 'System', 'mangata@gmail.com', NULL, 3, '$2a$10$534/rJVTHc7tJpDzHaYclejX1D4t9sZXcvjIEGSpUQZbS7LBRdcVe', 1, '2024-12-21 20:15:42', '2024-12-21 20:15:42'),
(20, 'Carlos', 'Taborda', 'tabordac2@gmail.com', '', 1, '$2a$10$534/rJVTHc7tJpDzHaYclejX1D4t9sZXcvjIEGSpUQZbS7LBRdcVe', 1, '2025-01-01 05:00:00', '2025-01-01 18:09:41'),
(23, 'Carlos', 'Taborda', 'tabordac22@gmail.com', '12345', 2, '$2a$10$534/rJVTHc7tJpDzHaYclejX1D4t9sZXcvjIEGSpUQZbS7LBRdcVe', 1, '2025-01-01 05:00:00', '2025-01-01 18:16:43');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accompanist`
--
ALTER TABLE `accompanist`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `accompanist_ibfk_lunches` (`ID_LUNCHES`),
  ADD KEY `accompanist_fk_id_reservation` (`ID_RESERVATION`);

--
-- Indices de la tabla `lunches`
--
ALTER TABLE `lunches`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `menu_roles`
--
ALTER TABLE `menu_roles`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ROLE_ID` (`ROLE_ID`);

--
-- Indices de la tabla `min_max`
--
ALTER TABLE `min_max`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`CODE_RESERVATION`),
  ADD KEY `INDEX_ID_EMPLOYEE` (`ID_EMPLOYEE`) USING BTREE,
  ADD KEY `INDEX_DATE` (`CODE_RESERVATION`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UNIQUE_EMAIL` (`EMAIL`),
  ADD KEY `INDEX_EMAIL` (`EMAIL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accompanist`
--
ALTER TABLE `accompanist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `lunches`
--
ALTER TABLE `lunches`
  MODIFY `ID` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `menu_roles`
--
ALTER TABLE `menu_roles`
  MODIFY `ID` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `min_max`
--
ALTER TABLE `min_max`
  MODIFY `ID` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `ID` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accompanist`
--
ALTER TABLE `accompanist`
  ADD CONSTRAINT `accompanist_fk_id_reservation` FOREIGN KEY (`ID_RESERVATION`) REFERENCES `reservations` (`CODE_RESERVATION`),
  ADD CONSTRAINT `accompanist_ibfk_lunches` FOREIGN KEY (`ID_LUNCHES`) REFERENCES `lunches` (`ID`);

--
-- Filtros para la tabla `menu_roles`
--
ALTER TABLE `menu_roles`
  ADD CONSTRAINT `menu_roles_ibfk_1` FOREIGN KEY (`ROLE_ID`) REFERENCES `roles` (`ID`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
