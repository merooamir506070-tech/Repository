const {chromium}=require('playwright');const path=require('path');
(async()=>{const dir=process.argv[2],out=process.argv[3];
const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:640},deviceScaleFactor:3});
await p.goto('file://'+path.resolve(dir,'build/index.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
await p.addScriptTag({path:'/tmp/claude-0/-home-user-Repository/76303b79-cb24-5bc5-bc13-471581c630fb/scratchpad/cover-scenes.js'});
await p.evaluate(()=>{
  var harbor=__H.harbor,ctrCut=__H.ctrCut,carSide=__H.carSide,lyingZizo=__H.lyingZizo,lerp=__H.lerp;
  window.renderAt=function(){};
  document.querySelector('.cap').style.display='none';
  var t=1.2, k=0.3;
  var sc=harbor(t,430)+ctrCut(-90,420,370)+carSide(170,420,1.05,t,{win:1})
    +'<g clip-path="url(#cw)">'+lyingZizo(lerp(150,300,k),352,0.5,t,"shock",1)+'</g>'
    +'<path d="M268 300 Q300 290 292 322" stroke="#f2c230" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M284 318 L292 326 L298 314" stroke="#f2c230" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  var svg='<defs><clipPath id="cw"><rect x="178" y="300" width="160" height="70"/></clipPath></defs>'
    +'<g transform="translate(180 365) scale(1.7) translate(-215 -350)">'+sc+'</g>'
    +'<rect width="360" height="640" filter="url(#grain)" opacity=".5"/>';
  document.getElementById('panel').innerHTML=svg;
  var o=document.createElement('div');
  o.innerHTML='<div style="position:absolute;left:0;right:0;top:70px;text-align:center">'
   +'<div style="display:inline-block;background:#23262b;color:#fff;border:2px solid #eceae6;border-radius:20px;padding:4px 18px 8px;font:900 30px/1.35 Noto Sans Arabic;box-shadow:0 3px 10px rgba(0,0,0,.3)">السواق بيخرج إزاي؟</div><br>'
   +'<div style="display:inline-block;margin-top:10px;background:#d9362b;color:#fff;border:2.5px solid #23262b;border-radius:16px;padding:2px 18px 6px;font:900 26px/1.4 Noto Sans Arabic;transform:rotate(-3deg)">من جوه الكونتينر!</div></div>'
   +'<div style="position:absolute;left:0;right:0;bottom:70px;text-align:center"><div style="display:inline-block;background:#f2c230;color:#23262b;border:2px solid #23262b;border-radius:14px;padding:2px 16px 6px;font:900 22px/1.4 Noto Sans Arabic">أقل من 20 سم على كل ناحية</div></div>';
  document.querySelector('.canvas').appendChild(o);
});
await p.waitForTimeout(300);await (await p.$('.canvas')).screenshot({path:out});await b.close();})();
