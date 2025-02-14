document.getElementById('submit-btn').addEventListener('click', function() {
    const name = document.getElementById('name-input').value;
    if (name) {
        localStorage.setItem('userName', name);
        document.getElementById('input-screen').classList.add('hidden');
        document.getElementById('heart-screen').classList.remove('hidden');
        startFallingHearts();
    }
});

document.getElementById('stop-btn').addEventListener('click', function() {
    clearInterval(heartInterval);
    document.getElementById('heart-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
    const userName = localStorage.getItem('userName');
    document.getElementById('user-name').innerText = userName;
});

let heartInterval; // Интервал для создания сердечек

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = '❤️';
    
    // Настраиваем случайное положение по оси X
    heart.style.left = Math.random() * 100 + 'vw'; // Случайная позиция X
    heart.style.top = (Math.random(0) * 20) + 'px'; // Случайное смещение сверху

    // Добавляем сердце в контейнер
    document.getElementById('hearts-container').appendChild(heart);

    // Анимация падения
    heart.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(100vh)' }
    ], {
        duration: Math.random() * 1000 + 2000, // случайная длительность
        easing: 'linear',
        fill: 'forwards'
    });

    // Удаляем сердце после завершения анимации
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

function startFallingHearts() {
    heartInterval = setInterval(createHeart, 200); // Создаём новые сердечки каждые 200 мс
}
