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

  let coins = parseInt(localStorage.getItem('coins')) || 0;
  let total = parseInt(localStorage.getItem('total')) || 500;
  let power = parseInt(localStorage.getItem('power')) || 500;
  let count = parseInt(localStorage.getItem('count')) || 1;

  localStorage.setItem('coins', coins);
  localStorage.setItem('total', total);
  localStorage.setItem('power', power);
  localStorage.setItem('count', count);

  h1.textContent = coins.toLocaleString();
  totalElement.textContent = `/${total}`;
  powerElement.textContent = power;
  progressElement.style.width = `${(100 * power) / total}%`;

  image.addEventListener('click', () => {
      let powerValue = parseInt(localStorage.getItem('power'));

      if (powerValue > 0) {
          coins += 1;
          powerValue -= 1;

          localStorage.setItem('coins', coins);
          localStorage.setItem('power', powerValue);

          h1.textContent = coins.toLocaleString();
          powerElement.textContent = powerValue;
          progressElement.style.width = `${(100 * powerValue) / total}%`;
      }
  });

  setInterval(() => {
      let powerValue = parseInt(localStorage.getItem('power'));
      let countValue = parseInt(localStorage.getItem('count'));

      if (powerValue < total) {
          powerValue += countValue;
          if (powerValue > total) powerValue = total;

          localStorage.setItem('power', powerValue);
          powerElement.textContent = powerValue;
          progressElement.style.width = `${(100 * powerValue) / total}%`;
      }
  }, 1000);

  // Daily reset logic
  const lastResetDate = localStorage.getItem('lastResetDate');
  const today = new Date().toLocaleDateString();

  if (lastResetDate !== today) {
      coins = 0;
      power = total;

      localStorage.setItem('coins', coins);
      localStorage.setItem('power', power);
      localStorage.setItem('lastResetDate', today);

      h1.textContent = coins.toLocaleString();
      powerElement.textContent = power;
      progressElement.style.width = '100%';
  }
});
