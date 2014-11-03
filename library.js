"use strict";

var Refferal_ds = {},
db = require('../../src/database');

Refferal_ds.addRefferalLink = function(userData) {
	

  var user_id, link, val;

  user_id = 'user:'+userData.uid;

  link = userData.userslug;

  db.setObjectField(user_id, 'refferal_link', link, function(val){
    // console.log(val);
  });

};

Refferal_ds.addRefferalBox = function(req, res, templateData, callback) {

  var RefferalBox = {
    label: 'Refferal Code',
    html: '<input class="form-control" name="refferal-code" id="refferal-code" />'
  };

  if (templateData.regFormEntry && Array.isArray(templateData.regFormEntry)) {
    templateData.regFormEntry.push(RefferalBox);
  } else {
    templateData.RefferalBox = RefferalBox;
  }

  callback(null, req, res, templateData);
};

Refferal_ds.checkRefferal = function(req, res, userData, callback) {

  var code_entered, refferee_id, refferal, refferal_exists;

  if (req.body['refferal-code']) {
    refferal = req.body['username'];
    code_entered = req.body['refferal-code'];
    console.log(code_entered);
    db.isObjectField('userslug:uid', code_entered, function(err, exists){
      if(exists){
        db.getObjectField('userslug:uid', code_entered, function(err, uid){
          console.log("refferee id: "+uid);
          refferee_id = uid;
        });
        db.setObjectField('refferal:uid', refferal, refferee_id, callback);
      }else{
        console.log("you entered wrong refferal code");
      }
    });
    callback(null, req, res, userData);
  }else{
    callback(null, req, res, userData);
  }
};

module.exports = Refferal_ds;