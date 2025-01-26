// TON Connect Initialization (No Manifest for Testing)
const tonConnect = new TonConnectSDK.TonConnect(); // Manifest is skipped for testing

// Modal and Button Elements
const openModalBtn = document.getElementById('openModalBtn');
const walletModal = document.getElementById('walletModal');
const closeBtn = document.querySelector('.close-btn');
const connectWalletBtn = document.getElementById('connectWallet');
const cancelWalletBtn = document.getElementById('cancelWallet');
const statusMessage = document.getElementById('statusMessage');

// Open Modal
openModalBtn.addEventListener('click', () => {
    walletModal.style.display = 'flex';
});

// Close Modal
closeBtn.addEventListener('click', () => {
    walletModal.style.display = 'none';
    statusMessage.textContent = '';
});

cancelWalletBtn.addEventListener('click', () => {
    walletModal.style.display = 'none';
    statusMessage.textContent = '';
});

// Close Modal on Outside Click
window.addEventListener('click', (event) => {
    if (event.target === walletModal) {
        walletModal.style.display = 'none';
        statusMessage.textContent = '';
    }
});

// Connect Wallet
connectWalletBtn.addEventListener('click', async () => {
    statusMessage.textContent = 'Connecting to your TON wallet...';

    try {
        // Fetch wallet list
        const wallets = await tonConnect.getWallets();

        // Detect if the app is embedded in a wallet
        const embeddedWallet = wallets.find(wallet => wallet.embedded);

        if (embeddedWallet) {
            // Connect automatically if embedded
            await tonConnect.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey });
            statusMessage.textContent = 'Wallet connected successfully!';
            console.log('Embedded Wallet Address:', tonConnect.wallet.account.address);
        } else {
            // Provide a universal link for connection
            const walletConnectionSource = {
                universalLink: 'https://app.tonkeeper.com/ton-connect',
                bridgeUrl: 'https://bridge.tonapi.io/bridge'
            };
            await tonConnect.connect(walletConnectionSource);
            statusMessage.textContent = 'Wallet connected successfully!';
        }
    } catch (error) {
        console.error('Wallet connection error:', error);
        statusMessage.textContent = 'Oops, try again. Something went wrong!';
    }
});

// Listen for Wallet Status Changes
tonConnect.onStatusChange(walletInfo => {
    if (walletInfo) {
        console.log('Wallet connected:', walletInfo.wallet.address);
        statusMessage.textContent = 'Wallet connected successfully!';
    } else {
        console.log('Wallet disconnected');
        statusMessage.textContent = 'Wallet disconnected.';
    }
});
