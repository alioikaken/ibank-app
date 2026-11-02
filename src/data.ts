import { ImageSourcePropType } from 'react-native';

export const avatars: Record<string, ImageSourcePropType> = {
  push: require('../assets/avatars/push.png'),
  pushbig: require('../assets/avatars/pushbig.png'),
  home: require('../assets/avatars/home.png'),
  olivia: require('../assets/avatars/olivia.png'),
  alexander: require('../assets/avatars/alexander.png'),
  harper: require('../assets/avatars/harper.png'),
  thomas: require('../assets/avatars/thomas.png'),
  sanmatha: require('../assets/avatars/sanmatha.png'),
  emma: require('../assets/avatars/emma.png'),
  justin: require('../assets/avatars/justin.png'),
};

export const flags: Record<string, ImageSourcePropType> = {
  VN: require('../assets/flags/VN.png'),
  FR: require('../assets/flags/FR.png'),
  EN: require('../assets/flags/EN.png'),
  JP: require('../assets/flags/JP.png'),
  PT: require('../assets/flags/PT.png'),
  CN: require('../assets/flags/CN.png'),
  KR: require('../assets/flags/KR.png'),
  NI: require('../assets/flags/NI.png'),
  RU: require('../assets/flags/RU.png'),
};

/** aspect ratios of illustrations (works on native and web) */
export const ratios = new Map<unknown, number>();
const sized = <T>(src: T, w: number, h: number): T => {
  ratios.set(src, w / h);
  return src;
};

export const art = {
  piggy: sized(require('../assets/img/piggy.png'), 900, 674),
  success: sized(require('../assets/img/cardsuccess.png'), 900, 572),
  security: sized(require('../assets/img/security.png'), 900, 595),
  wallet: sized(require('../assets/img/wallet.png'), 900, 504),
  exchange: sized(require('../assets/img/exchange.png'), 900, 588),
  fingerprint: sized(require('../assets/img/fingerprint.png'), 325, 325),
  faceid: sized(require('../assets/img/faceid.png'), 325, 325),
  sBranch: require('../assets/img/s_branch.png'),
  sInterest: require('../assets/img/s_interest.png'),
  sExchangeRate: require('../assets/img/s_exchangerate.png'),
  sExchange: require('../assets/img/s_exchange.png'),
  bElectric: require('../assets/img/b_electric.png'),
  bWater: require('../assets/img/b_water.png'),
  bMobile: require('../assets/img/b_mobile.png'),
  bInternet: require('../assets/img/b_internet.png'),
  soAdd: require('../assets/img/so_add.png'),
  soManage: require('../assets/img/so_manage.png'),
};

export const categoryIcons = {
  wallet: require('../assets/img/cat_wallet.png'),
  transfer: require('../assets/img/cat_transfer.png'),
  withdraw: require('../assets/img/cat_withdraw.png'),
  prepaid: require('../assets/img/cat_prepaid.png'),
  paybill: require('../assets/img/cat_paybill.png'),
  saveonline: require('../assets/img/cat_saveonline.png'),
  creditcard: require('../assets/img/cat_creditcard.png'),
  report: require('../assets/img/cat_report.png'),
  beneficiary: require('../assets/img/cat_beneficiary.png'),
};

export const accounts = [
  { id: '1', name: 'Account 1', number: '1900 8988 1234', balance: '$20,000', branch: 'New York' },
  { id: '2', name: 'Account 2', number: '8988 1234', balance: '$12,000', branch: 'New York' },
  { id: '3', name: 'Account 3', number: '1900 1234 2222', balance: '$230,000', branch: 'New York' },
];

export const accountNumbers = ['1900 8988 5456', '1900 8112 5222', '4411 0000 1234', '1900 8988 5456', '1900 8988 5456'];

export const deposits = [
  { number: '1900 8988 5456', from: '02/11/2019', to: '02/11/2020', time: '12 months', rate: '5%' },
  { number: '1900 8112 5222', from: '02/11/2019', to: '02/11/2020', time: '12 months', rate: '5%' },
  { number: '4411 0000 1234', from: '02/11/2019', to: '02/11/2020', time: '12 months', rate: '5%' },
];

export const purchases = [
  { id: 1, title: 'Buy Camera', date: '02/11/2018', amount: '- $1200', icon: 'camera', color: '#3629B7' },
  { id: 2, title: 'Buy Television', date: '02/11/2018', amount: '- $1200', icon: 'tv', color: '#FF4267' },
  { id: 3, title: 'Buy Camera', date: '02/11/2018', amount: '- $1200', icon: 'camera', color: '#0890FE' },
  { id: 4, title: 'Buy Television', date: '02/11/2018', amount: '- $1200', icon: 'tv', color: '#FFAF2A' },
] as const;

