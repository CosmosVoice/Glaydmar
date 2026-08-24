const products = [
 {id:1,name:"Vestido Midi Feminino",brand:"DLZ",cat:"feminino",price:149.90,image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=85",promo:true},
 {id:2,name:"Blusa Feminina Canelada",brand:"Bivik",cat:"feminino",price:79.90,image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=85"},
 {id:3,name:"Calça Jeans Wide Leg",brand:"DLZ",cat:"feminino",price:129.90,image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&q=85"},
 {id:4,name:"Camisa Social Masculina",brand:"Bivik",cat:"masculino",price:119.90,image:"https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=900&q=85"},
 {id:5,name:"Polo Masculina",brand:"DLZ",cat:"masculino",price:89.90,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=85",promo:true},
 {id:6,name:"Calça Jeans Masculina",brand:"Bivik",cat:"masculino",price:139.90,image:"https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=900&q=85"},
 {id:7,name:"Conjunto Infantil",brand:"Glaydmar",cat:"infantil",price:99.90,image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900&q=85"},
 {id:8,name:"Vestido Infantil",brand:"Bivik",cat:"infantil",price:84.90,image:"https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=900&q=85",promo:true},
 {id:9,name:"Cropped Feminino",brand:"DLZ",cat:"feminino",price:59.90,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=85"},
 {id:10,name:"Short Jeans Feminino",brand:"Bivik",cat:"feminino",price:74.90,image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=85"},
 {id:11,name:"Moletom Masculino",brand:"DLZ",cat:"masculino",price:129.90,image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=85"},
 {id:12,name:"Conjunto Infantil Kids",brand:"Glaydmar",cat:"infantil",price:109.90,image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900&q=85"}
];
let filter = "todos";

const money = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const grid = document.querySelector("#productGrid");

function render(){
  let list = [...products];
  if(filter !== "todos") list = filter==="promocao" ? list.filter(p=>p.promo) : list.filter(p=>p.cat===filter);
  const sort = document.querySelector("#sort").value;
  if(sort==="low") list.sort((a,b)=>a.name.localeCompare(b.name));
  if(sort==="high") list.sort((a,b)=>a.cat.localeCompare(b.cat));
  grid.innerHTML = list.map(p=>`
    <article class="product">
      ${p.promo?'<span class="tag">OFERTA</span>':''}
      <div class="product-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="product-info">
        <span class="brand-name">${p.brand}</span>
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)}</div>
        <a class="add" href="#contato">Tenho interesse</a>
      </div>
    </article>`).join("");
}
function addToCart(id){ cart.push(id); save(); openCart(); }
document.querySelectorAll(".cat").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".cat").forEach(b=>b.classList.remove("active"));btn.classList.add("active");filter=btn.dataset.filter;render();}));
document.querySelectorAll(".brand-list button").forEach(btn=>btn.addEventListener("click",()=>{filter="todos";document.querySelectorAll(".cat").forEach(b=>b.classList.toggle("active",b.dataset.filter==="todos"));render();setTimeout(()=>{grid.querySelectorAll(".product").forEach(card=>{card.style.display=card.textContent.includes(btn.dataset.brand)?"":"none"})},0)}));
document.querySelector("#sort").addEventListener("change",render);
document.querySelector("#themeBtn").addEventListener("click",()=>{
  const dark=document.documentElement.dataset.theme==="dark";
  document.documentElement.dataset.theme=dark?"":"dark";
  localStorage.setItem("glaydmarTheme",dark?"light":"dark");
  document.querySelector("#themeBtn").textContent=dark?"☾":"☀";
});
if(localStorage.getItem("glaydmarTheme")==="dark"){document.documentElement.dataset.theme="dark";document.querySelector("#themeBtn").textContent="☀"}

const whatsapp = "5599999999999"; // TROQUE pelo número da Glaydmar, com DDI + DDD.
document.querySelector("#whatsappMain").href=`https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Vi a Glaydmar Modas e gostaria de conhecer os produtos.")}`;
document.querySelector("#checkout").addEventListener("click",()=>{
  if(!cart.length)return;
  const counts={};cart.forEach(id=>counts[id]=(counts[id]||0)+1);
  const items=Object.entries(counts).map(([id,q])=>{const p=products.find(x=>x.id==id);return `${q}x ${p.name} - ${money(p.price)}`}).join("\n");
  const total=money(cart.reduce((s,id)=>s+products.find(p=>p.id===id).price,0));
  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Quero fazer um pedido na Glaydmar Modas:\n\n"+items+"\n\nTotal: "+total)}`,"_blank");
});
render();

const welcome = document.querySelector("#welcomeOverlay");
const closeWelcome = () => {
  welcome.classList.remove("open");
  sessionStorage.setItem("glaydmarWelcomeSeen","1");
};
if(!sessionStorage.getItem("glaydmarWelcomeSeen")) {
  setTimeout(() => welcome.classList.add("open"), 350);
}
document.querySelector("#closeWelcome").addEventListener("click", closeWelcome);
document.querySelector("#seeSelection").addEventListener("click", closeWelcome);
welcome.addEventListener("click", e => { if(e.target === welcome) closeWelcome(); });

document.addEventListener("click", e => {
  const link = e.target.closest(".add");
  if(!link) return;
  e.preventDefault();
  const card = link.closest(".product");
  const name = card?.querySelector("h3")?.textContent || "uma peça";
  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Vi a peça \""+name+"\" no mostruário da Glaydmar Modas e gostaria de saber se ainda está disponível.")}`,"_blank");
});
