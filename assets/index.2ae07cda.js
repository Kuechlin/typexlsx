var P=Object.defineProperty,G=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;var y=(n,e,t)=>e in n?P(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,I=(n,e)=>{for(var t in e||(e={}))j.call(e,t)&&y(n,t,e[t]);if(w)for(var t of w(e))H.call(e,t)&&y(n,t,e[t]);return n},$=(n,e)=>G(n,U(e));var a=(n,e,t)=>(y(n,typeof e!="symbol"?e+"":e,t),t);import{J as z,c as u,t as Y,x as q,a as J,F as T}from"./vendor.aa72ca73.js";const X=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}};X();const h=(...n)=>({version:"1.0",encoding:"utf-8",standalone:"yes",$elements:n}),l=(n,e,...t)=>$(I({},e),{$type:"element",$name:n,$elements:t}),F=n=>({$type:"value",$value:String(n)}),C=n=>{let e="";for(const t in n)!t.startsWith("$")&&n[t]!==null&&n[t]!==void 0&&(e+=` ${t}="${String(n[t])}"`);return e},E=n=>{if(n.$type==="value")return n.$value;let e=`<${n.$name}${C(n)}`;if(n.$elements){e+=">";for(const t of n.$elements)e+=E(t);e+=`</${n.$name}>`}else e+="/>";return e};var Z={stringify(n){let e=`<?xml${C(n)}?>`;for(const t of n.$elements)e+=E(t);return e}},f;(function(n){n.Workbook="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",n.Worksheets="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",n.Styles="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",n.SharedStrings="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"})(f||(f={}));function Q(...n){return h(l("Types",{xmlns:"http://schemas.openxmlformats.org/package/2006/content-types"},l("Default",{Extension:"xml",ContentType:"application/xml"}),l("Default",{Extension:"rels",ContentType:"application/vnd.openxmlformats-package.relationships+xml"}),...n.map(e=>l("Override",{PartName:e.path.startsWith("/")?e.path:"/"+e.path,ContentType:e.contentType.toString()}))))}var g;(function(n){n.Workbook="http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument",n.Worksheet="http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet",n.Styles="http://purl.oclc.org/ooxml/officeDocument/relationships/styles",n.SharedStrings="http://purl.oclc.org/ooxml/officeDocument/relationships/sharedStrings"})(g||(g={}));function B(...n){return h(l("Relationships",{xmlns:"http://schemas.openxmlformats.org/package/2006/relationships"},...n.map(({id:e,type:t,target:s})=>l("Relationship",{Id:"rId"+e,Type:t.toString(),Target:s}))))}const ee={xmlns:"http://schemas.openxmlformats.org/spreadsheetml/2006/main","xmlns:r":"http://schemas.openxmlformats.org/officeDocument/2006/relationships","xmlns:mx":"http://schemas.microsoft.com/office/mac/excel/2008/main","xmlns:mc":"http://schemas.openxmlformats.org/markup-compatibility/2006","xmlns:mv":"urn:schemas-microsoft-com:mac:vml","xmlns:x14":"http://schemas.microsoft.com/office/spreadsheetml/2009/9/main","xmlns:x14ac":"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac","xmlns:xm":"http://schemas.microsoft.com/office/excel/2006/main"},te={xmlns:"http://schemas.openxmlformats.org/spreadsheetml/2006/main","xmlns:mc":"http://schemas.openxmlformats.org/markup-compatibility/2006","xmlns:mv":"urn:schemas-microsoft-com:mac:vml","xmlns:mx":"http://schemas.microsoft.com/office/mac/excel/2008/main","xmlns:r":"http://schemas.openxmlformats.org/officeDocument/2006/relationships","xmlns:x14":"http://schemas.microsoft.com/office/spreadsheetml/2009/9/main","xmlns:x14ac":"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac","xmlns:xm":"http://schemas.microsoft.com/office/excel/2006/main"};function ne(n){return n.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;")}class se{constructor(){a(this,"sharedStrings",[]);a(this,"create",e=>{e=ne(e);let t=this.sharedStrings.indexOf(e);return t===-1&&(t=this.sharedStrings.push(e)-1),t});a(this,"generate",()=>h(l("sst",{xmlns:"http://purl.oclc.org/ooxml/spreadsheetml/main",count:this.sharedStrings.length,uniqueCount:this.sharedStrings.length},...this.sharedStrings.map(e=>l("si",{},l("t",{},F(e)))))))}}const oe=n=>typeof n=="object"&&("color"in n||"style"in n);function S(n){if(n[0]!=="#")throw new Error(`Color "${n}" must start with a "#"`);return`FF${n.slice("#".length).toUpperCase()}`}class re{constructor(){a(this,"borders");a(this,"bordersIndex");a(this,"getBorderKey",e=>e?`${e.color}/${e.style}`:"-");a(this,"getBordersKey",({start:e,bottom:t,diagonal:s,end:o,top:r})=>[e,o,r,t,s].map(this.getBorderKey).join("/"));a(this,"getBorderElement",(e,t)=>{let s=t==null?void 0:t.style;return(t==null?void 0:t.color)&&!s&&(s="thin"),l(e,s?{style:s}:{},...(t==null?void 0:t.color)?[l("color",{rgb:S(t.color)})]:[])});a(this,"getBorder",e=>{if(!e)return 0;var t;oe(e)?t={start:e,end:e,top:e,bottom:e}:t=e;const s=this.getBordersKey(t);return this.bordersIndex.has(s)||this.bordersIndex.set(s,this.borders.push(t)-1),this.bordersIndex.get(s)});a(this,"generate",()=>l("borders",{count:this.borders.length},...this.borders.map(({start:e,end:t,top:s,bottom:o,diagonal:r})=>l("border",{},this.getBorderElement("start",e),this.getBorderElement("end",t),this.getBorderElement("top",s),this.getBorderElement("bottom",o),this.getBorderElement("diagonal",r)))));this.borders=[{}],this.bordersIndex=new Map([[this.getBorderKey({}),0]])}}class le{constructor(){a(this,"fills");a(this,"fillsIndex");a(this,"getFill",e=>e?(e&&!this.fillsIndex.has(e)&&this.fillsIndex.set(e,this.fills.push(e)-1),this.fillsIndex.get(e)):0);a(this,"generate",()=>l("fills",{count:this.fills.length},...this.fills.map(e=>{let t;return typeof e=="string"?t=l("patternFill",{patternType:"solid"},l("fgColor",{rgb:S(e)}),l("bgColor",{indexed:64})):typeof e=="object"&&"gray125"in e&&e.gray125?t=l("patternFill",{patternType:"gray125"}):t=l("patternFill",{patternType:"none"}),l("fill",{},t)})));this.fills=[{},{gray125:!0}],this.fillsIndex=new Map([["",0]])}}const A="Calibri",O=12,W={bold:l("b"),italic:l("i")};class ae{constructor(){a(this,"fonts");a(this,"fontsIndex");a(this,"getFontKey",({family:e=A,size:t=O,style:s="none",color:o="-"})=>`${e}/${t}/${s}/${o}`);a(this,"getFont",e=>{if(!e)return 0;const t=this.getFontKey(e);return this.fontsIndex.has(t)||this.fontsIndex.set(t,this.fonts.push(e)-1),this.fontsIndex.get(t)});a(this,"generate",()=>l("fonts",{count:this.fonts.length},...this.fonts.map(({size:e,color:t,style:s,family:o})=>l("font",{},l("sz",{val:e!=null?e:O}),l("color",t?{rgb:S(t)}:{theme:1}),l("name",{val:o!=null?o:A}),l("family",{val:2}),l("scheme",{val:"minor"}),...s&&W[s]?[W[s]]:[]))));this.fonts=[{}],this.fontsIndex=new Map([[this.getFontKey({}),0]])}}const D=100;class ie{constructor(){a(this,"formats",[]);a(this,"getFormat",e=>{if(!e)return 0;var t=this.formats.indexOf(e);return t===-1&&(t=this.formats.push(e)-1),D+t});a(this,"generate",()=>l("numFmts",{count:this.formats.length},...this.formats.map((e,t)=>l("numFmt",{numFmtId:D+t,formatCode:e}))))}}class ce{constructor(){a(this,"formats",new ie);a(this,"fonts",new ae);a(this,"fills",new le);a(this,"borders",new re);a(this,"styles",[{formatId:0,fontId:0,fillId:0,borderId:0}]);a(this,"stylesIndex",new Map);a(this,"getStyleKey",({formatId:e,fontId:t,fillId:s,borderId:o,align:r="-",alignVertical:i="-",wrap:c})=>`${e}/${t}/${s}/${o}/${r}/${i}/${c?1:0}`);a(this,"generateCells",()=>l("cellXfs",{count:this.styles.length},...this.styles.map(this.generateCell)));a(this,"generateCell",e=>{const t=l("xf",{numFmtId:e.formatId,applyNumberFormat:e.formatId?1:void 0,fontId:e.fontId,applyFont:e.fontId?1:void 0,fillId:e.fillId,applyFill:e.fillId?1:void 0,borderId:e.borderId,applyBorder:e.borderId?1:void 0,applyAlignment:e.align||e.alignVertical||e.wrap?1:void 0});return(e.align||e.alignVertical||e.wrap)&&(t.$elements=[l("alignment",{horizontal:e.align,vertical:e.alignVertical,wrapText:e.wrap?1:void 0})]),t});a(this,"create",e=>{const t=this.formats.getFormat(e.format),s=this.fonts.getFont(e.font),o=this.fills.getFill(e.fill),r=this.borders.getBorder(e.border),i={formatId:t,fontId:s,fillId:o,borderId:r,align:e.align,alignVertical:e.alignVertical};var c=this.getStyleKey(i);return this.stylesIndex.has(c)||this.stylesIndex.set(c,this.styles.push(i)-1),this.stylesIndex.get(c)});a(this,"generate",()=>h(l("styleSheet",{xmlns:"http://schemas.openxmlformats.org/spreadsheetml/2006/main"},this.formats.generate(),this.fonts.generate(),this.fills.generate(),this.borders.generate(),this.generateCells())))}}const me=70*365+19,he=60*60*1e3,fe=24*he;function ge(n){return n.getTime()/fe+me}function b(n,e){return`${_(n)}${e}`}const N=26;function _(n){if(typeof n!="number")return"";const e=Math.floor(n/N),t=String.fromCharCode(97+n%N).toUpperCase();return e===0?t:_(e-1)+t}class pe{constructor(e){a(this,"generate",e=>{const t=this.generateMergedCells(e.rows);return h(l("worksheet",te,this.generateSheet(e.rows),...t?[t]:[]))});a(this,"generateSheet",e=>l("sheetData",{},...e.map(this.generateRow)));a(this,"generateRow",(e,t)=>{const s=t+1,o=l("row",{r:s});o.$elements=[];for(let r=0;r<e.length;r++){const i=e[r];o.$elements.push(this.generateCell(i,s,r))}return o});a(this,"generateCell",(e,t,s)=>{const o=this.workbook.styles.create(e),r=l("c",{r:b(s,t)});o!==null&&(r.s=o.toString());let i=null;if(typeof e.value=="string")r.t="s",i=this.workbook.sharedString.create(e.value);else if(typeof e.value=="boolean")r.t="s",i=e.value?1:0;else if(typeof e.value=="number")r.t="n",i=e.value;else if(e.value instanceof Date){if(!o)throw new Error('No "format" has been specified for a Date cell');r.t="n",i=ge(e.value)}return i!=null&&(r.$elements=[],r.$elements.push(l("v",{},F(i)))),r});this.workbook=e}generateMergedCells(e){const t=[];for(let s=0;s<e.length;s++){const o=s+1,r=e[s];for(let i=0;i<r.length;i++){const{span:c,rowSpan:p}=r[i];let m=c||1,d=p||1;if((!m||m===1)&&(!d||d===1))continue;let M=b(i,o),V=b(i+m-1,o+d-1);t.push(l("mergeCell",{ref:`${M}:${V}`}));let k=!0;for(let x=0;x<d;x++){let v=s+x;e.length<=v&&e.push([]),m>1&&(e[v].splice(i+1,0,...new Array(k?m-1:m).fill({})),k=!1)}}}return t.length===0?null:l("mergeCells",{count:t.length},...t)}}class de{constructor(){a(this,"styles");a(this,"sharedString");a(this,"worksheet");this.styles=new ce,this.sharedString=new se,this.worksheet=new pe(this)}generateWorkbook(e){return h(l("workbook",ee,l("workbookPr"),l("sheets",{},...e.map((t,s)=>l("sheet",{name:t.name||`Table${s+1}`,sheetId:s+1,"r:id":`rId${s+1}`}))),l("definedNames"),l("calcPr")))}generate(e){const t={},s=[];for(let o=0;o<e.length;o++){const r=e[o],i=o+1,c=`sheet${i}.xml`,p="xl/worksheets/"+c;s.push({id:i,fileName:c,path:p}),t[p]=this.worksheet.generate(r)}return t["xl/styles.xml"]=this.styles.generate(),t["xl/sharedStrings.xml"]=this.sharedString.generate(),t["xl/workbook.xml"]=this.generateWorkbook(e),t["[Content_Types].xml"]=Q(...s.map(({path:o})=>({contentType:f.Worksheets,path:o})),{contentType:f.Workbook,path:"xl/workbook.xml"},{contentType:f.SharedStrings,path:"xl/sharedStrings.xml"},{contentType:f.Styles,path:"xl/styles.xml"}),t["xl/_rels/workbook.xml.rels"]=B(...s.map(({id:o,fileName:r})=>({id:o,type:g.Worksheet,target:"worksheets/"+r})),{id:s.length+1,type:g.SharedStrings,target:"sharedStrings.xml"},{id:s.length+2,type:g.Styles,target:"styles.xml"}),t["_rels/.rels"]=B({id:1,type:g.Workbook,target:"xl/workbook.xml"}),t}}function ue(n){const e={name:n.title,rows:[]};return K(e.rows,n.children),e}const R=n=>{if(n){if(n.startsWith("#"))return n;if(n.startsWith("rgb")){var[e,t,s]=n.replace("rgb(","").replace(")","").split(",");const o=r=>(r=parseInt(r).toString(16),r.length===1?"0"+r:r);return"#"+o(e)+o(t)+o(s)}else return}else return},xe={left:"left",right:"right",start:"left",end:"right",center:"center"},ye={top:"top",bottom:"bottom",middle:"center","text-top":"top","text-bottom":"bottom"},Se=(n,e)=>{const t=window.getComputedStyle(n,null),s={textAlign:xe[t.getPropertyValue("text-align")],verticalAlign:ye[t.getPropertyValue("vertical-align")],color:R(t.getPropertyValue("color")),fontFamily:t.getPropertyValue("font-family").replace(/"/g,""),fontSize:parseInt(t.getPropertyValue("font-size")),backgroundColor:R(t.getPropertyValue("background-color"))},o=r=>r||void 0;return{value:n.innerText,align:o(s.textAlign),alignVertical:o(s.verticalAlign),font:{color:s.color,family:o(s.fontFamily),size:o(s.fontSize),style:n.tagName==="TH"?"bold":void 0},fill:s.backgroundColor}},be=n=>[...n.children].filter(e=>e instanceof HTMLTableCellElement).map((e,t)=>Se(e)),K=(n,e)=>{for(const t of e)switch(t.tagName){case"THEAD":case"TBODY":K(n,t.children);break;case"TR":n.push(be(t));break}};async function L(...n){const t=new de().generate(n),s=new z;for(const[o,r]of Object.entries(t))s.file(o,Z.stringify(r));return s.generateAsync({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})}u.registerLanguage("typescript",Y);u.registerLanguage("xml",q);u.registerLanguage("css",J);u.highlightAll();var ke=document.getElementById("btn:download");const ve={name:"TestFile",rows:[[{value:"A"},{value:"B"},{value:"C",font:{family:"Times New Roman",color:"#00FF00"},fill:"#880077"}],[{value:1},{value:2},{value:3}],[{value:"test",span:3,rowSpan:2}]]};ke.onclick=function(){console.log("generating..."),L(ve).then(e=>{console.log("saving..."),T.exports.saveAs(e,"Workbook.xlsx"),console.log("done")}).catch(e=>console.log(String(e)))};var we=document.getElementById("btn:export");we.onclick=function(){console.log("generating..."),L(ue(document.getElementById("table"))).then(n=>{console.log("saving..."),T.exports.saveAs(n,"Workbook.xlsx"),console.log("done")}).catch(n=>console.log(String(n)))};