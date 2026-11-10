const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'assets/home.js'), 'utf8');

function render(values = {}, blocked = false) {
  const nodes = Object.fromEntries(['bio', 'fis', 'mat'].flatMap(prefix => [
    [`${prefix}Count`, { textContent: '' }], [`${prefix}Bar`, { hidden: true, value: 0 }],
  ]));
  const listeners = {};
  vm.runInNewContext(code, {
    document: { getElementById: id => nodes[id] },
    localStorage: { getItem: key => { if (blocked) throw Error('Storage blocked'); return values[key] ?? null; } },
    window: { addEventListener: (name, fn) => { listeners[name] = fn; } },
  });
  return { nodes, listeners };
}

test('new student sees zero progress in all three subjects', () => {
  const { nodes } = render();
  assert.equal(nodes.bioCount.textContent, '0 de 10 aulas concluídas');
  assert.equal(nodes.fisCount.textContent, '0 de 5 módulos concluídos');
  assert.equal(nodes.matCount.textContent, '0 de 7 aulas concluídas');
  assert.equal(nodes.bioBar.hidden, false);
});
test('existing progress is read without writing; duplicates and malformed entries are ignored', () => {
  const { nodes } = render({ 'biolabP2.v1': JSON.stringify({ done: ['tireoide', 'adh', 'adh', null, '', 42] }) });
  assert.equal(nodes.bioBar.value, 2);
  assert.equal(nodes.bioCount.textContent, '2 de 10 aulas concluídas');
});
test('a corrupted subject does not prevent the others from loading', () => {
  for (const invalid of ['{', 'null', '{"done":"abc"}', '{}']) {
    const { nodes } = render({ 'biolabP2.v1': invalid, 'fisicaP2.v1': '{"done":["historia"]}' });
    assert.equal(nodes.bioCount.textContent, 'Progresso indisponível');
    assert.equal(nodes.bioBar.hidden, true);
    assert.equal(nodes.fisBar.value, 1);
  }
});
test('unavailable storage is reported without implying zero progress', () => {
  const { nodes } = render({}, true);
  for (const prefix of ['bio', 'fis', 'mat']) {
    assert.equal(nodes[`${prefix}Count`].textContent, 'Progresso indisponível');
    assert.equal(nodes[`${prefix}Bar`].hidden, true);
  }
});
test('completion never exceeds the total', () => {
  const { nodes } = render({ 'fisicaP2.v1': JSON.stringify({ done: Array.from({ length: 12 }, (_, i) => `id${i}`) }) });
  assert.equal(nodes.fisBar.value, 5);
});
test('returning from a lesson and cross-tab updates refresh progress', () => {
  const values = {};
  const { nodes, listeners } = render(values);
  values['matematicaP2.v1'] = '{"done":["a","b"]}';
  listeners.pageshow();
  assert.equal(nodes.matBar.value, 2);
  values['matematicaP2.v1'] = '{"done":["a","b","c"]}';
  listeners.storage({ key: 'matematicaP2.v1' });
  assert.equal(nodes.matBar.value, 3);
  delete values['matematicaP2.v1'];
  listeners.storage({ key: null });
  assert.equal(nodes.matBar.value, 0);
});
test('local links and assets resolve, including file-based navigation and anchors', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (url.startsWith('#')) assert.ok(html.includes(`id="${url.slice(1)}"`), url);
    else {
      const target = path.join(root, url.endsWith('/') ? `${url}index.html` : url);
      assert.ok(fs.existsSync(target), url);
    }
  }
  for (const subject of ['biologia', 'fisica', 'matematica', 'redacao']) assert.ok(html.includes(`href="${subject}/"`));
});
