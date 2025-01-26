document.addEventListener('DOMContentLoaded', () => {
  const copyButton = document.getElementById('copyButton');
  const linkInput = document.getElementById('link');

  // Check if elements exist
  if (!copyButton || !linkInput) {
      console.error('Required DOM elements (#copyButton or #link) are missing.');
      return;
  }

  copyButton.addEventListener('click', () => {
      linkInput.select();
      linkInput.setSelectionRange(0, 99999); // For mobile devices

      try {
          document.execCommand('copy');
          alert('Link copied to clipboard!');
      } catch (error) {
          console.error('Failed to copy link:', error);
          alert('Failed to copy the link. Please try manually.');
      }
  });
});
