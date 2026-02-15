import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { convertTemperature, getConversionFormula, type TemperatureUnit } from './calculations';
import { validateNumericInput, validateKelvinResult, parseNumericValue } from './validation';

export default function TemperatureConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('°C');
  const [toUnit, setToUnit] = useState<TemperatureUnit>('°F');
  
  const [inputError, setInputError] = useState('');
  const [resultError, setResultError] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setResultError('');
    if (value) {
      const validation = validateNumericInput(value, 'Temperature');
      setInputError(validation.isValid ? '' : validation.error || '');
    } else {
      setInputError('');
    }
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('°C');
    setToUnit('°F');
    setInputError('');
    setResultError('');
  };

  // Calculate result
  let result: number | null = null;
  let canCalculate = false;

  const inputNum = parseNumericValue(inputValue);

  if (inputNum !== null && !inputError) {
    const validation = validateNumericInput(inputValue, 'Temperature');
    
    if (validation.isValid) {
      const converted = convertTemperature(inputNum, fromUnit, toUnit);
      
      // Check if result is valid (especially for Kelvin)
      if (toUnit === 'K') {
        const kelvinValidation = validateKelvinResult(converted);
        if (!kelvinValidation.isValid) {
          setResultError(kelvinValidation.error || '');
        } else {
          canCalculate = true;
          result = converted;
        }
      } else {
        canCalculate = true;
        result = converted;
      }
    }
  }

  const formula = getConversionFormula(fromUnit, toUnit);

  return (
    <div className="calculator-section">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Temperature Converter</h3>
        <div className="formula-display">
          <span className="font-semibold">Formula:</span> {formula}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Input Temperature</CardTitle>
            <CardDescription>Enter value and select units</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="temp-input">Temperature Value</Label>
              <Input
                id="temp-input"
                type="number"
                placeholder="Enter temperature"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                className={inputError ? 'border-destructive' : ''}
              />
              {inputError && <p className="text-sm text-destructive">{inputError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-unit">From Unit</Label>
              <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as TemperatureUnit)}>
                <SelectTrigger id="from-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="°C">Celsius (°C)</SelectItem>
                  <SelectItem value="°F">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="K">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-unit">To Unit</Label>
              <Select value={toUnit} onValueChange={(v) => setToUnit(v as TemperatureUnit)}>
                <SelectTrigger id="to-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="°C">Celsius (°C)</SelectItem>
                  <SelectItem value="°F">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="K">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Converted Result</CardTitle>
            <CardDescription>Temperature in target unit</CardDescription>
          </CardHeader>
          <CardContent>
            {!canCalculate ? (
              <div className="result-display text-center text-muted-foreground">
                {inputError || resultError ? (resultError || 'Fix inputs to calculate') : 'Enter value to convert'}
              </div>
            ) : result !== null ? (
              <div className="result-display">
                <div className="text-sm text-muted-foreground mb-1">Result</div>
                <div className="numeric-display text-3xl font-bold text-primary">
                  {result.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
                <div className="text-lg text-muted-foreground mt-2">{toUnit}</div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
