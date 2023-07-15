export const resetPasswordEmailTemplate = (to, url) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title>New Template</title><!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<style type="text/css">
.rollover:hover .rollover-first {
max-height:0px!important;
display:none!important;
}
.rollover:hover .rollover-second {
max-height:none!important;
display:inline-block!important;
}
.rollover div {
font-size:0px;
}
u ~ div img + div > div {
display:none;
}
#outlook a {
padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
color:inherit;
mso-style-priority:99;
}
a.es-button {
mso-style-priority:100!important;
text-decoration:none!important;
}
a[x-apple-data-detectors] {
color:inherit!important;
text-decoration:none!important;
font-size:inherit!important;
font-family:inherit!important;
font-weight:inherit!important;
line-height:inherit!important;
}
.es-desk-hidden {
display:none;
float:left;
overflow:hidden;
width:0;
max-height:0;
line-height:0;
mso-hide:all;
}
.es-header-body a:hover {
color:#26c6da!important;
}
.es-content-body a:hover {
color:#26c6da!important;
}
.es-footer-body a:hover {
color:#ffffff!important;
}
.es-infoblock a:hover {
color:#cccccc!important;
}
.es-button-border:hover {
border-color:#26C6DA #26C6DA #26C6DA #26C6DA!important;
background:#58dfec!important;
}
.es-button-border:hover a.es-button,
.es-button-border:hover button.es-button {
background:#58dfec!important;
}
@media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p20b { padding-bottom:20px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:30px!important; text-align:center } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img, .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } a.es-button, button.es-button { display:inline-block!important } .es-button-border { display:inline-block!important } }
</style>
</head>
<body style="width:100%;height:100%;padding:0;Margin:0">
<div class="es-wrapper-color" style="background-color:#07023C"><!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#07023c"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#07023C">
<tr>
<td valign="top" style="padding:0;Margin:0">
<table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
<tr>
<td align="center" style="padding:0;Margin:0">
<table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;background-repeat:no-repeat;width:600px;background-image:url(https://sowogv.stripocdn.email/content/guids/CABINET_0e8fbb6adcc56c06fbd3358455fdeb41/images/vector_0Ia.png);background-position:center center" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" background="https://sowogv.stripocdn.email/content/guids/CABINET_0e8fbb6adcc56c06fbd3358455fdeb41/images/vector_0Ia.png">
<tr>
<td align="left" style="Margin:0;padding-top:20px;padding-right:20px;padding-bottom:10px;padding-left:20px">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://storepay.com" style="mso-line-height-rule:exactly;text-decoration:underline;color:#26C6DA;font-size:14px"><img src="https://sowogv.stripocdn.email/content/guids/CABINET_a1d2526217867161e23cfdb803e696c26a20769a98e0371d4aac771ad503dcd3/images/logoweb.png" alt="Logo" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" title="Logo" height="90"></a></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
<tr>
<td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:30px;padding-bottom:30px">
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:560px">
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0"><h4 style="Margin:0;font-family:'comic sans ms', 'marker felt-thin', arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:29px;color:#333333">Chúng tôi đã nhận được yêu cầu đặt lại&nbsp;mật khẩu của bạn</h4></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-bottom:30px;padding-top:40px;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="mso-line-height-rule:exactly;text-decoration:underline;color:#26C6DA;font-size:14px"><img class="adapt-img" src="https://sowogv.stripocdn.email/content/guids/CABINET_a1d2526217867161e23cfdb803e696c26a20769a98e0371d4aac771ad503dcd3/images/resetpassword.png" alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" height="220"></a></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Quên mật khẩu? Không vấn đề gì - nó xảy ra với tất cả mọi người!</p></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-top:25px;padding-bottom:25px"><span class="es-button-border" style="border-style:solid;border-color:#cfe2f3;background:#6fa8dc;border-width:4px;display:inline-block;border-radius:10px;width:auto"><a href=${url} class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:15px 35px;display:inline-block;background:#6fa8dc;border-radius:10px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #6fa8dc">Đặt lại mật khẩu của bạn</a></span></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Nếu bạn bỏ qua thông báo này, mật khẩu của bạn sẽ không bị thay đổi.</p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
<table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
<tr>
<td align="center" style="padding:0;Margin:0">
<table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
<tr>
<td align="left" style="Margin:0;padding-top:20px;padding-right:20px;padding-left:20px;padding-bottom:20px">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:10px;font-size:0">
<table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://viewstripo.email" style="mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img title="Facebook" src="https://sowogv.stripocdn.email/content/assets/img/social-icons/square-colored/facebook-square-colored.png" alt="Fb" width="32" height="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
<td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://viewstripo.email" style="mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img title="Twitter" src="https://sowogv.stripocdn.email/content/assets/img/social-icons/square-colored/twitter-square-colored.png" alt="Tw" width="32" height="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
</tr>
</table></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#ffffff;font-size:12px">Bạn nhận được email này vì bạn đã truy cập trang web của chúng tôi hoặc hỏi chúng tôi về bản tin thường xuyên. Đảm bảo thư của chúng tôi đến được Hộp thư đến của bạn (chứ không phải thư mục rác hoặc thư rác của bạn).<br><a target="_blank" style="mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:12px" href="https://viewstripo.email">Privacy police</a> | <a target="_blank" style="mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:12px" href="">Unsubscribe</a></p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
<tr>
<td align="left" style="padding:20px;Margin:0">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" valign="top" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" class="es-infoblock made_with" style="padding:0;Margin:0;font-size:0"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=product_update_1&utm_content=it_happens_to_everyone" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"><img src="https://sowogv.stripocdn.email/content/guids/CABINET_09023af45624943febfa123c229a060b/images/7911561025989373.png" alt="" width="125" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
</div>
</body>
</html>
    `;
};
