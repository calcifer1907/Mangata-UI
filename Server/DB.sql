CREATE EXISTING TABLE `mangatadb`.users (
    ID INT(4) AUTO_INCREMENT PRIMARY KEY,         -- Identificador único del usuario
    FIRST_NAME VARCHAR(50)  NOT NULL,                     -- Nombre del usuario
    LAST_NAME VARCHAR(50) NOT NULL,                      -- Apellido del usuario
    EMAIL VARCHAR(50) NOT NULL,       -- Nombre de usuario, único
    BANK_ACCOUNT VARCHAR(14), 
    ROLE_ID INT(1) NOT NULL,                                -- Relación con la tabla de roles (si aplicable)
    PASSWORD VARCHAR(80) NOT NULL,             -- Contraseña del usuario (encriptada)
    IS_ACTIVE BOOLEAN DEFAULT TRUE,             -- Estado de la cuenta (si está activa o no)
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Fecha de última actualización
    FOREIGN KEY (ROLE_ID) REFERENCES roles(ID),  -- Si tienes una tabla de roles
    CONSTRAINT unique_email UNIQUE (EMAIL),
    CONSTRAINT index_email INDEX (EMAIL)
);

CREATE TABLE `mangatadb`.roles (
    ID INT(1) AUTO_INCREMENT PRIMARY KEY,  -- Identificador único
     DESCRIPTION VARCHAR(50) NOT NULL ,                   -- Descripción del rol
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Última actualización
);

CREATE TABLE `mangatadb`.roles (
    ID INT(1) AUTO_INCREMENT PRIMARY KEY,
    ROLE_ID INT(1) ,
    DESCRIPTION VARCHAR(50) NOT NULL ,                  
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ROLE_ID) REFERENCES roles(ID)
);

CREATE TABLE `mangatadb`.lunches (
    ID INT(2) AUTO_INCREMENT PRIMARY KEY,  -- Identificador único
    DESCRIPTION VARCHAR(50) NOT NULL,                   -- Descripción del rol
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Última actualización
);


CREATE TABLE `mangatadb`.reservations (
    CODE_RESERVATION VARCHAR(12) PRIMARY KEY,
    ID_EMPLOYEE INT(4) NOT NULL,
    CREATED_AT DATE NOT NULL,
    STATUS_RESERVATION VARCHAR(20) DEFAULT 'Pendiente',
    TELEPHONE VARCHAR(12) NOT NULL,
    FOREIGN KEY (ID_EMPLOYEE) REFERENCES users(ID_EMPLOYEE)
);

CREATE TABLE `mangatadb`.accompanist (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_RESERVATION VARCHAR(12) NOT NULL,
    NAME_ACCOMPANIST VARCHAR(100) NOT NULL,
    ID_LUNCHES INT(2) NOT NULL,
    FOREIGN KEY (ID_LUNCHES) REFERENCES lunches(ID),
    FOREIGN KEY (ID_RESERVATION) REFERENCES reservations(CODE_RESERVATION)
);