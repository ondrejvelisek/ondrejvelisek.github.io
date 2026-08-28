import { AddButton } from './buttons/AddButton';
import { AllClearButton } from './buttons/AllClearButton';
import { BackspaceButton } from './buttons/BackspaceButton';
import { ClearEntryButton } from './buttons/ClearEntryButton';
import { DecimalButton } from './buttons/DecimalButton';
import { Digit0Button } from './buttons/Digit0Button';
import { Digit1Button } from './buttons/Digit1Button';
import { Digit2Button } from './buttons/Digit2Button';
import { Digit3Button } from './buttons/Digit3Button';
import { Digit4Button } from './buttons/Digit4Button';
import { Digit5Button } from './buttons/Digit5Button';
import { Digit6Button } from './buttons/Digit6Button';
import { Digit7Button } from './buttons/Digit7Button';
import { Digit8Button } from './buttons/Digit8Button';
import { Digit9Button } from './buttons/Digit9Button';
import { DivideButton } from './buttons/DivideButton';
import { EqualsButton } from './buttons/EqualsButton';
import { MultiplyButton } from './buttons/MultiplyButton';
import { NegateButton } from './buttons/NegateButton';
import { SubtractButton } from './buttons/SubtractButton';

export function BasicKeypad() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <AllClearButton />
      <ClearEntryButton />
      <BackspaceButton />
      <DivideButton />

      <Digit7Button />
      <Digit8Button />
      <Digit9Button />
      <MultiplyButton />

      <Digit4Button />
      <Digit5Button />
      <Digit6Button />
      <SubtractButton />

      <Digit1Button />
      <Digit2Button />
      <Digit3Button />
      <AddButton />

      <NegateButton />
      <Digit0Button />
      <DecimalButton />
      <EqualsButton />
    </div>
  );
}
