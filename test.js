// Inscription
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('email', 'andry@mail.com');
data.append('password', '12345678');

var config = {
  method: 'post',
  url: 'http://snapi.epitech.eu:8000/inscription',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


// Connexion
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('email', 'andry@mail.com');
data.append('password', '12345678');

var config = {
  method: 'post',
  url: 'http://snapi.epitech.eu:8000/connection',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});