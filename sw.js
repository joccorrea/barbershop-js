self.addEventListener("install",event=>{self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(self.clients.claim())});
self.addEventListener("push",event=>{
 let data={title:"Barber Shop JS",body:"Você tem uma atualização.",url:"/barbershop-js/gestao.html"};
 try{if(event.data)data={...data,...event.data.json()}}catch(_){}
 event.waitUntil(self.registration.showNotification(data.title||"Barber Shop JS",{
  body:data.body||"Novo agendamento recebido.",
  icon:"/barbershop-js/logo.jpg",
  badge:"/barbershop-js/logo.jpg",
  tag:data.tag||"barbershop-notification",
  renotify:true,
  data:{url:data.url||"/barbershop-js/gestao.html"}
 }));
});
self.addEventListener("notificationclick",event=>{
 event.notification.close();
 const target=new URL(event.notification.data?.url||"/barbershop-js/gestao.html",self.location.origin).href;
 event.waitUntil((async()=>{
  const wins=await self.clients.matchAll({type:"window",includeUncontrolled:true});
  for(const client of wins){if("focus" in client){await client.navigate(target);return client.focus()}}
  if(self.clients.openWindow)return self.clients.openWindow(target);
 })());
});
