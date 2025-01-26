const REWARD_INTERVAL = 20 * 60 * 60 * 1000; // 20 hours in milliseconds

/**
 * Check if the reward button can be activated.
 */
function checkRewardEligibility() {
    const lastClaimTime = localStorage.getItem("lastRewardClaimTime");
    const rewardButton = document.getElementById("reward-button");

    if (lastClaimTime) {
        const elapsedTime = Date.now() - parseInt(lastClaimTime, 10);
        if (elapsedTime < REWARD_INTERVAL) {
            const remainingTime = Math.ceil((REWARD_INTERVAL - elapsedTime) / (60 * 60 * 1000));
            rewardButton.disabled = true;
            rewardButton.textContent = `💪 Available in ${remainingTime} hours`;
            return;
        }
    }

    // Enable the button if eligible
    rewardButton.disabled = false;
    rewardButton.textContent = "💪 claim";
}

/**
 * Claim the daily reward.
 * @param {number} reward - The reward amount.
 * @param {string} taskUrl - The URL to redirect after claiming.
 */
function claimDailyReward(reward, taskUrl) {
    const rewardButton = document.getElementById("reward-button");

    // Update the last claim time in localStorage
    localStorage.setItem("lastRewardClaimTime", Date.now());

    // Update the user's balance
    let balance = parseInt(localStorage.getItem("balance")) || 0;
    balance += reward;
    localStorage.setItem("balance", balance);
    document.getElementById("balance").textContent = balance;

    // Disable the button and update text
    rewardButton.disabled = true;
    rewardButton.textContent = "💪 Available in 20 hours";

    // Redirect to the reward page
    window.open(taskUrl, "_blank");
}

// Run on page load
document.addEventListener("DOMContentLoaded", checkRewardEligibility);
