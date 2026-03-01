/*==================== TYPING EFFECT ====================*/
const typingText = document.getElementById('typing-text')
if (typingText) {
  const fullName = 'Ashwin Krishna E'
  let i = 0
  function typeWriter() {
    if (i < fullName.length) {
      typingText.textContent += fullName.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    } else {
      setTimeout(() => {
        typingText.textContent = ''
        i = 0
        setTimeout(typeWriter, 500)
      }, 2000)
    }
  }
  setTimeout(typeWriter, 600)
}

/*==================== COPY TO CLIPBOARD ====================*/
document.querySelectorAll('[data-copy]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault()
    const text = el.getAttribute('data-copy')
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast())
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      showToast()
    }
  })
})

function showToast() {
  const toast = document.getElementById('toast')
  if (!toast) return
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 2000)
}

/*==================== DOWNLOAD RESUME ====================*/
document.getElementById('download-resume')?.addEventListener('click', (e) => {
  const link = e.currentTarget
  if (!link.href || link.getAttribute('href') === '#') {
    e.preventDefault()
    const toast = document.getElementById('toast')
    const originalText = toast?.textContent
    if (toast) {
      toast.textContent = 'Add resume.pdf to project folder to enable download'
      toast.classList.add('show')
      setTimeout(() => {
        toast.classList.remove('show')
        toast.textContent = originalText
      }, 3000)
    }
  }
})

function enableSafeDownload(buttonId, message) {
  const button = document.getElementById(buttonId);

  if (!button) return;

  button.addEventListener("click", function (e) {
    const link = e.currentTarget;
    const href = link.getAttribute("href");

    // Prevent download if file path is empty or placeholder
    if (!href || href === "#") {
      e.preventDefault();

      const toast = document.getElementById("toast");
      if (!toast) return;

      const originalText = toast.textContent;

      toast.textContent = message;
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
        toast.textContent = originalText;
      }, 3000);
    }
  });
}

// Resume
enableSafeDownload(
  "download-resume",
  "Add resume.pdf to project folder to enable download"
);

// Profile Picture
enableSafeDownload(
  "download-propic",
  "Add propic.jpeg to project folder to enable download"
);

/*==================== MENU SHOW & HIDE ====================*/
const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link')

function linkAction() {
  navMenu.classList.remove('show-menu')
}

navLinks.forEach(link => link.addEventListener('click', linkAction))


/*==================== SKILLS ACCORDION ====================*/
const skillsContent = document.getElementsByClassName('skills__content')
const skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills() {
  let itemClass = this.parentNode.className

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close'
  }

  if (itemClass === 'skills__content skills__close') {
    this.parentNode.className = 'skills__content skills__open'
  }
}

skillsHeader.forEach(el => {
  el.addEventListener('click', toggleSkills)
})


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 100
    const sectionId = current.getAttribute('id')

    const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link && link.classList.add('active-link')
    } else {
      link && link.classList.remove('active-link')
    }
  })
}

window.addEventListener('scroll', scrollActive)


/*==================== CHANGE HEADER BACKGROUND ====================*/
function scrollHeader() {
  const header = document.getElementById('header')
  if (window.scrollY >= 80) {
    header.classList.add('scroll-header')
  } else {
    header.classList.remove('scroll-header')
  }
}

window.addEventListener('scroll', scrollHeader)


/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUpBtn = document.getElementById('scroll-up')
  if (!scrollUpBtn) return

  if (window.scrollY >= 400) {
    scrollUpBtn.classList.add('show-scroll')
  } else {
    scrollUpBtn.classList.remove('show-scroll')
  }
}

window.addEventListener('scroll', scrollUp)


/*==================== DARK / LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light'

const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
  })
}


/*==================== SWIPER PORTFOLIO ====================*/
if (typeof Swiper !== "undefined") {
  new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })

  new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      568: {
        slidesPerView: 2,
      }
    }
  })
}


const revealTargets = document.querySelectorAll('.reveal')
if (revealTargets.length) {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  revealTargets.forEach(el => io.observe(el))
}

