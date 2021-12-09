const express = require('express');
const morgan = require('morgan');
const controller = require('./controller/controllerMethods');
const app = express();
const port = 3000;

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json());

morgan.token('body', function (req, res) { 
  return JSON.stringify(req.body)
});

app.get('/api/persons',controller.getAllPersons);
app.get('/api/info', controller.getInfo);
app.get('/api/persons/:id', controller.getPerson);
app.delete('/api/persons/:id', controller.deletePerson);
app.post('/api/persons/', controller.createAgenda);

app.listen(port, () => {
  console.log(` 🔥 http://localhost:${port}`); 
})