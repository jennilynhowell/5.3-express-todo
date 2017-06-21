const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const data = require('./data');
const app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static('public'));


app.get('/', (req, res) => {
  res.render('index', data);
});

app.post('/', (req, res) => {
  //add an item
  let item = req.body['new-item-field'];
  if (item) {
    let num = data.todoArray.length + 1;
    data.todoArray.push({num, item, complete: false});
  };

  //complete an item
  let completeItem = req.body['complete-item'];
  if (completeItem) {
    const itemFilter = data.todoArray.filter((item) => {
      return item.item === completeItem;
    });

    for (let i = 0; i < data.todoArray.length; i++) {
      if (itemFilter[0].num === data.todoArray[i].num){
        data.todoArray[i].complete = true;
      }
    };
  };

  res.redirect('/');
});


app.listen(3000);
