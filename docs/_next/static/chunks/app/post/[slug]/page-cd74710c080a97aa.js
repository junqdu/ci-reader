(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[605],{1957:function(e,t,n){Promise.resolve().then(n.bind(n,9605))},9605:function(e,t,n){"use strict";n.r(t),n.d(t,{QnAList:function(){return u}});var a=n(3827),s=n(4090),l=n(703);let r=e=>"https://api.scryfall.com/cards/named?fuzzy=".concat(e.replace(/ /g,"+")),c=e=>{let{src:t}=e;return t},i=e=>["flip","transform","double_faced_token","modal_dfc"].includes(e);function o(e){let{a:t,q:n,imgs:o=[]}=e,[d,u]=(0,s.useState)(n),[h,m]=(0,s.useState)([]),[f,x]=(0,s.useState)(!1),[_,p]=(0,s.useState)([]);return(0,s.useEffect)(()=>{(async()=>{try{let e=o.map(e=>fetch(r(e)).then(e=>e.json())),t=await Promise.all(e).then(e=>e);m(t.map((e,t)=>i(e.layout)?e.card_faces.find(e=>e.name===o[t]).image_uris.normal:e.image_uris.normal)),p(t.map(e=>e.scryfall_uri))}catch(e){console.log(o),console.error(e)}})()},[o]),(0,a.jsxs)("div",{className:"py-8",children:[(0,a.jsxs)("div",{children:["Q: ",(0,a.jsx)("span",{dangerouslySetInnerHTML:{__html:d}})]}),null==h?void 0:h.map((e,t)=>(0,a.jsx)("a",{href:_[t],target:"_blank",children:(0,a.jsx)(l.default,{className:"my-4 rounded-xl overflow-hidden max-w-72",loader:c,src:e,alt:"card image",width:500,height:500})},e)),(0,a.jsx)("div",{children:f?(0,a.jsxs)(a.Fragment,{children:["A: ",(0,a.jsx)("span",{dangerouslySetInnerHTML:{__html:t}})]}):(0,a.jsx)("button",{className:"rounded-lg border bg-slate-400 px-2",onClick:()=>x(!0),children:"Show Answer"})})]})}let d=()=>"localhost:3000"!==window.location.host;function u(e){let{id:t}=e,[n,l]=(0,s.useState)([]);return(0,s.useEffect)(()=>{fetch("".concat(d()?"/ci-reader":"","/data/").concat(t,".json")).then(e=>e.json()).then(e=>l(e))},[t]),(0,a.jsxs)("div",{className:"flex flex-col divide-y-2 divide-neutral-700",children:[(0,a.jsxs)("div",{className:"mb-4",children:["Source:"," ",(0,a.jsx)("a",{className:"text-blue-500",target:"_blank",href:"https://www.cranial-insertion.com/article/".concat(t),children:"https://www.cranial-insertion.com/article/".concat(t)})]}),n.map((e,t)=>(0,a.jsx)(o,{...e},t))]})}}},function(e){e.O(0,[703,971,69,744],function(){return e(e.s=1957)}),_N_E=e.O()}]);