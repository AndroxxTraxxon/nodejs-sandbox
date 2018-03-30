'use strict';
const mysql = require('mysql');
const Connection = mysql.Connection;
var con = undefined;

function get_conn(){
    if(con == undefined){
        con = mysql.createConnection({
            host: 'localhost',
            user: 'sandbox_app',
            password: 'sandbox_4pp'
        });
    }
    if(!con._connectCalled){
        con.connect(function(err){
            if(err) throw err;
            console.log("MySQL: Connected to " + con.config.host + " as " + con.config.user);
        });
    }
    return con;
}

function close_conn(){
    con.destroy();
}