/**
 * Phenom Consultants - Main Application Interactive Logic
 * Features: Navigation, Funnel, Destination Filter & Modals, FAQ, Leads
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initDestinationFilter();
  initDestinationModals();
  initEligibilityFunnel();
  initFaqAccordion();
  initModals();
  initQuickAssessForm();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // Logo fallback handler
  const brandLogos = document.querySelectorAll('.brand-logo-img');
  brandLogos.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const fallback = this.nextElementSibling;
      if (fallback && fallback.classList.contains('brand-fallback')) {
        fallback.style.display = 'flex';
      }
    });
  });
}

/* ==========================================================================
   2. DESTINATIONS FILTERING & MODAL DATA
   ========================================================================== */
const destinationDetails = {
  uk: {
    country: 'United Kingdom',
    flag: '🇬🇧',
    heroTag: 'Fast-Track High Value Degree',
    intakes: 'September 2026 (Major) & January 2027',
    cost: '£12,000 – £22,000 / year (Undergrad & Postgrad)',
    livingCost: '£9,207 – £12,006 / year (Outside/Inside London)',
    psw: '2 Years Graduate Route (3 Years for PhD)',
    ielts: 'Undergraduate: 6.0 (Min 5.5) | Masters: 6.5 (Min 6.0) | MOI accepted in partner unis',
    scholarships: 'Up to £2,000 – £8,000 Merit-based automatic reductions & Vice-Chancellor awards',
    topUnis: [
      'University of Leeds', 'University of Manchester', 'Coventry University', 
      'University of Hertfordshire', 'Queen Mary University of London', 'University of Greenwich'
    ],
    visaRequirement: 'CAS statement, 28-day mature bank balance (£12k-£22k depending on location), TB test, Clean SOP.'
  },
  usa: {
    country: 'United States',
    flag: '🇺🇸',
    heroTag: 'Highest STEM Salaries & Massive Scholarships',
    intakes: 'Fall (August) & Spring (January)',
    cost: '$18,000 – $38,000 / year (Merit scholarships available)',
    livingCost: '$10,000 – $15,000 / year',
    psw: 'Up to 3 Years STEM OPT (1 Year for non-STEM majors)',
    ielts: 'IELTS 6.0-6.5, Duolingo 105+, PTE 53+, or TOEFL 75+',
    scholarships: 'Up to $5,000 – $25,000 per year renewable scholarships for high GPA students',
    topUnis: [
      'Arizona State University', 'Pace University (New York)', 'University of South Florida',
      'Northeastern University', 'George Mason University', 'SUNY Buffalo'
    ],
    visaRequirement: 'I-20 Form, DS-160, SEVIS Fee payment, Strong academic credentials & Confident F-1 Embassy Interview prep.'
  },
  australia: {
    country: 'Australia',
    flag: '🇦🇺',
    heroTag: 'PR Pathways & World-Class Quality of Life',
    intakes: 'February / March (Main) & July / November',
    cost: 'AUD $24,000 – $38,000 / year',
    livingCost: 'AUD $29,710 / year (Official DOHA guideline)',
    psw: '2 to 4 Years Post-Study Work Stream (Extended in regional areas)',
    ielts: 'IELTS 6.0 - 6.5 or PTE Academic 50-58',
    scholarships: '15% to 30% tuition fee reduction based on previous academic merit',
    topUnis: [
      'University of Sydney', 'UNSW Sydney', 'Monash University',
      'Deakin University', 'University of Wollongong', 'Curtin University'
    ],
    visaRequirement: 'eCoE, Genuine Student (GS) assessment, genuine fund proof (1-year tuition + living costs + travel).'
  }
};

function initDestinationFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const destCards = document.querySelectorAll('.destination-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      destCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-country') === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initDestinationModals() {
  const destModal = document.getElementById('destModal');
  const openModalBtns = document.querySelectorAll('.btn-view-dest');
  const closeBtn = document.getElementById('destModalClose');

  if (!destModal) return;

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const countryKey = btn.getAttribute('data-dest');
      const data = destinationDetails[countryKey];
      if (!data) return;

      document.getElementById('destModalTitle').innerHTML = `${data.flag} Study in ${data.country}`;
      document.getElementById('destModalBadge').textContent = data.heroTag;
      document.getElementById('destModalIntakes').textContent = data.intakes;
      document.getElementById('destModalCost').textContent = data.cost;
      document.getElementById('destModalLiving').textContent = data.livingCost;
      document.getElementById('destModalPsw').textContent = data.psw;
      document.getElementById('destModalIelts').textContent = data.ielts;
      document.getElementById('destModalScholarship').textContent = data.scholarships;
      document.getElementById('destModalVisa').textContent = data.visaRequirement;

      const uniListEl = document.getElementById('destModalUnis');
      uniListEl.innerHTML = '';
      data.topUnis.forEach(uni => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${uni}`;
        uniListEl.appendChild(li);
      });

      // Update CTA inside modal
      const modalApplyBtn = document.getElementById('destModalApplyBtn');
      if (modalApplyBtn) {
        modalApplyBtn.onclick = () => {
          destModal.classList.remove('open');
          openConsultationModal(`Interested in studying in ${data.country}`);
        };
      }

      destModal.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      destModal.classList.remove('open');
    });
  }

  destModal.addEventListener('click', (e) => {
    if (e.target === destModal) {
      destModal.classList.remove('open');
    }
  });
}

/* ==========================================================================
   3. INTERACTIVE ELIGIBILITY CHECKER (MULTI-STEP FUNNEL)
   ========================================================================== */
function initEligibilityFunnel() {
  let currentStep = 1;
  const totalSteps = 4;

  const funnelSteps = document.querySelectorAll('.funnel-step');
  const progressNodes = document.querySelectorAll('.progress-step-node');
  const progressFill = document.querySelector('.funnel-progress-fill');

  const btnNext = document.getElementById('funnelNextBtn');
  const btnPrev = document.getElementById('funnelPrevBtn');

  // Lead Data Object
  const leadData = {
    destination: 'UK',
    qualification: 'Bachelor Degree',
    cgpa: '3.4',
    englishTest: 'IELTS',
    englishScore: '6.5',
    intake: 'Sept 2026',
    name: '',
    phone: '',
    email: '',
    city: 'Dhaka'
  };

  // Step 1: Destination Selection Cards
  const countryOptions = document.querySelectorAll('.opt-country');
  countryOptions.forEach(card => {
    card.addEventListener('click', () => {
      countryOptions.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      leadData.destination = card.getAttribute('data-value');
    });
  });

  function updateFunnelStep(step) {
    funnelSteps.forEach(s => s.classList.remove('active'));
    document.getElementById(`funnelStep${step}`).classList.add('active');

    // Update progress nodes
    progressNodes.forEach((node, index) => {
      const nodeStep = index + 1;
      node.classList.remove('active', 'completed');
      if (nodeStep === step) {
        node.classList.add('active');
      } else if (nodeStep < step) {
        node.classList.add('completed');
      }
    });

    // Update progress line
    const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;
    if (progressFill) {
      progressFill.style.width = `${Math.max(25, progressPercent)}%`;
    }

    // Toggle Back button
    if (btnPrev) {
      btnPrev.style.display = step > 1 && step < 4 ? 'inline-flex' : 'none';
    }

    // Change Next button text
    if (btnNext) {
      if (step === 3) {
        btnNext.innerHTML = 'Calculate Eligibility <i class="fa-solid fa-wand-magic-sparkles"></i>';
      } else if (step === 4) {
        btnNext.style.display = 'none';
        if (btnPrev) btnPrev.style.display = 'none';
      } else {
        btnNext.innerHTML = 'Continue <i class="fa-solid fa-arrow-right"></i>';
        btnNext.style.display = 'inline-flex';
      }
    }
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      // Validate current step
      if (currentStep === 1) {
        currentStep = 2;
        updateFunnelStep(currentStep);
      } else if (currentStep === 2) {
        const qualSelect = document.getElementById('leadQualification');
        const cgpaInput = document.getElementById('leadGpa');
        const englishTest = document.getElementById('leadEnglishTest');
        const englishScore = document.getElementById('leadEnglishScore');

        if (qualSelect) leadData.qualification = qualSelect.value;
        if (cgpaInput && cgpaInput.value) leadData.cgpa = cgpaInput.value;
        if (englishTest) leadData.englishTest = englishTest.value;
        if (englishScore && englishScore.value) leadData.englishScore = englishScore.value;

        currentStep = 3;
        updateFunnelStep(currentStep);
      } else if (currentStep === 3) {
        const nameInput = document.getElementById('leadName');
        const phoneInput = document.getElementById('leadPhone');
        const emailInput = document.getElementById('leadEmail');
        const intakeInput = document.getElementById('leadIntake');
        const cityInput = document.getElementById('leadCity');

        if (!nameInput.value.trim()) {
          alert('Please enter your full name');
          nameInput.focus();
          return;
        }

        if (!phoneInput.value.trim() || phoneInput.value.length < 8) {
          alert('Please enter a valid phone or WhatsApp number');
          phoneInput.focus();
          return;
        }

        leadData.name = nameInput.value.trim();
        leadData.phone = phoneInput.value.trim();
        leadData.email = emailInput ? emailInput.value.trim() : '';
        if (intakeInput) leadData.intake = intakeInput.value;
        if (cityInput) leadData.city = cityInput.value;

        // Populate Result screen
        calculateAndShowResult(leadData);
        currentStep = 4;
        updateFunnelStep(currentStep);
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateFunnelStep(currentStep);
      }
    });
  }

  function calculateAndShowResult(data) {
    const resCountry = document.getElementById('resCountry');
    const resEligibility = document.getElementById('resEligibility');
    const resScholarship = document.getElementById('resScholarship');
    const resPsw = document.getElementById('resPsw');
    const resName = document.getElementById('resStudentName');
    const waConnectBtn = document.getElementById('funnelWhatsAppBtn');

    if (resCountry) resCountry.textContent = data.destination;
    if (resName) resName.textContent = data.name;

    // Smart logic for scholarship & eligibility
    let scholarshipAmount = '15% - 25% Merit Reduction';
    let pswYears = '2 - 3 Years';
    let eligibilityStatus = 'High Acceptance Potential (95%+)';

    if (data.destination === 'UK') {
      scholarshipAmount = '£2,000 – £6,000 Early Bird & Merit';
      pswYears = '2 Years Graduate Route';
    } else if (data.destination === 'USA') {
      scholarshipAmount = '$8,000 – $18,000 Renewable';
      pswYears = 'Up to 3 Years STEM OPT';
    } else if (data.destination === 'Australia') {
      scholarshipAmount = '20% – 30% Vice Chancellor Grant';
      pswYears = '2 – 4 Years PSW';
    }

    if (resEligibility) resEligibility.textContent = eligibilityStatus;
    if (resScholarship) resScholarship.textContent = scholarshipAmount;
    if (resPsw) resPsw.textContent = pswYears;

    // Generate WhatsApp link with pre-filled message
    const msg = `Hello Phenom Consultants, I am ${data.name} from ${data.city}. I checked my eligibility for studying in ${data.destination}. Qualification: ${data.qualification} (Result: ${data.cgpa}), English: ${data.englishTest} (${data.englishScore}), Target: ${data.intake}. Please guide me with admission and scholarship.`;
    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/8801700000000?text=${encodedMsg}`;

    if (waConnectBtn) {
      waConnectBtn.href = waUrl;
    }
  }

  // Restart Assessment
  const restartBtn = document.getElementById('btnRestartFunnel');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentStep = 1;
      updateFunnelStep(currentStep);
    });
  }
}

