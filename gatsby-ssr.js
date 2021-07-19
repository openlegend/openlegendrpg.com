import React from 'react';

import { DarkModeState } from './src/components/UI/ThemeHandler';
import { ThemeProvider } from '@material-ui/core/styles';

export function wrapRootElement({ element, props }) {
  return (
    <DarkModeState.Consumer {...props}>
      {element}
    </DarkModeState.Consumer>
  )
}
