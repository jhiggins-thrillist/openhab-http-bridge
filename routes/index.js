var express = require('express');
var router = express.Router();

if (typeof window === 'undefined') { // Running in NodeJS
  var domino=require('domino');
  var $=require('jquery')(domino.createWindow());
  var XMLHttpRequest=require('xmlhttprequest').XMLHttpRequest;
  $.support.cors=true; // cross domain
  $.ajaxSettings.xhr=function(){return new XMLHttpRequest();};
}

function setState(item, state, cb) {
    var request = $.ajax({
        type       : "POST",
        url        : "http://10.0.0.34:8080/rest/items/" + item,
        data       : state, 
        headers    : { "Content-Type": "text/plain" }
    });

    request.done(function (data) { 
        cb(data);
    });

    request.fail(function (jqXHR, textStatus) { 
        console.log("Failure: " + textStatus);
    });
}

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.query.item, req.query.state);
  setState(req.query.item, req.query.state, function (data) {
    res.send(JSON.stringify(data));
  });
});

module.exports = router;
