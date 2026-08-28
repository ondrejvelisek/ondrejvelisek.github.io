import { useState } from 'react';

import { Calculator } from './components/calculator/Calculator';
import { Text } from './components/primitives/Text';

export function App() {
  const [isScientific, setIsScientific] = useState(true);

  return (
    <Calculator
      slots={{
        header: ({ state }) => (
          <>
            <Text scale="indicator" tone="faint" className="w-full">
              Scientific · {state.angleMode === 'deg' ? 'degrees' : 'radians'}
            </Text>
            <Calculator.ModeKey
              isScientific={isScientific}
              onToggle={() => setIsScientific((shown) => !shown)}
            />
            <Calculator.ThemeKey />
          </>
        ),
        display: (
          <Calculator.Display>
            <Calculator.Display.Indicators />
            <Calculator.Display.Expression />
            <Calculator.Display.Result />
          </Calculator.Display>
        ),
        keypad: isScientific ? <Calculator.Keypad /> : <Calculator.Keypad only={['numeric']} />,
        aside: <Calculator.History />,
        footer: <Calculator.Settings />,
      }}
    />
  );
}

export default App;
