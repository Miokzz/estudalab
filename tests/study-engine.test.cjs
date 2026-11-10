const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const engine = require('../assets/study-engine.js');
const bank = Array.from({length: 60}, (_, i) => ({id: `q${i}`, topic: `t${i % 3}`, difficulty: ['easy', 'medium', 'hard'][Math.floor(i / 3) % 3]}));
const config = {rng: () => 0.42, difficultyOf: q => q.difficulty};
const counts = (items, key) => Object.values(items.reduce((all, item) => { all[item[key]] = (all[item[key]] || 0) + 1; return all; }, {}));

test('selects exactly 15 unique questions and never mutates source/history', () => {
  const history = {seen: {q0: 2}, last: ['q0']};
  const original = JSON.stringify({bank, history});
  const result = engine.selectQuestions(bank, {...config, history});
  assert.equal(result.questions.length, 15);
  assert.equal(new Set(result.questions.map(q => q.id)).size, 15);
  assert.equal(JSON.stringify({bank, history}), original);
  for (const q of result.questions) assert.equal(result.history.seen[q.id], 1);
  assert.deepEqual(result.history.last, result.questions.map(q => q.id));
});

test('consecutive attempts avoid the entire previous round when 30 are available', () => {
  let history;
  let last = [];
  for (let attempt = 0; attempt < 8; attempt++) {
    const result = engine.selectQuestions(bank.slice(0, 30), {...config, history});
    assert.ok(result.questions.every(q => !last.includes(q.id)));
    history = result.history; last = history.last;
  }
});

test('balances topic and known difficulty despite an uneven bank', () => {
  const uneven = bank.concat(Array.from({length: 80}, (_, i) => ({id: `extra${i}`, topic: 't0', difficulty: 'medium'})));
  const selected = engine.selectQuestions(uneven, {...config, count: 18}).questions;
  for (const key of ['topic', 'difficulty']) {
    const distribution = counts(selected, key);
    assert.ok(Math.max(...distribution) - Math.min(...distribution) <= 1, JSON.stringify(distribution));
  }
});

test('prefers less-seen questions and rejects insufficient unique IDs', () => {
  const seen = Object.fromEntries(bank.slice(0, 45).map(q => [q.id, 5]));
  const result = engine.selectQuestions(bank, {...config, history: {seen}});
  assert.ok(result.questions.every(q => Number(q.id.slice(1)) >= 45));
  assert.throws(() => engine.selectQuestions(bank.slice(0, 14)), RangeError);
  assert.throws(() => engine.selectQuestions(Array(20).fill(bank[0])), RangeError);
  assert.throws(() => engine.selectQuestions(bank, {count: 1.5}), TypeError);
});

test('custom stable IDs work and absent difficulty does not invent labels', () => {
  const items = bank.map(q => ({key: q.id, topic: q.topic}));
  const result = engine.selectQuestions(items, {idOf: q => q.key, rng: () => 0.5});
  assert.equal(result.questions.length, 15);
  assert.equal(result.history.last[0], result.questions[0].key);
  assert.ok(result.questions.every(q => !('difficulty' in q)));
});

test('Fisher-Yates preserves correct answer identity including duplicate text', () => {
  const options = ['same', 'same', 'other'];
  const result = engine.shuffleAnswers(options, 1, () => 0);
  assert.deepEqual(result.options, ['same', 'other', 'same']);
  assert.equal(result.answerIndex, 0);
  assert.deepEqual(options, ['same', 'same', 'other']);
  assert.throws(() => engine.shuffleAnswers(options, 3), RangeError);
  assert.throws(() => engine.shuffleAnswers(options, 0, () => 1), TypeError);
  for (let answer = 0; answer < 4; answer++) {
    const objects = Array.from({length: 4}, (_, id) => ({id}));
    for (const random of [0, 0.3, 0.8, 0.999]) {
      const shuffled = engine.shuffleAnswers(objects, answer, () => random);
      assert.equal(shuffled.options[shuffled.answerIndex], objects[answer]);
      assert.equal(new Set(shuffled.options).size, 4);
    }
  }
});

test('review scheduling is deterministic with documented UTC intervals', () => {
  const now = Date.UTC(2026, 10, 10, 12);
  const day = 86400000;
  const first = engine.schedule(null, 'good', now);
  assert.equal(first.due, now + day);
  const second = engine.schedule(first, 'good', first.due);
  assert.equal(second.interval, 3);
  const third = engine.schedule(second, 'good', second.due);
  assert.equal(third.interval, 7.5);
  const failed = engine.schedule(third, 'again', third.due);
  assert.equal(failed.due, third.due + 600000);
  assert.equal(failed.repetitions, 0);
  assert.equal(failed.lapses, 1);
  assert.equal(engine.schedule(failed, 'good', failed.due).interval, 1);
  assert.ok(engine.schedule(third, 'hard', now).interval < engine.schedule(third, 'good', now).interval);
  assert.ok(engine.schedule(third, 'easy', now).interval > engine.schedule(third, 'good', now).interval);
  assert.deepEqual(engine.schedule(null, 'easy', now), engine.schedule(null, 'easy', now));
  assert.equal(first.interval, 1);
  assert.throws(() => engine.schedule(null, 'unknown', now), TypeError);
  assert.throws(() => engine.schedule({interval: -1}, 'good', now), TypeError);
  assert.throws(() => engine.schedule(null, 'good', NaN), TypeError);
});

test('due cards prioritize failures, then unseen, retain future, and preserve inputs', () => {
  const cards = ['new', 'future', 'due', 'failed'].map(id => ({id}));
  const records = {future: {due: 300, lapses: 10}, due: {due: 50, lapses: 0}, failed: {due: 90, lapses: 3}};
  const snapshot = JSON.stringify({cards, records});
  assert.deepEqual(engine.dueCards(cards, {records, now: 100}).map(q => q.id), ['failed', 'due', 'new', 'future']);
  assert.equal(JSON.stringify({cards, records}), snapshot);
});

test('same source exposes browser UMD API', () => {
  const sandbox = {};
  vm.runInNewContext(fs.readFileSync(require.resolve('../assets/study-engine.js'), 'utf8'), sandbox);
  assert.equal(typeof sandbox.EstudaLabStudy.selectQuestions, 'function');
  assert.equal(typeof sandbox.EstudaLabStudy.schedule, 'function');
});
