import { Fragment } from 'react';
import type { ReactNode } from 'react';

import { useKeypadSections } from '../../hooks/useKeypadSections';
import type { KeypadSectionDescriptor, KeypadSectionId } from '../../types/ui.types';
import { Stack } from '../primitives/Stack';
import { KeypadKey } from './KeypadKey';
import { KeypadSection } from './KeypadSection';

export type KeypadRenderSection = (section: KeypadSectionDescriptor) => ReactNode;

export interface KeypadRootProps {
  readonly only?: readonly KeypadSectionId[];
  readonly children?: KeypadRenderSection;
  readonly className?: string;
}

function KeypadRoot({ only, children, className }: KeypadRootProps) {
  const sections = useKeypadSections(only);

  return (
    <Stack direction="column" gap="cosy" align="stretch" className={className}>
      {sections.map((section) =>
        children ? (
          <Fragment key={section.id}>{children(section)}</Fragment>
        ) : (
          <KeypadSection key={section.id} section={section} />
        ),
      )}
    </Stack>
  );
}

export const Keypad = Object.assign(KeypadRoot, {
  Root: KeypadRoot,
  Section: KeypadSection,
  Key: KeypadKey,
});

export default Keypad;
