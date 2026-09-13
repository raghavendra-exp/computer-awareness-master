/**
 * questionGenerator.js - Dynamic procedural drill generator
 * Produces infinite randomized drills for port numbers, keyboard shortcuts, and binary conversions.
 */

export const generatePortDrill = (masterPortList) => {
  if (!masterPortList || masterPortList.length === 0) return null;
  const target = masterPortList[Math.floor(Math.random() * masterPortList.length)];
  
  // Pick 3 random wrong options
  const otherPorts = masterPortList
    .filter(p => p.port !== target.port)
    .map(p => p.port);
  
  const shuffledOthers = otherPorts.sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = [target.port, ...shuffledOthers].sort(() => 0.5 - Math.random());
  
  return {
    id: `DRILL-PORT-${Date.now()}`,
    protocol: target.protocol,
    transport: target.transport,
    description: target.desc,
    correctPort: target.port,
    options,
    prompt: `What is the standard transport port number for ${target.protocol} (${target.transport})?`
  };
};

export const generateBinaryDrill = () => {
  const decimal = Math.floor(Math.random() * 255) + 1;
  const binary = decimal.toString(2);
  
  // Generate distractors
  const distractors = new Set();
  while (distractors.size < 3) {
    const delta = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const candidate = Math.max(1, decimal + delta);
    if (candidate !== decimal) {
      distractors.add(candidate.toString(2));
    }
  }
  
  const options = [binary, ...Array.from(distractors)].sort(() => 0.5 - Math.random());
  
  return {
    id: `DRILL-BIN-${Date.now()}`,
    decimal,
    correctBinary: binary,
    options,
    prompt: `Convert decimal number ${decimal} into its exact 8-bit/standard binary representation:`
  };
};

export const generateShortcutDrill = (shortcutsList) => {
  if (!shortcutsList || shortcutsList.length === 0) return null;
  const target = shortcutsList[Math.floor(Math.random() * shortcutsList.length)];
  
  const otherActions = shortcutsList
    .filter(s => s.action !== target.action)
    .map(s => s.action);
  
  const shuffledOthers = otherActions.sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = [target.action, ...shuffledOthers].sort(() => 0.5 - Math.random());
  
  return {
    id: `DRILL-KEY-${Date.now()}`,
    keys: target.keys,
    correctAction: target.action,
    category: target.category,
    options,
    prompt: `What action is executed when pressing the shortcut '${target.keys}'?`
  };
};
