import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Thermometer, Droplets } from 'lucide-react';
import PressureCalculator from './features/calculators/PressureCalculator';
import TemperatureConverter from './features/calculators/TemperatureConverter';
import FlowCalculator from './features/calculators/FlowCalculator';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-xs">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Engineering Calculator</h1>
              <p className="text-sm text-muted-foreground">Pressure, Temperature & Flow Calculations</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-industrial">
          <CardHeader>
            <CardTitle>Calculator Tools</CardTitle>
            <CardDescription>
              Select a calculator below to perform engineering calculations with unit conversions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pressure" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="pressure" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span className="hidden sm:inline">Pressure</span>
                </TabsTrigger>
                <TabsTrigger value="temperature" className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  <span className="hidden sm:inline">Temperature</span>
                </TabsTrigger>
                <TabsTrigger value="flow" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  <span className="hidden sm:inline">Flow</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pressure" className="mt-0">
                <PressureCalculator />
              </TabsContent>

              <TabsContent value="temperature" className="mt-0">
                <TemperatureConverter />
              </TabsContent>

              <TabsContent value="flow" className="mt-0">
                <FlowCalculator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <p>
              Built with love using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'engineering-calculator'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs">© {new Date().getFullYear()} Engineering Calculator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
