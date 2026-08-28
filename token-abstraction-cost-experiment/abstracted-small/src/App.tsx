import { Calculator } from './components/calculator/Calculator';
import { Text } from './components/primitives/Text';

export function App() {
  return (
    <Calculator
      slots={{
        header: ({ state }) => (
          <Text scale="indicator" tone="faint" className="w-full">
            Basic {state.pending === null ? '' : '· pending'}
          </Text>
        ),
        display: (
          <Calculator.Display>
            <Calculator.Display.Indicators />
            <Calculator.Display.Expression />
            <Calculator.Display.Result />
          </Calculator.Display>
        ),
        keypad: <Calculator.Keypad />,
      }}
    />
  );
}

export default App;
