document.addEventListener('DOMContentLoaded', () => {
  // Check for dark mode preference
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Parse redirect URL from query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const encodedUrl = urlParams.get('go');
  let targetUrl = '';
  
  try {
    targetUrl = atob(encodedUrl);
    
    // Set up countdown
    let countdown = 3;
    const countdownTextEl = document.getElementById('countdownText');
    
    const timer = setInterval(() => {
      countdown--;
      countdownTextEl.textContent = countdown;
      
      if (countdown <= 0) {
        clearInterval(timer);
        window.location.href = targetUrl;
      }
    }, 1000);
  } catch (e) {
    console.error('Error decoding URL', e);
    window.location.href = 'index.html';
  }
});
