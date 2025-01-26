document.addEventListener('DOMContentLoaded', () => {
    // Check if localStorage has already been initialized
    if (!localStorage.getItem('initialized')) {
        console.log('Initializing localStorage defaults...');

        // Initialize default values if not already set
        localStorage.setItem('balance', localStorage.getItem('balance') || '0');
        localStorage.setItem('coins', localStorage.getItem('coins') || '0');
        localStorage.setItem('total', localStorage.getItem('total') || '500');
        localStorage.setItem('power', localStorage.getItem('power') || '500');

        // Add a flag to prevent reinitialization
        localStorage.setItem('initialized', 'true');
    } else {
        console.log('localStorage already initialized.');
    }
});
