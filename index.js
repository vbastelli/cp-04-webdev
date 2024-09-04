document.addEventListener('DOMContentLoaded', function() {
  const priceFilter = document.getElementById('priceFilter');
  const containers = document.querySelectorAll('.container.custom-margin-top, .container.mt-5'); // Seleciona todos os contêineres de produtos

  priceFilter.addEventListener('change', function() {
    const selectedValue = this.value;
    sortProducts(selectedValue);
  });

  function sortProducts(order) {
    containers.forEach(container => {
      const rows = container.querySelectorAll('.row'); // Seleciona todas as linhas dentro do contêiner

      rows.forEach(row => {
        const cards = Array.from(row.querySelectorAll('.card, .card-roupas, .card-tec')); // Converte NodeList para Array

        // Ordena os cartões de acordo com o preço
        cards.sort((a, b) => {
          const priceA = parseFloat(a.querySelector('.card-price').innerText.replace('R$ ', '').replace(',', '.')) || 0;
          const priceB = parseFloat(b.querySelector('.card-price').innerText.replace('R$ ', '').replace(',', '.')) || 0;

          if (order === 'asc') {
            return priceA - priceB;
          } else if (order === 'desc') {
            return priceB - priceA;
          } else {
            return 0;
          }
        });

        // Remove todos os cartões da linha
        while (row.firstChild) {
          row.removeChild(row.firstChild);
        }

        // Adiciona os cartões ordenados de volta à linha
        cards.forEach(card => row.appendChild(card));
      });
    });
  }
});
