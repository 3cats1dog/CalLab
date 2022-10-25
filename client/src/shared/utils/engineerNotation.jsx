import {ScaleType} from '../constants/calibrationdatas';

export function engineeringNotation(number, style, fixno) {
    if (!fixno) fixno=1;
    var checknumber=Math.abs(number);
    var negative=number<0;
    var unitMap = {G:1e9,M:1e6,k:1e3, '':1e0, m:1e-3,µ:1e-6,n:1e-9, p:1e-12, f:1e-15};
    var expMap =  {G:"·10⁶", M:"10⁶", k:"·10³", '':'', m:'·10⁻³', µ:"·10⁻⁶",n:"·10^(-9)", p:"·10⁻⁶",f:"·10⁻⁶"};
    var numMap = {G:"E+9", M:"E+6", k:"E+3",'':'E+0', m:'E-3', µ:"E-6",n:"E-9", p:"E-12", f:"E-15" };
    var unitss=[ unitMap, expMap, numMap ];

    for(var unit in unitMap) {
        if(unitMap.hasOwnProperty(unit)) {
            if(checknumber >= unitMap[unit]*0.3) {
                return (negative? "-":"")+(checknumber / unitMap[unit]).toFixed(fixno) + (style ==0 ?  unit :  unitss[style][unit]);
            }
        }
    }
}

export function getnumberOrder(number)
{
    var unitMap = {G:1e9,   M:1e6,   k:1e3,    '':1e0,   m:1e-3,    µ:1e-6,   n:1e-9,      p:1e-12,  f:1e-15};
    var expMap =  {G:"·10⁶",M:"·10⁶",k:"·10³", '':'',    m:'·10⁻³', µ:"·10⁻⁶",n:"·10^(-9)",p:"·10⁻⁶",f:"·10⁻⁶"};
    var numMap =  {G:"E+9", M:"E+6", k:"E+3",  '':'E+0', m:'E-3',   µ:"E-6",  n:"E-9",     p:"E-12", f:"E-15" };
    var scaleMap = {G:ScaleType.GIGA, M:ScaleType.MEGA,   k:ScaleType.KILO,    '':ScaleType.NONE,   m:ScaleType.MILI,    µ:ScaleType.MICRO,   n:ScaleType.NANO,      p:ScaleType.PICO,  f:ScaleType.FEMTO};
    var unitss=[ unitMap, expMap, numMap, scaleMap ];
    var checknumber=Math.abs(number);
    var negative=number<0;
    for(var unit in unitMap) {
        if(unitMap.hasOwnProperty(unit)) {
            if(checknumber >= unitMap[unit]*0.3) {
                return  {
                    val:(negative? "-":"")+(checknumber / unitMap[unit]),
                    postfix:unit,
                    exp:unitss[1][unit],
                    math:unitss[2][unit],
                    scale:unitss[3][unit],
                };
            }
        }
    }
}


export function getUncertinityLimit(reading,range, resolution, NominalValue)
{
    let errorNumber=0;
    let resNumber=0;
    if (reading) errorNumber += parseNumber(reading);
    if (range) errorNumber += parseNumber(range);
    if (resolution) resNumber += parseNumber(resolution);

    return  errorNumber*NominalValue + resNumber;
}


export function getUncertinityText( reading, range, resolution, dataType ) {
    let errorNumber=0;
    let resNumber=0;
    if (reading) errorNumber += parseNumber(reading);
    if (range) errorNumber += parseNumber(range);
    if (resolution) resNumber += parseNumber(resolution);

    const txt=(errorNumber>0 ? engineeringNotation(errorNumber,1) + " " + dataType.Symbol : "") + (resNumber >0 ? ( errorNumber>0 ?  " + " : "" ) +  engineeringNotation(resNumber,0) + dataType.Unit : "");
    return txt;
}

function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

export function parseNumber(txt)
{
    if (isEmpty(txt)) return 0;
   var unitMap = {G:'e+9',M:'e+6',k:'e+3', '':'e+0', m:'e-3',µ:'e-6',n:'e-9',p:'e-12', f:'e-15'};
    let re = /G|M|k|m|µ|n|p|f/gi;
    let newStr= txt.replace('·','');
    newStr= txt.replace(' ','');
    newStr = newStr.replace(re, (match) => { 
        //console.log({match}); 
        return unitMap[match];
    });

    //console.log(newStr);
    return Number(newStr);
}

