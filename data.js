window.GG = window.GG || {};
GG.W=900; GG.H=540; GG.ROWS=5; GG.COLS=9;
GG.FIELD={x:86,y:64,w:756,h:450};
GG.CW=GG.FIELD.w/GG.COLS; GG.CH=GG.FIELD.h/GG.ROWS;
GG.clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
GG.lerp=(a,b,t)=>a+(b-a)*t;
GG.rand=(a,b)=>a+Math.random()*(b-a);
GG.PLANTS={
  sun:{name:'能量花',cost:50,cd:4.2,hp:260,desc:'持续产能',kind:'producer'},
  pea:{name:'豆炮',cost:100,cd:3.2,hp:290,desc:'稳定射击',kind:'shooter'},
  ice:{name:'冰豆',cost:125,cd:5.8,hp:270,desc:'射击减速',kind:'ice'},
  wall:{name:'盾果',cost:75,cd:8.5,hp:920,desc:'高耐久阻挡',kind:'wall'},
  double:{name:'双发豆',cost:200,cd:7.5,hp:300,desc:'连续双发',kind:'double'},
  bomb:{name:'爆果',cost:150,cd:16,hp:160,desc:'范围爆破',kind:'bomb'}
};
GG.CARD_ORDER=['sun','pea','ice','wall','double','bomb'];
GG.ENEMIES={
  basic:{name:'步行怪',hp:150,speed:14,damage:34,rate:1.15,body:'#8ba08c',accent:'#cdd5ca',reward:12},
  runner:{name:'快跑怪',hp:105,speed:27,damage:24,rate:.85,body:'#b48c71',accent:'#f5d1aa',reward:15},
  helmet:{name:'铁盔怪',hp:330,speed:12,damage:40,rate:1.25,body:'#77887c',accent:'#bdc8b9',armor:190,reward:24},
  shield:{name:'盾怪',hp:230,speed:11,damage:32,rate:1.2,body:'#70887b',accent:'#d2dfce',shield:250,reward:25},
  jumper:{name:'跃栏怪',hp:170,speed:21,damage:27,rate:1.0,body:'#8b7aac',accent:'#e0d3ff',jump:true,reward:22},
  brute:{name:'重装怪',hp:650,speed:8.5,damage:58,rate:1.35,body:'#635f5a',accent:'#d9c7aa',armor:260,reward:38},
  boss:{name:'庭院巨怪',hp:2200,speed:6.8,damage:82,rate:1.45,body:'#5d6963',accent:'#f0bc67',armor:420,boss:true,reward:120}
};
GG.WAVE_SCRIPTS=[
  [{at:.4,type:'basic',lane:2},{at:3.8,type:'basic',lane:1},{at:7.2,type:'basic',lane:3}],
  [{at:.3,type:'basic',lane:0},{at:1.8,type:'basic',lane:4},{at:4.2,type:'basic',lane:2},{at:6.3,type:'basic',lane:1},{at:8.2,type:'basic',lane:3}],
  [{at:.3,type:'runner',lane:2},{at:2.2,type:'basic',lane:1},{at:2.8,type:'basic',lane:3},{at:5.1,type:'runner',lane:4},{at:7.4,type:'basic',lane:0},{at:8.0,type:'basic',lane:2}],
  [{at:.2,type:'basic',lane:1},{at:.8,type:'basic',lane:1},{at:1.4,type:'basic',lane:1},{at:3.4,type:'runner',lane:3},{at:4.0,type:'runner',lane:3},{at:6.1,type:'helmet',lane:2},{at:9.0,type:'basic',lane:4}],
  [{at:.2,type:'helmet',lane:2},{at:.7,type:'basic',lane:0},{at:1.0,type:'basic',lane:4},{at:2.0,type:'runner',lane:1},{at:2.4,type:'runner',lane:3},{at:4.0,type:'shield',lane:2},{at:5.3,type:'basic',lane:1},{at:5.8,type:'basic',lane:3},{at:7.8,type:'runner',lane:0},{at:8.1,type:'runner',lane:4}],
  [{at:.2,type:'shield',lane:0},{at:.9,type:'shield',lane:4},{at:2.2,type:'runner',lane:2},{at:2.6,type:'runner',lane:2},{at:4.6,type:'helmet',lane:1},{at:5.0,type:'helmet',lane:3},{at:7.6,type:'basic',lane:0},{at:8.0,type:'basic',lane:4}],
  [{at:.2,type:'jumper',lane:2},{at:1.6,type:'basic',lane:1},{at:1.9,type:'basic',lane:3},{at:3.3,type:'jumper',lane:0},{at:4.7,type:'jumper',lane:4},{at:6.4,type:'shield',lane:2},{at:8.0,type:'runner',lane:1},{at:8.3,type:'runner',lane:3}],
  [{at:.2,type:'brute',lane:2},{at:1.0,type:'runner',lane:0},{at:1.5,type:'runner',lane:4},{at:3.0,type:'helmet',lane:1},{at:3.5,type:'helmet',lane:3},{at:5.4,type:'jumper',lane:2},{at:7.0,type:'shield',lane:0},{at:7.5,type:'shield',lane:4},{at:9.2,type:'runner',lane:2}],
  [{at:.2,type:'brute',lane:1},{at:.5,type:'brute',lane:3},{at:1.8,type:'runner',lane:0},{at:2.2,type:'runner',lane:4},{at:3.5,type:'shield',lane:2},{at:4.6,type:'jumper',lane:1},{at:5.0,type:'jumper',lane:3},{at:7.0,type:'helmet',lane:0},{at:7.4,type:'helmet',lane:4},{at:9.0,type:'runner',lane:2},{at:9.4,type:'runner',lane:2}],
  [{at:.2,type:'boss',lane:2},{at:1.2,type:'shield',lane:0},{at:1.7,type:'shield',lane:4},{at:3.0,type:'runner',lane:1},{at:3.3,type:'runner',lane:3},{at:5.2,type:'brute',lane:0},{at:5.7,type:'brute',lane:4},{at:7.4,type:'jumper',lane:1},{at:7.7,type:'jumper',lane:3},{at:9.2,type:'helmet',lane:2}]
];
