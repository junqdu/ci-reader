(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[605],{1957:function(e,n,a){Promise.resolve().then(a.bind(a,9605))},9605:function(e,n,a){"use strict";a.r(n),a.d(n,{QnAList:function(){return u}});var t=a(3827),s=a(4090),l=a(703);let c=e=>"https://api.scryfall.com/cards/named?fuzzy=".concat(e.replace(/ /g,"+")),r=e=>{let{src:n}=e;return n},i=e=>["flip","transform","double_faced_token","modal_dfc"].includes(e);function o(e){let{a:n,q:a,imgs:o=[]}=e,[d,u]=(0,s.useState)(a),[h,m]=(0,s.useState)([]),[f,x]=(0,s.useState)(!1),[_,p]=(0,s.useState)([]);return(0,s.useEffect)(()=>{(async()=>{try{let e=o.map(e=>fetch(c(e)).then(e=>e.json())),n=await Promise.all(e).then(e=>e);m(n.map((e,n)=>i(e.layout)?e.card_faces.find(e=>e.name===o[n]).image_uris.normal:e.image_uris.normal)),p(n.map(e=>e.scryfall_uri))}catch(e){console.log(o),console.error(e)}})()},[o]),(0,t.jsxs)("div",{className:"py-8",children:[(0,t.jsxs)("div",{children:["Q: ",(0,t.jsx)("span",{dangerouslySetInnerHTML:{__html:d}})]}),null==h?void 0:h.map((e,n)=>(0,t.jsx)("a",{href:_[n],target:"_blank",className:"m-2 rounded-xl overflow-hidden inline-block",children:(0,t.jsx)(l.default,{className:"max-w-72",loader:r,src:e,alt:"card image",width:500,height:500})},e)),(0,t.jsx)("div",{children:f?(0,t.jsxs)(t.Fragment,{children:["A: ",(0,t.jsx)("span",{dangerouslySetInnerHTML:{__html:n}})]}):(0,t.jsx)("button",{className:"rounded-lg border bg-slate-400 px-2",onClick:()=>x(!0),children:"Show Answer"})})]})}let d=()=>"localhost:3000"!==window.location.host;function u(e){let{id:n}=e,[a,l]=(0,s.useState)([]);return(0,s.useEffect)(()=>{fetch("".concat(d()?"/ci-reader":"","/data/").concat(n,".json")).then(e=>e.json()).then(e=>l(e))},[n]),(0,t.jsxs)("div",{className:"flex flex-col divide-y-2 divide-neutral-700",children:[(0,t.jsxs)("div",{className:"mb-4",children:["Source:"," ",(0,t.jsx)("a",{className:"text-blue-500",target:"_blank",href:"https://www.cranial-insertion.com/article/".concat(n),children:"https://www.cranial-insertion.com/article/".concat(n)})]}),a.map((e,n)=>(0,t.jsx)(o,{...e},n))]})}}},function(e){e.O(0,[703,971,69,744],function(){return e(e.s=1957)}),_N_E=e.O()}]);