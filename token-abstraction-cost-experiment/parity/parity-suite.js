/**
 * Behavioural parity suite for the three full calculators: collocated-small,
 * collocated-big and abstracted-big.
 *
 * `abstracted-small` is a basic four-function calculator and cannot run these cases;
 * use `parity-suite-basic.js` for it.
 *
 * All three are driven purely through `window` keydown events and read back from
 * the first `<output>` element, so the same script runs unmodified against any of
 * them. Paste it into the browser console on http://localhost:5173
 * (abstracted-big), 5174 (collocated-small) and 5175 (collocated-big), then compare
 * the result objects — they must be identical key for key.
 *
 * Keyboard bindings, shared by all three:
 *   0-9 . digits      + - * / ^ operators     Enter or = equals
 *   Escape AC         Delete C                Backspace backspace
 *   s sin   c cos   t tan   l ln   g log   r sqrt   q x²   i 1/x   ! n!
 *   p pi    e euler  % percent                d toggle DEG/RAD   n 2nd shift
 */

const PARITY_CASES = {
  add: ['2', '+', '3', 'Enter'],
  chain: ['2', '+', '3', '*', '4', 'Enter'],
  opSwap: ['8', '+', '-', '3', 'Enter'],
  sqrt9: ['9', 'r'],
  sin30deg: ['3', '0', 's'],
  cos60deg: ['6', '0', 'c'],
  fact5: ['5', '!'],
  divzero: ['1', '/', '0', 'Enter'],
  pi: ['p'],
  euler: ['e'],
  square7: ['7', 'q'],
  recip8: ['8', 'i'],
  pow2_10: ['2', '^', '1', '0', 'Enter'],
  percent17: ['1', '7', '%'],
  log100: ['1', '0', '0', 'g'],
  ln1: ['1', 'l'],
  lnNeg: ['5', '_', 'l'],
  negate5: ['5', '_'],
  decimals: ['0', '.', '5', '+', '0', '.', '2', '5', 'Enter'],
  backspace: ['1', '2', '3', 'Backspace'],
  inverseSin: ['n', '0', '.', '5', 's'],
  radSinPi: ['d', 'p', 's'],
  grouping: ['1', '2', '3', '4', '5', '6', '7'],
  bigExp: ['9', '9', '9', '9', '9', '9', '*', '9', '9', '9', '9', '9', '9', 'Enter'],
  clearEntry: ['5', '+', '7', 'Delete', '9', 'Enter'],
  maxEntry: Array.from({ length: 20 }, () => '1'),
};

/** Verified identical on both calculators. */
const EXPECTED = {
  add: '5',
  chain: '20',
  opSwap: '5',
  sqrt9: '3',
  sin30deg: '0.5',
  cos60deg: '0.5',
  fact5: '120',
  divzero: 'Error',
  pi: '3.14159265359',
  euler: '2.71828182846',
  square7: '49',
  recip8: '0.125',
  pow2_10: '1,024',
  percent17: '0.17',
  log100: '2',
  ln1: '0',
  lnNeg: 'Error',
  negate5: '-5',
  decimals: '0.75',
  backspace: '12',
  inverseSin: '30',
  radSinPi: '-2.068231071e-13',
  grouping: '1,234,567',
  bigExp: '999,998,000,001',
  clearEntry: '14',
  maxEntry: '1.111111111e+15',
};

async function runParitySuite() {
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

  for (const [name, keys] of Object.entries(PARITY_CASES)) {
    const actual = await runCase(keys);
    results[name] = actual;
    if (EXPECTED[name] !== actual) failures.push(`${name}: expected ${EXPECTED[name]}, got ${actual}`);
  }

  console.table(results);
  console.log(failures.length === 0 ? 'PARITY OK (26/26)' : `PARITY FAILURES:\n${failures.join('\n')}`);
  return { results, failures };
}

await runParitySuite();
