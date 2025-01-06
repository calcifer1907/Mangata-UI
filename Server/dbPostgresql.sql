
CREATE TABLE IF NOT EXISTS accompanist (
  ID SERIAL PRIMARY KEY,
  ID_RESERVATION SMALLINT NOT NULL,
  NAME_ACCOMPANIST varchar(100) NOT NULL,
  ID_LUNCHES SMALLINT NOT NULL
) ;

ALTER TABLE accompanist
  ADD CONSTRAINT accompanist_fk_id_reservation FOREIGN KEY (ID_RESERVATION) REFERENCES reservations (CODE_RESERVATION),
  ADD CONSTRAINT accompanist_ibfk_lunches FOREIGN KEY (ID_LUNCHES) REFERENCES lunches (ID);




CREATE TABLE IF NOT EXISTS lunches (
  ID SERIAL PRIMARY KEY,
  DESCRIPTION varchar(50) NOT NULL,
  CREATED_AT timestamp NOT NULL  ,
  UPDATED_AT timestamp NOT NULL 
) ;


INSERT INTO lunches (ID, DESCRIPTION, CREATED_AT, UPDATED_AT) VALUES
(1, 'Filete de pescado', '2024-12-11 23:59:51', '2024-12-11 23:59:51'),
(2, 'Pasta vegetariana', '2024-12-11 23:59:51', '2024-12-11 23:59:51'),
(3, 'Pechuga a la plancha', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(4, 'Pescado frito', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(5, 'Pasta boloñesa', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(6, 'Risotto', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(7, 'Pizza', '2024-12-12 00:00:54', '2024-12-12 00:00:54'),
(8, 'Nuggets de pollo', '2024-12-12 00:00:54', '2024-12-12 00:00:54');


CREATE TABLE min_max (
  ID SERIAL PRIMARY KEY,
  MAX varchar(7) NOT NULL,
  MIN varchar(7) NOT NULL
);


  CREATE TABLE menu_roles (
  ID SERIAL PRIMARY KEY,
  ROLE_ID SMALLINT DEFAULT NULL,
  TITLE varchar(50) NOT NULL,
  PATH varchar(50) NOT NULL,
  CREATED_AT timestamp NOT NULL DEFAULT current_timestamp,
  UPDATED_AT timestamp NOT NULL DEFAULT current_timestamp
);

INSERT INTO menu_roles (ID, ROLE_ID, TITLE, PATH, CREATED_AT, UPDATED_AT) VALUES
(1, 1, 'Ventas', 'Reservations', '2024-12-15 01:10:05', '2024-12-15 01:26:58'),
(2, 1, 'Creación usuarios', 'CreateUser', '2024-12-15 01:10:05', '2024-12-15 01:25:35'),
(3, 2, 'Generar Reserva', 'GenerateReservation', '2024-12-15 01:10:48', '2024-12-15 01:26:03'),
(4, 2, 'Mis Comisiones', 'MyCommissions', '2024-12-15 01:10:48', '2024-12-15 01:26:11'),
(5, 1, 'Cerrar sesión', 'Logout', '2024-12-15 01:45:47', '2024-12-15 01:45:47'),
(6, 2, 'Cerrar sesión', 'Logout', '2024-12-15 01:45:47', '2024-12-15 01:45:47'),
(7, 3, 'Creación usuarios', 'CreateUser', '2024-12-15 01:10:05', '2024-12-15 01:25:35'),
(8, 3, 'Ventas', 'Reservations', '2024-12-15 01:10:05', '2024-12-15 01:26:58'),
(9, 3, 'Cerrar sesión', 'Logout', '2024-12-15 01:45:47', '2024-12-15 01:45:47');



CREATE TABLE IF NOT EXISTS reservations (
  CODE_RESERVATION varchar(16) PRIMARY KEY,
  ID_EMPLOYEE SMALLINT NOT NULL,
  TELEPHONE varchar(12) NOT NULL,
  STATUS_RESERVATION varchar(20) DEFAULT 'pendiente',
  CURRENT_COMMISSION varchar(6) NOT NULL,
  COMMISSION_EMPLOYEE varchar(6) NOT NULL,
  CREATED_AT date NOT NULL,
  UPDATED_AT timestamp DEFAULT current_timestamp
) ;

  ALTER TABLE reservations
  ADD CONSTRAINT reservations_ibfk_1 FOREIGN KEY (ID_EMPLOYEE) REFERENCES users (ID);


CREATE TABLE  IF NOT EXISTS roles (
  ID SERIAL PRIMARY KEY,
  DESCRIPTION varchar(50) NOT NULL,
  CREATED_AT timestamp NOT NULL ,
  UPDATED_AT timestamp DEFAULT current_timestamp 
) ;


INSERT INTO roles (ID, DESCRIPTION, CREATED_AT, UPDATED_AT) VALUES
(1, 'Administrador', '2024-12-11 23:57:31', '2024-12-11 23:57:31'),
(2, 'Empleado', '2024-12-11 23:57:31', '2024-12-11 23:57:31'),
(3, 'System', '2024-12-15 01:24:46', '2024-12-15 01:24:46');



CREATE TABLE IF NOT EXISTS users (
  ID SERIAL PRIMARY key,
  FIRST_NAME varchar(50) NOT NULL,
  LAST_NAME varchar(50) NOT NULL,
  EMAIL varchar(50) NOT NULL,
  BANK_ACCOUNT varchar(14) DEFAULT NULL,
  ROLE_ID SMALLINT NOT NULL,
  PASSWORD varchar(80) NOT NULL,
  IS_ACTIVE boolean DEFAULT true,
  CREATED_AT timestamp NOT NULL ,
  UPDATED_AT timestamp DEFAULT current_timestamp
) ;



INSERT INTO users (ID, FIRST_NAME, LAST_NAME, EMAIL, BANK_ACCOUNT, ROLE_ID, PASSWORD, IS_ACTIVE, CREATED_AT, UPDATED_AT) VALUES
(16, 'Mangata', 'System', 'mangata@gmail.com', NULL, 3, '$2a$10$534/rJVTHc7tJpDzHaYclejX1D4t9sZXcvjIEGSpUQZbS7LBRdcVe', true, '2024-12-21 20:15:42', '2024-12-21 20:15:42');


ALTER TABLE users
  ADD CONSTRAINT users_ibfk_1 FOREIGN KEY (ROLE_ID) REFERENCES roles (ID);




