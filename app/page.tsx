"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Radio, Zap, Antenna, MapPin, Cloud } from "lucide-react"
import { InstallPrompt } from "@/components/install-prompt"
import { DeviceInfo } from "@/components/device-info"

interface LinkBudgetParams {
  transmitPower: number
  transmitGain: number
  receiveGain: number
  frequency: number
  distance: number
  atmosphericLoss: number
}

export default function MmWaveLinkBudgetCalculator() {
  const [params, setParams] = useState<LinkBudgetParams>({
    transmitPower: 20,
    transmitGain: 25,
    receiveGain: 25,
    frequency: 28,
    distance: 1,
    atmosphericLoss: 2,
  })

  const [results, setResults] = useState({
    pathLoss: 0,
    receivedPower: 0,
  })

  // Calculate path loss and received power
  useEffect(() => {
    // Free space path loss formula: PL = 20*log10(d) + 20*log10(f) + 92.45
    const pathLoss = 20 * Math.log10(params.distance) + 20 * Math.log10(params.frequency) + 92.45

    // Link budget formula: Pr = Pt + Gt + Gr - PL - La
    const receivedPower =
      params.transmitPower + params.transmitGain + params.receiveGain - pathLoss - params.atmosphericLoss

    setResults({
      pathLoss: Math.round(pathLoss * 100) / 100,
      receivedPower: Math.round(receivedPower * 100) / 100,
    })
  }, [params])

  const handleInputChange = (field: keyof LinkBudgetParams, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setParams((prev) => ({
      ...prev,
      [field]: numValue,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2 sm:gap-3">
            <Radio className="h-6 w-6 sm:h-10 sm:w-10 text-blue-600" />
            <span className="leading-tight">mmWave Link Budget Calculator</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 px-2">
            Calculate received power in millimeter wave communication systems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Input Parameters */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                System Parameters
              </CardTitle>
              <CardDescription>Enter the link budget parameters for your mmWave system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transmitPower" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Transmit Power (Pt)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="transmitPower"
                      type="number"
                      step="0.1"
                      value={params.transmitPower}
                      onChange={(e) => handleInputChange("transmitPower", e.target.value)}
                      className="flex-1 text-base" // Prevents zoom on iOS
                    />
                    <Badge variant="secondary">dBm</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmitGain" className="flex items-center gap-2">
                    <Antenna className="h-4 w-4" />
                    Transmit Antenna Gain (Gt)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="transmitGain"
                      type="number"
                      step="0.1"
                      value={params.transmitGain}
                      onChange={(e) => handleInputChange("transmitGain", e.target.value)}
                      className="flex-1 text-base" // Prevents zoom on iOS
                    />
                    <Badge variant="secondary">dBi</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receiveGain" className="flex items-center gap-2">
                    <Antenna className="h-4 w-4" />
                    Receive Antenna Gain (Gr)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="receiveGain"
                      type="number"
                      step="0.1"
                      value={params.receiveGain}
                      onChange={(e) => handleInputChange("receiveGain", e.target.value)}
                      className="flex-1 text-base" // Prevents zoom on iOS
                    />
                    <Badge variant="secondary">dBi</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency" className="flex items-center gap-2">
                    <Radio className="h-4 w-4" />
                    Operating Frequency (f)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="frequency"
                      type="number"
                      step="0.1"
                      value={params.frequency}
                      onChange={(e) => handleInputChange("frequency", e.target.value)}
                      className="flex-1 text-base" // Prevents zoom on iOS
                    />
                    <Badge variant="secondary">GHz</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distance" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Link Distance (d)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="distance"
                      type="number"
                      step="0.01"
                      value={params.distance}
                      onChange={(e) => handleInputChange("distance", e.target.value)}
                      className="flex-1 text-base" // Prevents zoom on iOS
                    />
                    <Badge variant="secondary">km</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="atmosphericLoss" className="flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    Atmospheric Loss (La)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="atmosphericLoss"
                      type="number"
                      step="0.1"
                      value={params.atmosphericLoss}
                      onChange={(e) => handleInputChange("atmosphericLoss", e.target.value)}
                      className="flex-1 text-base" // Prevents zoom on iOS
                    />
                    <Badge variant="secondary">dB</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Calculation Results</CardTitle>
                <CardDescription>Link budget analysis based on your parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium mb-1">Free Space Path Loss</div>
                  <div className="text-3xl font-bold text-blue-900">{results.pathLoss} dB</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium mb-1">Received Power (Pr)</div>
                  <div className="text-4xl font-bold text-green-900">{results.receivedPower} dBm</div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="font-medium">Link Budget Breakdown:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>Transmit Power:</div>
                    <div className="font-mono">+{params.transmitPower} dBm</div>
                    <div>TX Antenna Gain:</div>
                    <div className="font-mono">+{params.transmitGain} dBi</div>
                    <div>RX Antenna Gain:</div>
                    <div className="font-mono">+{params.receiveGain} dBi</div>
                    <div>Path Loss:</div>
                    <div className="font-mono">-{results.pathLoss} dB</div>
                    <div>Atmospheric Loss:</div>
                    <div className="font-mono">-{params.atmosphericLoss} dB</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Link Budget Formula</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <div className="mb-2">
                    <strong>Received Power:</strong>
                  </div>
                  <div className="mb-4">Pr = Pt + Gt + Gr - PL - La</div>
                  <div className="mb-2">
                    <strong>Free Space Path Loss:</strong>
                  </div>
                  <div>PL = 20×log₁₀(d) + 20×log₁₀(f) + 92.45</div>
                </div>
                <div className="mt-4 text-xs text-gray-500">Where d is distance in km, f is frequency in GHz</div>
              </CardContent>
            </Card>

            <DeviceInfo />
          </div>
        </div>

        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>About mmWave Link Budget Analysis</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>
              This tool calculates the received power in millimeter wave communication systems using the standard link
              budget equation. The calculation considers transmit power, antenna gains, free space path loss, and
              atmospheric losses.
            </p>
            <p>
              <strong>Key considerations for mmWave systems:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Higher frequencies (24-100 GHz) result in increased path loss</li>
              <li>Atmospheric absorption becomes significant, especially at certain frequencies</li>
              <li>High-gain antennas are typically required to overcome path loss</li>
              <li>Rain and atmospheric conditions can significantly impact link performance</li>
            </ul>
          </CardContent>
        </Card>
        <InstallPrompt />
      </div>
    </div>
  )
}
