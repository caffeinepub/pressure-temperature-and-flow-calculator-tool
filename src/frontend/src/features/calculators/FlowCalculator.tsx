import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { calculateFlow, type FlowInputs, type FlowResult } from './calculations';
import { validateNumericInput, validatePositiveNumber, parseNumericValue } from './validation';

export default function FlowCalculator() {
  const [volume, setVolume] = useState('');
  const [volumeUnit, setVolumeUnit] = useState<'m³' | 'L'>('L');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState<'s' | 'min'>('s');
  
  const [volumeError, setVolumeError] = useState('');
  const [timeError, setTimeError] = useState('');

  const handleVolumeChange = (value: string) => {
    setVolume(value);
    if (value) {
      const validation = validateNumericInput(value, 'Volume');
      setVolumeError(validation.isValid ? '' : validation.error || '');
    } else {
      setVolumeError('');
    }
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
    if (value) {
      const validation = validatePositiveNumber(value, 'Time');
      setTimeError(validation.isValid ? '' : validation.error || '');
    } else {
      setTimeError('');
    }
  };

  const handleReset = () => {
    setVolume('');
    setTime('');
    setVolumeUnit('L');
    setTimeUnit('s');
    setVolumeError('');
    setTimeError('');
  };

  // Calculate result
  let result: FlowResult | null = null;
  let canCalculate = false;

  const volumeNum = parseNumericValue(volume);
  const timeNum = parseNumericValue(time);

  if (volumeNum !== null && timeNum !== null && !volumeError && !timeError) {
    const volumeValidation = validateNumericInput(volume, 'Volume');
    const timeValidation = validatePositiveNumber(time, 'Time');
    
    if (volumeValidation.isValid && timeValidation.isValid) {
      canCalculate = true;
      const inputs: FlowInputs = {
        volume: volumeNum,
        volumeUnit,
        time: timeNum,
        timeUnit
      };
      result = calculateFlow(inputs);
    }
  }

  return (
    <div className="calculator-section">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Flow Rate Calculator</h3>
        <div className="formula-display">
          <span className="font-semibold">Formula:</span> Q = V / t
          <span className="block text-xs mt-1">
            (Flow Rate = Volume / Time)
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Input Parameters</CardTitle>
            <CardDescription>Enter volume and time values</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="volume">Volume (V)</Label>
              <div className="flex gap-2">
                <Input
                  id="volume"
                  type="number"
                  placeholder="Enter volume"
                  value={volume}
                  onChange={(e) => handleVolumeChange(e.target.value)}
                  className={volumeError ? 'border-destructive' : ''}
                />
                <Select value={volumeUnit} onValueChange={(v) => setVolumeUnit(v as 'm³' | 'L')}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m³">m³</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {volumeError && <p className="text-sm text-destructive">{volumeError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time (t)</Label>
              <div className="flex gap-2">
                <Input
                  id="time"
                  type="number"
                  placeholder="Enter time"
                  value={time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className={timeError ? 'border-destructive' : ''}
                />
                <Select value={timeUnit} onValueChange={(v) => setTimeUnit(v as 's' | 'min')}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s">s</SelectItem>
                    <SelectItem value="min">min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {timeError && <p className="text-sm text-destructive">{timeError}</p>}
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
            <CardDescription>Calculated flow rate values</CardDescription>
          </CardHeader>
          <CardContent>
            {!canCalculate ? (
              <div className="result-display text-center text-muted-foreground">
                {volumeError || timeError ? 'Fix inputs to calculate' : 'Enter values to calculate'}
              </div>
            ) : result ? (
              <div className="space-y-3">
                <div className="result-display">
                  <div className="text-sm text-muted-foreground mb-1">Flow Rate (m³/s)</div>
                  <div className="numeric-display text-2xl font-bold text-primary">
                    {result.m3PerS.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Cubic meters per second</div>
                </div>
                <div className="result-display">
                  <div className="text-sm text-muted-foreground mb-1">Flow Rate (L/s)</div>
                  <div className="numeric-display text-2xl font-bold text-primary">
                    {result.lPerS.toLocaleString('en-US', { maximumFractionDigits: 3 })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Liters per second</div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
