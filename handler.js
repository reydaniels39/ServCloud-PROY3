'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();

const alumnos = require('./data/alumnos.json')
const bodyParser = require('body-parser');
const fs = require ('fs');
const exp = require('constants');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/alumno/', (req, res) => {
  if(!alumnos) {
    return res.send({
      data,
      err: `missing database`
    });
  }
  res.send({
    alumnos,
    err: null
  });
});

app.get('/alumno/:expediente', (req, res) => {
  const expediente = parseInt(req.params.expediente);
  const data = {
    expediente: -1,
    nombre: '',
    semestre: -1,
    carrera: ''
  };
  if(!alumnos) {
    return res.send({
      data,
      err: `missing database`
    });
  }
  if(!expediente) {
    return res.send({
      data,
      err: `missing expedient ${expediente}`
    });
  }
  const resultAlumno = alumnos.filter( info => info.expediente === expediente);
  if(!resultAlumno[0]) {
    return res.send({
      data,
      err: `not result for ${expediente}`
    });
  }
  data.expediente = resultAlumno[0].expediente
  data.nombre = resultAlumno[0].nombre;
  data.semestre = resultAlumno[0].semestre;
  data.carrera = resultAlumno[0].carrera;
  res.send({
    data,
    err: null
  });
});

app.post('/alumno/:expediente/:nombre/:semestre/:carrera', (req, res) => {
  const expediente = parseInt(req.params.expediente);
  const nombre = req.params.nombre;
  const semestre = parseInt(req.params.semestre);
  const carrera = req.params.carrera;
  if(!alumnos) {
    return res.send({
      data,
      err: `missing database`
    });
  }
  if(!expediente) {
    return res.send({
      err: `Falta expediente`
    });
  }
  const resultAlumno = alumnos.filter( info => info.expediente === expediente);
  if(resultAlumno[0]) {
    return res.send({
      err: `Ese expediente ya existe: ${expediente}`
    });
  }
  if(!nombre) {
    return res.send({
      err: `Falta nombre`
    });
  }
  if(!semestre) {
    return res.send({
      err: `Falta semestre`
    });
  }
  if(!carrera) {
    return res.send({
      err: `Falta carrera`
    });
  }
  const alumno = {
    "expediente": parseInt(expediente),
    "nombre": nombre,
    "semestre": parseInt(semestre),
    "carrera": carrera
  };
  var alumnosR = alumnos
  alumnosR.push(alumno);
  alumnosR = JSON.stringify (alumnosR);
  fs.writeFile ('./data/alumnos.json', alumnosR, err => {
    if (err) return res.send({
      err: err
    });
}); 
  const msj = "Alumno registrado con éxito";
  res.send({
    msj,
    err: null
  });
});

app.delete('/alumno/:expediente', (req, res) => {
  const expediente = parseInt(req.params.expediente);
  if(!alumnos) {
    return res.send({
      data,
      err: `missing database`
    });
  }
  if(!expediente) {
    return res.send({
      err: `Falta expediente`
    });
  }
  var alumnosR = alumnos
  var existe = false
  alumnosR.forEach(function(currentValue, index, arr){
    if(alumnosR[index].expediente==expediente){
      alumnosR.splice(index, index);     
      existe = true
    }
  })
  if (existe == false){
    return res.send({
      err: `Ese expediente no existe`
    });
  }
  alumnosR = JSON.stringify (alumnosR);
  fs.writeFile ('./data/alumnos.json', alumnosR, err => {
    if (err) return res.send({
      err: err
    });
}); 
  const msj = "Alumno eliminado con éxito";
  res.send({
    msj,
    err: null
  });
});

module.exports.generic = serverless(app);