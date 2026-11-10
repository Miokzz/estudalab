(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.EstudaLabStudy = factory();
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  var DAY = 86400000;

  function finite(value, name, minimum) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < minimum) {
      throw new TypeError(name + ' must be a finite number >= ' + minimum);
    }
    return value;
  }
  function randomIndex(length, rng) {
    var value = rng();
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value >= 1) {
      throw new TypeError('rng must return a number in [0, 1)');
    }
    return Math.floor(value * length);
  }
  function shuffle(items, rng) {
    var result = items.slice();
    for (var i = result.length - 1; i > 0; i--) {
      var j = randomIndex(i + 1, rng);
      var temporary = result[i]; result[i] = result[j]; result[j] = temporary;
    }
    return result;
  }
  function stableId(value) {
    if ((typeof value !== 'string' && typeof value !== 'number') || String(value).length === 0 ||
        (typeof value === 'number' && !Number.isFinite(value))) {
      throw new TypeError('Every item must have a stable string or numeric ID');
    }
    return String(value);
  }

  // Freshness is lexicographic: previous-round avoidance, then lifetime exposure.
  // Within an exposure tier, greedily balance both actual topic and difficulty labels.
  function selectQuestions(items, config) {
    if (!Array.isArray(items)) throw new TypeError('items must be an array');
    config = config || {};
    var count = config.count === undefined ? 15 : config.count;
    if (!Number.isInteger(count) || count < 1) throw new TypeError('count must be a positive integer');
    var idOf = config.idOf || function (item) { return item.id; };
    var topicOf = config.topicOf || function (item) { return item.topic; };
    var difficultyOf = config.difficultyOf || function () { return 'medium'; };
    var rng = config.rng || Math.random;
    var history = config.history || {};
    var seen = Object.assign(Object.create(null), history.seen || {});
    Object.keys(seen).forEach(function (id) { finite(seen[id], 'seen count', 0); });
    var last = new Set((history.last || []).map(stableId));
    var ids = new Set();
    var candidates = [];
    items.forEach(function (item) {
      var id = stableId(idOf(item));
      if (ids.has(id)) return;
      ids.add(id);
      candidates.push({ item: item, id: id, topic: topicOf(item), difficulty: difficultyOf(item) });
    });
    if (candidates.length < count) throw new RangeError('Not enough unique questions for requested count');
    candidates = shuffle(candidates, rng);
    var topics = new Map(); var difficulties = new Map(); var selected = [];
    function score(candidate) {
      return [last.has(candidate.id) ? 1 : 0, seen[candidate.id] || 0,
        (topics.get(candidate.topic) || 0) + (difficulties.get(candidate.difficulty) || 0)];
    }
    function less(a, b) {
      for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return a[i] < b[i]; }
      return false;
    }
    while (selected.length < count) {
      var best = 0; var bestScore = score(candidates[0]);
      for (var i = 1; i < candidates.length; i++) {
        var candidateScore = score(candidates[i]);
        if (less(candidateScore, bestScore)) { best = i; bestScore = candidateScore; }
      }
      var chosen = candidates.splice(best, 1)[0];
      selected.push(chosen);
      topics.set(chosen.topic, (topics.get(chosen.topic) || 0) + 1);
      difficulties.set(chosen.difficulty, (difficulties.get(chosen.difficulty) || 0) + 1);
      seen[chosen.id] = (seen[chosen.id] || 0) + 1;
    }
    return { questions: selected.map(function (entry) { return entry.item; }),
      history: { seen: seen, last: selected.map(function (entry) { return entry.id; }) } };
  }

  function shuffleAnswers(options, answerIndex, rng) {
    if (!Array.isArray(options) || !Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) {
      throw new RangeError('answerIndex must reference an option');
    }
    var indexed = shuffle(options.map(function (option, index) { return { option: option, index: index }; }), rng || Math.random);
    return { options: indexed.map(function (entry) { return entry.option; }),
      answerIndex: indexed.findIndex(function (entry) { return entry.index === answerIndex; }) };
  }

  // SM-2-inspired, not an exact SM-2 implementation. Interval is in days;
  // due/lastReviewed are UTC epoch milliseconds. Again: 10 min, reset streak.
  // Good: 1d, 3d, then previous interval * ease. Hard: 1d or *1.2.
  // Easy: 4d initially, then at least 4d or *ease*1.3. Ease floor: 1.3.
  function schedule(previous, grade, now) {
    if (['again', 'hard', 'good', 'easy'].indexOf(grade) < 0) throw new TypeError('Unknown review grade');
    finite(now, 'now', 0);
    var old = previous || {};
    var interval = old.interval === undefined ? 0 : finite(old.interval, 'interval', 0);
    var ease = old.ease === undefined ? 2.5 : finite(old.ease, 'ease', 1.3);
    var repetitions = old.repetitions === undefined ? 0 : finite(old.repetitions, 'repetitions', 0);
    var lapses = old.lapses === undefined ? 0 : finite(old.lapses, 'lapses', 0);
    if (!Number.isInteger(repetitions) || !Number.isInteger(lapses)) throw new TypeError('Review counts must be integers');
    if (old.due !== undefined) finite(old.due, 'due', 0);
    if (old.lastReviewed !== undefined) finite(old.lastReviewed, 'lastReviewed', 0);
    if (grade === 'again') { interval = 10 / 1440; repetitions = 0; lapses++; ease = Math.max(1.3, ease - 0.2); }
    else {
      if (grade === 'hard') { interval = Math.max(1, interval * 1.2); ease = Math.max(1.3, ease - 0.15); }
      if (grade === 'good') interval = repetitions === 0 ? 1 : repetitions === 1 ? 3 : Math.max(1, interval * ease);
      if (grade === 'easy') { interval = Math.max(4, interval * ease * 1.3); ease += 0.15; }
      repetitions++;
    }
    var due = now + interval * DAY;
    finite(due, 'due', 0);
    return { due: due, interval: interval, ease: ease, repetitions: repetitions,
      lapses: lapses, lastReviewed: now, grade: grade };
  }

  // Return all cards: overdue first, then unseen, then future. Within each dated
  // group prioritize cards with more failures, followed by earliest due date.
  function dueCards(cards, config) {
    if (!Array.isArray(cards)) throw new TypeError('cards must be an array');
    config = config || {};
    var now = finite(config.now, 'now', 0);
    var records = config.records || {};
    var idOf = config.idOf || function (card) { return card.id; };
    return cards.map(function (card, index) {
      var id = stableId(idOf(card));
      var record = Object.prototype.hasOwnProperty.call(records, id) ? records[id] : undefined;
      if (record != null) {
        finite(record.due, 'due', 0);
        finite(record.lapses === undefined ? 0 : record.lapses, 'lapses', 0);
      }
      return { card: card, index: index, record: record,
        group: record == null ? 1 : record.due <= now ? 0 : 2 };
    }).sort(function (a, b) {
      return a.group - b.group || ((b.record && b.record.lapses || 0) - (a.record && a.record.lapses || 0)) ||
        ((a.record && a.record.due || 0) - (b.record && b.record.due || 0)) || a.index - b.index;
    }).map(function (entry) { return entry.card; });
  }

  return { selectQuestions: selectQuestions, shuffleAnswers: shuffleAnswers, schedule: schedule, dueCards: dueCards };
}));
