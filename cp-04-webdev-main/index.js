// index.js

console.log('index.js carregado');

// Função para adicionar um item ao carrinho
window.adicionarAoCarrinho = function(produtoId) {
    console.log('Botão clicado, ID do produto:', produtoId);

    carregarProdutos().then(produtos => {
        const produto = produtos.find(p => p.id === produtoId);
        if (produto) {
            adicionarItemCarrinho(produto);
        } else {
            console.error('Produto não encontrado com ID:', produtoId);
        }
    }).catch(erro => console.error('Erro ao carregar produtos:', erro));
};

// Função para carregar produtos (simula carregamento do JSON)
function carregarProdutos() {
    return fetch('produtos.json')
        .then(response => response.json())
        .then(data => data)
        .catch(erro => {
            console.error('Erro ao carregar o JSON:', erro);
            return [];
        });
}

// Função para adicionar um item ao carrinho
function adicionarItemCarrinho(produto) {
    console.log('Adicionando item ao carrinho:', produto);

    // Adiciona o item ao localStorage
    let itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho')) || [];
    itensCarrinho.push(produto);
    localStorage.setItem('itensCarrinho', JSON.stringify(itensCarrinho));

    // Atualiza o contador do carrinho
    let contadorCarrinho = parseInt(localStorage.getItem('contadorCarrinho')) || 0;
    contadorCarrinho += 1;
    localStorage.setItem('contadorCarrinho', contadorCarrinho);

    atualizarBadgeCarrinho();
};

// Função para atualizar o contador do badge do carrinho
function atualizarBadgeCarrinho() {
    const badge = document.querySelector('.nav-link .badge');
    if (badge) {
        const contadorCarrinho = localStorage.getItem('contadorCarrinho') || 0;
        badge.textContent = contadorCarrinho;
    } else {
        console.error('Elemento badge não encontrado');
    }
}

// Atualiza o badge do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado e analisado');
    atualizarBadgeCarrinho();
});



document.addEventListener('DOMContentLoaded', function() {
  const priceFilter = document.getElementById('priceFilter');
  const cards = document.querySelectorAll('.card, .card-roupas, .card-tec'); // Seletor para todos os cartões

  priceFilter.addEventListener('change', function() {
    const selectedValue = this.value;
    filterProducts(selectedValue);
  });

  function filterProducts(priceRange) {
    cards.forEach(card => {
      const priceText = card.querySelector('.card-price').innerText;
      const price = parseFloat(priceText.replace('R$ ', '').replace(',', '.'));
      
      card.style.display = 'block'; // Mostra todos os produtos inicialmente
      
      if (priceRange !== 'all') {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        
        if (priceRange.includes('-')) {
          // Intervalo de preços
          if (price < minPrice || price > maxPrice) {
            card.style.display = 'none'; // Oculta produtos fora do intervalo
          }
        } else {
          // Preço mínimo
          if (price <= minPrice) {
            card.style.display = 'none'; // Oculta produtos abaixo do preço mínimo
          }
        }
      }
    });
  }
});