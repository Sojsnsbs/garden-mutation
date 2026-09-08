window.GG = window.GG || {};
GG.W=900; GG.H=720; GG.ROWS=5; GG.COLS=9;
GG.FIELD={x:86,y:92,w:756,h:560};
GG.CW=GG.FIELD.w/GG.COLS; GG.CH=GG.FIELD.h/GG.ROWS;
GG.clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
GG.lerp=(a,b,t)=>a+(b-a)*t;
GG.rand=(a,b)=>a+Math.random()*(b-a);
GG.PLANTS={
  sun:{name:'能量花',cost:50,cd:4.0,hp:260,desc:'持续产能',kind:'producer'},
  pea:{name:'豆炮',cost:100,cd:3.0,hp:290,desc:'稳定射击',kind:'shooter'},
  ice:{name:'冰豆',cost:125,cd:5.5,hp:270,desc:'射击减速',kind:'ice'},
  wall:{name:'盾果',cost:75,cd:8.0,hp:980,desc:'高耐久阻挡',kind:'wall'},
  double:{name:'双发豆',cost:200,cd:7.2,hp:300,desc:'连续双发',kind:'double'},
  bomb:{name:'爆果',cost:150,cd:15.0,hp:160,desc:'范围爆破',kind:'bomb'}
};
GG.CARD_ORDER=['sun','pea','ice','wall','double','bomb'];
GG.ENEMIES={
  basic:{name:'步行怪',hp:145,speed:14,damage:32,rate:1.12,body:'#899b8c',accent:'#d3d8ce',reward:12},
  runner:{name:'快跑怪',hp:105,speed:28,damage:23,rate:.82,body:'#b58a6f',accent:'#f0d0aa',reward:15,intro:'快跑怪冲进草坪'},
  helmet:{name:'铁盔怪',hp:300,speed:12,damage:39,rate:1.22,body:'#74847a',accent:'#c8d0c3',armor:190,reward:23,intro:'铁盔怪拥有额外护甲'},
  shield:{name:'盾怪',hp:220,speed:11,damage:31,rate:1.18,body:'#70877b',accent:'#d4ded1',shield:250,reward:25,intro:'盾怪会先消耗正面盾牌'},
  jumper:{name:'跃栏怪',hp:165,speed:22,damage:26,rate:.98,body:'#8c7aad',accent:'#e0d3ff',jump:true,reward:22,intro:'跃栏怪会跳过第一株植物'},
  charger:{name:'冲锋怪',hp:240,speed:13,damage:46,rate:1.0,body:'#8b665d',accent:'#ffd19b',charge:true,reward:28,intro:'冲锋怪接近防线时会加速'},
  brute:{name:'重装怪',hp:620,speed:8.4,damage:56,rate:1.32,body:'#655f59',accent:'#dcc8aa',armor:260,reward:38,intro:'重装怪非常耐打'},
  boss:{name:'庭院巨怪',hp:2100,speed:6.7,damage:80,rate:1.4,body:'#5e6963',accent:'#efbc69',armor:420,boss:true,reward:120,intro:'庭院巨怪进入战场'}
};
const W=(...x)=>x;
GG.WAVE_SCRIPTS=[
 W({at:.4,type:'basic',lane:2},{at:4.0,type:'basic',lane:1},{at:7.5,type:'basic',lane:3}),
 W({at:.3,type:'basic',lane:0},{at:1.9,type:'basic',lane:4},{at:4.2,type:'basic',lane:2},{at:6.5,type:'basic',lane:1},{at:8.5,type:'basic',lane:3}),
 W({at:.3,type:'runner',lane:2},{at:2.5,type:'basic',lane:1},{at:2.9,type:'basic',lane:3},{at:5.5,type:'runner',lane:4},{at:7.8,type:'basic',lane:0}),
 W({at:.2,type:'basic',lane:1},{at:.8,type:'basic',lane:1},{at:1.4,type:'basic',lane:1},{at:3.7,type:'runner',lane:3},{at:4.2,type:'runner',lane:3},{at:6.5,type:'helmet',lane:2}),
 W({at:.2,type:'helmet',lane:2},{at:.7,type:'basic',lane:0},{at:1.0,type:'basic',lane:4},{at:2.0,type:'runner',lane:1},{at:2.4,type:'runner',lane:3},{at:4.1,type:'shield',lane:2},{at:5.4,type:'basic',lane:1},{at:5.8,type:'basic',lane:3},{at:7.8,type:'runner',lane:0},{at:8.1,type:'runner',lane:4}),
 W({at:.2,type:'shield',lane:0},{at:.9,type:'shield',lane:4},{at:2.2,type:'runner',lane:2},{at:2.6,type:'runner',lane:2},{at:4.6,type:'helmet',lane:1},{at:5.0,type:'helmet',lane:3},{at:7.6,type:'basic',lane:0},{at:8.0,type:'basic',lane:4}),
 W({at:.2,type:'jumper',lane:2},{at:1.6,type:'basic',lane:1},{at:1.9,type:'basic',lane:3},{at:3.3,type:'jumper',lane:0},{at:4.7,type:'jumper',lane:4},{at:6.4,type:'shield',lane:2},{at:8.0,type:'runner',lane:1},{at:8.3,type:'runner',lane:3}),
 W({at:.2,type:'charger',lane:2},{at:1.0,type:'runner',lane:0},{at:1.5,type:'runner',lane:4},{at:3.0,type:'helmet',lane:1},{at:3.5,type:'helmet',lane:3},{at:5.3,type:'jumper',lane:2},{at:7.0,type:'shield',lane:0},{at:7.5,type:'shield',lane:4}),
 W({at:.2,type:'brute',lane:2},{at:1.0,type:'charger',lane:0},{at:1.4,type:'charger',lane:4},{at:3.1,type:'helmet',lane:1},{at:3.5,type:'helmet',lane:3},{at:5.4,type:'jumper',lane:2},{at:7.0,type:'shield',lane:0},{at:7.5,type:'shield',lane:4},{at:9.2,type:'runner',lane:2}),
 W({at:.2,type:'brute',lane:1},{at:.5,type:'brute',lane:3},{at:1.8,type:'runner',lane:0},{at:2.2,type:'runner',lane:4},{at:3.5,type:'shield',lane:2},{at:4.6,type:'jumper',lane:1},{at:5.0,type:'jumper',lane:3},{at:7.0,type:'helmet',lane:0},{at:7.4,type:'helmet',lane:4},{at:9.0,type:'charger',lane:2}),
 W({at:.2,type:'charger',lane:0},{at:.5,type:'charger',lane:4},{at:1.3,type:'runner',lane:1},{at:1.6,type:'runner',lane:3},{at:3.0,type:'shield',lane:2},{at:4.3,type:'brute',lane:0},{at:4.7,type:'brute',lane:4},{at:6.4,type:'jumper',lane:1},{at:6.8,type:'jumper',lane:3}),
 W({at:.2,type:'helmet',lane:0},{at:.4,type:'helmet',lane:1},{at:.6,type:'helmet',lane:2},{at:.8,type:'helmet',lane:3},{at:1.0,type:'helmet',lane:4},{at:3.2,type:'runner',lane:0},{at:3.5,type:'runner',lane:4},{at:5.0,type:'charger',lane:2},{at:6.4,type:'shield',lane:1},{at:6.8,type:'shield',lane:3}),
 W({at:.2,type:'brute',lane:2},{at:1.1,type:'jumper',lane:0},{at:1.3,type:'jumper',lane:4},{at:2.6,type:'charger',lane:1},{at:2.9,type:'charger',lane:3},{at:4.5,type:'shield',lane:0},{at:4.8,type:'shield',lane:4},{at:6.2,type:'helmet',lane:2},{at:8.0,type:'runner',lane:1},{at:8.2,type:'runner',lane:3}),
 W({at:.2,type:'brute',lane:0},{at:.4,type:'brute',lane:4},{at:1.4,type:'shield',lane:1},{at:1.7,type:'shield',lane:3},{at:3.0,type:'charger',lane:2},{at:3.3,type:'charger',lane:2},{at:5.0,type:'jumper',lane:0},{at:5.3,type:'jumper',lane:4},{at:7.0,type:'helmet',lane:1},{at:7.3,type:'helmet',lane:3}),
 W({at:.2,type:'boss',lane:2},{at:1.2,type:'shield',lane:0},{at:1.6,type:'shield',lane:4},{at:2.8,type:'runner',lane:1},{at:3.1,type:'runner',lane:3},{at:4.8,type:'brute',lane:0},{at:5.2,type:'brute',lane:4},{at:6.8,type:'jumper',lane:1},{at:7.1,type:'jumper',lane:3},{at:8.7,type:'charger',lane:2},{at:9.5,type:'helmet',lane:2})
];
GG.FLAG_WAVES=[5,10,15];
