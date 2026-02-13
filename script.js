document.getElementById('submit-btn').addEventListener('click', function() {
    const name = document.getElementById('name-input').value.trim();
    if (name) {
        localStorage.setItem('userName', name);
        switchScreen('input-screen', 'heart-screen');
        startFallingItems();
    } else {
        alert('Пожалуйста, введите имя');
    }
});

document.getElementById('stop-btn').addEventListener('click', function() {
    clearInterval(fallInterval);
    // Очищаем контейнер от падающих элементов
    document.getElementById('hearts-container').innerHTML = '';
    switchScreen('heart-screen', 'final-screen');
    const userName = localStorage.getItem('userName') || 'друг';
    document.getElementById('user-name').textContent = userName;
});

function switchScreen(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
}

// Массив с праздничными стикерами (эмодзи)
const items = [
    '❤️', '🧸', '🌸', '🍫', '🎀', '💖', '💝', '🌹', 
    '💌', '🥰', '😘', '💋', '✨', '🎈', '🍬', '🧁'
];

let fallInterval;

function createFallingItem() {
    const container = document.getElementById('hearts-container');
    const item = document.createElement('div');
    item.className = 'falling-item';
    
    const randomIndex = Math.floor(Math.random() * items.length);
    item.textContent = items[randomIndex];
    
    item.style.left = Math.random() * 100 + '%';
    
    const size = 1.5 + Math.random() * 1.5;
    item.style.fontSize = size + 'rem';
    
    // Длительность падения от 4 до 6 секунд (примерно 5 сек)
    const duration = 4 + Math.random() * 2;
    item.style.animationDuration = duration + 's, 3s'; // fall, sway
    
    container.appendChild(item);
    
    item.addEventListener('animationend', function(e) {
        if (e.animationName === 'fall') {
            item.remove();
        }
    });
}

function startFallingItems() {
    // Очищаем контейнер перед стартом (на случай повторного запуска)
    document.getElementById('hearts-container').innerHTML = '';
    // Создаём несколько элементов сразу для быстрого наполнения
    for (let i = 0; i < 15; i++) {
        setTimeout(createFallingItem, i * 100); // распределяем старт
    }
    // Запускаем регулярное создание
    fallInterval = setInterval(createFallingItem, 300);
}

// Если пользователь уже вводил имя раньше, можно автоматически заполнить поле (опционально)
window.addEventListener('load', function() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('name-input').value = savedName;
    }
});

