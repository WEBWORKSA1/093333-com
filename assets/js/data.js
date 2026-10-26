/* 093333.com — prefix reference data (original allocations; portability means a number may since have moved networks).
   Sources: NTC-era public allocation lists (PH), Vietnam 2018 numbering conversion (VN). Updated Oct 2026. */
window.N9={
  PH:{
    name:'Philippines',flag:'🇵🇭',cc:'63',len:11,plen:4,
    nets:{
      globe:{n:'Globe / TM',c:'#2f7bff'},
      smart:{n:'Smart / TNT',c:'#20c26b'},
      sun:{n:'Sun Cellular (Smart group)',c:'#ffb020'},
      dito:{n:'DITO Telecommunity',c:'#ff4d6a'}
    },
    map:{
      '0817':'globe','0904':'globe','0905':'globe','0906':'globe','0915':'globe','0916':'globe','0917':'globe','0926':'globe','0927':'globe','0935':'globe','0936':'globe','0937':'globe','0945':'globe','0953':'globe','0954':'globe','0955':'globe','0956':'globe','0965':'globe','0966':'globe','0967':'globe','0975':'globe','0976':'globe','0977':'globe','0978':'globe','0979':'globe','0995':'globe','0996':'globe','0997':'globe',
      '0813':'smart','0907':'smart','0908':'smart','0909':'smart','0910':'smart','0911':'smart','0912':'smart','0913':'smart','0914':'smart','0918':'smart','0919':'smart','0920':'smart','0921':'smart','0928':'smart','0929':'smart','0930':'smart','0938':'smart','0939':'smart','0946':'smart','0947':'smart','0948':'smart','0949':'smart','0950':'smart','0951':'smart','0961':'smart','0963':'smart','0968':'smart','0969':'smart','0970':'smart','0981':'smart','0989':'smart','0998':'smart','0999':'smart',
      '0922':'sun','0923':'sun','0924':'sun','0925':'sun','0931':'sun','0932':'sun','0933':'sun','0934':'sun','0940':'sun','0941':'sun','0942':'sun','0943':'sun','0944':'sun','0973':'sun','0974':'sun',
      '0895':'dito','0896':'dito','0897':'dito','0898':'dito','0991':'dito','0992':'dito','0993':'dito','0994':'dito'
    },
    notes:{'0976':'Also used by GOMO (Globe digital brand).','0996':'Also used by Cherry Prepaid (on Globe).','0992':'Some older lists show Smart; DITO holds the official allocation.','0994':'Some older lists show Globe; DITO holds the official allocation.','0940':'Some lists show Smart/TNT — Sun is part of the Smart group either way.'},
    report:'Call or text the CICC National Anti-Scam Hotline 1326, or use the eReport feature in the eGov app.'
  },
  VN:{
    name:'Vietnam',flag:'🇻🇳',cc:'84',len:10,plen:3,
    nets:{
      viettel:{n:'Viettel',c:'#e8003d'},
      vina:{n:'VinaPhone (VNPT)',c:'#1f8be8'},
      mobi:{n:'MobiFone',c:'#0a5ad6'},
      vnmb:{n:'Vietnamobile',c:'#f58220'},
      gmob:{n:'Gmobile',c:'#7c8ea8'},
      itel:{n:'iTel (Indochina Telecom)',c:'#c03fd8'},
      wintel:{n:'Wintel',c:'#2fbf9f'}
    },
    map:{
      '032':'viettel','033':'viettel','034':'viettel','035':'viettel','036':'viettel','037':'viettel','038':'viettel','039':'viettel','086':'viettel','096':'viettel','097':'viettel','098':'viettel',
      '081':'vina','082':'vina','083':'vina','084':'vina','085':'vina','088':'vina','091':'vina','094':'vina',
      '070':'mobi','076':'mobi','077':'mobi','078':'mobi','079':'mobi','089':'mobi','090':'mobi','093':'mobi',
      '052':'vnmb','056':'vnmb','058':'vnmb','092':'vnmb',
      '059':'gmob','099':'gmob','087':'itel','055':'wintel'
    },
    notes:{'093':'MobiFone\'s flagship 10-digit range, launched in 2006 and unchanged by the 2018 conversion.','095':''},
    report:'Text S / V / LD + the number + a short description to 156 (or 5656), or call 156.'
  },
  TW:{name:'Taiwan',flag:'🇹🇼',cc:'886',len:10,
    report:'Call the 165 anti-fraud hotline.'}
};
