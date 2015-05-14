
var mongo = require('mongodb');

function mongoClient(config,logger){
    this.config = config;
    this.logger = logger;
    this.db = null; //auto pools
    this.init();
}

mongoClient.prototype = {
    init: function (callback) {
        this.logger.log('INIT DB');
        if (this.db) {
            callback(null, this.db);
            return;
        }
        var self = this;
        mongo.MongoClient.connect(this.config.connectionString, function (err, db) {
            if (err) {
                self.logger.error("cant connect to mongodb." + JSON.stringify(err));
                if (callback) callback(err, null);
            }
            else {
                self.db = db;
                self.logger.debug('mongodb Initialized');
                if (callback){
                    if(typeof (callback) == 'function' )
                        callback(null, self.db);

                }

            }
        });
    }
    , getCollection: function (collection, callback) {
        var self = this;
        if (!this.db) {
            this.logger.warn('mongodb not ready');
            
            this.init(this.config, function (err, db) {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(null, self.db.collection(collection));
                }
            });
        }
        else {
            callback(null, this.db.collection(collection));
        }
    }
    , dropCollection: function (collection, callback) {
        var self = this;
        if (!this.db) {
            this.logger.warn('mongodb not ready');
            
            this.init(this.config, function (err, db) {
                if (err) {
                    callback(err, null);
                }
                else {
                    self.db.dropCollection(collection, callback);
                }
            });
        }
        else {
            this.db.dropCollection(collection, callback);
        }
    }
    , convertToObjectID: function (id) {
        if (id.id)
            return id;
        else
            return new mongo.ObjectID.createFromHexString(id);
    }
};

module.exports = mongoClient;