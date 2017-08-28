var express = require("express");
var bodyParser = require('body-parser');

var PythonShell = require('python-shell');

var app = express();

app.locals.pretty = true;
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req,res){

  res.render('main',{
  })

})

app.get('/result',function(req,res){
  res.redirect('/');
})

app.post('/result', function(req,res){
  var input = req.body.sentence;

  //PythonShell.run('test.py',
  PythonShell.run('cnn_sentence_classification.py',
    {
      mode: 'text',
      pythonPath: '',
      pythonOptions: ['-u'],
      scriptPath: '/home/ubuntu/RRing',
      //scriptPath: '/home/ubuntu/node_test',
      args: [input]

    }
    , function (err, results){
    if (err) throw err;

    console.log('results: %j', results);
    res.render('view',{
      result: results[1],
      sentence: results[0]
    })

  });
})

app.listen(9000, function(){
    console.log('Connected!!');
})

/*
app.listen(process.env.PORT, function(){
  console.log('Connected!!');
})

*/



/*
app.post('/', function(req,res){
  var input = req.body.sentence;

  PythonShell.run('test.py',
  //PythonShell.run('cnn_sentence_classification.py',
    {
      mode: 'text',
      pythonPath: '',
      pythonOptions: ['-u'],
     // scriptPath: '/home/ubuntu/RRing',
      scriptPath: '/home/ubuntu/node_test',
      args: [input]

    }
    , function (err, results){
    if (err) throw err;

    console.log('results: %j', results);
    res.render('view',{
      test: results
    })

  });
})
*/
