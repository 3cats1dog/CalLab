  // Adding it to the type
  interface Number {
    toEngineeringNotation(style:number, fixno:number): string;
  }
  // Adding the implementation
  Object.defineProperty(Number.prototype, "toEngineeringNotation", {
    value(style:number, fixno:number) {
        return engineeringNotation(this, style, fixno);
    },
    enumerable: false, // This is the default, but just for emphasis...
    writable: true,
    configurable: true
  });
  
export function engineeringNotation(number:number, style:number, fixno:number) {
    if (!fixno) fixno=1;
    var unitMap = {G:1e9,M:1e6,k:1e3, '':1e0, m:1e-3,µ:1e-6,n:1e-9};
    var expMap = {G:"·10 ", M:"", k:"·10⁻³",µ:"·10⁻⁶",n:"·10⁻⁶",  }
    var space = ' ';
    for(var unit in unitMap) {
        if(unitMap.hasOwnProperty(unit)) {
            if(number >= unitMap[unit]*0.3) {
                return (number / unitMap[unit]).toFixed(fixno) + (style ==0 ?  unit :  expMap[unit]);
            }
        }
    }
}

function isEmpty(val:any){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

export function parseNumber(txt:string)
{
    if (isEmpty(txt)) return 0;
   var unitMap = {G:'e9',M:'e6',k:'e3', m:'e-3',µ:'e-6',n:'e-9'};
    let re = /G|M|k|m|µ|n/gi;
    let newStr= txt.replace('·','');
    newStr= txt.replace(' ','');
    newStr = newStr.replace(re, (match) => { 
        //console.log({match}); 
        return unitMap[match];
    });

    //console.log(newStr);
    return Number(newStr);
}

