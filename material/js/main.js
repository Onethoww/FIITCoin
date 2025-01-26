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
  
    let coins = localStorage.getItem('coins') || '0';
    let total = localStorage.getItem('total') || '500';
    let power = localStorage.getItem('power') || '500';
    let count = localStorage.getItem('count') || '1';
  
    localStorage.setItem('coins', coins);
    localStorage.setItem('total', total);
    localStorage.setItem('power', power);
    localStorage.setItem('count', count);
  
    h1.textContent = Number(coins).toLocaleString();
    totalElement.textContent = `/${total}`;
    powerElement.textContent = power;
  
    image.addEventListener('click', (e) => {
      let powerValue = Number(localStorage.getItem('power'));
  
      if (powerValue > 0) {
        localStorage.setItem('coins', `${Number(coins) + 1}`);
        coins = localStorage.getItem('coins');
        h1.textContent = Number(coins).toLocaleString();
  
        localStorage.setItem('power', `${powerValue - 1}`);
        powerElement.textContent = `${powerValue - 1}`;
        progressElement.style.width = `${(100 * (powerValue - 1)) / total}%`;
      }
    });
  
    setInterval(() => {
      let powerValue = Number(localStorage.getItem('power'));
      let countValue = Number(localStorage.getItem('count'));
  
      if (powerValue < total) {
        localStorage.setItem('power', `${powerValue + countValue}`);
        powerElement.textContent = `${powerValue + countValue}`;
        progressElement.style.width = `${(100 * (powerValue + countValue)) / total}%`;
      }
    }, 1000);
  });
  