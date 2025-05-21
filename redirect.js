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
    
    // Display the target URL
    document.getElementById('targetUrl').textContent = targetUrl;
    
    // Set up countdown
    let countdown = 3;
    const countdownEl = document.getElementById('countdown');
    const countdownTextEl = document.getElementById('countdownText');
    
    const timer = setInterval(() => {
      countdown--;
      countdownEl.textContent = countdown;
      countdownTextEl.textContent = countdown;
      
      if (countdown <= 0) {
        clearInterval(timer);
        window.location.href = targetUrl;
      }
    }, 1000);
    
    // Set up button actions
    document.getElementById('proceedBtn').addEventListener('click', () => {
      clearInterval(timer);
      window.location.href = targetUrl;
    });
    
    document.getElementById('cancelBtn').addEventListener('click', () => {
      clearInterval(timer);
      window.location.href = 'index.html';
    });
  } catch (e) {
    console.error('Error decoding URL', e);
    window.location.href = 'index.html';
  }
});
