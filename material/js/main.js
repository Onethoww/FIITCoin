document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('h1');
    const totalElement = document.querySelector('#total');
    const powerElement = document.querySelector('#power');
    const progressElement = document.querySelector('.progress');
    const image = document.querySelector('#coin');

    // Safeguard against missing elements
    if (!h1 || !totalElement || !powerElement || !progressElement || !image) {
        console.error('One or more required DOM elements are missing.');
        return;
    }

    function updateDisplay() {
        const coins = parseInt(localStorage.getItem('coins'));
        const total = parseInt(localStorage.getItem('total'));
        const power = parseInt(localStorage.getItem('power'));

        h1.textContent = coins.toLocaleString();
        totalElement.textContent = `/${total}`;
        powerElement.textContent = power;
        progressElement.style.width = `${(100 * power) / total}%`;
    }

    image.addEventListener('click', () => {
        let powerValue = parseInt(localStorage.getItem('power'));
        if (powerValue > 0) {
            const coins = parseInt(localStorage.getItem('coins')) + 1;
            powerValue -= 1;

            localStorage.setItem('coins', coins);
            localStorage.setItem('power', powerValue);

            updateDisplay();
        }
    });

    setInterval(() => {
        let powerValue = parseInt(localStorage.getItem('power'));
        const total = parseInt(localStorage.getItem('total'));
        const count = parseInt(localStorage.getItem('count'));

        if (powerValue < total) {
            powerValue += count;
            if (powerValue > total) powerValue = total;

            localStorage.setItem('power', powerValue);
            updateDisplay();
        }
    }, 1000);

    // Daily reset logic
    const lastResetDate = localStorage.getItem('lastResetDate');
    const today = new Date().toLocaleDateString();

    if (lastResetDate !== today) {
        localStorage.setItem('coins', 0);
        localStorage.setItem('power', parseInt(localStorage.getItem('total')));
        localStorage.setItem('lastResetDate', today);

        updateDisplay();
    }

    updateDisplay();
});