/*==================== FULL CONTENT PROTECTION ====================*/

(function () {
  "use strict";

  /* ---------- Disable Right Click ---------- */
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  /* ---------- Disable Drag Selection ---------- */
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });

  /* ---------- Disable Copy / Cut ---------- */
  document.addEventListener("copy", function (e) {
    e.preventDefault();
  });

  document.addEventListener("cut", function (e) {
    e.preventDefault();
  });

  /* ---------- Disable Keyboard Shortcuts ---------- */
  document.addEventListener("keydown", function (e) {

    const key = e.key.toLowerCase();

    // Disable Ctrl combinations
    if (e.ctrlKey) {
      if (
        key === "c" ||   // Copy
        key === "x" ||   // Cut
        key === "u" ||   // View Source
        key === "s" ||   // Save
        key === "a" ||   // Select All
        key === "p" ||   // Print
        key === "i" ||   // DevTools
        key === "j"      // DevTools
      ) {
        e.preventDefault();
      }
    }

    // Disable Ctrl + Shift + I / J / C
    if (e.ctrlKey && e.shiftKey) {
      if (key === "i" || key === "j" || key === "c") {
        e.preventDefault();
      }
    }

    // Disable F12
    if (e.key === "F12") {
      e.preventDefault();
    }
  });

  /* ---------- Blur Page If DevTools Open ---------- */
  let devtoolsOpen = false;

  setInterval(function () {
    const threshold = 160;

    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        document.body.style.filter = "blur(10px)";
        document.body.style.pointerEvents = "none";
      }
    } else {
      if (devtoolsOpen) {
        devtoolsOpen = false;
        document.body.style.filter = "none";
        document.body.style.pointerEvents = "auto";
      }
    }
  }, 500);

})();

(function () {
    "use strict";

    const __guard = (() => {
        const _isDevToolsOpen = () => {
            const threshold = 160;
            return (
                window.outerWidth - window.innerWidth > threshold ||
                window.outerHeight - window.innerHeight > threshold
            );
        };

        setInterval(() => {
            if (_isDevToolsOpen()) {
                document.body.innerHTML = "";
                window.location.href = "about:blank";
            }
        }, 1000);
    })();

    const __module = (() => {

        const __interop = (m) => (m && m.__esModule ? m : { default: m });

        const __e = __interop(window.__mod155 || {});
        const __u = __interop(window.__mod407 || {});
        const __i = __interop(window.__mod985 || {});
        const __o = window.__mod496 || {};
        const __a = __interop(window.__mod86 || {});

        const __c = __i.default?.isMshop;
        const __l = __i.default?.mashIsAUIAvailable;
        const __s = __i.default?.mashHasLaunchIntentUrl;
        const __h = __i.default?.mashHasOpenInExternalBrowser;

        const shouldNavigatePrimeNowUrl = (url) => {
            return !!(__c && __l && __e.default?.(url));
        };

        const navigatePrimeNowUrl = (url, fallback) => {

            if (__s) {
                return __o.tryNavigationMethod?.(() => {
                    __u.default?.mash?.launchIntentURL?.execute({
                        fallbackUrl: __a.default?.(fallback),
                        url: url
                    });
                }, __o.methodNames?.MASH_LAUNCH_INTENT_URL);
            }

            if (__h) {
                return __o.tryNavigationMethod?.(() => {
                    return __u.default?.mash?.openInExternalBrowser?.execute({
                        url: url
                    });
                }, __o.methodNames?.MASH_OPEN_IN_EXTERNAL_BROWSER);
            }

            return false;
        };

        return {
            shouldNavigatePrimeNowUrl,
            navigatePrimeNowUrl
        };

    })();

    Object.defineProperty(window, "Creative", {
        value: Object.freeze(__module),
        writable: false,
        configurable: false
    });

    // Disable common copy shortcuts
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener("keydown", e => {
        if (
            e.ctrlKey &&
            ["c", "u", "s", "i"].includes(e.key.toLowerCase())
        ) {
            e.preventDefault();
        }
    });

})();
