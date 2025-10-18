const dados = {
  filmes: [
    { titulo: "É Assim Que Acaba", imagem: "../assets/imgs/eassimqueacaba.webp", genero: ["Drama", "Romance"] },
    { titulo: "Bad Boys: Para Sempre", imagem: "../assets/imgs/badboys.webp", genero: ["Ação", "Comédia"] },
    { titulo: "Um Lugar Silencioso: Dia Um", imagem: "../assets/imgs/umlugarsilencioso.webp", genero: ["Ficção", "Terror", "Mistério"] },
    { titulo: "Venom", imagem: "../assets/imgs/venom.webp", genero: ["Ação", "Ficção"] },
    { titulo: "Deadpool & Wolverine", imagem: "../assets/imgs/deadpoolewolverine.webp", genero: ["Ação", "Comédia", "Ficção"] },
    { titulo: "Divertida Mente 2", imagem: "../assets/imgs/divertidamente.webp", genero: ["Ficção", "Animação", "Aventura", "Comédia"] },
  ],
  series: [
    { titulo: "Guerra dos Tronos", imagem: "../assets/imgs/gameofthrones.webp", genero: ["Ficção", "Aventura", "Ação", "Fantasia"] },
    { titulo: "Sobrenatural", imagem: "../assets/imgs/sobrenatural.webp", genero: ["Ficção", "Terror", "Mistério", "Drama", "Thriller"] },
    { titulo: "Grey's Anatomy", imagem: "../assets/imgs/greysanatomy.webp", genero: ["Drama", "Romance"] },
    { titulo: "Prison Break", imagem: "../assets/imgs/prisonbreak.webp", genero: ["Ação", "Drama", "Mistério", "Crime"] },
    { titulo: "O Senhor dos Anéis: Os Anéis de Poder", imagem: "../assets/imgs/osenhordosaneis.webp", genero: ["Ficção", "Aventura", "Sci-Fi & Fantasy"] },
    { titulo: "O Segredo do Rio", imagem: "../assets/imgs/osegredodorio.webp", genero: ["Drama", "Mistério"] },
  ]
};

// Captura todos os cards de filmes (os elementos <a> dentro do #filmes-container")
const filmesCards = document.querySelectorAll("#filmes-container a");

// Captura todos os cards de Séries (os elementos <a> dentro do #series-container")
const seriesCards = document.querySelectorAll("#series-container a");

// captura o elemento <select> para o diltro de genero
const selectGenero = document.getElementById("genero");

// captura o botão "limpar filtro"
const btnLimpar = document.getElementById("limpar-filtro");


// captura o campo de texto para pesquisa
const inputPesquisar = document.getElementById("pesquisar");

// seletores do menu mobile

const btnMenu = document.getElementById("menu-btn");
const menuMobile = document.getElementById("menu-mobile")



// 3. Função principal de Renderização e filtragm (reutilizavel)
// - esta função define a visibilidade e imagem de fundo de cada card
//- foi definida de forma global para ser usada em vários pontos de cádigo.

function renderizar(cards, lista, filtro = "todos") {
  cards.forEach((card, index) => {
    const item = lista[index]
    const generos = item && item.genero;

    const correspondeFiltro = filtro === "todos" || (generos && generos.includes(filtro))

    if (item && correspondeFiltro) {

      card.style.display = "block";
      card.style.backgroundImage = `url(${item.imagem})`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";

    } else {
      card.style.display = "none";
    }

  });

  console.log(`Renderização concluida para o filtro ${filtro}`);

};

// 4.função que chama a renderizalção para filmes e series 
// - centraliza a chamada para enviat repetição de código.


function aplicarFiltro(generoSelecionado) {
  renderizar(filmesCards, dados.filmes, generoSelecionado)
  renderizar(seriesCards, dados.series, generoSelecionado)


}


//5. Eventos do DOM (ações que ocorrem após o carregamento da página)
// - Este bloco garante que só manipularemos os elementos depois que eles existirem 

document.addEventListener("DOMContentLoaded", function () {
  if (selectGenero) {
    selectGenero.addEventListener("change", function () {
      const generoSelecionado = this.value === "" ? "todos" : this.value;
      aplicarFiltro(generoSelecionado)
    })

  }
  // Ação: Quando o usúario clica em "Limpar filtro"

  if (btnLimpar) {
    btnLimpar.addEventListener("click", function () {
      selectGenero.selectedIndex = 0;

      aplicarFiltro("todos")
    })
  }

  aplicarFiltro("todos")

});

//6. Pesquisa por texto (filtros por titulo)

if (inputPesquisar) {
  inputPesquisar.addEventListener("input", function () {
    const palavrasDigitada = this.value.toLowerCase();

    filmesCards.forEach((card, index) => {
      const titulo = dados.filmes[index].titulo.toLocaleLowerCase();

      card.style.display = titulo.includes(palavrasDigitada) ? "block" : "none"
    });

    seriesCards.forEach((card, index) => {

      const titulo = dados.series[index].titulo.toLocaleLowerCase();

      card.style.display = titulo.includes(palavrasDigitada) ? "block" : "none"
    });

    if (selectGenero) selectGenero.selectedIndex= 0;


  })
}


// 7. menu mobile (alterar a visibilidade)

if (btnMenu && menuMobile){
  btnMenu.addEventListener("click", () => {

    menuMobile.style.display = menuMobile.style.display === "flex" ? "none" : "flex";
  })
}