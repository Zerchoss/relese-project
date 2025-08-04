document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.querySelector('.cart-items');
  const totalPriceEl = document.querySelector('.total-price');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-img">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Ціна: ${item.price}₴</p>
        </div>
        <div class="cart-actions">
          <input type="number" value="1" min="1">
          <button class="remove-btn">✖</button>
        </div>
      `;

      // Видалити з корзини
      div.querySelector('.remove-btn').addEventListener('click', () => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });

      cartContainer.appendChild(div);
      total += Number(item.price);
    });

    totalPriceEl.textContent = `${total}₴`;
  }

  renderCart();
});
