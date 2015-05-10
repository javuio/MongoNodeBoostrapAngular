db.createCollection('roles');
db.roles.insert({
	_id:'publicSite'
	, description:'Used to access Public Site'
	, permissions:['PublicSiteGeneralAccess'] 	
});

db.roles.insert({
	_id:'cp'
	, description:'Used to access Control Panel'
	, permissions:['ControlPanelGeneralAccess'] 	
});

db.roles.insert({
	_id:'admin'
	, description:'Used to access Admin Site'
	, permissions:['AdminPortalGeneralAccess'] 	
});