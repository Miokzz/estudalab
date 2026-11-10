(() => {
  'use strict';
  const script = document.currentScript;
  const base = new URL('../', script ? script.src : new URL('assets/app-shell.js', location.href));
  const THEME_KEY = 'estudalab.theme.v1';
  const subjects = [
    { id: 'biologia', label: 'Biologia', art: 'biology' },
    { id: 'fisica', label: 'Física', art: 'physics' },
    { id: 'matematica', label: 'Matemática', art: 'math' },
    { id: 'redacao', label: 'Redação', art: 'writing' }
  ];
  const paths = {
    spark: '<path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4 18.4 5.6"/>',
    book: '<path d="M12 7c-3-2-6-2-9-1v13c3-1 6-1 9 1 3-2 6-2 9-1V6c-3-1-6-1-9 1Z"/><path d="M12 7v13"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    moon: '<path d="M20 15A8 8 0 0 1 9 4a8.5 8.5 0 1 0 11 11Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    home: '<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>'
  };
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.7');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = paths[name] || paths.book;
    return svg;
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function readTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
      for (const key of ['biolabP2.v1', 'fisicaP2.v1']) {
        try {
          const legacy = JSON.parse(localStorage.getItem(key) || 'null');
          if (legacy && ['light', 'dark'].includes(legacy.theme)) return legacy.theme;
        } catch (_) { /* An invalid legacy record should not prevent mounting. */ }
      }
    } catch (_) { /* Storage can be unavailable in private or embedded contexts. */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  let mounted = null;
  window.EstudaLabShell = {
    mount(options) {
      if (mounted) return mounted;
      const config = options || {};
      const content = document.getElementById(config.contentId || 'subject-content');
      if (!content) throw new Error('EstudaLabShell: content wrapper not found.');
      const rawSubject = String(config.subject || 'biologia');
      const aliases = { bio: 'biologia', biology: 'biologia', phys: 'fisica', physics: 'fisica', math: 'matematica', writing: 'redacao' };
      const subjectId = aliases[rawSubject] || rawSubject.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const subject = subjects.find(item => item.id === subjectId) || subjects[0];
      document.body.classList.add('el-app');
      document.body.dataset.elSubject = subject.id;
      const root = element('div', 'el-shell');
      const sidebar = element('aside', 'el-sidebar');
      sidebar.id = 'el-sidebar';
      sidebar.setAttribute('aria-label', 'Navegação de estudos');
      const brandRow = element('div', 'el-brand-row');
      const brand = element('a', 'el-brand');
      brand.href = base.href;
      brand.setAttribute('aria-label', 'EstudaLab, início');
      const mark = element('span', 'el-brand-mark');
      mark.append(icon('spark'));
      brand.append(mark, element('span', '', 'estudalab'));
      const close = element('button', 'el-icon-button el-drawer-close');
      close.type = 'button';
      close.setAttribute('aria-label', 'Fechar menu');
      close.append(icon('close'));
      brandRow.append(brand, close);
      const selectorLabel = element('label', 'el-selector-label', 'Sua matéria');
      selectorLabel.htmlFor = 'el-subject-select';
      const selector = element('select', 'el-subject-select');
      selector.id = 'el-subject-select';
      subjects.forEach(item => {
        const option = element('option', '', item.label);
        option.value = new URL(item.id + '/', base).href;
        option.selected = item.id === subject.id;
        selector.append(option);
      });
      selector.addEventListener('change', () => { location.href = selector.value; });
      const nav = element('nav', 'el-route-nav');
      nav.setAttribute('aria-label', 'Conteúdos de ' + subject.label);
      const routeButtons = new Map();
      (config.items || []).forEach(item => {
        const control = element(item.href ? 'a' : 'button', 'el-route');
        if (item.href) control.href = item.href;
        else control.type = 'button';
        control.dataset.shellRoute = String(item.id);
        control.append(icon(item.id === 'home' ? 'home' : 'book'), element('span', '', item.label));
        control.addEventListener('click', event => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          if (typeof config.navigate === 'function') {
            event.preventDefault();
            config.navigate(item.id);
          }
          setOpen(false);
        });
        routeButtons.set(String(item.id), control);
        nav.append(control);
      });
      const studyCard = element('div', 'el-study-card');
      studyCard.hidden = true;
      const illustration = element('img', 'el-study-art');
      illustration.src = new URL('assets/' + subject.art + '-3d.webp', base).href;
      illustration.alt = '';
      illustration.width = 104;
      illustration.height = 104;
      const progressLabel = element('span', 'el-progress-label', 'Seu progresso');
      progressLabel.id = 'el-shell-progress-label';
      const progress = element('progress', 'el-progress');
      progress.id = 'el-shell-progress';
      progress.max = 1;
      progress.value = 0;
      progress.setAttribute('aria-labelledby', progressLabel.id);
      const progressText = element('span', 'el-progress-text', '0 de 0 concluídos');
      progressText.id = 'el-shell-progress-text';
      progress.setAttribute('aria-describedby', progressText.id);
      studyCard.append(illustration, progressLabel, progress, progressText);
      sidebar.append(brandRow, selectorLabel, selector, element('p', 'el-nav-label', 'Vamos estudar'), nav, studyCard);
      const stage = element('div', 'el-stage');
      const header = element('header', 'el-header');
      const menu = element('button', 'el-icon-button el-menu-button');
      menu.type = 'button';
      menu.setAttribute('aria-label', 'Abrir menu de estudos');
      menu.setAttribute('aria-controls', sidebar.id);
      menu.setAttribute('aria-expanded', 'false');
      menu.append(icon('menu'));
      const breadcrumbs = element('nav', 'el-breadcrumb');
      breadcrumbs.setAttribute('aria-label', 'Você está aqui');
      const home = element('a', '', 'Início');
      home.href = base.href;
      const separator = () => { const span = element('span', 'el-crumb-separator', '/'); span.setAttribute('aria-hidden', 'true'); return span; };
      const subjectLink = element('a', '', subject.label);
      subjectLink.href = new URL(subject.id + '/', base).href;
      const currentTitle = element('span', 'el-current-title', config.title || subject.label);
      currentTitle.setAttribute('aria-current', 'page');
      breadcrumbs.append(home, separator(), subjectLink, separator(), currentTitle);
      const themeButton = element('button', 'el-theme-button');
      themeButton.type = 'button';
      let theme = readTheme();
      function applyTheme(value, persist) {
        theme = value === 'dark' ? 'dark' : 'light';
        document.body.classList.toggle('dark', theme === 'dark');
        themeButton.replaceChildren(icon(theme === 'dark' ? 'sun' : 'moon'), element('span', '', theme === 'dark' ? 'Modo claro' : 'Modo escuro'));
        themeButton.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
        if (persist) { try { localStorage.setItem(THEME_KEY, theme); } catch (_) {} }
      }
      themeButton.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark', true));
      window.addEventListener('storage', event => { if (event.key === THEME_KEY) applyTheme(event.newValue || readTheme(), false); });
      header.append(menu, breadcrumbs, themeButton);
      content.classList.add('el-content');
      content.tabIndex = -1;
      const skip = element('a', 'el-skip-link', 'Pular para o conteúdo');
      skip.href = '#' + content.id;
      skip.addEventListener('click', event => { event.preventDefault(); setOpen(false); content.focus(); content.scrollIntoView({ block: 'start' }); });
      const backdrop = element('div', 'el-backdrop');
      backdrop.hidden = true;
      backdrop.setAttribute('aria-hidden', 'true');
      root.append(sidebar, stage, backdrop);
      stage.append(header);
      content.before(skip, root);
      stage.append(content);
      const mobile = window.matchMedia('(max-width: 900px)');
      let open = false;
      let returnFocus = null;
      function setOpen(value) {
        const next = Boolean(value && mobile.matches);
        if (next === open) return;
        open = next;
        root.classList.toggle('el-menu-open', open);
        document.body.classList.toggle('el-drawer-open', open);
        menu.setAttribute('aria-expanded', String(open));
        backdrop.hidden = !open;
        stage.inert = open;
        sidebar.inert = mobile.matches && !open;
        if (open) {
          returnFocus = document.activeElement;
          sidebar.setAttribute('role', 'dialog');
          sidebar.setAttribute('aria-modal', 'true');
          close.focus();
        } else {
          sidebar.removeAttribute('role');
          sidebar.removeAttribute('aria-modal');
          if (returnFocus && returnFocus.isConnected) returnFocus.focus();
          returnFocus = null;
        }
      }
      menu.addEventListener('click', () => setOpen(true));
      close.addEventListener('click', () => setOpen(false));
      backdrop.addEventListener('click', () => setOpen(false));
      document.addEventListener('keydown', event => {
        if (!open) return;
        if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
        if (event.key === 'Tab') {
          const focusables = Array.from(sidebar.querySelectorAll('a[href],button:not(:disabled),select:not(:disabled),[tabindex="0"]')).filter(node => node.getClientRects().length);
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      });
      const syncViewport = () => { setOpen(false); sidebar.inert = mobile.matches; };
      mobile.addEventListener('change', syncViewport);
      sidebar.inert = mobile.matches;
      applyTheme(theme, false);
      mounted = {
        setRoute(id, title) {
          routeButtons.forEach((button, key) => {
            const active = key === String(id);
            button.classList.toggle('el-active', active);
            if (active) button.setAttribute('aria-current', 'page');
            else button.removeAttribute('aria-current');
          });
          currentTitle.textContent = title || (config.items || []).find(item => String(item.id) === String(id))?.label || config.title || subject.label;
        },
        setProgress(done, total) {
          studyCard.hidden = false;
          const count = Math.max(0, Math.floor(Number(total) || 0));
          const complete = Math.min(count, Math.max(0, Math.floor(Number(done) || 0)));
          progress.max = count || 1;
          progress.value = complete;
          progressText.textContent = complete + ' de ' + count + ' concluídos';
        }
      };
      return mounted;
    }
  };
})();
