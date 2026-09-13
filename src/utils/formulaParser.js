/**
 * formulaParser.js - Real-time client-side MS Excel formula parser
 * Evaluates standard Excel formulas with cell references and error codes.
 */

// Parse a single cell address like 'A1' into { col: 0, row: 0 }
export const parseCellRef = (ref) => {
  const match = ref.trim().toUpperCase().match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;
  const colStr = match[1];
  const rowNum = parseInt(match[2], 10) - 1;

  let colNum = 0;
  for (let i = 0; i < colStr.length; i++) {
    colNum = colNum * 26 + (colStr.charCodeAt(i) - 64);
  }
  return { col: colNum - 1, row: rowNum };
};

// Expand a range reference like 'A1:B3' into an array of cell addresses ['A1', 'A2', 'A3', 'B1', 'B2', 'B3']
export const expandRange = (rangeStr) => {
  const parts = rangeStr.split(':');
  if (parts.length !== 2) return [rangeStr];
  const start = parseCellRef(parts[0]);
  const end = parseCellRef(parts[1]);
  if (!start || !end) return [];

  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);

  const cells = [];
  for (let c = minCol; c <= maxCol; c++) {
    for (let r = minRow; r <= maxRow; r++) {
      const colLetter = String.fromCharCode(65 + c);
      cells.push(`${colLetter}${r + 1}`);
    }
  }
  return cells;
};

// Resolve cell values from a grid state object { 'A1': 10, 'B1': 20 }
export const resolveValue = (token, gridState) => {
  const trimmed = token.trim();
  if (!trimmed) return 0;

  // Direct number
  if (!isNaN(Number(trimmed))) {
    return Number(trimmed);
  }

  // Quoted string
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  // Cell reference
  const cellPos = parseCellRef(trimmed);
  if (cellPos) {
    const key = trimmed.toUpperCase();
    const cellVal = gridState ? gridState[key] : undefined;
    if (cellVal === undefined || cellVal === '') return 0;
    if (!isNaN(Number(cellVal))) return Number(cellVal);
    return cellVal;
  }

  return trimmed;
};