/* ==========================================================================
   4. HERO QUICK ASSESSMENT WIDGET
   ========================================================================== */
function initQuickAssessForm() {
  const quickForm = document.getElementById('heroQuickForm');
  if (!quickForm) return;

  quickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dest = document.getElementById('heroDestSelect').value;
    const phone = document.getElementById('heroPhoneInput').value;

    if (!phone || phone.length < 8) {
      alert('Please provide your valid WhatsApp number');
      return;
    }

    // Scroll to consultation modal or funnel
    openConsultationModal(`Interested in ${dest}, Phone: ${phone}`);
  });
}

/* ==========================================================================
   5. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. CONSULTATION BOOKING MODAL
   ========================================================================== */
function initModals() {
  const consultModal = document.getElementById('consultModal');
  const openBtns = document.querySelectorAll('.btn-book-consult');
  const closeBtn = document.getElementById('consultModalClose');
  const consultForm = document.getElementById('consultForm');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openConsultationModal();
    });
  });

  if (closeBtn && consultModal) {
    closeBtn.addEventListener('click', () => {
      consultModal.classList.remove('open');
    });
  }

  if (consultModal) {
    consultModal.addEventListener('click', (e) => {
      if (e.target === consultModal) {
        consultModal.classList.remove('open');
      }
    });
  }

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('consultName').value;
      const phone = document.getElementById('consultPhone').value;
      const dest = document.getElementById('consultDest').value;

      // WhatsApp direct trigger
      const msg = `Hi Phenom Consultants, I would like to book a free consultation session. Name: ${name}, Phone: ${phone}, Target Destination: ${dest}.`;
      const waUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(msg)}`;

      // Show confirmation
      alert(`Thank you, ${name}! Your consultation request for ${dest} has been submitted. Our senior counselor will connect with you within 2 hours.`);
      consultModal.classList.remove('open');
      window.open(waUrl, '_blank');
      consultForm.reset();
    });
  }
}

function openConsultationModal(prefillNote = '') {
  const consultModal = document.getElementById('consultModal');
  if (!consultModal) return;

  const noteField = document.getElementById('consultNotes');
  if (noteField && prefillNote) {
    noteField.value = prefillNote;
  }
  consultModal.classList.add('open');
}

/* ==========================================================================
   7. THEME TOGGLE (LIGHT / DARK SWITCHER)
   ========================================================================== */
function initThemeToggle() {
  const storedTheme = localStorage.getItem('phenom-theme') || 'light';

  const pillLightElements = [
    document.getElementById('pillLight'),
    document.getElementById('mobilePillLight'),
    document.getElementById('floatPillLight')
  ].filter(Boolean);

  const pillDarkElements = [
    document.getElementById('pillDark'),
    document.getElementById('mobilePillDark'),
    document.getElementById('floatPillDark')
  ].filter(Boolean);

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      pillLightElements.forEach(el => el.classList.remove('active'));
      pillDarkElements.forEach(el => el.classList.add('active'));
    } else {
      document.documentElement.removeAttribute('data-theme');
      pillLightElements.forEach(el => el.classList.add('active'));
      pillDarkElements.forEach(el => el.classList.remove('active'));
    }
    localStorage.setItem('phenom-theme', theme);
  }

  // Initialize theme
  applyTheme(storedTheme);

  // Click handlers on pill options
  pillLightElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme('light');
    });
  });

  pillDarkElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme('dark');
    });
  });

  // Toggle on pill container click
  const pillContainers = [
    document.getElementById('themeTogglePill'),
    document.getElementById('mobileThemeTogglePill'),
    document.getElementById('floatPill')
  ].filter(Boolean);

  pillContainers.forEach(container => {
    container.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  });
}


