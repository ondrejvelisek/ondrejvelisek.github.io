import { CeilButton } from './buttons/CeilButton';
import { Exp2Button } from './buttons/Exp2Button';
import { FloorButton } from './buttons/FloorButton';
import { GoldenRatioButton } from './buttons/GoldenRatioButton';
import { HyperbolicCosButton } from './buttons/HyperbolicCosButton';
import { HyperbolicSinButton } from './buttons/HyperbolicSinButton';
import { HyperbolicTanButton } from './buttons/HyperbolicTanButton';
import { InverseHyperbolicCosButton } from './buttons/InverseHyperbolicCosButton';
import { InverseHyperbolicSinButton } from './buttons/InverseHyperbolicSinButton';
import { InverseHyperbolicTanButton } from './buttons/InverseHyperbolicTanButton';
import { Log2Button } from './buttons/Log2Button';
import { RoundButton } from './buttons/RoundButton';
import { SignButton } from './buttons/SignButton';
import { SquareRootTwoButton } from './buttons/SquareRootTwoButton';
import { AbsoluteButton } from './buttons/AbsoluteButton';
import { AngleModeButton } from './buttons/AngleModeButton';
import { CosButton } from './buttons/CosButton';
import { CubeRootButton } from './buttons/CubeRootButton';
import { EulerButton } from './buttons/EulerButton';
import { ExpButton } from './buttons/ExpButton';
import { FactorialButton } from './buttons/FactorialButton';
import { LnButton } from './buttons/LnButton';
import { LogButton } from './buttons/LogButton';
import { MemoryAddButton } from './buttons/MemoryAddButton';
import { MemoryClearButton } from './buttons/MemoryClearButton';
import { MemoryRecallButton } from './buttons/MemoryRecallButton';
import { MemorySubtractButton } from './buttons/MemorySubtractButton';
import { ModuloButton } from './buttons/ModuloButton';
import { PercentButton } from './buttons/PercentButton';
import { PiButton } from './buttons/PiButton';
import { PowerButton } from './buttons/PowerButton';
import { PowerOfTenButton } from './buttons/PowerOfTenButton';
import { ReciprocalButton } from './buttons/ReciprocalButton';
import { SecondButton } from './buttons/SecondButton';
import { SinButton } from './buttons/SinButton';
import { SquareButton } from './buttons/SquareButton';
import { SquareRootButton } from './buttons/SquareRootButton';
import { TanButton } from './buttons/TanButton';

export function ScientificFunctions() {
  return (
    <div className="grid grid-cols-6 gap-2">
      <SecondButton />
      <AngleModeButton />
      <MemoryClearButton />
      <MemoryRecallButton />
      <MemoryAddButton />
      <MemorySubtractButton />

      <SinButton />
      <CosButton />
      <TanButton />
      <LnButton />
      <LogButton />
      <FactorialButton />

      <PowerButton />
      <SquareButton />
      <SquareRootButton />
      <CubeRootButton />
      <ReciprocalButton />
      <AbsoluteButton />

      <PiButton />
      <EulerButton />
      <PercentButton />
      <ModuloButton />
      <ExpButton />
      <PowerOfTenButton />

      <HyperbolicSinButton />
      <HyperbolicCosButton />
      <HyperbolicTanButton />
      <InverseHyperbolicSinButton />
      <InverseHyperbolicCosButton />
      <InverseHyperbolicTanButton />

      <Log2Button />
      <Exp2Button />
      <FloorButton />
      <CeilButton />
      <RoundButton />
      <SignButton />

      <GoldenRatioButton />
      <SquareRootTwoButton />
    </div>
  );
}
