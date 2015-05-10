db.createCollection('users');
db.users.createIndex({email:1,password:1},{ unique: true } );

db.users.insert({
  email:'CommonUser@javu.io'
, password:'ecb6e2bdc7977e013b5c7c06c3406635'
, loginMethod:'std'
, firstName:'Common'
, lastName:'User'
, isActive:true
, roles: ['publicSite']
, createdOn: new Date()
});

db.users.insert({
  email:'CPUser@javu.io'
, password:'ecb6e2bdc7977e013b5c7c06c3406635'
, loginMethod:'std'
, firstName:'ControlPanel'
, lastName:'User'
, isActive:true
, roles: ['publicSite','cp']
, createdOn: new Date()
});

db.users.insert({
  email:'adminUser@javu.io'
, password:'ecb6e2bdc7977e013b5c7c06c3406635'
, loginMethod:'std'
, firstName:'Admin'
, lastName:'User'
, isActive:true
, roles: ['publicSite','admin']
, createdOn: new Date()
});