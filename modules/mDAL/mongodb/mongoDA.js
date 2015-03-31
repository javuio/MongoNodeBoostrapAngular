var mongoClient;
function mongoCol(collection) {
    this.collection = collection;
    mongoClient = new mongodb();
}

mongoCol.prototype = {
    getCollection: function (callback) {
        mongoClient.getCollection(this.collection, callback);
    },
    convertToObjectID: function (id) {
        return mongoClient.convertToObjectID(id);
    },
    findByObjectID: function (id, callback) {
        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.find({ _id: typeof (id) == "object" ? id : mongoClient.convertToObjectID(id) }).toArray(callback);
        });
    },
    insert: function (doc, callback) {

        if (!doc.createdOn) doc.createdOn = new Date();
        if (!doc.lastUpdated) doc.lastUpdated = new Date();

        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else {
                col.insert(doc, function (error, result) {
                    if (error)
                        callback(error, null);
                    else
                        callback(null, result)
                });
            }
        })
    },
    update: function (doc, options, callback) {
        if (!callback && typeof (options) == 'function') {
            callback = options;
            options = {};
        }

        this.getCollection(function (err, col) {
            if (err) {
                callback(err, null);
            }
            else {
                var query = undefined;
                if (doc._id) {
                    query = { _id: mongoClient.convertToObjectID(doc._id) };
                    delete doc._id;
                }
                else {
                    var extend = require('util')._extend;
                    delete doc._id;
                    query = extend({}, doc);
                }

                if (!doc.createdOn) doc.createdOn = new Date();
                if (!doc.lastUpdated) doc.lastUpdated = new Date();

                var updateQuery = undefined;
                if (options && options.$inc) {
                    updateQuery = { $inc: options.$inc };
                }
                else if (options && options.$set) {
                    updateQuery = { $set: options.$set };
                }
                else {
                    updateQuery = { $set: doc };
                }

                if (options && options.$unset) {
                    updateQuery.$unset = options.$unset;
                }

                col.update(query, updateQuery, { multi: true }, function (error, result) {
                    if (error)
                        callback(error, null);
                    else
                        callback(null, result)
                });
            }
        })
    },
    save: function (doc, options, callback) {

        if (!callback && typeof (options) == 'function') {
            callback = options;
            options = {};
        }

        if (!doc.createdOn) doc.createdOn = new Date();
        if (!doc.lastUpdated) doc.lastUpdated = new Date();

        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else {
                col.save(doc, options, callback);
            }
        })
    },
    get: function (id, callback) {
        var selector = { _id: mongoClient.convertToObjectID(id) };
        this.find(selector, null, callback);
    },
    find: function (selector, options, callback) {

        if (!callback && typeof (options) == 'function') {
            callback = options;
            options = {};
        }

        if (options == null) options = {};
        if (!selector) selector = {};

        if (!options.includeDeleted || options.includeDeleted == false)
            selector.deletedOn = {$exists: false};//if can be ({$or: [{deleted:{$exists:false}}, {deleted:false}]})

        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.find(selector, options).toArray(callback);
        });
    },
    remove: function (selector, callback) {
        if (!callback) callback = function () {
        };
        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.remove(selector, callback);
        });
    },
    findAndRemove: function (selector, options, callback) {
        if (!callback && typeof (options) == 'function') {
            callback = options;
        }
        if (!callback) callback = function () {
        };
        this.getCollection(function (err, col) {
            if (err) {
                callback(err, null);
            }
            else {
                var updateQuery = { $set: { deletedOn: new Date() } };
                selector.deletedOn = { $exists: false };
                col.update(selector, updateQuery, function (error, result) {
                    if (error)
                        callback(error, null);
                    else
                        callback(null, result)
                });
            }
        });
    },
    findByPage: function (selector, pagination, callback) {
        if (!callback && typeof (pagination) == 'function') {
            callback = pagination;
            pagination = {};
        }

        if (pagination == null) pagination = {};
        if (!selector) selector = {};

        selector.deletedOn = { $exists: false };
        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else {
                col.find(selector).sort({ lastUpdated: -1 }).skip((pagination.pageNumber - 1) * pagination.pageSize).limit(pagination.pageSize).toArray(callback);
            }
        });
    },
    findCount: function (selector, callback) {
        if (!selector) selector = {};

        //selector.deletedOn = {$exists: false};
        this.getCollection(function (err, col) {
            if (err) {
                callback(err, null);
            }
            else {
                col.count(selector, callback);
            }
        });
    },
    findLastRecords: function (selector, callback) {
        var self = this;
        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.find(selector).sort({ lastUpdated: -1 }).limit(self.lastSentNotificationsNumber).toArray(callback);
        });
    },
    group: function (keys, condition, initial, reduce, callback) {
        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.group(keys, condition, initial, reduce, callback);
        });
    }
};

module.exports = mongoDA;