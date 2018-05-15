import * as React from 'react';
import { compose } from 'redux';
import { Provider as Redux } from 'react-redux';
import { Provider as Fela } from 'react-fela';
import { store } from './store';
import { renderer } from './fela';
import { Main } from './Main';

export const Root: React.SFC = () => (
  <Redux store={store}>
    <Fela renderer={renderer}>
      <Main />
    </Fela>
  </Redux>
);