export type Beneficiary = { id: string; name: string; number: string; avatar: keyof typeof avatars };

export const beneficiaryGroups: { title: string; items: Beneficiary[] }[] = [
  {
    title: 'Transfer via card number',
    items: [
      { id: 'b1', name: 'Push', number: '12788980890', avatar: 'push' },
      { id: 'b2', name: 'Olivia', number: '0345976231', avatar: 'olivia' },
    ],
  },
  {
    title: 'Transfer to the same bank',
    items: [
      { id: 'b3', name: 'Alexander', number: '12788980890', avatar: 'alexander' },
      { id: 'b4', name: 'Harper', number: '0345976231', avatar: 'harper' },
    ],
  },
  {
    title: 'Transfer to another bank',
    items: [
      { id: 'b5', name: 'Thomas', number: '12788980890', avatar: 'thomas' },
      { id: 'b6', name: 'Sanmatha', number: '0345976231', avatar: 'sanmatha' },
      { id: 'b7', name: 'Justin Biber', number: '12788980890', avatar: 'justin' },
    ],
  },
];

export const quickBeneficiaries = [
  { id: 'q1', name: 'Emma', avatar: 'emma', number: '1235 6478 990', phone: '+8564757899' },
  { id: 'q2', name: 'Justin', avatar: 'justin', number: '0123456789109', phone: '+8564757111' },
] as const;

export const currencies = [
  'VND ( Viet Nam Dong )',
  'HK$ ( Hong Kong Dollar )',
  'USD ( Dollar )',
  'NT$ ( Taiwan Dollar )',
  'J$ ( Jamaika Dollar )',
];

export const rates = [
  { flag: 'VN', country: 'Vietnam', buy: '1.403', sell: '1.746' },
  { flag: 'NI', country: 'Nicaragua', buy: '9.123', sell: '12.09' },
  { flag: 'KR', country: 'Korea', buy: '3.704', sell: '5.151' },
  { flag: 'RU', country: 'Russia', buy: '116.0', sell: '144.4' },
  { flag: 'CN', country: 'China', buy: '1.725', sell: '2.234' },
  { flag: 'PT', country: 'Portuguese', buy: '1.403', sell: '1.746' },
  { flag: 'JP', country: 'Japan', buy: '3.454', sell: '4.312' },
  { flag: 'FR', country: 'French', buy: '23.45', sell: '34.56' },
  { flag: 'NI', country: 'Nicaragua', buy: '263.1', sell: '300.3' },
  { flag: 'CN', country: 'China', buy: '1.725', sell: '2.234' },
] as const;

export const interestRates = [
  ['Individual customers', '1m', '4.50%'],
  ['Corporate customers', '2m', '5.50%'],
  ['Individual customers', '1m', '4.50%'],
  ['Corporate customers', '6m', '2.50%'],
  ['Individual customers', '1m', '4.50%'],
  ['Corporate customers', '8m', '6.50%'],
  ['Individual customers', '1m', '4.50%'],
  ['Corporate customers', '7m', '6.80%'],
  ['Individual customers', '12m', '5.90%'],
  ['Individual customers', '1m', '4.50%'],
] as const;

export const languages = [
  { flag: 'VN', name: 'Vietnamese' },
  { flag: 'FR', name: 'French' },
  { flag: 'EN', name: 'English' },
  { flag: 'JP', name: 'Japanese' },
  { flag: 'PT', name: 'Portuguese' },
  { flag: 'CN', name: 'Chinese' },
  { flag: 'KR', name: 'Korean' },
  { flag: 'NI', name: 'Nicaragua' },
  { flag: 'RU', name: 'Russian' },
] as const;

export const messages = [
  { id: 'm1', title: 'Bank of America', text: 'Bank of America : 256486 is the au…', date: 'Today', icon: 'business', color: '#3629B7' },
  { id: 'm2', title: 'Account', text: 'Your account is limited. Please foll…', date: '12/10', icon: 'person', color: '#FF4267' },
  { id: 'm3', title: 'Alert', text: 'Your statement is ready for you to…', date: '11/10', icon: 'alert-circle', color: '#0890FE' },
  { id: 'm4', title: 'Paypal', text: 'Your account has been locked. Ple…', date: '10/11', icon: 'logo-paypal', color: '#FFAF2A' },
  { id: 'm5', title: 'Withdraw', text: 'Dear customer, 2987456 is your co…', date: '10/12', icon: 'cash', color: '#52D5BA' },
] as const;

