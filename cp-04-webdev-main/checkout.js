// checkout.js
console.log('checkout.js carregado');

// Função para carregar os itens do carrinho e calcular o total
function carregarCarrinho() {
    const listaCarrinho = document.getElementById('lista-resumo');
    const totalPrecoElement = document.getElementById('total-preco');
    const itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho')) || [];
    let totalPreco = 0;

    // Limpa a lista de resumo
    listaCarrinho.innerHTML = '';

    itensCarrinho.forEach(item => {
        const listaItem = document.createElement('li');
        listaItem.classList.add('list-group-item');
        listaItem.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        listaCarrinho.appendChild(listaItem);
        totalPreco += item.preco;
    });

    // Atualiza o total na página
    if (totalPrecoElement) {
        totalPrecoElement.textContent = `Total: R$ ${totalPreco.toFixed(2)}`;
    } else {
        console.error('Elemento total-preco não encontrado');
    }
}

// Função para finalizar a compra
function finalizarCompra(event) {
    event.preventDefault();

    // Coletar os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('endereco').value;

    // Validar se os campos estão preenchidos
    if (nome && email && endereco) {
        // Simulação de um pedido bem-sucedido
        alert(`Compra realizada com sucesso!\n\nNome: ${nome}\nEmail: ${email}\nEndereço: ${endereco}`);

        // Limpar o carrinho
        localStorage.removeItem('itensCarrinho');
        localStorage.setItem('contadorCarrinho', '0');
        
        // Redirecionar para a página inicial ou página de confirmação
        window.location.href = 'index.html';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Configuração inicial
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado e analisado');
    carregarCarrinho();

    const formCheckout = document.getElementById('form-checkout');
    formCheckout.addEventListener('submit', finalizarCompra);
});
