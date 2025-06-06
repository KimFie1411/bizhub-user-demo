document.addEventListener('DOMContentLoaded', () => {
    const sliderImages = document.getElementById('slider-images');
    const images = sliderImages.querySelectorAll('img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationDotsContainer = document.getElementById('pagination-dots');

    let currentIndex = 0;
    let slideInterval; // Variable to hold the interval for auto-slide

    /**
     * Updates the slider to display the image at the given index.
     * Also updates the active pagination dot.
     * @param {number} index - The index of the image to display.
     */
    function showSlide(index) {
        // Calculate the transform value to move the slider
        sliderImages.style.transform = `translateX(${-index * 100}%)`;

        // Update active pagination dot
        const dots = paginationDotsContainer.querySelectorAll('.pagination-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Navigates to the next slide.
     */
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        showSlide(currentIndex);
    }

    /**
     * Navigates to the previous slide.
     */
    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showSlide(currentIndex);
    }

    /**
     * Creates and appends pagination dots based on the number of images.
     */
    function createPaginationDots() {
        images.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            dot.addEventListener('click', () => {
                currentIndex = i;
                showSlide(currentIndex);
                resetAutoSlide(); // Reset auto-slide when a dot is clicked
            });
            paginationDotsContainer.appendChild(dot);
        });
        showSlide(currentIndex); // Initialize the first slide and active dot
    }

    /**
     * Starts the automatic slideshow.
     */
    function startAutoSlide() {
        // Clear any existing interval to prevent multiple intervals running
        clearInterval(slideInterval);
        // Set a new interval to change slides every 3 seconds
        slideInterval = setInterval(nextSlide, 3000);
    }

    /**
     * Resets the automatic slideshow timer.
     * Call this whenever there's a manual interaction (button click, dot click).
     */
    function resetAutoSlide() {
        clearInterval(slideInterval); // Clear the current interval
        startAutoSlide(); // Start a new interval
    }

    // Event Listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide(); // Reset auto-slide on manual navigation
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide(); // Reset auto-slide on manual navigation
    });

    // Initialize pagination dots and start auto-slide
    createPaginationDots();
    startAutoSlide(); // Start the automatic slideshow when the page loads
});

//FILTER CODE
document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const businessCards = document.querySelectorAll('.business-card');

  function filterBusinesses() {
    const query = searchBox.value.toLowerCase();
    const selectedTypes = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    businessCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const type = card.dataset.type.toLowerCase();

      const matchesName = name.includes(query);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(type);

      if (matchesName && matchesType) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  searchBox.addEventListener('input', filterBusinesses);
  checkboxes.forEach(cb => cb.addEventListener('change', filterBusinesses));
  
  
  
  
  // bahagian bagi no result kalau takde business
	  function filterBusinesses() {
	  const query = searchBox.value.toLowerCase();
	  const selectedTypes = Array.from(checkboxes)
		.filter(cb => cb.checked)
		.map(cb => cb.value);

	  let visibleCount = 0;

	  businessCards.forEach(card => {
		const name = card.dataset.name.toLowerCase();
		const type = card.dataset.type.toLowerCase();
		const matchName = name.includes(query);
		const matchType = selectedTypes.length === 0 || selectedTypes.includes(type);

		if (matchName && matchType) {
		  card.style.display = 'block';
		  visibleCount++;
		} else {
		  card.style.display = 'none';
		}
	  });

	  // Show/hide "no results" message
	  const noResults = document.getElementById('noResults');
	  if (visibleCount === 0) {
		noResults.classList.remove('hidden');
	  } else {
		noResults.classList.add('hidden');
	  }
	}
});