const db = require("../database");
const { createToken } = require("../helper/createToken")
const Crypto = require('crypto')
const transporter = require('../helper/nodemailer')

module.exports = {
  getData: (req, res) => {
    let scriptQuery = `Select * from users;`;
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  addData: (req, res) => {
    console.log(req, body);
    let { username, email, password } = req.body;
    password = Crypto.createHmac("shal", "hash123").update(password);
    console.log(password);
    let insertQuery = `Insert into users value (null, ${db.escape(username)}, ${db.escape(email)}, ${db.escape(password)}, null, null);`;
    console.log(insertQuery);
    db.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      if (results.insertId) {
        let sqlGet = `Select * from users where idusers = ${results.insertId};`;
        db.query(sqlGet, (err2, results2) => {
          if (err2) {
            console.log(err2);
            res.status(500).send(err2);
          }

          let { idusers, username, email, role, status} = results2[0];
          let token = createToken({idusers, username, email, role, status})

          let mail = {
            from: `Admin <idiotcolony97@gmail.com>`,
            to: `${email}`,
            subject: 'Account verification',
            html:`<a href='http://localhost:3000/authentication/${token}'>Click here to verify your account</a>`
          }

          transporter.sendMail(mail, (errMail, resMail) => {
            if(errMail) {
              console.log(errMail)
            }
            res.status(500).send({message: "Registration Failed!", Success: false, err: errMail})
          })
          res.status(200).send({message: "Registration Success, Check your email!", Success: true})
        });
      }
    });
  },
  verification:(req, res) => {
    let updateQuery = `Update users set status='verified' where idusers = ${req, user.idusers}`;

    db.query(updateQuery, (err, results) => {
      if(err){
        console.log(err)
        res.status(500).send(err)
      }
      res.status(200).send({ message: "Verified Account", Success: true })
    })
  },
  editData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE users set ${dataUpdate} where idusers = ${req.parse}`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
