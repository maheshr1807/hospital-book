// ============ Navbar toggle (mobile) ============
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.innerHTML = navLinks.classList.contains('open')
      ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));
}

// ============ Mark active nav link ============
(function () {
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) a.classList.add('active');
  });
})();

// ============ Back to top ============
const topBtn = document.querySelector('.float-top');
if (topBtn) {
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 480);
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============ FAQ accordion ============
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.faq-item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
    }
  });
});

// ============ Department tabs ============
const deptTabs = document.querySelectorAll('.dept-tab');
if (deptTabs.length) {
  deptTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      deptTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.dept-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
      window.scrollTo({ top: document.querySelector('.dept-layout').offsetTop - 100, behavior: 'smooth' });
    });
  });
}

// ============ Testimonial slider ============
const testiTrack = document.querySelector('.testi-track');
if (testiTrack) {
  const prev = document.querySelector('[data-testi="prev"]');
  const next = document.querySelector('[data-testi="next"]');
  const scrollAmt = () => testiTrack.querySelector('.testi-card').offsetWidth + 22;
  prev && prev.addEventListener('click', () => testiTrack.scrollBy({ left: -scrollAmt(), behavior: 'smooth' }));
  next && next.addEventListener('click', () => testiTrack.scrollBy({ left: scrollAmt(), behavior: 'smooth' }));
}

// ============ Gallery filter ============
const gfilters = document.querySelectorAll('.gfilter');
if (gfilters.length) {
  gfilters.forEach(f => {
    f.addEventListener('click', () => {
      gfilters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      const cat = f.dataset.filter;
      document.querySelectorAll('[data-cat]').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
}

// ============ Appointment / Contact form (static — client-side only) ============
function handleStaticForm(formId, successId) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    success.classList.add('show');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    form.reset();
    setTimeout(() => success.classList.remove('show'), 6000);
  });
}
handleStaticForm('appointmentForm', 'appointmentSuccess');
handleStaticForm('contactForm', 'contactSuccess');

// ============ Department -> doctor dropdown filter on appointment page ============
const deptSelect = document.getElementById('apDept');
const docSelect = document.getElementById('apDoctor');
if (deptSelect && docSelect) {
  const doctorsByDept = {
    cardiology: ['Dr. Ravi Kumar — Cardiology', 'Dr. Meera Nair — Cardiology'],
    neurology: ['Dr. Arjun Iyer — Neurology'],
    orthopedics: ['Dr. Suresh Babu — Orthopedics'],
    pediatrics: ['Dr. Ananya Rao — Pediatrics'],
    gynecology: ['Dr. Lakshmi Menon — Gynecology'],
    dermatology: ['Dr. Kavya Pillai — Dermatology'],
    dentistry: ['Dr. Vikram Shah — Dentistry'],
    ent: ['Dr. Naveen Reddy — ENT'],
    ophthalmology: ['Dr. Priya Desai — Ophthalmology'],
    urology: ['Dr. Manoj Pillai — Urology'],
    general: ['Dr. Sathish Kumar — General Medicine'],
    physiotherapy: ['Dr. Divya Krishnan — Physiotherapy'],
  };
  deptSelect.addEventListener('change', () => {
    const list = doctorsByDept[deptSelect.value] || [];
    docSelect.innerHTML = '<option value="">Select doctor</option>' +
      list.map(d => `<option>${d}</option>`).join('');
  });
}

// ============ Set current year in footer ============
document.querySelectorAll('.cur-year').forEach(el => el.textContent = new Date().getFullYear());
