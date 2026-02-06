document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    const langAnnounce = document.getElementById('lang-announce');
    
    const savedLang = localStorage.getItem('rio_lang') || 'no';
    setLanguage(savedLang, false);

    toggleBtn.addEventListener('click', () => {
        const currentLang = document.querySelector('.lang-option.active').dataset.langTarget;
        const newLang = currentLang === 'no' ? 'en' : 'no';
        setLanguage(newLang, true);
    });

    function setLanguage(lang, announce) {
        langOptions.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.langTarget === lang);
        });

        document.querySelectorAll('[data-lang]').forEach(el => {
            if (el.dataset.lang === lang) {
                el.style.display = 'block';
                el.style.opacity = 1;
            } else {
                el.style.display = 'none';
                el.style.opacity = 0;
            }
        });

        localStorage.setItem('rio_lang', lang);
        document.documentElement.lang = lang;

        if (announce && langAnnounce) {
            langAnnounce.textContent = lang === 'no' ? 'Språk endret til norsk' : 'Language changed to English';
        }
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function activateTab(btn) {
        const target = btn.dataset.tabTarget;

        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            b.setAttribute('tabindex', '-1');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');
        btn.focus();

        tabPanels.forEach(panel => {
            if (panel.dataset.tab === target) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => activateTab(btn));
    });

    const tabList = document.querySelector('[role="tablist"]');
    if (tabList) {
        tabList.addEventListener('keydown', (e) => {
            const tabs = [...tabBtns];
            const currentIndex = tabs.indexOf(document.activeElement);
            if (currentIndex === -1) return;

            let newIndex;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                newIndex = (currentIndex + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            } else if (e.key === 'Home') {
                e.preventDefault();
                newIndex = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                newIndex = tabs.length - 1;
            }

            if (newIndex !== undefined) {
                activateTab(tabs[newIndex]);
            }
        });
    }

    tabBtns.forEach(btn => {
        if (btn.classList.contains('active')) {
            btn.setAttribute('tabindex', '0');
        } else {
            btn.setAttribute('tabindex', '-1');
        }
    });
});
