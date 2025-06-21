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


/**
 * Build <option> list in #countryFilter based on surveyData[].Countries
 */
function populateCountryDropdown() {
  const countrySet = new Set();
  surveyData.forEach(item => {
    if (Array.isArray(item.Countries)) {
      item.Countries.forEach(c => {
        if (c) countrySet.add(c);
      });
    }
  });
  const countryList = Array.from(countrySet).sort((a, b) => a.localeCompare(b));
  const countrySelect = document.getElementById('countryFilter');
  if (!countrySelect) return;
  countryList.forEach(country => {
    const opt = document.createElement('option');
    opt.value = country;
    opt.textContent = country;
    countrySelect.appendChild(opt);
  });
}

/**
 * Build <option> list in #payoutFilter based on surveyData[].Payment Methods
 */
function populatePayoutDropdown() {
  const payoutMethodSet = new Set();
  surveyData.forEach(item => {
    if (Array.isArray(item['Payment Methods'])) {
      item['Payment Methods'].forEach(method => {
        if (method) payoutMethodSet.add(method);
      });
    }
  });
  const payoutMethodList = Array.from(payoutMethodSet).sort();
  const payoutSelect = document.getElementById('payoutFilter');
  if (!payoutSelect) return;
  payoutMethodList.forEach(method => {
    const opt = document.createElement('option');
    opt.value = method;
    opt.textContent = method;
    payoutSelect.appendChild(opt);
  });
}

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

  // Set up country, device, and payout dropdown listeners
  const countryFilter = document.getElementById('countryFilter');
  const deviceFilter = document.getElementById('deviceFilter');
  const payoutFilter = document.getElementById('payoutFilter');
  if (countryFilter) {
    countryFilter.addEventListener('change', renderCards);
  }
  if (deviceFilter) {
    deviceFilter.addEventListener('change', renderCards);
  }
  if (payoutFilter) {
    payoutFilter.addEventListener('change', renderCards);
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
      populateCountryDropdown();   // ← fill <select> with all countries
      populatePayoutDropdown();    // ← fill <select> with all payout methods
      renderCards();               // ← initial render
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

    // About Us section collapse functionality
    const sectionHeaders = aboutUsModal.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('i.fas');

        content.classList.toggle('hidden');
        header.classList.toggle('border-b');
        header.classList.toggle('border-gray-600');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
      });
    });
  }
});

/**
 * Render survey cards based on search input, country, device, and payout filters
 */
