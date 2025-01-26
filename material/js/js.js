document.addEventListener('DOMContentLoaded', () => {
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
        let balance = parseInt(localStorage.getItem('balance'));
        balance += reward;
        localStorage.setItem('balance', balance);
        updateBalance();

        // Mark the task as completed
        localStorage.setItem(taskUrl, 'true');

        // Open the task URL in a new tab
        try {
            window.open(taskUrl, '_blank');
        } catch (error) {
            console.error('Failed to open task URL:', error);
        }
    }

    /**
     * Update the balance display on the page.
     */
    function updateBalance() {
        const balanceElement = document.getElementById('balance');
        if (balanceElement) {
            balanceElement.textContent = localStorage.getItem('balance');
        } else {
            console.error('Balance element not found in the DOM.');
        }
    }

    // Initial balance update on page load
    updateBalance();

    // Expose completeTask function globally for use in HTML buttons
    window.completeTask = completeTask;
});
