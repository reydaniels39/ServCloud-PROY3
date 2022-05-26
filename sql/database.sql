-- CREATE DATABASE alumnos;

-- USE alumnos;

CREATE TABLE alumnos(
    expediente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    semestre INT,
    carrera VARCHAR(50)
);

INSERT INTO alumnos (nombre, semestre, carrera) VALUES('Daniel Aros', 5, 'software');
INSERT INTO alumnos (nombre, semestre, carrera) VALUES('Israel Nieto', 5, 'software');

SELECT * FROM alumnos;
