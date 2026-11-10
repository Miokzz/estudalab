/* Read existing subject progress without migrating or writing student data. */
(() => {
  const subjects = [
    { key: 'biolabP2.v1', prefix: 'bio', total: 10, unit: 'aulas concluídas' },
    { key: 'fisicaP2.v1', prefix: 'fis', total: 5, unit: 'módulos concluídos' },
    { key: 'matematicaP2.v1', prefix: 'mat', total: 7, unit: 'aulas concluídas' },
  ];
  function refreshProgress() {
    for (const { key, prefix, total, unit } of subjects) {
      const label = document.getElementById(`${prefix}Count`);
      const bar = document.getElementById(`${prefix}Bar`);
      try {
        const raw = localStorage.getItem(key);
        const saved = raw === null ? { done: [] } : JSON.parse(raw);
        if (!saved || !Array.isArray(saved.done)) throw new Error('Invalid progress');
        const done = new Set(saved.done.filter(id => typeof id === 'string' && id.trim()));
        const count = Math.min(total, done.size);
        label.textContent = `${count} de ${total} ${unit}`;
        bar.value = count;
        bar.hidden = false;
      } catch {
        label.textContent = 'Progresso indisponível';
        bar.hidden = true;
      }
    }
  }
  refreshProgress();
  window.addEventListener('pageshow', refreshProgress);
  window.addEventListener('storage', event => {
    if (event.key === null || subjects.some(subject => subject.key === event.key)) refreshProgress();
  });
})();
