//modules and variables
{
var express = require('express')
var app = express()
var bodyparser=require('body-parser');
var user=require('./sources/js/mongo');
var cookieparser=require('cookie-parser');
}

//middleware
{
app.use(bodyparser.urlencoded({ extended: true })); 
app.use(express.static(__dirname+'/sources'));
app.use(cookieparser());
}
//ROUTES

//homepage
app.get('/',function(req,res)
  {
    res.sendFile(__dirname+'/home.html');
})

//redirecting to notes page
app.get('/notepage',function(req,res)
{
  res.sendFile(__dirname+'/sources/html/notes.html');
})

//storing signup page data
app.post('/rdata',function(req,res)
{
  user1=new user
  ({
    'name':req.body.name,
    'uname':req.body.uname,
    'pass':req.body.pass,
    'email':req.body.email
  })
  user1.save(function(err,data)
  {
    if(err) return console.log('error in saving registered data');
    console.log('data saved successfully');
  });
  res.redirect('/');
})

//login page data handling
app.post('/home',function(req,res)
{
  user.findOne({'uname':req.body.uname},
  function(err,user)
  {
    if(err)
      return console.log('error encountered');
    if(user==null)
      {
        console.log('user does nott exist');
        res.redirect('/');
      }
    else if(user!=null) 
    { 
      // console.log('hashed pass is ' + user.pass);
      user.comparepass(req.body.pass,function(err,ismatch)
      {
        if(err) console.log('error in password');
        if(ismatch)
          {console.log('password correct');
          res.clearCookie('name');
          res.cookie('name',user.name);//sets cookie name='user name'
          res.redirect('/html/main.html')}
        else   
          {console.log('password wrong');res.redirect('/')}
      })
    }
      
  })
})

//manage adding notes page
app.post('/notes',function(req,res) 
{
  console.log('request recieved to save data');
  var curruser=new user();
  
  user.findOne({'name':req.cookies.name},function(err,user)
  {
    if(err)
      return console.log('error in finding user for notes');
    else if(user!=null){
      
      curruser=user;
      curruser.notes.push({'nname':req.body.name,'ntext':req.body.ta});

    curruser.save(function(err,data)
    {
      if(err)return console.log("error in saving notes");
      console.log('notes saved succesfully')
      res.redirect('/notepage');
    })
    }
  });
 
})

//retrieving data from database
app.get('/notevalues',function(req,res)
{
  // res.send("hello");
  
  user.findOne({'name':req.cookies.name},function(err,user)
  {
    // console.log("in function");
    if(err)
      return console.log('error in finding user for notes');
    else if(user!=null)
    {
     // console.log(user.notes);
      res.send(user.notes);

    }
  })
})

//send user name and email
app.get('/userdata',function(req,res)
{
  var curruser=new user();
  user.findOne({'name':req.cookies.name},function(err,user)
  {
    if(err)
      return console.log('error in finding the user');
    else if(user!=null)
    {
      curruser=user;
      var ans=0;   
      var uobj=
      {
        name:user.name,
        email:user.email
      } ;
      res.send(uobj);
    }
  })
})

//deleting the given note 
app.get('/notedel/:val',function(req,res)
{
  var curruser=new user();
  console.log(req.params.val);
  user.findOne({'name':req.cookies.name},function(err,user)
  {
    
    if(err)
      return console.log('error in finding the user');
    else if(user!=null)
    {
      curruser=user;
      var ans=0;
      for(var i=0;i<curruser.notes.length;i++)
      {
        if(String(curruser.notes[i].nname)==String(req.params.val))
        {
          // console.log('condition true');
          ans=i;
          break;  
        }
      }
      curruser.notes[ans].remove();
      curruser.save(function(err,data)
      {
        if(err) 
        {
          console.log("error in saving notes after deleting");
          res.send('0');
        }
      })
      res.send('1');
    }
    
  })
  
  //res.redirect('/html/notes.html');
})

app.listen(3000);