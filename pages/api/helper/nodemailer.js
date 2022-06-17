const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth:{
        user:'idiotcolony97@gmail.com',
        password:'wizilrueqdmyouux'
    },
    tls:{
        rejectUnauthorized:false
    }
})

module.exports = transporter