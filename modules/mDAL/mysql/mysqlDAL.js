var mysql = require('mysql');


function mysqlConn(config,logger) {
    this.connectionPool = mysql.createPool(config);
    this.initialized = true;
    this.logger = logger;
}

mysqlConn.prototype = {
    /// if the raw connection is needed
    getConnection: function (callback) {
        if (!this.initialized) {
            callback(new Error("Connection not initialized"));
            return;
        }
        
        this.connectionPool.getConnection(function (err, connection) {
            // Use the connection
            if (err )
                this.logger.error('#Database -> Connection: ' + JSON.stringify(err));
            if (callback) callback(err, connection);
            connection.release();
        });
    }
    ,executeSP: function (procedureName, params, callback) {
        if (!this.initialized) {
            callback(new Error("Connection not initialized"));
            return;
        }
        if (typeof (params) == "function" && callback == undefined) {
            callback = params;
            params = null;
        }
        var sql = 'CALL ' + procedureName + '(params)';
        
        sql = this._injectParams(sql, params);
        var l= this.logger;
        //Execute stored procedure call
        this.connectionPool.query(sql, function (err, rows, fields) {
            if (err) {
                try {
                    if (err.code == 'ER_SIGNAL_EXCEPTION' && err.sqlState == '45000' && err.message) {
                        var errorCode = err.message.replace('ER_SIGNAL_EXCEPTION: ', '');
                        l.warn('#Database -> Stored Procedure: ' + sql + ' Error code ##' + errorCode + '## was relieved while executing stored procedure :' ,err);
                        err.errorCode = errorCode;
                    }
                    else {
                        l.error('#Database -> Stored Procedure: ' + sql + ' an error has occurred while executing stored procedure :', err);
                    }
                }
                catch(e) {
                    console.error(e);
                }
                callback(err, null);
            }
            else {
                l.debug('#Database -> Stored Procedure: ' + sql + ' connected to database successfully');
                callback(null, rows);
            }
        });
    }
    
    ,_injectParams: function (query, params) {
        //Inject parameters in Stored Procedure Call
        var parameters = '';
        if (params) {
            params.forEach(function (param, index) {
                if (param == null || param.value == null)
                    parameters += "null";
                else{
                    try{
                        parameters += "@" + param.name + ':=' + mysql.escape(param.value);
                    }
                catch(e)
                    {
                        console.log(e);
                        throw e;
                    }
                }

                
                if (index < params.length - 1) parameters += ",";

            });
        }
        query = query.replace("params", parameters);
        return query;
    }
    
    , createCommand: function (procedureName) {
        return new mysqlCommand(procedureName, this);
    }
};

function mysqlCommand(procedureName, connectionPool) {
    this.connectionPool = connectionPool;
    this.procedureName = procedureName;
    this.params = [];
}

mysqlCommand.prototype = {
    addParam: function (name, value) {
        this.params.push({ "name": name , "value" : value });
    }
    ,getDataSet: function (callback) {
        this.connectionPool.executeSP(this.procedureName, this.params, function (err, data) {
            if (err)
                callback(err, null);
            else {
                if (data)
                    callback(null, data);
                else
                    callback(null, null);
            }
        });
    }
    ,getDataTable: function (callback) {
        this.getDataSet(function (err, data) {
            if (err)
                callback(err, null);
            else {
                if (data && data.length > 0)
                    callback(null, data[0]);
                else
                    callback(null, []);
            }
        });
    }
    ,getDataObject: function (callback) {
        this.getDataTable(function (err, data) {
            if (err)
                callback(err, null);
            else {
                if (data && data.length > 0)
                    callback(null, data[0]);
                else
                    callback(null, null);
            }
        });
    }
    ,getScalar: function (callback) {
        this.getDataObject(function (err, data) {
            if (err)
                callback(err, null);
            else {
                if (data != null) {
                    var key = Object.keys(data);
                    callback(null, data[key[0]]);
                } 
                else
                    callback(null, null);
            }
        });
    }
}

module.exports = mysqlConn;