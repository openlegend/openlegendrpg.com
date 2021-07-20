import React, { useState, useEffect } from 'react';

import { DarkModeState } from './src/components/UI/ThemeHandler';
import NavLayout from './src/layouts/nav-layout';

// export function wrapRootElement({element, props}) {
//   return(
//     <DarkModeState {...props}>
//       {element}
//     </DarkModeState>
//   )
// }

const DarkModeWrapper = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, [])

  if (!hasMounted) {
    return null;
  }
  return (
    <DarkModeState {...props}>
      <NavLayout>
      {element}
      </NavLayout>
    </DarkModeState>
  )
}
 
export function wrapRootElement({ element, props }) {
  return (
    <DarkModeWrapper props={props} element={element}/>
  )
}
