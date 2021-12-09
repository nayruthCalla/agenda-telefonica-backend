const data = require('../data/person')

module.exports ={
  getAllPersons: (req, resp, next) => {
    return resp.send(data)
  },
  getInfo: (req, resp, next) => {
    return resp.send(`Phone has info for ${data.length} people \n ${new Date()}`)
  },
  getPerson : (req, resp, next) => {
    const id = Number(req.params.id);
    const person = data.find(ele => ele.id === id);
    if(!person) return (resp.status(404).json({err:`Person with id ${id} not found`}));
    return resp.send(person);
  },
  deletePerson : (req, resp, next) => {
    const id = Number(req.params.id);
    const person = data.find(ele => ele.id === id);
    if(!person) return (resp.status(404).json({err:`Person with id ${id} not found`}));

    const personFiltered = data.filter(ele => ele.id != id);
    return resp.status(404).end()
  },
  createAgenda : (req, resp, next) => {
    const { name, number } = req.body;

    if( !name || !number){
      return (resp.status(400).json({err:`Bad request`}));
    }
    const namePerson = data.find(ele => ele.name === name);
    const numberPerson = data.find(ele => ele.number === number);
    if(namePerson != null || numberPerson != null){
      return (resp.status(403).json({err:`name or phone must be unique`}));
    }

    const idPerson = Math.random(1,200);
    data.push({id: idPerson, name: name, number: number})

    return resp.status(201).send(data);
  }


};