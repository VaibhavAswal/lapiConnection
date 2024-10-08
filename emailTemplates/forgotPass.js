exports.forgotMail = (link) => {
  return `<!doctype html>
<html ⚡4email data-css-strict>
 <head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script>
  
  <style amp-custom>
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
}
body {
	width:100%;
	font-family:arial, "helvetica neue", helvetica, sans-serif;
}
table {
	border-collapse:collapse;
	border-spacing:0px;
}
table td, body, .es-wrapper {
	padding:0;
	Margin:0;
}
.es-content, .es-header, .es-footer {
	table-layout:fixed;
	width:100%;
}
p, hr {
	Margin:0;
}
h1, h2, h3, h4, h5 {
	Margin:0;
	line-height:120%;
	font-family:arial, "helvetica neue", helvetica, sans-serif;
}
.es-left {
	float:left;
}
.es-right {
	float:right;
}
.es-p5 {
	padding:5px;
}
.es-p5t {
	padding-top:5px;
}
.es-p5b {
	padding-bottom:5px;
}
.es-p5l {
	padding-left:5px;
}
.es-p5r {
	padding-right:5px;
}
.es-p10 {
	padding:10px;
}
.es-p10t {
	padding-top:10px;
}
.es-p10b {
	padding-bottom:10px;
}
.es-p10l {
	padding-left:10px;
}
.es-p10r {
	padding-right:10px;
}
.es-p15 {
	padding:15px;
}
.es-p15t {
	padding-top:15px;
}
.es-p15b {
	padding-bottom:15px;
}
.es-p15l {
	padding-left:15px;
}
.es-p15r {
	padding-right:15px;
}
.es-p20 {
	padding:20px;
}
.es-p20t {
	padding-top:20px;
}
.es-p20b {
	padding-bottom:20px;
}
.es-p20l {
	padding-left:20px;
}
.es-p20r {
	padding-right:20px;
}
.es-p25 {
	padding:25px;
}
.es-p25t {
	padding-top:25px;
}
.es-p25b {
	padding-bottom:25px;
}
.es-p25l {
	padding-left:25px;
}
.es-p25r {
	padding-right:25px;
}
.es-p30 {
	padding:30px;
}
.es-p30t {
	padding-top:30px;
}
.es-p30b {
	padding-bottom:30px;
}
.es-p30l {
	padding-left:30px;
}
.es-p30r {
	padding-right:30px;
}
.es-p35 {
	padding:35px;
}
.es-p35t {
	padding-top:35px;
}
.es-p35b {
	padding-bottom:35px;
}
.es-p35l {
	padding-left:35px;
}
.es-p35r {
	padding-right:35px;
}
.es-p40 {
	padding:40px;
}
.es-p40t {
	padding-top:40px;
}
.es-p40b {
	padding-bottom:40px;
}
.es-p40l {
	padding-left:40px;
}
.es-p40r {
	padding-right:40px;
}
.es-menu td {
	border:0;
}
s {
	text-decoration:line-through;
}
p, ul li, ol li {
	font-family:arial, "helvetica neue", helvetica, sans-serif;
	line-height:150%;
}
ul li, ol li {
	Margin-bottom:15px;
	margin-left:0;
}
a {
	text-decoration:underline;
}
.es-menu td a {
	text-decoration:none;
	display:block;
	font-family:arial, "helvetica neue", helvetica, sans-serif;
}
.es-wrapper {
	width:100%;
	height:100%;
}
.es-wrapper-color, .es-wrapper {
	background-color:#FAFAFA;
}
.es-header {
	background-color:transparent;
}
.es-header-body {
	background-color:transparent;
}
.es-header-body p, .es-header-body ul li, .es-header-body ol li {
	color:#333333;
	font-size:14px;
}
.es-header-body a {
	color:#666666;
	font-size:14px;
}
.es-content-body {
	background-color:#FFFFFF;
}
.es-content-body p, .es-content-body ul li, .es-content-body ol li {
	color:#333333;
	font-size:14px;
}
.es-content-body a {
	color:#5C68E2;
	font-size:14px;
}
.es-footer {
	background-color:transparent;
}
.es-footer-body {
	background-color:#FFFFFF;
}
.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li {
	color:#333333;
	font-size:12px;
}
.es-footer-body a {
	color:#333333;
	font-size:12px;
}
.es-infoblock, .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li {
	line-height:120%;
	font-size:12px;
	color:#CCCCCC;
}
.es-infoblock a {
	font-size:12px;
	color:#CCCCCC;
}
h1 {
	font-size:46px;
	font-style:normal;
	font-weight:bold;
	color:#333333;
}
h2 {
	font-size:26px;
	font-style:normal;
	font-weight:bold;
	color:#333333;
}
h3 {
	font-size:20px;
	font-style:normal;
	font-weight:bold;
	color:#333333;
}
.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
	font-size:46px;
}
.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
	font-size:26px;
}
.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
	font-size:20px;
}
a.es-button, button.es-button {
	padding:10px 30px 10px 30px;
	display:inline-block;
	background:#5C68E2;
	border-radius:5px;
	font-size:20px;
	font-family:arial, "helvetica neue", helvetica, sans-serif;
	font-weight:normal;
	font-style:normal;
	line-height:120%;
	color:#FFFFFF;
	text-decoration:none;
	width:auto;
	text-align:center;
}
.es-button-border {
	border-style:solid solid solid solid;
	border-color:#2CB543 #2CB543 #2CB543 #2CB543;
	background:#5C68E2;
	border-width:0px 0px 0px 0px;
	display:inline-block;
	border-radius:5px;
	width:auto;
}
.es-menu amp-img, .es-button amp-img {
	vertical-align:middle;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150% } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:36px; text-align:left } h2 { font-size:26px; text-align:left } h3 { font-size:20px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px; text-align:left } .es-menu td a { font-size:12px } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px } *[class="gmail-fix"] { display:none } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-button-border { display:inline-block } a.es-button, button.es-button { font-size:20px; display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .es-adapt-td { display:block; width:100% } .adapt-img { width:100%; height:auto } td.es-m-p0 { padding:0 } td.es-m-p0r { padding-right:0 } td.es-m-p0l { padding-left:0 } td.es-m-p0t { padding-top:0 } td.es-m-p0b { padding-bottom:0 } td.es-m-p20b { padding-bottom:20px } .es-mobile-hidden, .es-hidden { display:none } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } table.es-social { display:inline-block } table.es-social td { display:inline-block } td.es-m-p5 { padding:5px } td.es-m-p5t { padding-top:5px } td.es-m-p5b { padding-bottom:5px } td.es-m-p5r { padding-right:5px } td.es-m-p5l { padding-left:5px } td.es-m-p10 { padding:10px } td.es-m-p10t { padding-top:10px } td.es-m-p10b { padding-bottom:10px } td.es-m-p10r { padding-right:10px } td.es-m-p10l { padding-left:10px } td.es-m-p15 { padding:15px } td.es-m-p15t { padding-top:15px } td.es-m-p15b { padding-bottom:15px } td.es-m-p15r { padding-right:15px } td.es-m-p15l { padding-left:15px } td.es-m-p20 { padding:20px } td.es-m-p20t { padding-top:20px } td.es-m-p20r { padding-right:20px } td.es-m-p20l { padding-left:20px } td.es-m-p25 { padding:25px } td.es-m-p25t { padding-top:25px } td.es-m-p25b { padding-bottom:25px } td.es-m-p25r { padding-right:25px } td.es-m-p25l { padding-left:25px } td.es-m-p30 { padding:30px } td.es-m-p30t { padding-top:30px } td.es-m-p30b { padding-bottom:30px } td.es-m-p30r { padding-right:30px } td.es-m-p30l { padding-left:30px } td.es-m-p35 { padding:35px } td.es-m-p35t { padding-top:35px } td.es-m-p35b { padding-bottom:35px } td.es-m-p35r { padding-right:35px } td.es-m-p35l { padding-left:35px } td.es-m-p40 { padding:40px } td.es-m-p40t { padding-top:40px } td.es-m-p40b { padding-bottom:40px } td.es-m-p40r { padding-right:40px } td.es-m-p40l { padding-left:40px } .es-desk-hidden { display:table-row; width:auto; overflow:visible; max-height:inherit } }
</style>
 </head>
 <body>
  <div dir="ltr" class="es-wrapper-color" lang="en">
   <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
     <tr>
      <td valign="top">
       <table cellpadding="0" cellspacing="0" class="es-content" align="center">
         <tr>
          <td class="es-info-area" align="center">
           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent" bgcolor="rgba(0, 0, 0, 0)">
             <tr>
              <td class="es-p20" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                  <td width="560" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td align="center" class="es-infoblock"><p><a target="_blank">View online version</a></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-header" align="center">
         <tr>
          <td align="center">
           <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600">
             <tr>
              <td class="es-p20" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                  <td width="560" class="es-m-p0r" valign="top" align="center">
                   <table cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td align="center" class="es-p10b" style="font-size: 0px"><amp-img src="https://fbhnhnt.stripocdn.email/content/guids/CABINET_887f48b6a2f22ad4fb67bc2a58c0956b/images/93351617889024778.png" alt="Logo" style="display: block;font-size: 12px" width="200" title="Logo" height="48"></amp-img></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center">
         <tr>
          <td align="center">
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
             <tr>
              <td class="es-p15t es-p20r es-p20l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                  <td width="560" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td align="center" class="es-p10t es-p10b" style="font-size: 0px"><amp-img src="https://fbhnhnt.stripocdn.email/content/guids/CABINET_91d375bbb7ce4a7f7b848a611a0368a7/images/69901618385469411.png" alt style="display: block" width="100" height="100"></amp-img></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-p15t es-p15b es-p40r es-p40l es-m-p0r es-m-p0l es-m-txt-c"><h1>Password reset&nbsp;</h1></td>
                     </tr>
                     <tr>
                      <td align="left" class="es-p10t"><p>After you click the button, you'll be asked to complete the following steps:</p>
                       <ol>
                        <li>Enter a new password.</li>
                        <li>Confirm your new password.</li>
                        <li>Click Submit.</li>
                       </ol></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td class="es-p20b es-p20r es-p20l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                  <td width="560" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 5px;border-collapse: separate">
                     <tr>
                      <td align="center" class="es-p10t es-p10b"><span class="es-button-border" style="border-radius: 6px"><a href=${link} class="es-button" target="_blank" style="padding-left: 30px;padding-right: 30px;border-radius: 6px">RESET YOUR PASSWORD</a></span></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-p10t es-m-txt-c"><h3 style="line-height: 150%">This link is valid for one use only. Expires in 2 hours.</h3></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-p10t es-p10b"><p style="line-height: 150%">If you didn't request to reset your&nbsp;password, please disregard this message or contact our customer service department.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
         <tr>
          <td align="center">
           <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent">
             <tr>
              <td class="es-p20t es-p20b es-p20r es-p20l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                  <td width="560" align="left">
                   <table cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td align="center" class="es-p15t es-p15b" style="font-size:0">
                       <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                         <tr>
                          <td align="center" valign="top" class="es-p40r"><amp-img title="Facebook" src="https://fbhnhnt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" height="32"></amp-img></td>
                          <td align="center" valign="top" class="es-p40r"><amp-img title="Twitter" src="https://fbhnhnt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" height="32"></amp-img></td>
                          <td align="center" valign="top" class="es-p40r"><amp-img title="Instagram" src="https://fbhnhnt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" height="32"></amp-img></td>
                          <td align="center" valign="top"><amp-img title="Youtube" src="https://fbhnhnt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" height="32"></amp-img></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-p35b"><p>Style Casual&nbsp;© 2021 Style Casual, Inc. All Rights Reserved.</p><p>4562 Hazy Panda Limits, Chair Crossing, Kentucky, US, 607898</p></td>
                     </tr>
                     <tr>
                      <td>
                       <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                         <tr class="links">
                          <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px;padding-bottom: 5px"><a target="_blank" href="https://">Visit Us </a></td>
                          <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px;padding-bottom: 5px;border-left: 1px solid #cccccc"><a target="_blank" href="https://">Privacy Policy</a></td>
                          <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px;padding-bottom: 5px;border-left: 1px solid #cccccc"><a target="_blank" href="https://">Terms of Use</a></td>
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
       <table cellpadding="0" cellspacing="0" class="es-content" align="center">
         <tr>
          <td class="es-info-area" align="center">
           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent" bgcolor="rgba(0, 0, 0, 0)">
             <tr>
              <td class="es-p20" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                  <td width="560" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td align="center" class="es-infoblock"><p><a target="_blank"></a>No longer want to receive these emails?&nbsp;<a href target="_blank">Unsubscribe</a>.<a target="_blank"></a></p></td>
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
</html>`;
};
