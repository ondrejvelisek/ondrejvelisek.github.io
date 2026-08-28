import { useEffect } from 'react';

import { KEYBOARD_BINDING_MAP, hasIgnoredModifier } from '../constants/keyboard.constants';
import { useDispatchKeyDescriptor } from './useDispatchKeyDescriptor';

export function useKeyboardBindings(isEnabled = true): void {
  const dispatchKey = useDispatchKeyDescriptor();

  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (hasIgnoredModifier(event)) return;

      const descriptor = KEYBOARD_BINDING_MAP[event.key];
      if (!descriptor) return;

      event.preventDefault();
      dispatchKey(descriptor);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatchKey, isEnabled]);
}
