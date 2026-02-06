document.addEventListener('DOMContentLoaded', () => {
    // Language Toggle
    const toggleBtn = document.getElementById('lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    
    const savedLang = localStorage.getItem('rio_lang') || 'no';
    setLanguage(savedLang);

    toggleBtn.addEventListener('click', () => {
        const currentLang = document.querySelector('.lang-option.active').dataset.langTarget;
        const newLang = currentLang === 'no' ? 'en' : 'no';
        setLanguage(newLang);
    });

    function setLanguage(lang) {
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
    }

    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tabTarget;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabPanels.forEach(panel => {
                if (panel.dataset.tab === target) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
});
