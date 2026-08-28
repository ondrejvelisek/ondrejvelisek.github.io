import { AngleConverter } from './converters/AngleConverter';
import { AreaConverter } from './converters/AreaConverter';
import { DataConverter } from './converters/DataConverter';
import { DensityConverter } from './converters/DensityConverter';
import { EnergyConverter } from './converters/EnergyConverter';
import { FrequencyConverter } from './converters/FrequencyConverter';
import { FuelConverter } from './converters/FuelConverter';
import { LengthConverter } from './converters/LengthConverter';
import { MassConverter } from './converters/MassConverter';
import { PowerConverter } from './converters/PowerConverter';
import { PressureConverter } from './converters/PressureConverter';
import { SpeedConverter } from './converters/SpeedConverter';
import { TemperatureConverter } from './converters/TemperatureConverter';
import { TimeConverter } from './converters/TimeConverter';
import { VolumeConverter } from './converters/VolumeConverter';

export function ConverterPanel() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <LengthConverter />
      <MassConverter />
      <TemperatureConverter />
      <AreaConverter />
      <VolumeConverter />
      <SpeedConverter />
      <TimeConverter />
      <DataConverter />
      <PressureConverter />
      <EnergyConverter />
      <AngleConverter />
      <PowerConverter />
      <FrequencyConverter />
      <FuelConverter />
      <DensityConverter />
    </div>
  );
}