export const transactions = [
  { day: 'Today', title: 'Water Bill', status: 'Unsuccessfully', amount: '- $280', icon: 'water', color: '#3629B7', neg: true },
  { day: 'Yesterday', title: 'Income: Salary Oct', status: '', amount: '+$1200', icon: 'cash', color: '#FF4267', neg: false },
  { day: '', title: 'Electric Bill', status: 'Successfully', amount: '- $480', icon: 'flash', color: '#0890FE', neg: true },
  { day: '', title: 'Income : Jane transfers', status: '', amount: '+$500', icon: 'receipt', color: '#FFAF2A', neg: false },
  { day: '', title: 'Internet Bill', status: 'Successfully', amount: '- $100', icon: 'wifi', color: '#52D5BA', neg: true },
] as const;

export const paymentHistory = {
  Electric: [
    ['October', '30/10/2019', 'Unsuccessfully', '$480', ''],
    ['September', '30/09/2019', 'Successfully', '$480', ''],
    ['August', '30/08/2019', 'Successfully', '$480', ''],
    ['July', '30/07/2019', 'Successfully', '$480', ''],
    ['June', '30/06/2019', 'Successfully', '$480', ''],
    ['May', '30/05/2019', 'Successfully', '$480', ''],
  ],
  Water: [
    ['October', '30/10/2019', 'Successfully', '$120', ''],
    ['September', '30/09/2019', 'Successfully', '$118', ''],
    ['August', '30/08/2019', 'Successfully', '$125', ''],
    ['July', '30/07/2019', 'Unsuccessfully', '$130', ''],
    ['June', '30/06/2019', 'Successfully', '$110', ''],
  ],
  Mobile: [
    ['October', '30/10/2019', 'Successfully', '$30', ''],
    ['September', '30/09/2019', 'Successfully', '$20', ''],
    ['August', '30/08/2019', 'Successfully', '$30', ''],
    ['July', '30/07/2019', 'Successfully', '$10', ''],
    ['June', '30/06/2019', 'Unsuccessfully', '$20', ''],
  ],
  Internet: [
    ['October', '30/10/2019', 'Unsuccessfully', '$50', 'Capi Telecom'],
    ['September', '30/09/2019', 'Successfully', '$50', 'Capi Telecom'],
    ['August', '30/08/2019', 'Successfully', '$50', 'Capi Telecom'],
    ['July', '30/07/2019', 'Successfully', '$50', 'Capi Telecom'],
    ['June', '30/06/2019', 'Successfully', '$50', 'Capi Telecom'],
  ],
} as const;

export const banks = ['Fifth Third', 'Bank of the West', 'Wells Fago', 'JP Morgan Chae', 'US bank', 'HSBS bank', 'Citybank', 'Ame Express'];

export const branches = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];

export const depositTerms = [
  '3 months (Interest rate 4%)',
  '6 months (Interest rate 4.5%)',
  '12 months (Interest rate 5%)',
  '16 months (Interest rate 5.5%)',
  '24 months (Interest rate 6%)',
];

export const bankBranches = [
  { name: 'Bank 1656 Union Street', dist: '50 m' },
  { name: 'Bank Secaucus', dist: '1,2 km' },
  { name: 'Bank 1657 Riverside Drive', dist: '5,3 km' },
  { name: 'Bank Rutherford', dist: '70m' },
  { name: 'Bank 1656 Union Street', dist: '30m' },
];

export const chat = [
  { id: 'c1', me: false, date: '8/10/2018', text: 'Did you attempt transaction on debit card ending in 0000 at Mechanl in NJ for $1,200?\nReply YES or NO' },
  { id: 'c2', me: true, text: 'Yes' },
  { id: 'c3', me: false, date: '8/10/2018', text: 'Bank of America : 256486 is your authorization code which expires in 10 minutes. If you didn’t request the code.\nCall : 18009898 for assistance' },
];

export const words = (n: number): string => {
  if (!isFinite(n) || n <= 0) return '';
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const chunk = (x: number): string => {
    let s = '';
    if (x >= 100) { s += ones[Math.floor(x / 100)] + ' hundred '; x %= 100; }
    if (x >= 20) { s += tens[Math.floor(x / 10)] + (x % 10 ? '-' + ones[x % 10] : '') + ' '; }
    else if (x > 0) s += ones[x] + ' ';
    return s;
  };
  let x = Math.floor(n);
  let out = '';
  const scales = [[1e9, 'billion'], [1e6, 'million'], [1e3, 'thousand']] as const;
  for (const [v, name] of scales) {
    if (x >= v) { out += chunk(Math.floor(x / v)) + name + ' '; x %= v; }
  }
  out += chunk(x);
  out = out.trim();
  return out.charAt(0).toUpperCase() + out.slice(1) + ' dollar';
};
