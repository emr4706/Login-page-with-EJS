const express = require("express");
const bodyParser = require("body-parser");

const userName = "emr";
const userPassword = "123";

let todos = [
    {id:1, text:'Doe boodschappen'}, 
    {id:2, text:'Ga naar school'}, 
    {id:3, text:'Doe de groeten'},
    {id:4, text:'Doe eet'},
    {id:5, text:'Doe huiswerk'}
];

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
   res.render('index', {isError: false}); 
})

app.post('/login', (req, res) => {

    let {username, password} = req.body;

    if(username === userName && password === userPassword) {

       return res.redirect('/todos');
    }

    res.render('index', {isError: true});
})

app.get('/todos', (req, res) => {
    res.render('todos', {todos: todos});
})

app.post('/delete-todo', (req, res) => {
    let {id} = req.body;

    todos = todos.filter(todo => todo.id != id);

    res.redirect('todos') 
})
app.post('/add-todo', (req, res) => {
    let {newTodo} = req.body;

    todos.push({id:'', text: newTodo});

    res.redirect('todos') 
})





app.listen(3000, () => console.log('http://localhost:3000'));