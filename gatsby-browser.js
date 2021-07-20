import React from 'react';

import { DarkModeState } from './src/components/UI/ThemeHandler';
import NavLayout from './src/layouts/nav-layout';

export function wrapPageElement({ element, props }) {
  return (
    <DarkModeState {...props}>
      <NavLayout>
      {element}
      </NavLayout>
    </DarkModeState>
  )
}
