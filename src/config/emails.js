const nodemailer = require("nodemailer");

module.exports = {

    async send(params) {

        // Template do email
        let strHtml = '<div style="display: block;margin: 0 auto;width: 620px;">';
        strHtml += '<div style="height:550px;background-color:#2196F3;border-radius:15px 100px;">';
        strHtml += '<div style="text-align:center;padding-top:10%;font-size:20px;color:#FFF;">';
        strHtml += '<p>FATECGRAM:</p>';
        strHtml += `<p>Olá ${params.name}!</p>`;
        strHtml += '<p>Precisamos que você confirme seu email para ter acesso a nossa rede.</p>';
        strHtml += '<p>Clique no link a baixo para confirmar</p>';
        strHtml += '<p></p>';
        strHtml += `<p><a href="${process.env.URL_API}users/active?user=${params._id}" target="_blank"  style="text-decoration: none;cursor:pointer;">CONFIRMAR EMAIL</a></p>`;
        strHtml += '<p></p>';
        strHtml += `<p>${process.env.URL_API}users/active?user=${params._id}</p>`;
        strHtml += '<p style="font-size:12px;color:#000;bottom:0px;margin-top:170px">Desenvolvido por Cleber Rezende</p>'
        strHtml += '</div></div></div>';

        // Email de destinatário
        let mailOptions = {
            from: 'Fatecgram',
            to: params.email, //edmilson.dourado@luizalabs.com
            subject: 'FATECGRAM- Validação de email',
            text: 'Fatecgram',
            html: strHtml
        };

        // Informações do remetente do email 
        let transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_EMAIL
            }
        });

        /* Válidar error ou sucess
        */
        transporter.sendMail(mailOptions, (error, info) => {
            next();
        });
    }
}


