const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'iglesiaueacoronelsuarez@gmail.com',
        pass: 'UEASuarez#123'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.body.data.dest;
        const from = req.body.data.from;
        const name = req.body.data.name;
        const text = req.body.data.text;
        const subject = req.body.data.subject;

        const mailOptions = {
            from: from,
            to: dest,
            subject: subject,
            html: 
            `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
            <html>
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
            <title>Mailto</title>
            <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
            <style type="text/css">
            html { -webkit-text-size-adjust: none; -ms-text-size-adjust: none;}
            
                @media only screen and (min-device-width: 750px) {
                    .table750 {width: 750px !important;}
                }
                @media only screen and (max-device-width: 750px), only screen and (max-width: 750px){
                  table[class="table750"] {width: 100% !important;}
                  .mob_b {width: 93% !important; max-width: 93% !important; min-width: 93% !important;}
                  .mob_b1 {width: 100% !important; max-width: 100% !important; min-width: 100% !important;}
                  .mob_left {text-align: left !important;}
                  .mob_soc {width: 50% !important; max-width: 50% !important; min-width: 50% !important;}
                  .mob_menu {width: 50% !important; max-width: 50% !important; min-width: 50% !important; box-shadow: inset -1px -1px 0 0 rgba(255, 255, 255, 0.2); }
                  .mob_center {text-align: center !important;}
                  .top_pad {height: 15px !important; max-height: 15px !important; min-height: 15px !important;}
                  .mob_pad {width: 15px !important; max-width: 15px !important; min-width: 15px !important;}
                  .mob_div {display: block !important;}
                 }
               @media only screen and (max-device-width: 550px), only screen and (max-width: 550px){
                  .mod_div {display: block !important;}
               }
                .table750 {width: 750px;}
            </style>
            </head>
            <body style="margin: 0; padding: 0;">
            
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f3f3f3; min-width: 350px; font-size: 1px; line-height: normal;">
                 <tr>
                   <td align="center" valign="top">   			
                       <table cellpadding="0" cellspacing="0" border="0" width="750" class="table750" style="width: 100%; max-width: 750px; min-width: 350px; background: #f3f3f3;">
                           <tr>
                           <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>
                               <td align="center" valign="top" style="background: #ffffff;">
            
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f3f3f3;">
                                 <tr>
                                    <td align="right" valign="top">
                                       <div class="top_pad" style="height: 25px; line-height: 25px; font-size: 23px;">&nbsp;</div>
                                    </td>
                                 </tr>
                              </table>
            
                              <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">
                                 <tr>
                                    <td align="left" valign="top">
                                       <div style="height: 39px; line-height: 39px; font-size: 37px;">&nbsp;</div>
                                       <a href="#" target="_blank" style="display: block; max-width: 128px;">
                                          <img src="https://uea-coronel-suarez.web.app/assets/img/logoUea.ico" alt="img" width="128" border="0" style="display: block; width: 128px;" />
                                       </a>
                                       <div style="height: 73px; line-height: 73px; font-size: 71px;">&nbsp;</div>
                                    </td>
                                 </tr>
                              </table>
            
                              <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">
                                 <tr>
                                    <td align="left" valign="top">
                                       <font face="'Source Sans Pro', sans-serif" color="#1a1a1a" style="font-size: 52px; line-height: 60px; font-weight: 300; letter-spacing: -1.5px;">
                                          <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 52px; line-height: 60px; font-weight: 300; letter-spacing: -1.5px;">Hola!</span>
                                       </font>
                                       <div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div>
                                       <font face="'Source Sans Pro', sans-serif" color="#585858" style="font-size: 24px; line-height: 32px;">
                                          <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #585858; font-size: 24px; line-height: 32px;"> ` + name + ` te envió un mensaje desde la página web de la iglesia evangélica de Coronel Suárez.</span>
                                       </font>
                                       <div style="height: 20px; line-height: 20px; font-size: 18px;">&nbsp;</div>
                                       <font face="'Source Sans Pro', sans-serif" color="#585858" style="font-size: 24px; line-height: 32px;">
                                          <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #585858; font-size: 24px; line-height: 32px;">` + text + `</span>
                                       </font>
                                       <div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div>
                                       <div style="height: 75px; line-height: 75px; font-size: 73px;">&nbsp;</div>
                                    </td>
                                 </tr>
                              </table>
            
                              <table cellpadding="0" cellspacing="0" border="0" width="90%" style="width: 90% !important; min-width: 90%; max-width: 90%; border-width: 1px; border-style: solid; border-color: #e8e8e8; border-bottom: none; border-left: none; border-right: none;">
                                 <tr>
                                    <td align="left" valign="top">
                                       <div style="height: 15px; line-height: 15px; font-size: 13px;">&nbsp;</div>
                                    </td>
                                 </tr>
                              </table>
            
                              <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">
                                 <tr>
                                    <td align="center" valign="top">
                                       <div style="display: inline-block; vertical-align: top; width: 50px;">
                                          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%;">
                                             <tr>
                                                <td align="center" valign="top">
                                                   <div style="height: 13px; line-height: 13px; font-size: 11px;">&nbsp;</div>
                                                   <div style="display: block; max-width: 50px;">
                                                      <img src="https://uea-coronel-suarez.web.app/assets/img/frente.jpg" alt="img" width="50" border="0" style="display: block; width: 50px;" />
                                                   </div>
                                                </td>
                                             </tr>
                                          </table>
                                       </div><div class="mob_div" style="display: inline-block; vertical-align: top; width: 62%; min-width: 260px;">
                                          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%;">
                                             <tr>
                                                <td width="18" style="width: 18px; max-width: 18px; min-width: 18px;">&nbsp;</td>
                                                <td class="mob_center" align="left" valign="top">
                                                   <div style="height: 13px; line-height: 13px; font-size: 11px;">&nbsp;</div>
                                                   <font face="'Source Sans Pro', sans-serif" color="#000000" style="font-size: 19px; line-height: 23px; font-weight: 600;">
                                                      <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 19px; line-height: 23px; font-weight: 600;">UEA Coronel Suarez</span>
                                                   </font>
                                                   <div style="height: 1px; line-height: 1px; font-size: 1px;">&nbsp;</div>
                                                   <font face="'Source Sans Pro', sans-serif" color="#7f7f7f" style="font-size: 19px; line-height: 23px;">
                                                      <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #7f7f7f; font-size: 19px; line-height: 23px;">Belgrano 1559. Coronel Suárez, Buenos Aires. Argentina</span>
                                                   </font>
                                                </td>
                                                <td width="18" style="width: 18px; max-width: 18px; min-width: 18px;">&nbsp;</td>
                                             </tr>
                                          </table>
                                       </div><div style="display: inline-block; vertical-align: top; width: 177px;">
                                        
                                       </div>
                                       <div style="height: 150px; line-height: 30px; font-size: 28px;">&nbsp;</div>
                                    </td>
                                 </tr>
                              </table>
            
                           </td>
                           <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>
                        </tr>
                     </table>
                  </td>
               </tr>
            </table>
            </body>
            </html>
            `
            // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.status(500).send({
                    data:
                    {
                        "status": 500,
                        "message": erro.toString()
                    }})
                }
            
            return res.status(200).send( {
                data:
                {
                    "status": 200,
                    "message": "sended"
            }});
        });
    });    
});
