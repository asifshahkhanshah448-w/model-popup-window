/**
 * Internship Project 3: Modal / Popup Window
 * JavaScript: script.js
 * 
 * Handles all modal opening/closing mechanics, overlay click detection,
 * keyboard accessibility (Esc key, Focus Trap), and client-side form validation.
 */

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==========================================================================
     1. DOM Element Selectors
     ========================================================================== */
  // Main Contact Modal Elements
  const openModalBtn = document.getElementById("openModalBtn");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContainer = document.getElementById("modalContainer");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelModalBtn = document.getElementById("cancelModalBtn");

  // Form & Success State Elements
  const modalForm = document.getElementById("modalForm");
  const formStateContainer = document.getElementById("formStateContainer");
  const successStateContainer = document.getElementById("successStateContainer");
  const submitFormBtn = document.getElementById("submitFormBtn");
  const sendAnotherBtn = document.getElementById("sendAnotherBtn");
  const successCloseBtn = document.getElementById("successCloseBtn");

  // Form Inputs
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const inquiryTypeSelect = document.getElementById("inquiryType");
  const messageInput = document.getElementById("message");

  // Success summary preview fields
  const summaryName = document.getElementById("summaryName");
  const summaryEmail = document.getElementById("summaryEmail");
  const summaryType = document.getElementById("summaryType");

  // Secondary Quick Modal Elements
  const openQuickModalBtn = document.getElementById("openQuickModalBtn");
  const quickModalOverlay = document.getElementById("quickModalOverlay");
  const quickModalCloseBtn = document.getElementById("quickModalCloseBtn");
  const quickModalCancelBtn = document.getElementById("quickModalCancelBtn");
  const quickModalConfirmBtn = document.getElementById("quickModalConfirmBtn");

  /* ==========================================================================
     2. State Management & Accessibility Tracking
     ========================================================================== */
  let activeModal = null; // Currently open modal overlay element
  let previousActiveElement = null; // Stores element that had focus prior to opening modal
  let isMouseDownOnBackdrop = false; // Prevents closing modal on text drag-release outside

  // Animation duration in milliseconds (aligned with CSS --transition-base)
  const ANIMATION_DURATION = 220;

  // Focusable elements selector string for keyboard trapping
  const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /* ==========================================================================
     3. Modal Core Engine: Open & Close
     ========================================================================== */
  
  /**
   * Opens a modal dialog with smooth animation and accessibility setup
   * @param {HTMLElement} overlayEl - The modal overlay element to open
   * @param {HTMLElement} [initialFocusEl] - Optional specific element to receive focus
   */
  function openModal(overlayEl, initialFocusEl) {
    if (!overlayEl) return;

    // Cache the element that triggered the modal for focus restoration
    previousActiveElement = document.activeElement;
    activeModal = overlayEl;

    // Prevent body background scrolling and calculate scrollbar compensation
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    document.body.classList.add("modal-open");

    // Remove any leftover closing classes
    overlayEl.classList.remove("is-closing");
    overlayEl.setAttribute("aria-hidden", "false");

    // Trigger opening animation via class
    overlayEl.classList.add("is-active");

    // Set focus sensibly
    setTimeout(() => {
      if (initialFocusEl) {
        initialFocusEl.focus();
      } else {
        const firstFocusable = overlayEl.querySelector(FOCUSABLE_SELECTOR);
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
    }, 50);
  }

  /**
   * Closes the active modal dialog with smooth exit animation and focus restoration
   * @param {HTMLElement} overlayEl - The modal overlay element to close
   */
  function closeModal(overlayEl) {
    const targetModal = overlayEl || activeModal;
    if (!targetModal) return;

    // Add closing class to trigger CSS exit animation
    targetModal.classList.add("is-closing");
    targetModal.setAttribute("aria-hidden", "true");

    // Wait for the exit transition to finish before removing active classes
    setTimeout(() => {
      targetModal.classList.remove("is-active");
      targetModal.classList.remove("is-closing");

      // Check if there are other active modals still open
      const remainingOpenModals = document.querySelectorAll(".modal-overlay.is-active");
      if (remainingOpenModals.length === 0) {
        document.body.classList.remove("modal-open");
        document.documentElement.style.removeProperty("--scrollbar-width");
        activeModal = null;
      } else {
        activeModal = remainingOpenModals[remainingOpenModals.length - 1];
      }

      // Return focus to the element that was focused before modal opened
      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }
    }, ANIMATION_DURATION);
  }

  /* ==========================================================================
     4. Focus Trapping & Keyboard Accessibility
     ========================================================================== */
  
  /**
   * Traps the Tab key navigation inside the open modal
   * @param {KeyboardEvent} event
   */
  function handleFocusTrap(event) {
    if (!activeModal || event.key !== "Tab") return;

    const focusableElements = activeModal.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Shift + Tab: moving backwards
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } 
    // Tab: moving forwards
    else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  // Global Keydown Handler: Closes modal on Escape key and manages Tab trapping
  document.addEventListener("keydown", (event) => {
    if (!activeModal) return;

    // Escape Key: Close active modal
    if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault();
      closeModal(activeModal);
      return;
    }

    // Tab Key: Trap focus inside modal
    if (event.key === "Tab") {
      handleFocusTrap(event);
    }
  });

  /* ==========================================================================
     5. Overlay Backdrop Click Detection
     ========================================================================== */
  
  /**
   * Attaches outside-click detection to a modal overlay
   * Distinguishes between pure clicks and drag-selection releases
   * @param {HTMLElement} overlayEl
   */
  function setupBackdropClick(overlayEl) {
    if (!overlayEl) return;

    overlayEl.addEventListener("mousedown", (event) => {
      // Only record true if user initiated click on the overlay backdrop itself
      isMouseDownOnBackdrop = event.target === overlayEl;
    });

    overlayEl.addEventListener("mouseup", (event) => {
      // Only close if both mousedown and mouseup occurred directly on the backdrop
      if (isMouseDownOnBackdrop && event.target === overlayEl) {
        closeModal(overlayEl);
      }
      isMouseDownOnBackdrop = false;
    });
  }

  setupBackdropClick(modalOverlay);
  setupBackdropClick(quickModalOverlay);

  /* ==========================================================================
     6. Form Validation Logic
     ========================================================================== */
  
  /**
   * Displays an error message for a specific input field
   * @param {HTMLElement} inputEl
   * @param {string} message
   */
  function setError(inputEl, message) {
    const formGroup = inputEl.closest(".form-group");
    if (!formGroup) return;

    formGroup.classList.add("has-error");
    inputEl.setAttribute("aria-invalid", "true");

    const errorEl = formGroup.querySelector(".error-message");
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  /**
   * Clears the error state for a specific input field
   * @param {HTMLElement} inputEl
   */
  function clearError(inputEl) {
    const formGroup = inputEl.closest(".form-group");
    if (!formGroup) return;

    formGroup.classList.remove("has-error");
    inputEl.removeAttribute("aria-invalid");
  }

  /**
   * Validates email format using standard RFC 5322 regex
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Validates all form inputs and returns overall validity
   * @returns {boolean}
   */
  function validateForm() {
    let isValid = true;
    let firstInvalidInput = null;

    // 1. Full Name Validation
    const nameVal = fullNameInput.value.trim();
    if (!nameVal) {
      setError(fullNameInput, "Please enter your full name.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = fullNameInput;
    } else if (nameVal.length < 2) {
      setError(fullNameInput, "Full name must be at least 2 characters.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = fullNameInput;
    } else {
      clearError(fullNameInput);
    }

    // 2. Email Validation
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      setError(emailInput, "Please enter your email address.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else if (!isValidEmail(emailVal)) {
      setError(emailInput, "Please enter a valid email address (e.g. name@domain.com).");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else {
      clearError(emailInput);
    }

    // 3. Inquiry Type Validation
    const inquiryVal = inquiryTypeSelect.value;
    if (!inquiryVal) {
      setError(inquiryTypeSelect, "Please select an inquiry category.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = inquiryTypeSelect;
    } else {
      clearError(inquiryTypeSelect);
    }

    // 4. Message Validation
    const messageVal = messageInput.value.trim();
    if (!messageVal) {
      setError(messageInput, "Please write a brief message.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = messageInput;
    } else if (messageVal.length < 10) {
      setError(messageInput, `Message is too short (${messageVal.length}/10 min characters).`);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = messageInput;
    } else {
      clearError(messageInput);
    }

    // Focus first invalid element for optimal user experience
    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }

    return isValid;
  }

  // Real-time error clearing when user types or changes an input
  [fullNameInput, emailInput, inquiryTypeSelect, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => clearError(input));
    input.addEventListener("change", () => clearError(input));
  });

  /* ==========================================================================
     7. Form Submission & Success State Handling
     ========================================================================== */
  
  if (modalForm) {
    modalForm.addEventListener("submit", (event) => {
      // Prevent standard browser page reload
      event.preventDefault();

      // Validate inputs
      const isFormValid = validateForm();
      if (!isFormValid) return;

      // Show temporary submitting feedback on the button
      const originalBtnText = submitFormBtn.innerHTML;
      submitFormBtn.disabled = true;
      submitFormBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Sending...
      `;

      // Simulate a fast, professional response (350ms)
      setTimeout(() => {
        // Populate summary box in success state
        if (summaryName) summaryName.textContent = fullNameInput.value.trim();
        if (summaryEmail) summaryEmail.textContent = emailInput.value.trim();
        if (summaryType) summaryType.textContent = inquiryTypeSelect.options[inquiryTypeSelect.selectedIndex].text;

        // Switch to success view
        formStateContainer.style.display = "none";
        successStateContainer.classList.add("is-visible");

        // Restore button state
        submitFormBtn.disabled = false;
        submitFormBtn.innerHTML = originalBtnText;

        // Move focus to success primary action for keyboard accessibility
        if (sendAnotherBtn) {
          sendAnotherBtn.focus();
        }
      }, 350);
    });
  }

  /**
   * Resets form to initial pristine state
   */
  function resetFormState() {
    if (!modalForm) return;
    modalForm.reset();

    // Clear all error classes and labels
    [fullNameInput, emailInput, inquiryTypeSelect, messageInput].forEach((input) => {
      if (input) clearError(input);
    });

    // Toggle back to form view
    if (formStateContainer && successStateContainer) {
      successStateContainer.classList.remove("is-visible");
      formStateContainer.style.display = "block";
    }
  }

  // "Send Another Message" button handler
  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener("click", () => {
      resetFormState();
      fullNameInput.focus();
    });
  }

  // Success view "Close Modal" button handler
  if (successCloseBtn) {
    successCloseBtn.addEventListener("click", () => {
      closeModal(modalOverlay);
      setTimeout(resetFormState, ANIMATION_DURATION);
    });
  }

  /* ==========================================================================
     8. Event Listeners Connection
     ========================================================================== */
  
  // Open Contact Modal button
  if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
      openModal(modalOverlay, fullNameInput);
    });
  }

  // Close X button inside Contact Modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      closeModal(modalOverlay);
    });
  }

  // Cancel button inside Contact Modal footer
  if (cancelModalBtn) {
    cancelModalBtn.addEventListener("click", () => {
      closeModal(modalOverlay);
    });
  }

  // Secondary Quick Modal: Open, Close, and Actions
  if (openQuickModalBtn && quickModalOverlay) {
    openQuickModalBtn.addEventListener("click", () => {
      openModal(quickModalOverlay, quickModalConfirmBtn);
    });
  }

  if (quickModalCloseBtn) {
    quickModalCloseBtn.addEventListener("click", () => {
      closeModal(quickModalOverlay);
    });
  }

  if (quickModalCancelBtn) {
    quickModalCancelBtn.addEventListener("click", () => {
      closeModal(quickModalOverlay);
    });
  }

  if (quickModalConfirmBtn) {
    quickModalConfirmBtn.addEventListener("click", () => {
      alert("Action confirmed successfully! The quick modal will now close.");
      closeModal(quickModalOverlay);
    });
  }

  // Add subtle dynamic keyframe for button spinner if not in CSS
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  console.log("Modal / Popup Window Engine initialized successfully.");
});
