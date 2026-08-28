import { createKeyDescriptor } from '../factories/createKeyDescriptor';
import type { KeypadSectionDescriptor } from '../types/ui.types';
import { ARIA_LABELS } from './aria.constants';

export const KEYPAD_SECTIONS: readonly KeypadSectionDescriptor[] = [
  {
    id: 'memory',
    title: ARIA_LABELS.memorySection,
    columns: 4,
    keys: [
      createKeyDescriptor({
        id: 'memory-clear',
        label: 'MC',
        ariaLabel: 'Memory clear',
        tone: 'function',
        action: { type: 'applyMemoryOperation', operation: 'clear' },
      }),
      createKeyDescriptor({
        id: 'memory-recall',
        label: 'MR',
        ariaLabel: 'Memory recall',
        tone: 'function',
        action: { type: 'applyMemoryOperation', operation: 'recall' },
      }),
      createKeyDescriptor({
        id: 'memory-add',
        label: 'M+',
        ariaLabel: 'Memory add',
        tone: 'function',
        action: { type: 'applyMemoryOperation', operation: 'add' },
      }),
      createKeyDescriptor({
        id: 'memory-subtract',
        label: 'M−',
        ariaLabel: 'Memory subtract',
        tone: 'function',
        action: { type: 'applyMemoryOperation', operation: 'subtract' },
      }),
    ],
  },
  {
    id: 'numeric',
    title: ARIA_LABELS.numericSection,
    columns: 4,
    keys: [
      createKeyDescriptor({
        id: 'clear-all',
        label: 'AC',
        ariaLabel: 'All clear',
        tone: 'danger',
        keyboardBindings: ['Escape'],
        action: { type: 'clearAll' },
      }),
      createKeyDescriptor({
        id: 'clear-entry',
        label: 'C',
        ariaLabel: 'Clear entry',
        tone: 'danger',
        keyboardBindings: ['Delete'],
        action: { type: 'clearEntry' },
      }),
      createKeyDescriptor({
        id: 'backspace',
        label: '⌫',
        ariaLabel: 'Backspace',
        tone: 'danger',
        keyboardBindings: ['Backspace'],
        action: { type: 'removeLastCharacter' },
      }),
      createKeyDescriptor({
        id: 'divide',
        label: '÷',
        ariaLabel: 'Divide',
        tone: 'operator',
        keyboardBindings: ['/'],
        action: { type: 'applyBinaryOperator', operator: 'divide' },
      }),

      createKeyDescriptor({ id: 'digit-7', label: '7', keyboardBindings: ['7'], action: { type: 'appendDigit', digit: '7' } }),
      createKeyDescriptor({ id: 'digit-8', label: '8', keyboardBindings: ['8'], action: { type: 'appendDigit', digit: '8' } }),
      createKeyDescriptor({ id: 'digit-9', label: '9', keyboardBindings: ['9'], action: { type: 'appendDigit', digit: '9' } }),
      createKeyDescriptor({
        id: 'multiply',
        label: '×',
        ariaLabel: 'Multiply',
        tone: 'operator',
        keyboardBindings: ['*'],
        action: { type: 'applyBinaryOperator', operator: 'multiply' },
      }),

      createKeyDescriptor({ id: 'digit-4', label: '4', keyboardBindings: ['4'], action: { type: 'appendDigit', digit: '4' } }),
      createKeyDescriptor({ id: 'digit-5', label: '5', keyboardBindings: ['5'], action: { type: 'appendDigit', digit: '5' } }),
      createKeyDescriptor({ id: 'digit-6', label: '6', keyboardBindings: ['6'], action: { type: 'appendDigit', digit: '6' } }),
      createKeyDescriptor({
        id: 'subtract',
        label: '−',
        ariaLabel: 'Subtract',
        tone: 'operator',
        keyboardBindings: ['-'],
        action: { type: 'applyBinaryOperator', operator: 'subtract' },
      }),

      createKeyDescriptor({ id: 'digit-1', label: '1', keyboardBindings: ['1'], action: { type: 'appendDigit', digit: '1' } }),
      createKeyDescriptor({ id: 'digit-2', label: '2', keyboardBindings: ['2'], action: { type: 'appendDigit', digit: '2' } }),
      createKeyDescriptor({ id: 'digit-3', label: '3', keyboardBindings: ['3'], action: { type: 'appendDigit', digit: '3' } }),
      createKeyDescriptor({
        id: 'add',
        label: '+',
        ariaLabel: 'Add',
        tone: 'operator',
        keyboardBindings: ['+'],
        action: { type: 'applyBinaryOperator', operator: 'add' },
      }),

      createKeyDescriptor({
        id: 'toggle-sign',
        label: '±',
        ariaLabel: 'Toggle sign',
        keyboardBindings: ['_'],
        action: { type: 'toggleSign' },
      }),
      createKeyDescriptor({ id: 'digit-0', label: '0', keyboardBindings: ['0'], action: { type: 'appendDigit', digit: '0' } }),
      createKeyDescriptor({
        id: 'decimal-separator',
        label: '.',
        ariaLabel: 'Decimal point',
        keyboardBindings: ['.', ','],
        action: { type: 'appendDecimalSeparator' },
      }),
      createKeyDescriptor({
        id: 'evaluate',
        label: '=',
        ariaLabel: 'Equals',
        tone: 'accent',
        keyboardBindings: ['Enter', '='],
        action: { type: 'evaluateExpression' },
      }),
    ],
  },
];

export const ALL_KEY_DESCRIPTORS = KEYPAD_SECTIONS.flatMap((section) => section.keys);
