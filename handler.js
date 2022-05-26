'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const dbConnection = require('./config/dbConnection');

const alumnos = require('./data/alumnos.json')
const bodyParser = require('body-parser');
const fs = require ('fs');
const exp = require('constants');

app.use(bodyParser.urlencoded({extended: true}));

const connection = dbConnection();

app.get('/alumno/', (req, res) => {
  connection.query('SELECT * FROM alumnos', (err, result) => {
    res.send({
      alumnos: result,
      err: null
    });
  });
});

app.get('/alumno/:expediente', (req, res) => {
  const expediente = parseInt(req.params.expediente);
  connection.query(`SELECT * FROM alumnos WHERE expediente = ${expediente}`, (err, result) => {
    res.send({
      alumnos: result,
      err: null
    });
  });
});

app.post('/alumno/:nombre/:semestre/:carrera', (req, res) => {
  const nombre = req.params.nombre;
  const semestre = parseInt(req.params.semestre);
  const carrera = req.params.carrera;

  connection.query('INSERT INTO alumnos SET ?', {
    nombre: nombre,
    semestre: semestre,
    carrera: carrera
  }, (err, result) => {
    res.send('Alumno registrado con exito');
  });
});

app.delete('/alumno/:expediente', (req, res) => {
  const expediente = parseInt(req.params.expediente);
  connection.query(`DELETE FROM alumnos WHERE expediente = ${expediente}`, (err, result) => {
    res.send('Registro eliminado satisfactoriamente');
  });
});

module.exports.generic = serverless(app);