import { useState } from 'react';

import { BaseButton } from '../base/BaseButton';

/**
 * Switching palette is a class on the document root — every colour already comes
 * from a custom property, so no component changes.
 */
export function ThemeKey() {
  const [isLight, setIsLight] = useState(false);

  const press = () => {
    const next = !isLight;
    document.documentElement.classList.toggle('light', next);
    setIsLight(next);
  };

  return (
    <BaseButton
      accessibleName={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      tooltip="Switch between the light and dark palette"
      tone="function"
      onPress={press}
      isPressed={isLight}
    >
      {isLight ? '\u263e' : '\u2600'}
    </BaseButton>
  );
}

export default ThemeKey;
