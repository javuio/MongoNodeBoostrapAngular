/*
    In development when you want to test admin vs site or anything else 
    dont change this file just pass the appropriate argument in the run script
*/
var productName = "javu";
var environments = {
    devAdmin: {
        debugMode: true
        , module:"admin"
        ,staticContent: [
            {route:'/', path:'/../client/admin/'}
            ,{route:'/scripts',path:'/../client/_shared/scripts/'}
            ,{route:'/styles', path:'/../client/_shared/styles/'}
            ,{route:'/images', path:'/../client/_shared/images/'}
        ]
        ,mysqlConfig : {
            host : '127.0.0.1'
            ,user: 'apiUser' /// only has execution rights
            ,password: '!javu10APIUs3r321!'
            ,database: productName
            , timezone: 'utc'
        }
        ,logging: {
            enableRemoteLogging: false,
            loggly: {
                subdomain: productName,
                username: 'mcdevs@madaincorp.com',
                password: 'AP1U$#R!',
                inputToken: 'e12a0932-6ddc-4fc6-afb3-308e045ac245',
                tags: ["devAdmin"]
            }
        },
        smtp: {
            
            username: "emailer@javu.io"
            , password: "ko4TKFp2FOXKKXjlsAiwHw"//this is the API key for Mandrill Account
        },
        hash: {
            hashConfigKey: "e9e3c089-6dba-4b04-ba39-54cfef0d5c13"
        },
        supportEmail: "support@javu.io",
        forgetPasswordSenderEmail: "support@javu.io",
        resetPasswordPage: "http://localhost:1348/resetPassword.html?tempAuthKey={authKey}",
        cypherKey : "91b7bd62-5959-46c3-9a96-bcfd0a0de372",
        mongoDBServer: { connectionString: "mongodb://54.149.71.236:1333/" + productName }
    },
    devControlPanel: {
        debugMode: true
        , module:"controlPanel"
        ,staticContent: [
            {route:'/', path:'/../client/controlPanel/'}
            ,{route:'/scripts',path:'/../client/_shared/scripts/'}
            ,{route:'/styles', path:'/../client/_shared/styles/'}
            ,{route:'/images', path:'/../client/_shared/images/'}
        ]
        ,mysqlConfig : {
            host : '127.0.0.1'
            ,user: 'apiUser' /// only has execution rights
            ,password: '!javu10APIUs3r321!'
            ,database: productName
            , timezone: 'utc'
        }
        ,logging: {
            enableRemoteLogging: true,
            loggly: {
                subdomain: productName,
                username: 'mcdevs@madaincorp.com',
                password: 'AP1U$#R!',
                inputToken: 'e12a0932-6ddc-4fc6-afb3-308e045ac245',
                tags: ["devControlPanel"]
            }
        },
        smtp: {
            
            username: "daniel@javu.io"
            , password: "ko4TKFp2FOXKKXjlsAiwHw"//this is the API key for Mandrill Account
        },
        hash: {
            hashConfigKey: "e9e3c089-6dba-4b04-ba39-54cfef0d5c13"
        },
        supportEmail: "support@javu.io",
        forgetPasswordSenderEmail: "support@javu.io",
        resetPasswordPage: "http://localhost:1348/resetPassword.html?tempAuthKey={authKey}",
        cypherKey : "91b7bd62-5959-46c3-9a96-bcfd0a0de372",
        mongoDBServer: { connectionString: "mongodb://54.149.71.236:1333/" + productName }
    }
};

var config = process.argv[2] || environments['devControlPanel'];

/*
if (config) {
    config.devMode = (process.argv.length > 3 && process.argv[3].toLowerCase() == "dev");
    config.testMode = (process.argv.length > 3 && process.argv[3].toLowerCase() == "test");
}
*/
module.exports = config;