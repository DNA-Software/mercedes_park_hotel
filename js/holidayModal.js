document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('holidayModal');
  const closeBtn = document.querySelector('.close-modal-holiday');
  const reserveBtn = document.querySelector('.btn-reserve-holiday');

  // Function to show modal
  function showHolidayModal() {
    if (modal) {
      modal.classList.add('show');
    }
  }

  // Function to hide modal
  function hideHolidayModal() {
    if (modal) {
      modal.classList.remove('show');
    }
  }

  // Show modal on page load with a delay
  setTimeout(() => {
    showHolidayModal();
  }, 1000); // Show after 1 second

  // Close modal when X button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', hideHolidayModal);
  }

  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      hideHolidayModal();
    }
  });

  // Handle reserve button click - scroll to contact section
  if (reserveBtn) {
    reserveBtn.addEventListener('click', function() {
      hideHolidayModal();

      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal && modal.classList.contains('show')) {
      hideHolidayModal();
    }
  });
});