function renderCards() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const countrySelect = document.getElementById('countryFilter');
  const selectedCountry = countrySelect ? countrySelect.value : '';
  const deviceSelect = document.getElementById('deviceFilter');
  const selectedDevice = deviceSelect ? deviceSelect.value : '';
  const payoutSelect = document.getElementById('payoutFilter');
  const selectedPayout = payoutSelect ? payoutSelect.value : '';
  const cardContainer = document.getElementById('cardContainer');
  
  if (!cardContainer) return;
  
  // Clear the container including the loading state
  cardContainer.innerHTML = '';
  
  // Filter by name, country, device, and payout
  const filteredData = surveyData.filter(item => {
    const matchesName = item['Website Name']
      .toLowerCase()
      .includes(searchTerm);

    let matchesCountry = true;
    if (selectedCountry) {
      matchesCountry = Array.isArray(item.Countries) &&
                     item.Countries.includes(selectedCountry);
    }

    // Device filter
    let matchesDevice = true;
    if (selectedDevice) {
      const platforms = item['Special Features']?.['Platform'] || [];
      matchesDevice = platforms.some(platform => {
        const normalized = platform.toLowerCase();
        if (selectedDevice === 'PC') {
          return normalized === 'web' || normalized === 'desktop' || normalized === 'pc';
        }
        return normalized === selectedDevice.toLowerCase();
      });
    }

    // Payout method filter
    let matchesPayout = true;
    if (selectedPayout) {
      matchesPayout = Array.isArray(item['Payment Methods']) &&
                      item['Payment Methods'].includes(selectedPayout);
    }

    return matchesName && matchesCountry && matchesDevice && matchesPayout;
  });

  if (filteredData.length === 0) {
    let message = "No survey websites found.";
    if (searchTerm && !selectedCountry) {
      message = `No survey websites found matching your search for "${searchTerm}".`;
    } else if (!searchTerm && selectedCountry) {
      message = `No survey websites available in "${selectedCountry}".`;
    } else if (searchTerm && selectedCountry) {
      message = `No survey websites matching "${searchTerm}" in "${selectedCountry}".`;
    } else if (surveyData.length === 0 && !searchTerm && !selectedCountry) {
      message = "Survey data is currently unavailable. Please check back later or try refining your search if applicable.";
    }
    cardContainer.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-12">
        <div class="text-gray-500 dark:text-gray-400 text-center px-4">
          <i class="fas fa-info-circle text-4xl mb-3"></i>
          <p>${message}</p>
        </div>
      </div>
    `;
    return; 
  }

  // Calculate priority for sorting
  filteredData.forEach(item => {
    let count = 0;
    let sum = 0;
    const trustpilot = parseFloat(item["Trustpilot Ratings"]);
    if (!isNaN(trustpilot)) { sum += trustpilot; count += 1; }
    const appStore = parseFloat(item["App Store Ratings"]);
    if (!isNaN(appStore)) { sum += appStore; count += 1; }
    const googlePlay = parseFloat(item["Google Play Ratings"]);
    if (!isNaN(googlePlay)) { sum += googlePlay; count += 1; }
    item["priorityNumber"] = count > 0 ? (sum / count) : 0;
  });

  // Sort based on priorityNumber and explicit Priority
  filteredData.sort((a, b) => {
    if (a.Priority && b.Priority) return a.Priority - b.Priority;
    if (a.Priority) return -1;
    if (b.Priority) return 1;
    return b.priorityNumber - a.priorityNumber;
  });

  filteredData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card card-container w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden';

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-200 dark:border-slate-700 hover:shadow-xl';
    
    const minPay = item['Average Pay Per Survey']?.['Min'] || 'Varies';
    const maxPay = item['Average Pay Per Survey']?.['Max'] || 'Varies';
    const minPayout = item['Minimum Payout']?.['PayPal'] || 
                      item['Minimum Payout']?.['Gift Cards'] || 
                      item['Minimum Payout']?.['Bank Transfer'] || 
                      item['Minimum Payout']?.['Other'] || 
                      'Varies';

    cardFront.innerHTML = `
      <!-- Top section with name and ratings -->
      <div class="site-header bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-gray-200 dark:border-slate-700 rounded-t-lg p-3 mb-3">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">${item['Website Name']}</h2>
          <div class="ratings flex space-x-4">
            <div class="flex items-center" title="Trustpilot rating">
              <i class="fas fa-star text-green-500 mr-1"></i>
              <span class="font-semibold text-gray-800 dark:text-white">${item['Trustpilot Ratings'] !== 'Not listed' ? item['Trustpilot Ratings'] : '-'}</span>
            </div>
            <div class="flex items-center" title="App Store rating">
              <i class="fab fa-apple text-gray-800 dark:text-white mr-1"></i>
              <span class="font-semibold text-gray-800 dark:text-white">${item['App Store Ratings'] !== 'Not listed' ? item['App Store Ratings'] : '-'}</span>
            </div>
            <div class="flex items-center" title="Google Play rating">
              <i class="fab fa-google-play text-blue-500 mr-1"></i>
              <span class="font-semibold text-gray-800 dark:text-white">${item['Google Play Ratings'] !== 'Not listed' ? item['Google Play Ratings'] : '-'}</span>
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
        <button data-url="${item['Website URL']}" class="signup-btn bg-gradient-to-r from-brand-blue to-blue-500 text-white hover:from-brand-blue hover:to-blue-600 py-2 rounded-lg text-center font-bold transition-colors shadow-md ${item['Review'] && item['Review'] !== 'null' ? '' : 'flex-1 mr-2'}">
          <i class="fas fa-user-plus mr-1"></i> SIGN UP
        </button>
        
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
    
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-200 dark:border-slate-700 hover:shadow-xl';
    
    // RESTORING ORIGINAL COMPLEX HTML for cardBack
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
          <button data-url="${item['Website URL']}" class="signup-btn block w-full bg-gradient-to-r from-brand-blue to-blue-500 text-white hover:from-brand-blue hover:to-blue-600 py-2 rounded-lg text-center font-bold transition-colors shadow-md">
            <i class="fas fa-external-link-alt mr-2"></i>VISIT WEBSITE
          </button>
        </div>
      </div>
    `;

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    const detailsButton = card.querySelector('.details-btn');
    if (detailsButton) {
      detailsButton.addEventListener('click', () => {
        cardFront.classList.add('flipped');
        cardBack.classList.add('flipped');
        card.classList.add('flipped');
        if (window.innerWidth < 640) {
          setTimeout(() => { card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);
        }
      });
    }
    
    const backButton = card.querySelector('.back-btn');
    if (backButton) {
      backButton.addEventListener('click', () => {
        cardFront.classList.remove('flipped');
        cardBack.classList.remove('flipped');
        card.classList.remove('flipped');
      });
    }

    const signupButtons = card.querySelectorAll('.signup-btn');
    signupButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = button.dataset.url;
        if (url) {
          const encodedUrl = btoa(url);
          window.open(`redirect.html?go=${encodedUrl}`, '_blank', 'noopener,noreferrer');
        }
      });
    });

    cardContainer.appendChild(card);
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
