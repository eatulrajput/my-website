interface FormDataState {
  name: string;
  email: string;
  topic: string;
  message: string;
  company: string;
}

const STEP_TITLES: Record<number, string> = {
  1: 'About you',
  2: 'Topic',
  3: 'Message',
  4: 'Review and send',
};

const RATE_LIMIT_STORAGE_KEY = 'last_contact_submission';
const RATE_LIMIT_SECONDS = 60;

export function setupContactWizard() {
  const wizard = document.getElementById('contact-wizard');
  const form = document.getElementById('contact-wizard-form') as HTMLFormElement | null;
  if (!wizard || !form) return;

  // Prevent multiple bindings
  if (wizard.dataset.wizardInitialized === 'true') return;
  wizard.dataset.wizardInitialized = 'true';

  let currentStep = 1;
  const totalSteps = 4;

  const data: FormDataState = {
    name: '',
    email: '',
    topic: '',
    message: '',
    company: '',
  };

  // Elements
  const progressFill = document.getElementById('wizard-progress-fill');
  const progressSection = document.getElementById('wizard-progress-section');
  const stepLabel = document.getElementById('wizard-step-label');
  const stepPercent = document.getElementById('wizard-step-percent');
  const btnBack = document.getElementById('wizard-btn-back') as HTMLButtonElement | null;
  const btnNext = document.getElementById('wizard-btn-next') as HTMLButtonElement | null;
  const btnSubmit = document.getElementById('wizard-btn-submit') as HTMLButtonElement | null;
  const submitText = document.getElementById('btn-submit-text');
  const submitIcon = document.getElementById('btn-submit-icon');
  const submitSpinner = document.getElementById('btn-submit-spinner');
  const errorBanner = document.getElementById('wizard-error-banner');
  const errorTitle = document.getElementById('wizard-error-title');
  const errorText = document.getElementById('wizard-error-text');
  const successPanel = document.getElementById('wizard-success-panel');
  const successSenderName = document.getElementById('success-sender-name');
  const btnReset = document.getElementById('wizard-btn-reset');
  const srAnnouncements = document.getElementById('wizard-sr-announcements');

  // Input elements
  const inputName = document.getElementById('wizard-name') as HTMLInputElement | null;
  const inputEmail = document.getElementById('wizard-email') as HTMLInputElement | null;
  const inputMessage = document.getElementById('wizard-message') as HTMLTextAreaElement | null;
  const inputCompany = document.getElementById('wizard-company') as HTMLInputElement | null;
  const charCounter = document.getElementById('wizard-char-counter');
  const topicCards = Array.from(document.querySelectorAll<HTMLLabelElement>('.topic-option-card'));

  // Errors
  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorTopic = document.getElementById('error-topic');
  const errorMessage = document.getElementById('error-message');

  // Character counter listener
  inputMessage?.addEventListener('input', () => {
    const len = inputMessage.value.trim().length;
    if (charCounter) {
      charCounter.textContent = `${len} / 20 chars min`;
      if (len >= 20) {
        charCounter.classList.add('text-available');
        charCounter.classList.remove('text-muted');
      } else {
        charCounter.classList.remove('text-available');
        charCounter.classList.add('text-muted');
      }
    }
  });

  // Topic option click / radio changes
  topicCards.forEach((card) => {
    const radio = card.querySelector<HTMLInputElement>('input[type="radio"]');
    if (!radio) return;

    card.addEventListener('click', () => {
      topicCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      radio.checked = true;
      data.topic = radio.value;
      clearError(errorTopic);
    });

    radio.addEventListener('change', () => {
      if (radio.checked) {
        topicCards.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        data.topic = radio.value;
        clearError(errorTopic);
      }
    });
  });

  // Validation functions
  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function showError(el: HTMLElement | null, groupElId?: string) {
    if (el) el.classList.remove('hidden');
    if (groupElId) {
      const grp = document.getElementById(groupElId);
      if (grp) {
        grp.classList.add('shake');
        setTimeout(() => grp.classList.remove('shake'), 350);
      }
    }
  }

  function clearError(el: HTMLElement | null) {
    if (el) el.classList.add('hidden');
  }

  function validateStep(step: number): boolean {
    let isValid = true;

    if (step === 1) {
      const nameVal = inputName?.value.trim() || '';
      const emailVal = inputEmail?.value.trim() || '';

      if (!nameVal) {
        showError(errorName, 'group-name');
        inputName?.setAttribute('aria-invalid', 'true');
        isValid = false;
      } else {
        clearError(errorName);
        inputName?.removeAttribute('aria-invalid');
        data.name = nameVal;
      }

      if (!emailVal || !validateEmail(emailVal)) {
        showError(errorEmail, 'group-email');
        inputEmail?.setAttribute('aria-invalid', 'true');
        isValid = false;
      } else {
        clearError(errorEmail);
        inputEmail?.removeAttribute('aria-invalid');
        data.email = emailVal;
      }
    } else if (step === 2) {
      const selectedRadio = form?.querySelector<HTMLInputElement>('input[name="topic"]:checked');
      if (!selectedRadio) {
        showError(errorTopic);
        isValid = false;
      } else {
        clearError(errorTopic);
        data.topic = selectedRadio.value;
      }
    } else if (step === 3) {
      const msgVal = inputMessage?.value.trim() || '';
      if (msgVal.length < 20) {
        showError(errorMessage, 'group-message');
        inputMessage?.setAttribute('aria-invalid', 'true');
        isValid = false;
      } else {
        clearError(errorMessage);
        inputMessage?.removeAttribute('aria-invalid');
        data.message = msgVal;
      }
      data.company = inputCompany?.value.trim() || '';
    }

    return isValid;
  }

  function populateReviewStep() {
    const revName = document.getElementById('review-name');
    const revEmail = document.getElementById('review-email');
    const revTopic = document.getElementById('review-topic');
    const revCompanyWrapper = document.getElementById('review-company-wrapper');
    const revCompany = document.getElementById('review-company');
    const revMessage = document.getElementById('review-message');

    if (revName) revName.textContent = data.name;
    if (revEmail) revEmail.textContent = data.email;
    if (revTopic) revTopic.textContent = data.topic;

    if (revCompanyWrapper && revCompany) {
      if (data.company) {
        revCompany.textContent = data.company;
        revCompanyWrapper.classList.remove('hidden');
      } else {
        revCompanyWrapper.classList.add('hidden');
      }
    }

    if (revMessage) revMessage.textContent = data.message;
  }

  function updateProgressUI(step: number) {
    const pct = Math.round((step / totalSteps) * 100);

    if (stepLabel) {
      stepLabel.textContent = `Step ${step} of ${totalSteps}: ${STEP_TITLES[step]}`;
    }
    if (stepPercent) {
      stepPercent.textContent = `${pct}%`;
    }
    if (progressFill) {
      progressFill.style.width = `${pct}%`;
    }

    // Step dots
    document.querySelectorAll<HTMLElement>('.step-dot').forEach((dot) => {
      const dotStep = parseInt(dot.getAttribute('data-dot-step') || '0', 10);
      const numSpan = dot.querySelector('.step-num');
      const checkIcon = dot.querySelector('.step-check');

      if (dotStep < step) {
        // Completed step
        dot.classList.add('bg-accent-from', 'text-white', 'border-accent-from');
        dot.classList.remove('bg-bg', 'text-muted', 'border-border');
        numSpan?.classList.add('hidden');
        checkIcon?.classList.remove('hidden');
      } else if (dotStep === step) {
        // Active step
        dot.classList.add('bg-accent-from', 'text-white', 'border-accent-from');
        dot.classList.remove('bg-bg', 'text-muted', 'border-border');
        numSpan?.classList.remove('hidden');
        checkIcon?.classList.add('hidden');
      } else {
        // Inactive future step
        dot.classList.remove('bg-accent-from', 'text-white', 'border-accent-from');
        dot.classList.add('bg-bg', 'text-muted', 'border-border');
        numSpan?.classList.remove('hidden');
        checkIcon?.classList.add('hidden');
      }
    });

    // Button states
    if (btnBack) {
      if (step === 1) {
        btnBack.classList.add('hidden');
      } else {
        btnBack.classList.remove('hidden');
      }
    }

    if (step === totalSteps) {
      btnNext?.classList.add('hidden');
      btnSubmit?.classList.remove('hidden');
    } else {
      btnNext?.classList.remove('hidden');
      btnSubmit?.classList.add('hidden');
    }

    // Screen reader announcement
    if (srAnnouncements) {
      srAnnouncements.textContent = `Navigated to Step ${step} of ${totalSteps}: ${STEP_TITLES[step]}`;
    }
  }

  function goToStep(targetStep: number, direction: 'forward' | 'back') {
    if (targetStep === currentStep) return;

    const currentStepEl = document.getElementById(`step-${currentStep}`);
    const targetStepEl = document.getElementById(`step-${targetStep}`);
    if (!currentStepEl || !targetStepEl) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (targetStep === 4) {
      populateReviewStep();
    }

    if (isReduced) {
      currentStepEl.classList.remove('active');
      currentStepEl.setAttribute('inert', '');
      targetStepEl.classList.add('active');
      targetStepEl.removeAttribute('inert');
      currentStep = targetStep;
      updateProgressUI(currentStep);
      focusFirstField(targetStepEl);
      return;
    }

    // Animated transition
    const outClass = direction === 'forward' ? 'leaving-to-left' : 'leaving-to-right';
    const inClass = direction === 'forward' ? 'entering-from-right' : 'entering-from-left';

    currentStepEl.classList.add(outClass);
    currentStepEl.setAttribute('inert', '');

    setTimeout(() => {
      currentStepEl.classList.remove('active', outClass);

      targetStepEl.classList.add('active', inClass);
      targetStepEl.removeAttribute('inert');

      setTimeout(() => {
        targetStepEl.classList.remove(inClass);
      }, 350);

      currentStep = targetStep;
      updateProgressUI(currentStep);
      focusFirstField(targetStepEl);
    }, 200);
  }

  function focusFirstField(stepEl: HTMLElement) {
    const focusable = stepEl.querySelector<HTMLElement>(
      'input:not([type="hidden"]), textarea, [role="radio"]:checked, label.topic-option-card'
    );
    focusable?.focus();
  }

  // Next Button Click
  btnNext?.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1, 'forward');
      }
    }
  });

  // Back Button Click
  btnBack?.addEventListener('click', () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1, 'back');
    }
  });

  // Jump-to-step Edit buttons on Step 4
  document.querySelectorAll<HTMLButtonElement>('.wizard-edit-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-goto-step') || '1', 10);
      goToStep(target, 'back');
    });
  });

  // Enter key navigation inside inputs (prevents premature submit)
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement && currentStep < totalSteps) {
      e.preventDefault();
      btnNext?.click();
    }
  });

  // Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      goToStep(1, 'back');
      return;
    }

    // Honeypot check
    const botcheck = form.querySelector<HTMLInputElement>('input[name="botcheck"]');
    if (botcheck && botcheck.checked) {
      // Bot detected - simulate silent success without sending
      showSuccessState();
      return;
    }

    // Rate limiting: 1 submission per 60 seconds
    try {
      const lastSubmit = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
      if (lastSubmit) {
        const diffSeconds = (Date.now() - parseInt(lastSubmit, 10)) / 1000;
        if (diffSeconds < RATE_LIMIT_SECONDS) {
          const remaining = Math.ceil(RATE_LIMIT_SECONDS - diffSeconds);
          showSubmissionError(
            'Please wait a moment',
            `You submitted a message recently. Please wait ${remaining} seconds before submitting again, or email me directly.`
          );
          return;
        }
      }
    } catch (err) {
      // storage blocked, continue
    }

    // Set sending state
    setSubmitting(true);
    clearError(errorBanner);

    const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || 'your_web3forms_access_key_here';

    const payload = {
      access_key: accessKey,
      name: data.name,
      email: data.email,
      subject: `Portfolio: ${data.topic} from ${data.name}`,
      message: `${data.message}\n\n---\nTopic: ${data.topic}${data.company ? `\nCompany/Website: ${data.company}` : ''}`,
      from_name: `${data.name} via Portfolio`,
      botcheck: '',
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const json = await res.json();

      if (res.ok && json.success) {
        try {
          localStorage.setItem(RATE_LIMIT_STORAGE_KEY, String(Date.now()));
        } catch (err) {
          // ignore storage error
        }
        showSuccessState();
      } else {
        showSubmissionError(
          'Failed to send message',
          json.message || 'There was an issue processing your request. Please try again or email me directly at hello@atulrajput.dev.'
        );
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      const isTimeout = err?.name === 'AbortError';
      showSubmissionError(
        isTimeout ? 'Request timed out' : 'Network error',
        'Unable to connect to the mail service. Please check your connection or email me directly at hello@atulrajput.dev.'
      );
    } finally {
      setSubmitting(false);
    }
  });

  function setSubmitting(isSending: boolean) {
    if (btnSubmit) {
      btnSubmit.disabled = isSending;
    }
    if (btnBack) {
      btnBack.disabled = isSending;
    }

    if (isSending) {
      submitText?.classList.add('opacity-0');
      submitIcon?.classList.add('hidden');
      submitSpinner?.classList.remove('hidden');
    } else {
      submitText?.classList.remove('opacity-0');
      submitIcon?.classList.remove('hidden');
      submitSpinner?.classList.add('hidden');
    }
  }

  function showSubmissionError(title: string, desc: string) {
    if (errorBanner) {
      errorBanner.classList.remove('hidden');
      if (errorTitle) errorTitle.textContent = title;
      if (errorText) errorText.textContent = desc;
      errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function showSuccessState() {
    form.classList.add('hidden');
    progressSection?.classList.add('hidden');

    if (successSenderName) {
      successSenderName.textContent = data.name || 'there';
    }

    if (successPanel) {
      successPanel.classList.remove('hidden');
      successPanel.focus();
    }
  }

  // Reset button to send another message
  btnReset?.addEventListener('click', () => {
    form.reset();
    data.name = '';
    data.email = '';
    data.topic = '';
    data.message = '';
    data.company = '';

    topicCards.forEach((c) => c.classList.remove('selected'));
    if (charCounter) charCounter.textContent = '0 / 20 chars min';

    clearError(errorBanner);
    clearError(errorName);
    clearError(errorEmail);
    clearError(errorTopic);
    clearError(errorMessage);

    successPanel?.classList.add('hidden');
    form.classList.remove('hidden');
    progressSection?.classList.remove('hidden');

    goToStep(1, 'back');
  });
}

// Auto-initialize when script loads or on astro:page-load
if (typeof window !== 'undefined') {
  setupContactWizard();
  document.addEventListener('astro:page-load', setupContactWizard);
}