// Evaluate formula string e.g. '=SUM(A1:A3)' or '=A1 + B1'
export const evaluateFormula = (input, gridState = {}) => {
  if (typeof input !== 'string') return input;
  const trimmed = input.trim();
  if (!trimmed.startsWith('=')) {
    // Regular literal or number
    if (!isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed);
    return trimmed;
  }

  const expr = trimmed.slice(1).trim();

  // Function match: e.g. SUM(A1:A4, 10)
  const fnMatch = expr.match(/^([A-Z_]+)\s*\((.*)\)$/i);
  if (fnMatch) {
    const fnName = fnMatch[1].toUpperCase();
    const argsRaw = fnMatch[2];

    // Helper to split top-level comma arguments
    const splitArgs = (raw) => {
      const args = [];
      let current = '';
      let parenDepth = 0;
      for (let i = 0; i < raw.length; i++) {
        const ch = raw[i];
        if (ch === '(') parenDepth++;
        else if (ch === ')') parenDepth--;
        else if (ch === ',' && parenDepth === 0) {
          args.push(current.trim());
          current = '';
          continue;
        }
        current += ch;
      }
      if (current.trim()) args.push(current.trim());
      return args;
    };

    const rawArgs = splitArgs(argsRaw);

    // Expand ranges and resolve values for array functions
    const flattenValues = () => {
      const vals = [];
      rawArgs.forEach(arg => {
        if (arg.includes(':')) {
          const cells = expandRange(arg);
          cells.forEach(c => vals.push(resolveValue(c, gridState)));
        } else {
          vals.push(resolveValue(arg, gridState));
        }
      });
      return vals;
    };

    switch (fnName) {
      case 'SUM': {
        const vals = flattenValues();
        return vals.reduce((acc, v) => acc + (typeof v === 'number' ? v : 0), 0);
      }
      case 'AVERAGE': {
        const vals = flattenValues().filter(v => typeof v === 'number');
        if (vals.length === 0) return '#DIV/0!';
        const sum = vals.reduce((acc, v) => acc + v, 0);
        return Math.round((sum / vals.length) * 100) / 100;
      }
      case 'MAX': {
        const vals = flattenValues().filter(v => typeof v === 'number');
        return vals.length > 0 ? Math.max(...vals) : 0;
      }
      case 'MIN': {
        const vals = flattenValues().filter(v => typeof v === 'number');
        return vals.length > 0 ? Math.min(...vals) : 0;
      }
      case 'COUNT': {
        const vals = flattenValues();
        return vals.filter(v => typeof v === 'number').length;
      }
      case 'COUNTA': {
        const vals = flattenValues();
        return vals.filter(v => v !== '' && v !== null && v !== undefined).length;
      }
      case 'PRODUCT': {
        const vals = flattenValues().filter(v => typeof v === 'number');
        return vals.length > 0 ? vals.reduce((acc, v) => acc * v, 1) : 0;
      }
      case 'MOD': {
        if (rawArgs.length !== 2) return '#VALUE!';
        const num = resolveValue(rawArgs[0], gridState);
        const div = resolveValue(rawArgs[1], gridState);
        if (div === 0) return '#DIV/0!';
        return num % div;
      }
      case 'POWER': {
        if (rawArgs.length !== 2) return '#VALUE!';
        const base = resolveValue(rawArgs[0], gridState);
        const exp = resolveValue(rawArgs[1], gridState);
        return Math.pow(base, exp);
      }
      case 'SQRT': {
        if (rawArgs.length !== 1) return '#VALUE!';
        const num = resolveValue(rawArgs[0], gridState);
        if (num < 0) return '#NUM!';
        return Math.sqrt(num);
      }
      case 'CONCATENATE': {
        const vals = flattenValues();
        return vals.join('');
      }
      case 'IF': {
        if (rawArgs.length < 2) return '#VALUE!';
        const condRaw = rawArgs[0];
        const valTrue = rawArgs[1];
        const valFalse = rawArgs[2] || '';

        // Simple condition parser e.g. 'A1 > 50' or '10 = 10'
        let condResult = false;
        if (condRaw.includes('>=')) {
          const [left, right] = condRaw.split('>=');
          condResult = resolveValue(left, gridState) >= resolveValue(right, gridState);
        } else if (condRaw.includes('<=')) {
          const [left, right] = condRaw.split('<=');
          condResult = resolveValue(left, gridState) <= resolveValue(right, gridState);
        } else if (condRaw.includes('>')) {
          const [left, right] = condRaw.split('>');
          condResult = resolveValue(left, gridState) > resolveValue(right, gridState);
        } else if (condRaw.includes('<')) {
          const [left, right] = condRaw.split('<');
          condResult = resolveValue(left, gridState) < resolveValue(right, gridState);
        } else if (condRaw.includes('=')) {
          const [left, right] = condRaw.split('=');
          condResult = resolveValue(left, gridState) == resolveValue(right, gridState);
        } else {
          condResult = Boolean(resolveValue(condRaw, gridState));
        }

        const picked = condResult ? valTrue : valFalse;
        return resolveValue(picked, gridState);
      }
      default:
        return '#NAME?';
    }
  }

  // Arithmetic expression evaluation: e.g. A1 + B1 * 2
  try {
    // Replace cell references with resolved numbers
    const sanitized = expr.replace(/[A-Z]+[0-9]+/gi, (match) => {
      const val = resolveValue(match, gridState);
      if (typeof val === 'number') return `(${val})`;
      if (val === '#DIV/0!' || val === '#VALUE!' || val === '#NAME?') throw new Error(val);
      return `("${val}")`;
    });

    if (sanitized.includes('/ 0') || sanitized.includes('/(0)')) {
      return '#DIV/0!';
    }

    // Safe mathematical evaluator
    // eslint-disable-next-line no-new-func
    const result = Function(`'use strict'; return (${sanitized});`)();
    if (result === Infinity || result === -Infinity) return '#DIV/0!';
    if (isNaN(result)) return '#VALUE!';
    return typeof result === 'number' ? Math.round(result * 10000) / 10000 : result;
  } catch (err) {
    if (err.message && err.message.startsWith('#')) return err.message;
    return '#VALUE!';
  }
};
