document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-game-btn');
  const modal = document.getElementById('game-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const createBtn = document.getElementById('create-game-btn');
  const gameGrid = document.querySelector('.game-grid');

  let games = JSON.parse(localStorage.getItem('games')) || [];

  function saveGames() {
    localStorage.setItem('games', JSON.stringify(games));
  }

  function createGameCard({ name, image, price }) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <div class="game-cover"><img src="${image}" alt="${name}" /></div>
      <div class="game-info">
        <p class="game-title">${name}</p>
        <p class="game-price">₴${price}</p>
        <button class="add-btn">Додати до корзини</button>
        <button class="delete-btn">Видалити</button>
      </div>
    `;

    // Додати до корзини
    card.querySelector('.add-btn').addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ name, image, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`"${name}" додано до корзини!`);
    });

    // Видалити гру
    card.querySelector('.delete-btn').addEventListener('click', () => {
      card.remove();
      games = games.filter(game => !(game.name === name && game.image === image && game.price === price));
      saveGames();
    });

    return card;
  }

  // Вивести всі збережені ігри
  games.forEach(game => {
    const card = createGameCard(game);
    gameGrid.appendChild(card);
  });

  addBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

  createBtn.addEventListener('click', () => {
    const name = document.getElementById('game-name').value.trim();
    const image = document.getElementById('game-image').value.trim();
    const price = document.getElementById('game-price').value.trim();

    if (!name || !image || !price) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    const newGame = { name, image, price };
    games.push(newGame);
    saveGames();

    const card = createGameCard(newGame);
    gameGrid.appendChild(card);

    modal.classList.add('hidden');
    document.getElementById('game-name').value = '';
    document.getElementById('game-image').value = '';
    document.getElementById('game-price').value = '';
  });
});
