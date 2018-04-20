const mysqlssh = require('mysql-ssh');
const fs = require('fs');
 
mysqlssh.connect(
    {
        host: '188.166.219.165',
        user: 'root',
        password: 'Superman463!',
        privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
    },
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'Superman463!',
    }
)
.then(client => {
    client.query('SELECT * FROM `portfolio.pet`', function (err, results, fields) {
        if (err) throw err
        console.log(results);
        mysqlssh.close()
    })
})
.catch(err => {
    console.log(err)
})