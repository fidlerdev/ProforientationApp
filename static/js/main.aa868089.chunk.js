(this["webpackJsonpschool-prjoect"]=this["webpackJsonpschool-prjoect"]||[]).push([[0],{124:function(e,t,a){e.exports=a(154)},134:function(e,t,a){},153:function(e,t,a){},154:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(45),o=a.n(r),l=a(17),i=a.n(l),s=a(32),m=a.n(s),u=a(46),d=a(34),p=a(31),f=a.n(p),E=(a(130),a(25)),h=a.n(E),b=a(26),g=a.n(b),v=a(27),k=a.n(v),y=a(54),C=a.n(y),x=a(55),N=a.n(x),j=(a(131),a(133),a(47)),w=a.n(j),O=(a(134),a(12)),A=function(e){var t=e.id,a=e.go;return c.a.createElement(h.a,{id:t},c.a.createElement(g.a,{left:c.a.createElement(O.h,null,c.a.createElement(w.a,{onClick:a,"data-to":"account"}))},"\u041f\u0440\u043e\u0444\u043e\u0440\u0438\u0435\u043d\u0442\u0430\u0446\u0438\u044f"),c.a.createElement(C.a,{title:"Navigation Example"},c.a.createElement(N.a,null,c.a.createElement(k.a,{size:"xl",level:"4",onClick:a,"data-to":"persik",className:"xl-button"},"Show me Persik, please"))))},U=(a(153),a(56)),_=a.n(U),I=function(e){var t=e.id,a=e.go;return c.a.createElement(h.a,{id:t},c.a.createElement(g.a,{separator:!1}),c.a.createElement("img",{src:_.a,alt:"Logo 256x256",className:"Content"}),c.a.createElement("p",{className:"Content AppName"},"\u041f\u0440\u043e\u0444\u043e\u0440\u0438\u0435\u043d\u0442\u0430\u0446\u0438\u044f"),c.a.createElement(O.c,{className:"Content"},c.a.createElement(k.a,{size:"l",onClick:a,"data-to":"main",stretched:!0,mode:"primary",className:"button"},"\u041d\u0430\u0447\u0430\u0442\u044c")),c.a.createElement("a",{onClick:a,"data-to":"authorship",className:"Content link"},c.a.createElement("u",null,"\u0421\u0441\u044b\u043b\u043a\u0438 \u043d\u0430 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u0438")))},K=function(e){var t=e.id,a=e.go,n=e.fetchedUser;return c.a.createElement(O.e,{id:t},c.a.createElement(O.f,{left:c.a.createElement(O.g,{onClick:a,"data-to":"main"})},"\u041f\u0440\u043e\u0444\u0438\u043b\u044c"),n&&c.a.createElement(O.d,{title:"User Data Fetched with VK Bridge"},c.a.createElement(O.b,{before:n.photo_200?c.a.createElement(O.a,{src:n.photo_200}):null,description:n.city&&n.city.title?n.city.title:""},"".concat(n.first_name," ").concat(n.last_name))))},V=function(){var e=Object(n.useState)("entry"),t=Object(d.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(null),l=Object(d.a)(o,2),s=l[0],p=l[1];Object(n.useEffect)((function(){function e(){return(e=Object(u.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.send("VKWebAppGetUserInfo");case 2:t=e.sent,p(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}i.a.subscribe((function(e){var t=e.detail,a=t.type,n=t.data;if("VKWebAppUpdateConfig"===a){var c=document.createAttribute("scheme");c.value=n.scheme?n.scheme:"client_light",document.body.attributes.setNamedItem(c)}})),function(){e.apply(this,arguments)}()}),[]);var E=function(e){r(e.currentTarget.dataset.to)};return c.a.createElement(f.a,{activePanel:a},c.a.createElement(I,{id:"entry",go:E,centered:!0}),c.a.createElement(A,{id:"main",go:E}),c.a.createElement(K,{id:"account",go:E,fetchedUser:s}))};i.a.send("VKWebAppInit"),o.a.render(c.a.createElement(V,null),document.getElementById("root"))},56:function(e,t,a){e.exports=a.p+"static/media/Logo 256x256.d71c7559.png"}},[[124,1,2]]]);
//# sourceMappingURL=main.aa868089.chunk.js.map