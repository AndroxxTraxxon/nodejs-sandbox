var Connection = require('tedious').Connection;
var config = {
    userName: 'php_access',
    password: 'moonfish',
    server: '10.135.10.56',
    options: {database: 'AdventureWorks'}
};

var connection = new Connection(config);
connection.on('connect', function(err){
    console.log("Connected");
});