// Mobile Search JavaScript for Asya Anime

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearButton');
    const searchButton = document.getElementById('searchButton');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    const animeCards = document.querySelectorAll('.anime-card');

    // Only initialize search functionality if search elements exist
    const hasSearchElements = searchInput && clearButton && searchButton;

    // Search functionality
    let searchTimeout;

    function performSearch(query) {
        if (!query.trim()) {
            // If search is empty, redirect to home search page
            window.location.href = '/mobile-search';
            return;
        }

        // Show loading (only if loadingOverlay exists)
        if (loadingOverlay) {
            showLoading();
        }

        // Debounce search requests
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            window.location.href = `/mobile-search?q=${encodeURIComponent(query.trim())}`;
        }, 300);
    }

    function showLoading() {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
    }

    function hideLoading() {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }


    // Clear button handler
    if (clearButton && searchInput) {
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            clearButton.style.display = 'none';
            // Optionally redirect to clear search
            window.location.href = '/mobile-search';
        });
    }

    // Search button handler
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }


    // Suggestion tags
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            searchInput.value = this.textContent;
            performSearch(this.textContent);
        });
    });

    // Anime card interactions
    animeCards.forEach(card => {
        // Touch feedback
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });

        // Click handler
        card.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';

            // Navigate after animation
            setTimeout(() => {
                // Here you would navigate to anime detail page
                // For now, just show an alert
                const titleElement = this.querySelector('.card-title');
                if (titleElement) {
                    alert('Переход к аниме: ' + titleElement.textContent);
                }
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Swipe gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Minimum swipe distance
        const minSwipeDistance = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - go back
                if (window.history.length > 1) {
                    window.history.back();
                }
            }
            // Swipe left could be used for forward navigation
        }
    }

    // Infinite scroll (if needed for large result sets)
    function setupInfiniteScroll() {
        let loading = false;
        const scrollThreshold = 200;

        window.addEventListener('scroll', function() {
            if (loading) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (documentHeight - scrollTop - windowHeight < scrollThreshold) {
                // Load more results
                loading = true;
                loadMoreResults();
            }
        });
    }

    function loadMoreResults() {
        // This would be implemented to load more search results
        // For now, just hide loading after a delay
        setTimeout(() => {
            loading = false;
        }, 1000);
    }

    // Network status detection
    function setupNetworkDetection() {
        window.addEventListener('online', function() {
            // Remove offline indicator if exists
            const offlineIndicator = document.querySelector('.offline-indicator');
            if (offlineIndicator) {
                offlineIndicator.remove();
            }
        });

        window.addEventListener('offline', function() {
            showOfflineIndicator();
        });

        // Check initial status
        if (!navigator.onLine) {
            showOfflineIndicator();
        }
    }

    function showOfflineIndicator() {
        if (document.querySelector('.offline-indicator')) return;

        const indicator = document.createElement('div');
        indicator.className = 'offline-indicator';
        indicator.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #ff6b35;
                color: white;
                text-align: center;
                padding: 8px;
                z-index: 10000;
                font-size: 14px;
            ">
                Нет подключения к интернету
            </div>
        `;
        document.body.appendChild(indicator);
    }

    // Keyboard shortcuts for desktop testing (only if search elements exist)
    document.addEventListener('keydown', function(e) {
        if (searchInput && clearButton) {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }

            // Escape to clear search
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                clearButton.style.display = 'none';
            }
        }
    });

    // Performance optimizations
    function optimizePerformance() {
        // Lazy load images
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                // Handle scroll end
            }, 100);
        });
    }

    // Initialize all features
    function init() {
        // Only hide loading if loadingOverlay exists
        if (loadingOverlay) {
            hideLoading(); // Hide loading on page load
        }

        setupNetworkDetection();

        // Only setup search-specific features if search elements exist
        if (hasSearchElements) {
            setupInfiniteScroll();
        }

        optimizePerformance();

        // Add fade-in animation for results
        const animeGrid = document.getElementById('animeGrid');
        if (animeGrid) {
            animeGrid.style.animation = 'fadeIn 0.3s ease';
        }
    }

    // CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .anime-card {
            animation-fill-mode: both;
        }
    `;
    document.head.appendChild(style);

    // Start the app
    init();
});