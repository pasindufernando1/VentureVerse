package com.ventureverse.server.assets;

public class Templates {

    public static String forgetPasswordTemp(String Link) {

        return new StringBuilder()
                .append(
                        """
                                <head>
                                                                         <title>Rating Reminder</title>
                                                                         <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                                                                         <meta content="width=device-width" name="viewport">
                                                                         <style type="text/css">
                                                                             @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                                                                         </style>
                                                                         <style media="screen and (max-width: 680px)">
                                                                             @media screen and (max-width: 680px) {
                                                                                 .phone {
                                                                                     padding: 0 30px;
                                                                                 }
                                                                     
                                                                                 .page-center {
                                                                                     padding-left: 0 !important;
                                                                                     padding-right: 0 !important;
                                                                                 }
                                                                     
                                                                                 .footer-center {
                                                                                     padding-left: 20px !important;
                                                                                     padding-right: 20px !important;
                                                                                 }
                                                                             }
                                                                         </style>
                                                                     </head>
                                                                     <body style="background-color: #f4f4f5;">
                                                                     <table cellpadding="0" cellspacing="0"
                                                                            style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
                                                                         <tbody>
                                                                         <tr>
                                                                             <td style="text-align: center;">
                                                                                 <table align="center" cellpadding="0" cellspacing="0" id="body" class="phone"
                                                                                        style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
                                                                                     <tbody>
                                                                                     <tr>
                                                                                         <td>
                                                                                             <table align="center" cellpadding="0" cellspacing="0" class="page-center"
                                                                                                    style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
                                                                                                 <tbody>
                                                                                                 <tr>
                                                                                                     <td colspan="2"
                                                                                                         style="padding-top: 72px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: 'Montserrat', 'sans-serif'; font-size: 48px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;">
                                                                                                         Reset Your Password
                                                                                                     </td>
                                                                                                 </tr>
                                                                                                 <tr>
                                                                                                     <td style="padding-top: 48px; padding-bottom: 48px;">
                                                                                                         <table cellpadding="0" cellspacing="0" style="width: 100%">
                                                                                                             <tbody>
                                                                                                             <tr>
                                                                                                                 <td style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81"></td>
                                                                                                             </tr>
                                                                                                             </tbody>
                                                                                                         </table>
                                                                                                     </td>
                                                                                                 </tr>
                                                                                                 <tr>
                                                                                                     <td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Montserrat', 'sans-serif'; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                                                                         You're receiving this e-mail because you requested a password reset for your <span style="color: #D0BDF4; font-weight: 500;">VentureVerse</span> account.
                                                                                                     </td>
                                                                                                 </tr>
                                                                                                 <tr>
                                                                                                     <td style="padding-top: 24px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Montserrat', 'sans-serif'; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                                                                         Please tap the button below to choose a new password.
                                                                                                     </td>
                                                                                                 </tr>
                                                                                                 <tr>
                                                                                                     <td>
                                                                                                         <a data-click-track-id="37" href="
                                                                    """)
                .append(Link)
                .append(
                        """
                                                                                                        "
                                                                                                            style="margin-top: 36px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #ffffff; font-family: 'Montserrat', 'sans-serif'; font-size: 12px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: 0.7px; line-height: 48px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 220px; background-color: #8458B3; border-radius: 28px; display: block; text-align: center; text-transform: uppercase"
                                                                                                            target="_blank">
                                                                                                             Reset Password
                                                                                                         </a>
                                                                                                     </td>
                                                                                                 </tr>
                                                                                                 </tbody>
                                                                                             </table>
                                                                                         </td>
                                                                                     </tr>
                                                                                     </tbody>
                                                                                 </table>
                                                                                 <table align="center" cellpadding="0" cellspacing="0" id="footer"
                                                                                        style="background-color: #000; width: 100%; max-width: 680px; height: 100%;">
                                                                                     <tbody>
                                                                                     <tr>
                                                                                         <td>
                                                                                             <table align="center" cellpadding="0" cellspacing="0" class="footer-center"
                                                                                                    style="text-align: left; width: 100%; padding-left: 120px; padding-right: 120px;">
                                                                                                 <tbody>
                                                                                                 <tr>
                                                                                                     <td colspan="2" style="padding-top: 48px; padding-bottom: 24px; width: 100%;">
                                                                                                         <img src="https://i.ibb.co/s1bvXHy/Venture-Verse-Email-Logo.png" style="width: 40%;">
                                                                                                     </td>
                                                                                                 </tr>
                                                                                                 <tr>
                                                                                                     <td colspan="2" style="padding-top: 24px; padding-bottom: 48px;">
                                                                                                         <table cellpadding="0" cellspacing="0" style="width: 100%">
                                                                                                             <tbody>
                                                                                                             <tr>
                                                                                                                 <td style="width: 100%; height: 1px; max-height: 1px; background-color: #EAECF2; opacity: 0.19"></td>
                                                                                                             </tr>
                                                                                                             </tbody>
                                                                                                         </table>
                                                                                                     </td>
                                                                                                 </tr>
                                                                                                 <tr>
                                                                                                     <td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095A2; font-family: 'Montserrat', 'sans-serif'; font-size: 15px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: 0; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                                                                         If you have any questions or concerns, we're here to help. Contact us via our <a
                                                                                                             data-click-track-id="1053" href="#"
                                                                                                             style="font-weight: 500; color: #ffffff" target="_blank">Help Center</a>.
                                                                                                     </td>
                                                                                                 </tr>
                                                                                                 <tr>
                                                                                                     <td style="height: 72px;"></td>
                                                                                                 </tr>
                                                                                                 </tbody>
                                                                                             </table>
                                                                                         </td>
                                                                                     </tr>
                                                                                     </tbody>
                                                                                 </table>
                                                                             </td>
                                                                         </tr>
                                                                         </tbody>
                                                                     </table>
                                                                     
                                                                     
                                                                     </body>
                                                                """
                ).toString();
    }

}
