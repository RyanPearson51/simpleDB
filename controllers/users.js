const mysql = require('mysql');
//a

let pool = mysql.createPool({
    connectionLimit: 100,
    host: 'sql3.freesqldatabase.com',
    user: 'sql3436006',
    password: 'IvH8AQEy4l',
    database: 'sql3436006',
    debug: false
  });

function listUsers(req, res){
    console.log('controller.users.list', req.params)
    //select all users from appusers 
    pool.query('SELECT username, email FROM appusers', function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
  })
}

let showUser = function(req, res){
    console.log('controller.users.show', req.params)
    //code to return single user by id, will not include password
    //id is path param
    let sql = "SELECT id, fullname, username, email FROM appusers WHERE id = ?";
    //const replacements = []
    sql = mysql.format(sql, [req.params.id]);
    pool.query(sql, function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
    })
}


//create user, assign it an id, add it to users array
//content of user will be inside request body

function createUser(req, res){
    console.log('controller.users.create', req.body)
    //SQL to create a new user using req.body
    let sql = "INSERT INTO appusers (fullname, username, email, password)  VALUES (?, ?, ?, ?)";
    //const replacements = []
    sql = mysql.format(sql, [req.body.fullname, req.body.username, req.body.email, req.body.password]);
    //in the table i had uploaded and been using for practice, joining date had a weird format so that will start as 00:00:00, but everything else will work correctly
    pool.query(sql, function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
    })
}

let updateUser = function(req, res){
    console.log('controller.users.update', req.body)
    //code to update a user
    //this will set a new salary for a specific worker
    let sql = "UPDATE appusers SET password = ? WHERE id = ?";
    //const replacements = []
    sql = mysql.format(sql, [req.body.password, req.params.id]);
    pool.query(sql, function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
    })
 
}

let deleteUser = function(req, res){
    console.log('controller.users.delete', req.body)
     //code to delete a user from the database
     let sql = "DELETE from appusers where id = ?";
     //const replacements = []
     sql = mysql.format(sql, [req.body.id]);
     pool.query(sql, function(err, rows){
         if(err){
             return res.json({
                 'error': true, 
                 'message': 'error occured:' + err
         })
     } else{
         res.json(rows);
     }
     })

 
}

module.exports = {
    listUsers,
    showUser,
    createUser,
    updateUser,
    deleteUser
}