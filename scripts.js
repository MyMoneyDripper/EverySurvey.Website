// Tailwind configuration
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#4f46e5',
          green: '#10b981',
          orange: '#f59e0b'
        }
      }
    },
  },
};

let surveyData = [];


// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  
  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // Check for dark mode preference
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Set up search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', renderCards);
  }

  // Fetch and render survey data
  console.log('Fetching data from data.json...');
  fetch('data.json')
    .then(response => {
      console.log('Response received:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Data loaded successfully, items:', data.length);
      surveyData = data;
      renderCards();
    })
    .catch(error => {
      console.error('Error loading data:', error);
      // Show error message in the UI
      const cardContainer = document.getElementById('cardContainer');
      if (cardContainer) {
        cardContainer.innerHTML = `
          <div class="col-span-full flex flex-col items-center justify-center py-12">
            <div class="text-red-500 dark:text-red-400 text-center">
              <i class="fas fa-exclamation-triangle text-4xl mb-3"></i>
              <p>Error loading data. Please try again later.</p>
              <p class="text-sm mt-2">${error.message}</p>
            </div>
          </div>
        `;
      }
    });

  // About Us Modal functionality
  const aboutUsBtn = document.getElementById('aboutUs');
  const aboutUsModal = document.getElementById('aboutUsModal');
  const closeAboutUs = document.getElementById('closeAboutUs');

  if (aboutUsBtn && aboutUsModal && closeAboutUs) {
    aboutUsBtn.addEventListener('click', () => {
      aboutUsModal.classList.remove('hidden');
    });
    closeAboutUs.addEventListener('click', () => {
      aboutUsModal.classList.add('hidden');
    });
    // Optional: Close modal on background click
    aboutUsModal.addEventListener('click', (e) => {
      if (e.target === aboutUsModal) {
        aboutUsModal.classList.add('hidden');
      }
    });
  }
});

