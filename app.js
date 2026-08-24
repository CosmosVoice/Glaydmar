const products = [
  {
    id: 1,
    name: "Vestido Midi Feminino",
    brand: "DLZ",
    cat: "feminino",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=85",
    promo: true
  },
  {
    id: 2,
    name: "Blusa Feminina Canelada",
    brand: "Bivik",
    cat: "feminino",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=85"
  },
  {
    id: 3,
    name: "Calça Jeans Wide Leg",
    brand: "DLZ",
    cat: "feminino",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&q=85"
  },
  {
    id: 4,
    name: "Camisa Social Masculina",
    brand: "Bivik",
    cat: "masculino",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=900&q=85"
  },
  {
    id: 5,
    name: "Polo Masculina",
    brand: "DLZ",
    cat: "masculino",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=85",
    promo: true
  },
  {
    id: 6,
    name: "Calça Jeans Masculina",
    brand: "Bivik",
    cat: "masculino",
    price: 139.90,
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=900&q=85"
  },
  {
    id: 7,
    name: "Conjunto Infantil",
    brand: "Glaydmar",
    cat: "infantil",
    price: 99.90,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900&q=85"
  },
  {
    id: 8,
    name: "Vestido Infantil",
    brand: "Bivik",
    cat: "infantil",
    price: 84.90,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=900&q=85",
    promo: true
  },
  {
    id: 9,
    name: "Cropped Feminino",
    brand: "DLZ",
    cat: "feminino",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=85"
  },
  {
    id: 10,
    name: "Short Jeans Feminino",
    brand: "Bivik",
    cat: "feminino",
    price: 74.90,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=85"
  },
  {
    id: 11,
    name: "Moletom Masculino",
    brand: "DLZ",
    cat: "masculino",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=85"
  },
  {
    id: 12,
    name: "Conjunto Infantil Kids",
    brand: "Glaydmar",
    cat: "infantil",
    price: 109.90,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900&q=85"
  }
];

let filter = "todos";

/* WhatsApp da Glaydmar
   55 = Brasil
   33 = DDD
   999225205 = número
*/
const whatsapp = "5533999225205";

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

const grid = document.querySelector("#productGrid");


/* =========================
   MOSTRUÁRIO
========================= */

function render() {
  let list = [...products];

  // Filtro por categoria
  if (filter !== "todos") {
    if (filter === "promocao") {
      list = list.filter(product => product.promo);
    } else {
      list = list.filter(product => product.cat === filter);
    }
  }

  // Ordenação
  const sort = document.querySelector("#sort")?.value;

  if (sort === "low") {
    list.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sort === "high") {
    list.sort((a, b) =>
      a.cat.localeCompare(b.cat)
    );
  }

  grid.innerHTML = list.map(product => `
    <article class="product">

      ${
        product.promo
          ? '<span class="tag">OFERTA</span>'
          : ""
      }

      <div class="product-img">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
      </div>

      <div class="product-info">

        <span class="brand-name">
          ${product.brand}
        </span>

        <h3>
          ${product.name}
        </h3>

        <div class="price">
          ${money(product.price)}
        </div>

        <a
          class="add"
          href="#contato"
          data-product="${product.name}"
        >
          Tenho interesse
        </a>

      </div>

    </article>
  `).join("");
}


/* =========================
   CATEGORIAS
========================= */

document.querySelectorAll(".cat").forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelectorAll(".cat")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    filter = button.dataset.filter;

    render();
  });

});


/* =========================
   MARCAS
========================= */

document
  .querySelectorAll(".brand-list button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const brand = button.dataset.brand;

      filter = "todos";

      document
        .querySelectorAll(".cat")
        .forEach(btn => {
          btn.classList.toggle(
            "active",
            btn.dataset.filter === "todos"
          );
        });

      render();

      setTimeout(() => {

        document
          .querySelectorAll(".product")
          .forEach(card => {

            const brandName =
              card.querySelector(".brand-name")
                ?.textContent
                .trim();

            card.style.display =
              brandName === brand
                ? ""
                : "none";

          });

      }, 0);

    });

});


/* =========================
   ORDENAÇÃO
========================= */

const sortElement = document.querySelector("#sort");

if (sortElement) {
  sortElement.addEventListener("change", render);
}


/* =========================
   TEMA CLARO / ESCURO
========================= */

const themeButton =
  document.querySelector("#themeBtn");

if (themeButton) {

  themeButton.addEventListener("click", () => {

    const dark =
      document.documentElement.dataset.theme === "dark";

    document.documentElement.dataset.theme =
      dark ? "" : "dark";

    localStorage.setItem(
      "glaydmarTheme",
      dark ? "light" : "dark"
    );

    themeButton.textContent =
      dark ? "☾" : "☀";

  });

}


/* Carregar tema salvo */

if (
  localStorage.getItem("glaydmarTheme") === "dark"
) {

  document.documentElement.dataset.theme = "dark";

  if (themeButton) {
    themeButton.textContent = "☀";
  }

}


/* =========================
   WHATSAPP PRINCIPAL
========================= */

const whatsappMain =
  document.querySelector("#whatsappMain");

if (whatsappMain) {

  const message =
    "Olá! Vi a Glaydmar Modas e gostaria de conhecer os produtos.";

  whatsappMain.href =
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

}


/* =========================
   WHATSAPP DAS PEÇAS
========================= */

document.addEventListener("click", event => {

  const link =
    event.target.closest(".add");

  if (!link) return;

  event.preventDefault();

  const productName =
    link.dataset.product || "uma peça";

  const message =
    `Olá! Vi a peça "${productName}" no mostruário da Glaydmar Modas e gostaria de saber se ainda está disponível.`;

  const url =
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

});


/* =========================
   POP-UP DE ENTRADA
========================= */

const welcome =
  document.querySelector("#welcomeOverlay");

const closeWelcomeButton =
  document.querySelector("#closeWelcome");

const seeSelection =
  document.querySelector("#seeSelection");


function closeWelcome() {

  if (!welcome) return;

  welcome.classList.remove("open");

  sessionStorage.setItem(
    "glaydmarWelcomeSeen",
    "1"
  );

}


/* Mostrar somente uma vez por sessão */

if (
  welcome &&
  !sessionStorage.getItem("glaydmarWelcomeSeen")
) {

  setTimeout(() => {
    welcome.classList.add("open");
  }, 350);

}


/* Fechar no X */

if (closeWelcomeButton) {

  closeWelcomeButton.addEventListener(
    "click",
    closeWelcome
  );

}


/* Fechar ao clicar no botão */

if (seeSelection) {

  seeSelection.addEventListener(
    "click",
    closeWelcome
  );

}


/* Fechar clicando fora */

if (welcome) {

  welcome.addEventListener("click", event => {

    if (event.target === welcome) {
      closeWelcome();
    }

  });

}


/* =========================
   INICIALIZAÇÃO
========================= */

render();
