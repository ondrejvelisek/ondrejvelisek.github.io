import type { ReactNode } from 'react';

import type { KeyDescriptor, KeypadSectionDescriptor } from '../../types/ui.types';
import { BaseGrid } from '../base/BaseGrid';
import { KeypadKey } from './KeypadKey';

export type KeypadSectionRenderKey = (descriptor: KeyDescriptor, index: number) => ReactNode;

export interface KeypadSectionProps {
  readonly section: KeypadSectionDescriptor;
  readonly children?: KeypadSectionRenderKey;
  readonly className?: string;
}

export function KeypadSection({ section, children, className }: KeypadSectionProps) {
  const renderKey: KeypadSectionRenderKey =
    children ?? ((descriptor) => <KeypadKey key={descriptor.id} descriptor={descriptor} />);

  return (
    <BaseGrid
      columns={section.columns}
      role="group"
      aria-label={section.title}
      className={className}
    >
      {section.keys.map((descriptor, index) => renderKey(descriptor, index))}
    </BaseGrid>
  );
}

export default KeypadSection;
