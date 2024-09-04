// carrinho.js
console.log('carrinho.js carregado');

// Função para carregar itens do carrinho do localStorage
function carregarItensCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho')) || [];
    
    if (listaCarrinho) {
        listaCarrinho.innerHTML = ''; // Limpa a lista antes de adicionar os itens
        itensCarrinho.forEach(item => {
            const itemCarrinho = document.createElement('li');
            itemCarrinho.className = 'list-group-item d-flex justify-content-between align-items-center';
            itemCarrinho.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${item.imagem}" alt="${item.nome}" style="width: 50px; height: auto; margin-right: 10px;">
                    <div>
                        <h5>${item.nome}</h5>
                        <p>R$ ${item.preco.toFixed(2)}</p>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${item.id})">Remover</button>
            `;
            listaCarrinho.appendChild(itemCarrinho);
        });

        // Atualizar o total de itens no carrinho
        atualizarTotalCarrinho(itensCarrinho);
    } else {
        console.error('Elemento lista-carrinho não encontrado');
    }
}

// Função para remover um item do carrinho
window.removerDoCarrinho = function(id) {
    const itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho')) || [];
    const novosItens = itensCarrinho.filter(item => item.id !== id);

    // Atualizar o localStorage
    localStorage.setItem('itensCarrinho', JSON.stringify(novosItens));

    // Atualizar o contador no localStorage
    let contadorCarrinho = novosItens.length;
    localStorage.setItem('contadorCarrinho', contadorCarrinho);

    // Recarregar a lista e o contador
    carregarItensCarrinho();
    atualizarBadgeCarrinho();
}

// Função para atualizar o total dos itens do carrinho
function atualizarTotalCarrinho(itensCarrinho) {
    const totalElement = document.getElementById('total-preco');
    let totalPreco = itensCarrinho.reduce((total, item) => total + item.preco, 0);
    
    if (totalElement) {
        totalElement.textContent = `Total: R$ ${totalPreco.toFixed(2)}`;
    } else {
        console.error('Elemento total-preco não encontrado');
    }
}

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

// Atualiza a lista de itens do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado e analisado');
    carregarItensCarrinho();
    atualizarBadgeCarrinho();
});
