import React from 'react';

import { DarkModeState } from './src/components/UI/ThemeHandler';
import NavLayout from './src/layouts/nav-layout';

export function wrapPageElement({ element, props }) {
  let isIndexPage = props.path === '/' ? true : null;
  return (
    <DarkModeState {...props}>
      <NavLayout isIndexPage={isIndexPage}>
      {element}
      </NavLayout>
    </DarkModeState>
  )
}
