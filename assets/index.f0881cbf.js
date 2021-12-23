var Y=Object.defineProperty,q=Object.defineProperties;var J=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable;var v=(n,e,t)=>e in n?Y(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,d=(n,e)=>{for(var t in e||(e={}))X.call(e,t)&&v(n,t,e[t]);if(E)for(var t of E(e))Z.call(e,t)&&v(n,t,e[t]);return n},S=(n,e)=>q(n,J(e));var a=(n,e,t)=>(v(n,typeof e!="symbol"?e+"":e,t),t);import{J as Q,c as w,t as ee,x as te,a as ne,F as B}from"./vendor.aa72ca73.js";const se=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerpolicy&&(l.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?l.credentials="include":o.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}};se();const f=(...n)=>({version:"1.0",encoding:"utf-8",standalone:"yes",$elements:n}),r=(n,e,...t)=>S(d({},e),{$type:"element",$name:n,$elements:t}),O=n=>({$type:"value",$value:String(n)}),A=n=>{let e="";for(const t in n)!t.startsWith("$")&&n[t]!==null&&n[t]!==void 0&&(e+=` ${t}="${String(n[t])}"`);return e},W=n=>{if(n.$type==="value")return n.$value;let e=`<${n.$name}${A(n)}`;if(n.$elements&&n.$elements.length){e+=">";for(const t of n.$elements)e+=W(t);e+=`</${n.$name}>`}else e+="/>";return e};var oe={stringify(n){let e=`<?xml${A(n)}?>`;for(const t of n.$elements)e+=W(t);return e}},g;(function(n){n.Workbook="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",n.Worksheets="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",n.Styles="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",n.SharedStrings="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"})(g||(g={}));function re(...n){return f(r("Types",{xmlns:"http://schemas.openxmlformats.org/package/2006/content-types"},r("Default",{Extension:"xml",ContentType:"application/xml"}),r("Default",{Extension:"rels",ContentType:"application/vnd.openxmlformats-package.relationships+xml"}),...n.map(e=>r("Override",{PartName:e.path.startsWith("/")?e.path:"/"+e.path,ContentType:e.contentType.toString()}))))}var p;(function(n){n.Workbook="http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument",n.Worksheet="http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet",n.Styles="http://purl.oclc.org/ooxml/officeDocument/relationships/styles",n.SharedStrings="http://purl.oclc.org/ooxml/officeDocument/relationships/sharedStrings"})(p||(p={}));function D(...n){return f(r("Relationships",{xmlns:"http://schemas.openxmlformats.org/package/2006/relationships"},...n.map(({id:e,type:t,target:s})=>r("Relationship",{Id:"rId"+e,Type:t.toString(),Target:s}))))}const le={xmlns:"http://schemas.openxmlformats.org/spreadsheetml/2006/main","xmlns:r":"http://schemas.openxmlformats.org/officeDocument/2006/relationships","xmlns:mx":"http://schemas.microsoft.com/office/mac/excel/2008/main","xmlns:mc":"http://schemas.openxmlformats.org/markup-compatibility/2006","xmlns:mv":"urn:schemas-microsoft-com:mac:vml","xmlns:x14":"http://schemas.microsoft.com/office/spreadsheetml/2009/9/main","xmlns:x14ac":"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac","xmlns:xm":"http://schemas.microsoft.com/office/excel/2006/main"},ae={xmlns:"http://schemas.openxmlformats.org/spreadsheetml/2006/main","xmlns:mc":"http://schemas.openxmlformats.org/markup-compatibility/2006","xmlns:mv":"urn:schemas-microsoft-com:mac:vml","xmlns:mx":"http://schemas.microsoft.com/office/mac/excel/2008/main","xmlns:r":"http://schemas.openxmlformats.org/officeDocument/2006/relationships","xmlns:x14":"http://schemas.microsoft.com/office/spreadsheetml/2009/9/main","xmlns:x14ac":"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac","xmlns:xm":"http://schemas.microsoft.com/office/excel/2006/main"};function ie(n){return n.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;")}class ce{constructor(){a(this,"sharedStrings",[]);a(this,"create",e=>{e=ie(e);let t=this.sharedStrings.indexOf(e);return t===-1&&(t=this.sharedStrings.push(e)-1),t});a(this,"generate",()=>f(r("sst",{xmlns:"http://purl.oclc.org/ooxml/spreadsheetml/main",count:this.sharedStrings.length,uniqueCount:this.sharedStrings.length},...this.sharedStrings.map(e=>r("si",{},r("t",{},O(e)))))))}}const me=n=>typeof n=="object"&&("color"in n||"style"in n);function I(n){if(n[0]!=="#")throw new Error(`Color "${n}" must start with a "#"`);return`FF${n.slice("#".length).toUpperCase()}`}class he{constructor(){a(this,"borders");a(this,"bordersIndex");a(this,"getBorderKey",e=>e?`${e.color}/${e.style}`:"-");a(this,"getBordersKey",({start:e,bottom:t,diagonal:s,end:o,top:l})=>[e,o,l,t,s].map(this.getBorderKey).join("/"));a(this,"getBorderElement",(e,t)=>{let s=t==null?void 0:t.style;return(t==null?void 0:t.color)&&!s&&(s="thin"),r(e,s?{style:s}:{},...(t==null?void 0:t.color)?[r("color",{rgb:I(t.color)})]:[])});a(this,"getBorder",e=>{if(!e)return 0;var t;me(e)?t={start:e,end:e,top:e,bottom:e}:t=e;const s=this.getBordersKey(t);return this.bordersIndex.has(s)||this.bordersIndex.set(s,this.borders.push(t)-1),this.bordersIndex.get(s)});a(this,"generate",()=>r("borders",{count:this.borders.length},...this.borders.map(({start:e,end:t,top:s,bottom:o,diagonal:l})=>r("border",{},this.getBorderElement("start",e),this.getBorderElement("end",t),this.getBorderElement("top",s),this.getBorderElement("bottom",o),this.getBorderElement("diagonal",l)))));this.borders=[{}],this.bordersIndex=new Map([[this.getBorderKey({}),0]])}}class fe{constructor(){a(this,"fills");a(this,"fillsIndex");a(this,"getFill",e=>e?(e&&!this.fillsIndex.has(e)&&this.fillsIndex.set(e,this.fills.push(e)-1),this.fillsIndex.get(e)):0);a(this,"generate",()=>r("fills",{count:this.fills.length},...this.fills.map(e=>{let t;return typeof e=="string"?t=r("patternFill",{patternType:"solid"},r("fgColor",{rgb:I(e)}),r("bgColor",{indexed:64})):typeof e=="object"&&"gray125"in e&&e.gray125?t=r("patternFill",{patternType:"gray125"}):t=r("patternFill",{patternType:"none"}),r("fill",{},t)})));this.fills=[{},{gray125:!0}],this.fillsIndex=new Map([["",0]])}}const N="Calibri",R=12,_={bold:r("b"),italic:r("i")};class ge{constructor(){a(this,"fonts");a(this,"fontsIndex");a(this,"getFontKey",({family:e=N,size:t=R,style:s="none",color:o="-"})=>`${e}/${t}/${s}/${o}`);a(this,"getFont",e=>{if(!e)return 0;const t=this.getFontKey(e);return this.fontsIndex.has(t)||this.fontsIndex.set(t,this.fonts.push(e)-1),this.fontsIndex.get(t)});a(this,"generate",()=>r("fonts",{count:this.fonts.length},...this.fonts.map(({size:e,color:t,style:s,family:o})=>r("font",{},r("sz",{val:e!=null?e:R}),r("color",t?{rgb:I(t)}:{theme:1}),r("name",{val:o!=null?o:N}),r("family",{val:2}),r("scheme",{val:"minor"}),...s&&_[s]?[_[s]]:[]))));this.fonts=[{}],this.fontsIndex=new Map([[this.getFontKey({}),0]])}}const K=100;class pe{constructor(){a(this,"formats",[]);a(this,"getFormat",e=>{if(!e)return 0;var t=this.formats.indexOf(e);return t===-1&&(t=this.formats.push(e)-1),K+t});a(this,"generate",()=>r("numFmts",{count:this.formats.length},...this.formats.map((e,t)=>r("numFmt",{numFmtId:K+t,formatCode:e}))))}}class ue{constructor(){a(this,"formats",new pe);a(this,"fonts",new ge);a(this,"fills",new fe);a(this,"borders",new he);a(this,"styles",[{formatId:0,fontId:0,fillId:0,borderId:0}]);a(this,"stylesIndex",new Map);a(this,"getStyleKey",({formatId:e,fontId:t,fillId:s,borderId:o,align:l="-",alignVertical:i="-",wrap:c})=>`${e}/${t}/${s}/${o}/${l}/${i}/${c?1:0}`);a(this,"generateCells",()=>r("cellXfs",{count:this.styles.length},...this.styles.map(this.generateCell)));a(this,"generateCell",e=>{const t=r("xf",{numFmtId:e.formatId,applyNumberFormat:e.formatId?1:void 0,fontId:e.fontId,applyFont:e.fontId?1:void 0,fillId:e.fillId,applyFill:e.fillId?1:void 0,borderId:e.borderId,applyBorder:e.borderId?1:void 0,applyAlignment:e.align||e.alignVertical||e.wrap?1:void 0});return(e.align||e.alignVertical||e.wrap)&&(t.$elements=[r("alignment",{horizontal:e.align,vertical:e.alignVertical,wrapText:e.wrap?1:void 0})]),t});a(this,"create",e=>{const t=this.formats.getFormat(e.format),s=this.fonts.getFont(e.font),o=this.fills.getFill(e.fill),l=this.borders.getBorder(e.border),i={formatId:t,fontId:s,fillId:o,borderId:l,align:e.align,alignVertical:e.alignVertical,wrap:e.wrap},c=this.getStyleKey(i);return this.stylesIndex.has(c)||this.stylesIndex.set(c,this.styles.push(i)-1),this.stylesIndex.get(c)});a(this,"generate",()=>f(r("styleSheet",{xmlns:"http://schemas.openxmlformats.org/spreadsheetml/2006/main"},this.formats.generate(),this.fonts.generate(),this.fills.generate(),this.borders.generate(),this.generateCells())))}}const de=70*365+19,xe=60*60*1e3,ye=24*xe;function Se(n){return n.getTime()/ye+de}function $(n,e){return`${L(n)}${e}`}const V=26;function L(n){if(typeof n!="number")return"";const e=Math.floor(n/V),t=String.fromCharCode(97+n%V).toUpperCase();return e===0?t:L(e-1)+t}function we(n,e){let t=0;for(let s=0;s<n.length;s++){const o=e(n[s],s);o>t&&(t=o)}return t}class T{constructor(e){a(this,"generate",e=>{const t=T.generateMergedCells(e.rows);return f(r("worksheet",ae,this.generateCols(e.rows),this.generateSheet(e.rows),...t?[t]:[]))});a(this,"generateSheet",e=>r("sheetData",{},...e.map(this.generateRow)));a(this,"generateCols",e=>{const t=r("cols");t.$elements=[];const s=we(e,o=>o.length);for(let o=0;o<s;o++)t.$elements.push(r("col",{max:o+1,min:o+1}));return t});a(this,"generateRow",(e,t)=>{const s=t+1,o=r("row",{r:s});o.$elements=[];for(let l=0;l<e.length;l++){const i=e[l];o.$elements.push(this.generateCell(i,s,l))}return o});a(this,"generateCell",(e,t,s)=>{const o=this.workbook.styles.create(e),l=r("c",{r:$(s,t)});o!==null&&(l.s=o.toString());let i=null;if(typeof e.value=="string")l.t="s",i=this.workbook.sharedString.create(e.value);else if(typeof e.value=="boolean")l.t="s",i=e.value?1:0;else if(typeof e.value=="number")l.t="n",i=e.value;else if(e.value instanceof Date){if(!o)throw new Error('No "format" has been specified for a Date cell');l.t="n",i=Se(e.value)}return i!=null&&(l.$elements=[],l.$elements.push(r("v",{},O(i)))),l});this.workbook=e}static generateMergedCells(e){const t=[];for(let s=0;s<e.length;s++){const o=s+1,l=e[s];for(let i=0;i<l.length;i++){const{span:c,rowSpan:x}=l[i];let m=c||1,y=x||1;if((!m||m===1)&&(!y||y===1))continue;let j=$(i,o),U=$(i+m-1,o+y-1);t.push(r("mergeCell",{ref:`${j}:${U}`}));for(let h=0;h<y;h++){let C=s+h;if(e.length<=C&&e.push([]),m>1||h>0&&m>0){const H=h===0?i+1:i,z=h===0?m-1:m;e[C].splice(H,0,...new Array(z).fill({}))}}}}return t.length===0?null:r("mergeCells",{count:t.length},...t)}}class be{constructor(){a(this,"styles");a(this,"sharedString");a(this,"worksheet");this.styles=new ue,this.sharedString=new ce,this.worksheet=new T(this)}generateWorkbook(e){return f(r("workbook",le,r("workbookPr"),r("sheets",{},...e.map((t,s)=>r("sheet",{name:t.name||`Table${s+1}`,sheetId:s+1,"r:id":`rId${s+1}`}))),r("definedNames"),r("calcPr")))}generate(e){const t={},s=[];for(let o=0;o<e.length;o++){const l=e[o],i=o+1,c=`sheet${i}.xml`,x="xl/worksheets/"+c;s.push({id:i,fileName:c,path:x}),t[x]=this.worksheet.generate(l)}return t["xl/styles.xml"]=this.styles.generate(),t["xl/sharedStrings.xml"]=this.sharedString.generate(),t["xl/workbook.xml"]=this.generateWorkbook(e),t["[Content_Types].xml"]=re(...s.map(({path:o})=>({contentType:g.Worksheets,path:o})),{contentType:g.Workbook,path:"xl/workbook.xml"},{contentType:g.SharedStrings,path:"xl/sharedStrings.xml"},{contentType:g.Styles,path:"xl/styles.xml"}),t["xl/_rels/workbook.xml.rels"]=D(...s.map(({id:o,fileName:l})=>({id:o,type:p.Worksheet,target:"worksheets/"+l})),{id:s.length+1,type:p.SharedStrings,target:"sharedStrings.xml"},{id:s.length+2,type:p.Styles,target:"styles.xml"}),t["_rels/.rels"]=D({id:1,type:p.Workbook,target:"xl/workbook.xml"}),t}}function ke(n){const e={name:n.title,rows:[]};return P({},e.rows,n),e}const u=n=>{const e=parseInt(n).toString(16);return e.length===1?"0"+e:e},M=n=>{if(n){if(n.startsWith("#"))return n;if(n.startsWith("rgba")){const[e,t,s,o]=n.replace("rgba(","").replace(")","").split(",").map(l=>l.trim());return o==="0"?void 0:"#"+u(e)+u(t)+u(s)}else if(n.startsWith("rgb")){const[e,t,s]=n.replace("rgb(","").replace(")","").split(",").map(o=>o.trim());return"#"+u(e)+u(t)+u(s)}else return}else return},b=n=>n||void 0,ve={left:"left",right:"right",start:"left",end:"right",center:"center"},Ie={top:"top",bottom:"bottom",middle:"center","text-top":"top","text-bottom":"bottom"},F=n=>{const e=window.getComputedStyle(n,null),t={textAlign:ve[e.getPropertyValue("text-align")],verticalAlign:Ie[e.getPropertyValue("vertical-align")],color:M(e.getPropertyValue("color")),fontFamily:e.getPropertyValue("font-family").replace(/"/g,""),fontSize:parseInt(e.getPropertyValue("font-size")),backgroundColor:M(e.getPropertyValue("background-color")),whiteSpace:e.getPropertyValue("white-space")};return{align:b(t.textAlign),alignVertical:b(t.verticalAlign),font:{color:t.color,family:b(t.fontFamily),size:b(t.fontSize)},fill:t.backgroundColor,wrap:t.whiteSpace!=="nowrap"}},k=(n,e)=>{const t=d({},n);for(const s in e)e[s]&&(typeof e[s]=="object"?t[s]=k(n[s],e[s]):t[s]=e[s]);return t},P=(n,e,t)=>{const s=k(n,F(t));for(const o of t.children)switch(o.tagName){case"THEAD":case"TBODY":case"TFOOT":P(s,e,o);break;case"TR":e.push($e(n,o));break}},$e=(n,e)=>{const t=k(n,F(e));return[...e.children].filter(s=>s instanceof HTMLTableCellElement).map(s=>Te(t,s))},Te=(n,e)=>{const t=k(n,F(e)),s=e.getBoundingClientRect();return S(d({},t),{value:e.innerText,font:S(d({},t.font),{style:e.tagName==="TH"?"bold":void 0}),width:s.width,rowSpan:e.rowSpan,span:e.colSpan})};async function G(...n){const t=new be().generate(n),s=new Q;for(const[o,l]of Object.entries(t))s.file(o,oe.stringify(l));return s.generateAsync({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})}w.registerLanguage("typescript",ee);w.registerLanguage("xml",te);w.registerLanguage("css",ne);w.highlightAll();var Fe=document.getElementById("btn:download");const Ce={name:"TestFile",rows:[[{value:"A"},{value:"B"},{value:"C",font:{family:"Times New Roman",color:"#00FF00"},fill:"#880077"}],[{value:1},{value:2},{value:3}],[{value:"test",span:3,rowSpan:2}]]};Fe.onclick=function(){console.log("generating..."),G(Ce).then(e=>{console.log("saving..."),B.exports.saveAs(e,"Workbook.xlsx"),console.log("done")}).catch(e=>console.log(String(e)))};var Ee=document.getElementById("btn:export");Ee.onclick=function(){console.log("generating..."),G(ke(document.getElementById("table"))).then(n=>{console.log("saving..."),B.exports.saveAs(n,"Workbook.xlsx"),console.log("done")}).catch(n=>console.log(String(n)))};