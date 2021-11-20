type IColorMode = 'hex'|'rgb'|'hsb'
export const ColorMode:{[k:string]:IColorMode} = {
    hex:'hex',
    rgb:'rgb',
    hsb:'hsb'
}
export const ColorReg:{[k:string]:RegExp} = {
    hex:/^#[0-9abcdefABCDEF]{3,8}$/,
    rgb:/^rgb\((.*),(.*),(.*)\)$/,
    rgba:/^rgba\((.*),(.*),(.*),(.*)\)$/,
    hsl:/^hsl\((.*),(.*%),(.*%)\)$/,
    hsla:/^hsla\((.*),(.*%),(.*%),(.*)\)$/,
    percent:/^[\d]*\.?[\d]+%$/,
    number:/^[\d]*\.?[\d]+$/
}
export function transparent(){
    return [0,0,0,0]
}
export function between(v:number,min=0,max=100){
    return Math.min(max,Math.max(min,v))
}
export function hex2n(h:string):number{
    return parseInt(h,16)
}
export function  n2hex(n:number):string{
    const hex = Math.round(between(n,0,255)).toString(16)
    return hex.length==1?"0"+hex:hex
}
export function parseAlpha(a:string):number{
    let na:number; 
    if(a.endsWith("%")){
        a = a.substr(0,a.length-1)
        na = Number(a)
    }else{
        na = between(Number(a)*100)
    }
    return +na.toFixed(2)
}
export function toNumFixed(a:number,pre=2){
    return +a.toFixed(pre)
}
export function rgb2rgbstr(rgb:number[]):string{
    const [r,g,b,a] = rgb
    const alpha=toNumFixed((a===undefined?100:a)/100)
    return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${alpha})`
}
export function rgb2hexstr(rgb:number[]):string{
    const [r,g,b,a] = rgb
    let hex = "#"+n2hex(r)+n2hex(g)+n2hex(b)
    if(a!==undefined&&a<100)
    hex+=n2hex(a*255/100)
    return hex
}
export function hsb2rgb(hsb: number[]) {
    const
        h = hsb[0],
        s = hsb[1] / 100,
        v = hsb[2] / 100,
        i = Math.round(h / 60) % 6,
        f = (h / 60) - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s);
    const matrix = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
    ]
    return matrix[i].map(i=>Math.round(i*255))
}
export function rgb2hsb(rgb: number[]) {
    const
        [r, g, b] = rgb,
        max = Math.max(...rgb),
        min = Math.min(...rgb),
        B = max * 100 / 255,
        S = max == 0 ? 0 : (max - min) * 100 / max;
    let H = 0;
    if (max == min)
        H = 0
    else if (max == r && g >= b)
        H = (g - b) * 60 / (max - min)
    else if (max == r && g < b) 
        H = (g - b) *60 / (max - min) + 360
    else if (max == g)
        H = (b - r) * 60 / (max - min) + 120
    else if (max == b)
        H = (r - g) * 60 / (max - min) + 240
    H = Math.round(H||0)
    return [H,+S.toFixed(2),+B.toFixed(2)]
}
/*
When 0 ≤ H < 360, 0 ≤ S ≤ 1 and 0 ≤ V ≤ 1:
*/
export function hsl2rgb(h1:number,S:number,V:number) :number[]{
    const s1 = S/100,v1 = V/100;
    const h = Math.round(h1) / 360,
        s = s1,
        l = v1;
    let r:number, g:number, b:number;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = function(p:number, q:number, t:number) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [r*255,g*255,b*255].map(n=>Math.round(n))
}
export function isColorHex(color:string){
    const 
        c = color.substr(1),
        l = c.length;
    if(![3,6,8].includes(l)) return false
    if(!/^[0-9abcdefABCDEF]+$/.test(c)) return false
    return true
}
export function hexstr2rgb(color:string):number[]{
    const 
        c = color.substr(1),
        l = c.length;
    let res:number[] = [];
    if(!isColorHex(color))return transparent()
    switch(l){
        case 3:
            res = c.split("").map<number>((h:string)=>hex2n(h)*255/15)
            break
        case 6:
        case 8:
            res = (c.match(/\w{2}/g) as Array<string>).map((h:string)=>hex2n(h))
    }
    res[3] = res[3]===undefined ? 100 : Math.round(Math.max(res[3],0)*100/255)
    return res
}
export function rgbstr2rgb(color:string):number[]{
    const raw = color.match(ColorReg.rgb)
    if(!raw)return transparent()
    const rgb = raw.slice(1).map((s:string)=>{
        const n = parseInt(s)
        return between(n,0,255)
    })
    return [...rgb,100]
}
export function rgbastr2rgb(color:string):number[]{
    const raw = color.match(ColorReg.rgba)
    if(!raw)return transparent()
    const rgb = raw.slice(1,4).map((s:string)=>{
        const n = parseFloat(s)
        return between(n,0,255)
    })
    const a = parseAlpha(raw[4])
    return [...rgb,a]
}
export function hslstr2rgb(color:string):number[]{
    const raw = color.match(ColorReg.hsl)
    if(!raw)return transparent()
    if(!raw[2].endsWith("%"))return transparent()
    if(!raw[3].endsWith("%"))return transparent()

    const 
        hsl = raw.slice(1,4),
        h = between(parseInt(hsl[0]),0,360),
        s = between(parseInt(hsl[1])),
        l = between(parseInt(hsl[2]));
    return [...hsl2rgb(h,s,l),100]
}
export function hslastr2ggb(color:string):number[]{
    const raw = color.match(ColorReg.hsla)
    if(!raw)return transparent()
    if(!raw[2].endsWith("%"))return transparent()
    if(!raw[3].endsWith("%"))return transparent()

    const 
        hsl = raw.slice(1,4),
        h = between(parseInt(hsl[0]),0,360),
        s = between(parseInt(hsl[1])),
        l = between(parseInt(hsl[2]));
    return [...hsl2rgb(h,s,l),parseAlpha(raw[4])]
}

export function parseColor(color:string) :{
    mode:IColorMode,
    rgba:number[]
}{
    if(!color)return {
        mode:ColorMode.hex,
        rgba:transparent()
    }
    let 
        rgba:number[],
        mode:IColorMode;
    const c = color.replace(/\s+/g,"")
    const prefix = (c.match(/^\w+/)||c.match(/^#/)||[])[0];
    switch(prefix){
        case "#":
            rgba = hexstr2rgb(c);
            mode = ColorMode.hex
            break
        case "rgb":
            rgba = rgbstr2rgb(c);
            mode = ColorMode.rgb
            break
        case "rgba":
            rgba = rgbastr2rgb(c);
            mode = ColorMode.rgb
            break
        case "hsl":
            rgba = hslstr2rgb(c);
            mode = ColorMode.hsb
            break
        case "hsla":
            rgba = hslastr2ggb(c);
            mode = ColorMode.hsb
            break
        default:
            mode = ColorMode.hex
            rgba = transparent()
    }
    return {mode,rgba}
}