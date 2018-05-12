const journals = require('./journals');

const findJournal = function(str) {
  return str.search(new RegExp(journals.join('|')));
}

const findYear = function(str) {
  return str.search(new RegExp('\\d{4}'));
}

const findPage = function(str) {
  return str.search(new RegExp('[0-9-]+\\.$'));
}

const findLastDot = function(str) {
  return str.search(new RegExp('\\. [A-Za-z]{2,}'));
}

window.ReferenceConverter = {
  convert: function(config) {
    if (!config || !config.data) {
      return { error: 'INVALID_INPUT' };
    }
    const data = config.data;
    let result = '';
    const rows = data.split('\n');
    const idx = new Array(rows.length);
    const ref = new Array(rows.length);
    for (i = 0; i < rows.length; i++) {
      switch (config.mode) {
        case 'acs2wirey':
          acs2wirey(rows[i], i);
          break;
        case 'wirey2acs':
          wirey2acs(rows[i], i);
          break;
        case 'format':
          format(rows[i], i);
          break;
      }
    }

    function style() {
      result += '<em>' + ref[i].substr(0, findYear(ref[i])) + '</em>';
      result += '<strong>' + ref[i].substr(findYear(ref[i]), 4) + '</strong>, ';
      result += '<em>' + ref[i].substring(findYear(ref[i]) + 6, findPage(ref[i]) - 2) + '</em>, ';
      result += ref[i].substr(findPage(ref[i])) + '<br>';
    }

    function format(row, i) {
      const fj = findJournal(row);
      ref[i] = row.substr(fj);
      result += row.substr(0, fj);
      style();
    }

    function acs2wirey(row, i) {
      const cols = row.split(';');

      // set leading number to idx[i]
      if (cols[0].indexOf(')') >= 0 && cols[0].indexOf(')') < 5) {
        idx[i] = cols[0].substr(0, cols[0].indexOf(')') + 1);
        cols[0] = cols[0].substr(cols[0].indexOf(')') + 1);
      } else if (cols[0].indexOf(']') >= 0 && cols[0].indexOf(']') < 5) {
        idx[i] = cols[0].substr(0, cols[0].indexOf(']') + 1);
        cols[0] = cols[0].substr(cols[0].indexOf(']') + 1);
      } else {
        idx[i] = '';
      }

      // set reference string to ref[i]
      const fj = findJournal(cols[cols.length - 1]);
      ref[i] = cols[cols.length - 1].substr(fj);
      cols[cols.length - 1] = cols[cols.length - 1].substr(0, fj);

      // append converted result
      if (idx[i] != '')
        result += idx[i] + ' ';
      for (let j = 0; j < cols.length; j++) {
        const names = cols[j].split(',');
        result += names[1] + ' ' + names[0] + ', ';
      }
      style();
    }

    function wirey2acs(row, i) {
      // set reference seting to ref[i]
      const fj = findJournal(row);
      ref[i] = row.substr(fj);
      row = row.substr(0, fj);

      // set leading number to idx[i]
      if (row.indexOf(')') >= 0 && row.indexOf(')') < 5) {
        idx[i] = row.substr(0, row.indexOf(')') + 1);
        row = row.substr(row.indexOf(')') + 1);
      } else if (row.indexOf(']') >= 0 && row.indexOf(']') < 5) {
        idx[i] = row.substr(0, row.indexOf(']') + 1);
        row = row.substr(row.indexOf(']') + 1);
      } else {
        idx[i] = '';
      }

      const cols = row.split(',');

      // append converted result
      if (idx[i] != '')
        result += idx[i] + ' ';
      for (let j = 0; j < cols.length - 1; j++) {
        result += cols[j].substr(findLastDot(cols[j]) + 2) + ', ' + cols[j].substr(0, findLastDot(cols[j])) + '.; ';
      }
      result = result.substr(0, result.length - 2) + ' ';
      style();
    }
    return { error: null, output: result };
  },
};
