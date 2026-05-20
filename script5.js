// ============================================
// Suhub Technology - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // Mobile Menu Toggle (إذا تستخدمين navLinks)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
      navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(item => {
      item.addEventListener('click', function () {
        navLinks.style.display = 'none';
      });
    });
  }

  // Mobile Menu Toggle (إذا تستخدمين mobileMenu + menuToggle)
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  // Smooth scroll for anchor links (داخل نفس الصفحة فقط)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Toggle service details
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.closest('.service-content')?.querySelector('.service-details');
      if (!details) return;

      details.style.display = (details.style.display === 'block') ? 'none' : 'block';
    });
  });

  // Contact Form Submission -> WhatsApp Web
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !phone || !message) {
        showNotification('الرجاء ملء جميع الحقول', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('الرجاء إدخال بريد إلكتروني صحيح', 'error');
        return;
      }

      const cleanPhone = phone.replace(/\s/g, '');
      const phoneRegex = /^(\+966|0)[0-9]{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        showNotification('الرجاء إدخال رقم جوال صحيح', 'error');
        return;
      }

      const whatsappNumber = "966511507515"; // رقمك بدون +
      const msg =
`📩 رسالة جديدة من الموقع

👤 الاسم: ${name}
📧 البريد: ${email}
📱 جوال العميل: ${cleanPhone}

📝 الرسالة:
${message}`;

      const whatsappURL = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(msg)}`;

      alert('سيتم فتح واتساب ويب لإرسال رسالتك ✅');
      window.location.href = whatsappURL;
    });
  }

  // Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.boxShadow = (window.scrollY > 50)
        ? '0 4px 12px rgba(0, 0, 0, 0.15)'
        : 'var(--shadow)';
    });
  }

  // Animate elements on scroll
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .stat-card, .partner-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});
// --- كود الظهور عند التمرير ---

// دالة لتشغيل التأثير
function revealOnScroll() {
  // تحديد كل العناصر التي نريد تطبيق التأثير عليها
  var reveals = document.querySelectorAll('.reveal');

  // المرور على كل عنصر
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight; // ارتفاع نافذة المتصفح
    var elementTop = reveals[i].getBoundingClientRect().top; // المسافة من أعلى النافذة إلى العنصر
    var elementVisible = 100; // المسافة التي يجب أن يظهر عندها العنصر قبل الوصول إليه تماماً

    // التحقق مما إذا كان العنصر مرئياً
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active'); // إضافة فئة active لإظهار العنصر
    } else {
      // اختيارياً: يمكنك إزالة السطرين التاليين إذا أردت أن يظل العنصر ظاهراً بعد ظهوره أول مرة
      reveals[i].classList.remove('active'); // إزالة الفئة لإخفاء العنصر مرة أخرى عند التمرير للأعلى
    }
  }
}

// ربط الدالة بحدث التمرير في الصفحة
window.addEventListener('scroll', revealOnScroll);

// استدعاء الدالة عند تحميل الصفحة للتأكد من ظهور العناصر المرئية بالفعل
revealOnScroll();
