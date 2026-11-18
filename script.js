// Shared site interactions — syntax-checked and kept page-safe
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menu&&nav){
 menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
 });
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');menu.setAttribute('aria-expanded','false');
 }));
}
const revealTargets=document.querySelectorAll('.intro-copy,.showcase,.why,.section-heading,.service-card,.work-item,.blog-copy,.blog-visual,.cta');
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}
 }),{threshold:.12});
 revealTargets.forEach(el=>{el.classList.add('reveal');observer.observe(el);});
}
const form=document.querySelector('#contact-form');
if(form){
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(form);
  const name=String(data.get('name')||'').trim();
  const email=String(data.get('email')||'').trim();
  const message=String(data.get('message')||'').trim();
  const subject=encodeURIComponent('Website inquiry from '+name);
  const body=encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\nProject details:\n'+message);
  const status=form.querySelector('.form-status');
  if(status)status.textContent='Opening your email app…';
  window.location.href='mailto:admin@dleading.com?subject='+subject+'&body='+body;
 });
}
const blogSearch=document.querySelector('#blog-search');
const blogFilters=document.querySelectorAll('.blog-filter');
const blogCards=document.querySelectorAll('.blog-card');
const blogEmpty=document.querySelector('#blog-empty');
let blogCategory='all';
function filterBlog(){
 if(!blogCards.length)return;
 const term=(blogSearch?.value||'').toLowerCase().trim();
 let shown=0;
 blogCards.forEach(card=>{
  const categoryMatch=blogCategory==='all'||card.dataset.category===blogCategory;
  const text=((card.dataset.search||'')+' '+card.textContent).toLowerCase();
  const visible=categoryMatch&&(!term||text.includes(term));
  card.hidden=!visible;if(visible)shown++;
 });
 if(blogEmpty)blogEmpty.hidden=shown>0;
}
blogFilters.forEach(btn=>btn.addEventListener('click',()=>{
 blogCategory=btn.dataset.filter;blogFilters.forEach(b=>b.classList.toggle('active',b===btn));filterBlog();
}));
blogSearch?.addEventListener('input',filterBlog);
const deckCards=document.querySelectorAll('.showcase .deck-card');
function activateDeckCard(card){deckCards.forEach(c=>{c.classList.toggle('is-active',c===card);c.setAttribute('aria-pressed',String(c===card));});}
deckCards.forEach(card=>{
 card.addEventListener('click',()=>activateDeckCard(card));
 card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activateDeckCard(card);}});
});
if(deckCards.length)activateDeckCard(deckCards[1]||deckCards[0]);
