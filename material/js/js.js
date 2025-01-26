document.addEventListener('DOMContentLoaded', () => {
  // Initialize balance from localStorage or default to 0
  let balance = parseInt(localStorage.getItem('balance')) || 0;

  /**
   * Complete a task, add the reward to the balance, and open the task URL.
   * @param {number} reward - The reward for completing the task.
   * @param {string} taskUrl - The URL to redirect the user to after completing the task.
   */
  function completeTask(reward, taskUrl) {
      // Check if the task has already been completed
      if (localStorage.getItem(taskUrl) === 'true') {
          alert('You have already completed this task.');
          return;
      }

      // Update the balance
      balance += reward;
      updateBalance();

      // Mark the task as completed
      localStorage.setItem(taskUrl, 'true');
      localStorage.setItem('balance', balance);

      // Open the task URL in a new tab
      window.open(taskUrl, '_blank');
  }

  /**
   * Update the balance display on the page.
   */
  function updateBalance() {
      const balanceElement = document.getElementById('balance');
      if (balanceElement) {
          balanceElement.textContent = balance;
      } else {
          console.error('Balance element not found in the DOM.');
      }
  }

  // Initial balance update on page load
  updateBalance();

  // Expose completeTask function globally for use in HTML buttons
  window.completeTask = completeTask;
});
