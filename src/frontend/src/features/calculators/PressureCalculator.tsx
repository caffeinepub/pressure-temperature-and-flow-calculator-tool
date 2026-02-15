import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { calculatePressure, type PressureInputs, type PressureResult } from './calculations';
import { validateNumericInput, validatePositiveNumber, parseNumericValue } from './validation';

export default function PressureCalculator() {
  const [force, setForce] = useState('');
  const [forceUnit, setForceUnit] = useState<'N' | 'kN'>('N');
  const [area, setArea] = useState('');
  const [areaUnit, setAreaUnit] = useState<'m²' | 'cm²'>('m²');
  
  const [forceError, setForceError] = useState('');
  const [areaError, setAreaError] = useState('');

  const handleForceChange = (value: string) => {
    setForce(value);
    if (value) {
      const validation = validateNumericInput(value, 'Force');
      setForceError(validation.isValid ? '' : validation.error || '');
    } else {
      setForceError('');
    }
  };

  const handleAreaChange = (value: string) => {
    setArea(value);
    if (value) {
      const validation = validatePositiveNumber(value, 'Area');
      setAreaError(validation.isValid ? '' : validation.error || '');
    } else {
      setAreaError('');
    }
  };

  const handleReset = () => {
    setForce('');
    setArea('');
    setForceUnit('N');
    setAreaUnit('m²');
    setForceError('');
    setAreaError('');
  };

  // Calculate result
  let result: PressureResult | null = null;
  let canCalculate = false;

  const forceNum = parseNumericValue(force);
  const areaNum = parseNumericValue(area);

  if (forceNum !== null && areaNum !== null && !forceError && !areaError) {
    const forceValidation = validateNumericInput(force, 'Force');
    const areaValidation = validatePositiveNumber(area, 'Area');
    
    if (forceValidation.isValid && areaValidation.isValid) {
      canCalculate = true;
      const inputs: PressureInputs = {
        force: forceNum,
        forceUnit,
        area: areaNum,
        areaUnit
      };
      result = calculatePressure(inputs);
    }
  }

  return (
    <div className="calculator-section">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pressure Calculator</h3>
        <div className="formula-display">
          <span className="font-semibold">Formula:</span> P = F / A
          <span className="block text-xs mt-1">
            (Pressure = Force / Area)
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Input Parameters</CardTitle>
            <CardDescription>Enter force and area values</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="force">Force (F)</Label>
              <div className="flex gap-2">
                <Input
                  id="force"
                  type="number"
                  placeholder="Enter force"
                  value={force}
                  onChange={(e) => handleForceChange(e.target.value)}
                  className={forceError ? 'border-destructive' : ''}
                />
                <Select value={forceUnit} onValueChange={(v) => setForceUnit(v as 'N' | 'kN')}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="N">N</SelectItem>
                    <SelectItem value="kN">kN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {forceError && <p className="text-sm text-destructive">{forceError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (A)</Label>
              <div className="flex gap-2">
                <Input
                  id="area"
                  type="number"
                  placeholder="Enter area"
                  value={area}
                  onChange={(e) => handleAreaChange(e.target.value)}
                  className={areaError ? 'border-destructive' : ''}
                />
                <Select value={areaUnit} onValueChange={(v) => setAreaUnit(v as 'm²' | 'cm²')}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m²">m²</SelectItem>
                    <SelectItem value="cm²">cm²</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {areaError && <p className="text-sm text-destructive">{areaError}</p>}
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Results</CardTitle>
            <CardDescription>Calculated pressure values</CardDescription>
          </CardHeader>
          <CardContent>
            {!canCalculate ? (
              <div className="result-display text-center text-muted-foreground">
                {forceError || areaError ? 'Fix inputs to calculate' : 'Enter values to calculate'}
              </div>
            ) : result ? (
              <div className="space-y-3">
                <div className="result-display">
                  <div className="text-sm text-muted-foreground mb-1">Pressure (Pa)</div>
                  <div className="numeric-display text-2xl font-bold text-primary">
                    {result.pa.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Pascals</div>
                </div>
                <div className="result-display">
                  <div className="text-sm text-muted-foreground mb-1">Pressure (kPa)</div>
                  <div className="numeric-display text-2xl font-bold text-primary">
                    {result.kpa.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Kilopascals</div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
