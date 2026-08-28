/**
 * Reduced parity suite for `abstracted-small`.
 *
 * That app is deliberately a basic four-function calculator, so the 26-case suite in
 * `parity-suite.js` cannot run against it — there is no trigonometry, no logarithms,
 * no constants and no history to exercise. These 12 cases cover everything it does
 * have, and every one of them is also passed by the three full calculators, so the
 * shared behaviour really is shared.
 *
 * Paste into the browser console on http://localhost:5176.
 *
 * Keyboard bindings: 0-9 . digits   + - * / operators   Enter or = equals
 *                    Escape AC      Delete C            Backspace backspace
 *                    _ sign toggle
 */

const BASIC_CASES = {
  add: ['2', '+', '3', 'Enter'],
  chain: ['2', '+', '3', '*', '4', 'Enter'],
  opSwap: ['8', '+', '-', '3', 'Enter'],
  divzero: ['1', '/', '0', 'Enter'],
  decimals: ['0', '.', '5', '+', '0', '.', '2', '5', 'Enter'],
  backspace: ['1', '2', '3', 'Backspace'],
  negateTyping: ['5', '_'],
  negateSettled: ['5', 'Enter', '_'],
  grouping: ['1', '2', '3', '4', '5', '6', '7'],
  bigExp: ['9', '9', '9', '9', '9', '9', '*', '9', '9', '9', '9', '9', '9', 'Enter'],
  clearEntry: ['5', '+', '7', 'Delete', '9', 'Enter'],
  maxEntry: Array.from({ length: 20 }, () => '1'),
};

/** Verified identical on all four apps. */
const BASIC_EXPECTED = {
  add: '5',
  chain: '20',
  opSwap: '5',
  divzero: 'Error',
  decimals: '0.75',
  backspace: '12',
  negateTyping: '-5',
  negateSettled: '-5',
  grouping: '1,234,567',
  bigExp: '999,998,000,001',
  clearEntry: '14',
  maxEntry: '1.111111111e+15',
};

async function runBasicParitySuite() {
  const readDisplay = () => document.querySelector('output').textContent.trim();
  const settle = () => new Promise((resolve) => setTimeout(resolve, 25));

  const press = async (key) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    await settle();
  };

  const runCase = async (keys) => {
    await press('Escape');
    for (const key of keys) await press(key);
    return readDisplay();
  };

  const results = {};
  const failures = [];

  for (const [name, keys] of Object.entries(BASIC_CASES)) {
    const actual = await runCase(keys);
    results[name] = actual;
    if (BASIC_EXPECTED[name] !== actual) {
      failures.push(`${name}: expected ${BASIC_EXPECTED[name]}, got ${actual}`);
    }
  }

  console.table(results);
  console.log(failures.length === 0 ? 'PARITY OK (12/12)' : `PARITY FAILURES:\n${failures.join('\n')}`);
  return { results, failures };
}

await runBasicParitySuite();
