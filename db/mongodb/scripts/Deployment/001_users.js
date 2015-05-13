db.createCollection('users');
db.users.createIndex({email:1,password:1},{ unique: true } );

db.users.insert({
  email:'commonuser@javu.io' //must be lower case
, password:'ecb6e2bdc7977e013b5c7c06c3406635'
, loginMethod:'std'
, firstName:'Common'
, lastName:'User'
, isActive:true
, roles: ['publicSite']
, createdOn: new Date()
});

db.users.insert({
  email:'cpuser@javu.io'//must be lower case
, password:'ecb6e2bdc7977e013b5c7c06c3406635'
, loginMethod:'std'
, firstName:'ControlPanel'
, lastName:'User'
, isActive:true
, roles: ['publicSite','cp']
, createdOn: new Date()
});

db.users.insert({
  email:'adminuser@javu.io'//must be lower case
, password:'ecb6e2bdc7977e013b5c7c06c3406635'
, loginMethod:'std'
, firstName:'Admin'
, lastName:'User'
, isActive:true
, roles: ['publicSite','admin']
, createdOn: new Date()
});