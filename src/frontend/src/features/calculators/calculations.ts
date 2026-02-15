// Pressure calculations: P = F / A
export interface PressureInputs {
  force: number;
  forceUnit: 'N' | 'kN';
  area: number;
  areaUnit: 'm²' | 'cm²';
}

export interface PressureResult {
  pa: number;
  kpa: number;
}

export function calculatePressure(inputs: PressureInputs): PressureResult {
  // Convert force to Newtons
  const forceInN = inputs.forceUnit === 'kN' ? inputs.force * 1000 : inputs.force;
  
  // Convert area to square meters
  const areaInM2 = inputs.areaUnit === 'cm²' ? inputs.area / 10000 : inputs.area;
  
  // Calculate pressure in Pascals (Pa = N/m²)
  const pressureInPa = forceInN / areaInM2;
  
  return {
    pa: pressureInPa,
    kpa: pressureInPa / 1000
  };
}

// Temperature conversions
export type TemperatureUnit = '°C' | '°F' | 'K';

export interface TemperatureConversion {
  value: number;
  unit: TemperatureUnit;
}

export function convertTemperature(
  value: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): number {
  if (fromUnit === toUnit) return value;
  
  // First convert to Celsius as intermediate
  let celsius: number;
  
  switch (fromUnit) {
    case '°C':
      celsius = value;
      break;
    case '°F':
      celsius = (value - 32) * (5 / 9);
      break;
    case 'K':
      celsius = value - 273.15;
      break;
  }
  
  // Then convert from Celsius to target unit
  switch (toUnit) {
    case '°C':
      return celsius;
    case '°F':
      return celsius * (9 / 5) + 32;
    case 'K':
      return celsius + 273.15;
  }
}

export function getConversionFormula(fromUnit: TemperatureUnit, toUnit: TemperatureUnit): string {
  if (fromUnit === toUnit) return `${toUnit} = ${fromUnit}`;
  
  const formulas: Record<string, string> = {
    '°C-°F': '°F = °C × 9/5 + 32',
    '°F-°C': '°C = (°F - 32) × 5/9',
    '°C-K': 'K = °C + 273.15',
    'K-°C': '°C = K - 273.15',
    '°F-K': 'K = (°F - 32) × 5/9 + 273.15',
    'K-°F': '°F = (K - 273.15) × 9/5 + 32'
  };
  
  return formulas[`${fromUnit}-${toUnit}`] || '';
}

// Flow calculations: Q = V / t
export interface FlowInputs {
  volume: number;
  volumeUnit: 'm³' | 'L';
  time: number;
  timeUnit: 's' | 'min';
}

export interface FlowResult {
  m3PerS: number;
  lPerS: number;
}

export function calculateFlow(inputs: FlowInputs): FlowResult {
  // Convert volume to cubic meters
  const volumeInM3 = inputs.volumeUnit === 'L' ? inputs.volume / 1000 : inputs.volume;
  
  // Convert time to seconds
  const timeInS = inputs.timeUnit === 'min' ? inputs.time * 60 : inputs.time;
  
  // Calculate flow rate in m³/s
  const flowInM3PerS = volumeInM3 / timeInS;
  
  return {
    m3PerS: flowInM3PerS,
    lPerS: flowInM3PerS * 1000
  };
}
