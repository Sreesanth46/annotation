exports.addAccount = (accountId,password) => {
    return `
    <!DOCTYPE html>
    <html style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">
        <head>
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Please Verify Your Email Address</title>
        </head>
        <body bgcolor="#f6f6f6" style="background-color:#F6F6F6 !important;font-family: sans-serif; font-size: 100%; line-height: 1.6em; -webkit-font-smoothing: antialiased; height: 100%; -webkit-text-size-adjust: none; width: 100% !important; margin: 0; padding: 0;">
            <!-- header -->
            <table class="header-wrap" style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; clear: both !important; width: 100%; margin: 0; padding: 0;">
                <tr style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">
                    <td style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;"></td>
                    <td class="container" style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; clear: both !important; display: block !important; margin: 0 auto; padding: 0;"><!-- content -->

                        <div class="content" style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; display: block; margin: 0 auto; padding: 0;">
                            <table style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; width: 100%; margin: 0; padding: 0; text-align: center;">
                                <tr style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">
                                    <td align="center" style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0; text-align: center;"></td>
                                </tr>
                            </table>
                        </div>

                        <!-- /content --></td>
                    <td style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;"></td>
                </tr>
            </table>
            <!-- /header --> 
            <!-- body -->
            <!--[if mso]>
             <center>
             <table><tr><td width="600">
            <![endif]-->
            <table class="body-wrap" style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; width: 100%; margin: 0; padding: 20px;">
                <tr style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">
                    <td style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;"></td>
                    <td class="container" bgcolor="#FFFFFF" style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; clear: both !important; display: block !important; max-width: 600px !important; Margin:auto; padding: 20px; border: 1px solid #f0f0f0;"><!-- content -->

                        <div class="content" style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; display: block; max-width: 600px; margin: 0 auto; padding: 0;">
                            <table style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; width: 100%; margin: 0; padding: 0;">
                                <tr style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">
                                    <td style="font-family: sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">
                                        <h1 style="font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 28px; line-height: 1em; color: #444444; font-weight: 200; margin: 20px 0 10px; padding: 0;">
                                            Welcome to Annotation Tool
                                        </h1>
                                        <p style="Margin-top: 20px;Margin-bottom: 20px;font-size: 17px;line-height: 26px; color: #444444;">
                                            Login Credentials<br> Account Id: ${accountId} <br> Password : ${password}</p>
                                        
                                    </td>
                                </tr>
                            </table>
                        </div>
                </tr>
            </table>
        </body>
    </html>`

} 