function renderCards() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const cardContainer = document.getElementById('cardContainer');
  
  if (!cardContainer) return;
  
  // Clear the container including the loading state
  cardContainer.innerHTML = '';

  const filteredData = surveyData.filter(item => 
    item['Website Name'].toLowerCase().includes(searchTerm)
  );
  console.log(filteredData);
  for(let i = 0; i < filteredData.length; i++){ 
    let count = 0;
    let sum = 0;
  
    const trustpilot = parseFloat(filteredData[i]["Trustpilot Ratings"]);
    if (!isNaN(trustpilot)) {
      sum += trustpilot;
      count += 1;
    }
  
    const appStore = parseFloat(filteredData[i]["App Store Ratings"]);
    if (!isNaN(appStore)) {
      sum += appStore;
      count += 1;
    }
  
    const googlePlay = parseFloat(filteredData[i]["Google Play Ratings"]);
    if (!isNaN(googlePlay)) {
      sum += googlePlay;
      count += 1;
    }
  
    filteredData[i]["priorityNumber"] = count > 0 ? (sum / count) : 0;
  }
  

  // Sort based on priorityNumber in descending order
  // First, sort by explicit priority if available
  filteredData.sort((a, b) => {
    if (a.Priority && b.Priority) {
      return a.Priority - b.Priority; // Sort by priority if both have it
    } else if (a.Priority) {
      return -1; // a has priority, so it comes first
    } else if (b.Priority) {
      return 1; // b has priority, so it comes first
    } else {
      return b.priorityNumber - a.priorityNumber; // Otherwise, sort by priorityNumber
    }
  });

  // Show no results message if no data matches
  if (filteredData.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'col-span-full flex flex-col items-center justify-center py-12';
    noResults.innerHTML = `
      <div class="text-gray-500 dark:text-gray-400 text-center">
        <i class="fas fa-search text-4xl mb-3 text-gray-400 dark:text-gray-600"></i>
        <p>No survey websites found matching "${searchTerm}"</p>
      </div>
    `;
    cardContainer.appendChild(noResults);
    return;
  }

  filteredData.forEach(item => {
    // Create card container with flip functionality
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    
    // Create the card with front and back sides
    const card = document.createElement('div');
    card.className = 'card relative';
    
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-200 dark:border-slate-700 hover:shadow-xl';
    
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-200 dark:border-slate-700 hover:shadow-xl';
    
    // Get ratings, handle "Not listed" cases
    const trustpilot = item['Trustpilot Ratings'] !== 'Not listed' ? item['Trustpilot Ratings'] : '-';
    const appStore = item['App Store Ratings'] !== 'Not listed' ? item['App Store Ratings'] : '-';
    const googlePlay = item['Google Play Ratings'] !== 'Not listed' ? item['Google Play Ratings'] : '-';

    // Calculate average pay for display
    const minPay = item['Average Pay Per Survey']?.['Min'] || 'Varies';
    const maxPay = item['Average Pay Per Survey']?.['Max'] || 'Varies';
    
    // Min payout value
    const minPayout = item['Minimum Payout']?.['PayPal'] || 
                      item['Minimum Payout']?.['Gift Cards'] || 
                      item['Minimum Payout']?.['Bank Transfer'] || 
                      item['Minimum Payout']?.['Other'] || 
                      'Varies';

    // Populate front of card with the new design
    cardFront.innerHTML = `
      <!-- Top section with name and ratings -->
      <div class="site-header bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-gray-200 dark:border-slate-700 rounded-t-lg p-3 mb-3">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">${item['Website Name']}</h2>
          <div class="ratings flex space-x-4">
            <div class="flex items-center" title="Trustpilot rating">
              <i class="fas fa-star text-green-500 mr-1"></i>
              <span class="font-semibold text-gray-800 dark:text-white">${trustpilot}</span>
            </div>
            <div class="flex items-center" title="App Store rating">
              <i class="fab fa-apple text-gray-800 dark:text-white mr-1"></i>
              <span class="font-semibold text-gray-800 dark:text-white">${appStore}</span>
            </div>
            <div class="flex items-center" title="Google Play rating">
              <i class="fab fa-google-play text-blue-500 mr-1"></i>
              <span class="font-semibold text-gray-800 dark:text-white">${googlePlay}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment info boxes -->
      <div class="payment-info grid grid-cols-2 gap-3 px-4 mb-3">
        <div class="min-payout bg-indigo-50 dark:bg-indigo-900/50 rounded-lg p-3 text-center">
          <div class="text-xs text-gray-800 dark:text-gray-200 font-medium mb-1">Min. Payout</div>
          <div class="font-bold flex items-center justify-center text-gray-800 dark:text-white">
            <i class="fas fa-coins text-amber-500 mr-2"></i>
            <span>${minPayout}</span>
          </div>
        </div>
        <div class="avg-pay bg-emerald-50 dark:bg-emerald-900/50 rounded-lg p-3 text-center">
          <div class="text-xs text-gray-800 dark:text-gray-200 font-medium mb-1">Pay Per Survey</div>
          <div class="font-bold flex items-center justify-center text-gray-800 dark:text-white">
            <i class="fas fa-sack-dollar text-emerald-500 mr-2"></i>
            <span>${minPay} - ${maxPay}</span>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="action-buttons ${item['Review'] && item['Review'] !== 'null' ? 'grid grid-cols-3 gap-2' : 'flex justify-between'} px-4 pb-1 pt-0">
        <a href="${item['Website URL']}" target="_blank" class="signup-btn bg-gradient-to-r from-brand-blue to-blue-500 text-white hover:from-brand-blue hover:to-blue-600 py-2 rounded-lg text-center font-bold transition-colors shadow-md ${item['Review'] && item['Review'] !== 'null' ? '' : 'flex-1 mr-2'}">
          <i class="fas fa-user-plus mr-1"></i> SIGN UP
        </a>
        
        <button class="details-btn bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700 py-2 rounded-lg text-center font-bold transition-colors ${item['Review'] && item['Review'] !== 'null' ? '' : 'flex-1 ml-2'}">
          <i class="fas fa-info-circle mr-1"></i> DETAILS
        </button>
        
        ${item['Review'] && item['Review'] !== 'null' ? 
          `<a href="${item['Review']}" class="review-btn bg-gradient-to-r from-brand-orange to-yellow-500 text-white hover:from-brand-orange hover:to-yellow-600 py-2 rounded-lg text-center font-bold transition-colors shadow-md">
            <i class="fas fa-star-half-alt mr-1"></i> REVIEW
          </a>` : 
          ''}
      </div>
    `;
    
    // Populate back of card
    cardBack.innerHTML = `
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">${item['Website Name']} Details</h2>
          <button class="back-btn p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <i class="fas fa-times text-gray-500"></i>
          </button>
        </div>

        <div class="grid gap-2 text-sm">
          <div class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">Registration Requirements</h3>
            <ul class="list-disc list-inside">
              <li>Age: ${item['Registration Requirements']?.['Age'] || 'Not specified'}</li>
              <li>Region: ${item['Registration Requirements']?.['Region'] || 'Not specified'}</li>
              <li>Verification: ${Array.isArray(item['Registration Requirements']?.['Verification']) ? 
                item['Registration Requirements']?.['Verification'].join(', ') : 
                (item['Registration Requirements']?.['Verification'] || 'Not specified')}</li>
            </ul>
          </div>

          <div class="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">Payment Methods</h3>
            <div class="flex flex-wrap gap-2">
              ${Array.isArray(item['Payment Methods']) ? 
                item['Payment Methods'].map(method => `
                  <span class="payment-method inline-flex items-center rounded-full bg-white dark:bg-gray-800 px-2.5 py-0.5 text-xs border border-gray-300 dark:border-gray-600">
                    <i class="mr-1 ${
                      method === 'PayPal' ? 'fab fa-paypal text-blue-500' : 
                      method === 'Gift Cards' ? 'fas fa-gift text-red-500' : 
                      method === 'Crypto' ? 'fab fa-bitcoin text-orange-500' : 
                      method === 'Bank Transfer' ? 'fas fa-university text-green-700' : 
                      'fas fa-money-bill-wave text-green-500'
                    }"></i>
                    ${method}
                  </span>
                `).join('') : 
                'Not specified'}
            </div>
          </div>

          <div class="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-lg">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">Survey Frequency</h3>
            <div class="flex items-center">
              <i class="fas fa-calendar-alt text-emerald-600 dark:text-emerald-400 mr-2"></i>
              <span>${item['Survey Frequency'] || 'Not specified'}</span>
            </div>
          </div>

          ${item['Referral Program']?.['Earnings'] ? `
            <div class="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg">
              <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">Referral Program</h3>
              <div class="flex items-center">
                <i class="fas fa-user-friends text-amber-600 dark:text-amber-400 mr-2"></i>
                <span>${item['Referral Program']['Earnings']}</span>
              </div>
            </div>
          ` : ''}

          ${item['Special Features']?.['Others']?.length > 0 ? `
            <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
              <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">Special Features</h3>
              <div class="flex flex-wrap gap-2">
                ${Array.isArray(item['Special Features']['Others']) ? 
                  item['Special Features']['Others'].map(feature => `
                    <span class="feature inline-flex items-center rounded-full bg-white dark:bg-gray-800 px-2.5 py-0.5 text-xs border border-gray-300 dark:border-gray-600">
                      <i class="fas fa-check-circle text-purple-500 mr-1"></i>
                      ${feature}
                    </span>
                  `).join('') : 
                  'None'}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="mt-3">
          <a href="${item['Website URL']}" target="_blank" class="block w-full bg-gradient-to-r from-brand-blue to-blue-500 text-white hover:from-brand-blue hover:to-blue-600 py-2 rounded-lg text-center font-bold transition-colors shadow-md">
            <i class="fas fa-external-link-alt mr-2"></i>VISIT WEBSITE
          </a>
        </div>
      </div>
    `;

    // Add card elements to DOM
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    cardContainer.appendChild(card);
    
    // Add event listeners for details button
    cardContainer.querySelector('.details-btn').addEventListener('click', () => {
      cardFront.classList.add('flipped');
      cardBack.classList.add('flipped');
      cardContainer.classList.add('flipped');
    });
    
    // Add event listener for back button
    if (cardContainer.querySelector('.back-btn')) {
      cardContainer.querySelector('.back-btn').addEventListener('click', () => {
        cardFront.classList.remove('flipped');
        cardBack.classList.remove('flipped');
        cardContainer.classList.remove('flipped');
      });
    }
    
    // For Sign Up button, create a redirect
    const signupBtn = cardContainer.querySelector('.signup-btn');
    if (signupBtn) {
      signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = e.currentTarget.getAttribute('href');
        const encodedUrl = btoa(targetUrl);
        window.location.href = `redirect.html?go=${encodedUrl}`;
      });
    }
    
    // Add the card container to the main container
    document.getElementById('cardContainer').appendChild(cardContainer);
  });
}

// For backward compatibility - this function is no longer used directly
function cloackLink(websiteName, url) {
  console.log(`Cloaking link for: ${websiteName}`);
  localStorage.setItem('redirectURL', url);
  localStorage.setItem(`lastClicked_${websiteName}`, new Date().toISOString());
  
  // Redirect to the proper URL format
  window.location.href = `redirect.html?go=${btoa(url)}`;
}
