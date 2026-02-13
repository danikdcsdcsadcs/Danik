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
    document.getElementById('hearts-container').innerHTML = '';
    switchScreen('heart-screen', 'final-screen');
    const userName = localStorage.getItem('userName') || 'друг';
    document.getElementById('user-name').textContent = userName;
});

function switchScreen(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
}

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
    
    // Случайное положение по горизонтали
    item.style.left = Math.random() * 100 + '%';
    
    // Случайный размер
    const size = 1.5 + Math.random() * 1.5;
    item.style.fontSize = size + 'rem';
    
    // Длительность падения от 4 до 6 секунд
    const duration = 4 + Math.random() * 2;
    item.style.animationDuration = duration + 's';
    
    container.appendChild(item);
    
    // Удаляем элемент после завершения анимации
    item.addEventListener('animationend', function() {
        item.remove();
    });
}

function startFallingItems() {
    document.getElementById('hearts-container').innerHTML = '';
    // Сразу создаём несколько штук для эффекта
    for (let i = 0; i < 20; i++) {
        setTimeout(createFallingItem, i * 100);
    }
    fallInterval = setInterval(createFallingItem, 300);
}

window.addEventListener('load', function() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('name-input').value = savedName;
    }
});
