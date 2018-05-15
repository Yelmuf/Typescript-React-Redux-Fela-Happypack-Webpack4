import * as React from 'react';
import { compose, Dispatch } from 'redux';
import { connect as redux } from 'react-redux';
import { connect as fela, FelaWithStylesProps, Style, createComponentWithProxy, createComponent } from 'react-fela';
import { AppState, AppAction } from './reducer';


const container: Style<{}> = () => ({
  backgroundColor: 'aquamarine',
  ':hover': {
    backgroundColor: 'grey'
  },
  ':active': {
    backgroundColor: 'green'
  }
});


const ColorDiv = createComponent(container, 'button');

const mapStylesToProps = {
  container
}

type ReduxComponentProps = {
  text: string,
  setText: (text: string) => void
};
type ComponentProps = ReduxComponentProps & FelaWithStylesProps<{}, typeof mapStylesToProps>;

const Component: React.SFC<ComponentProps> = ({ styles, text, setText }) => (
  <React.Fragment>
    <div className={styles.container}>
      ABCtext with
      <div>
        redux: {text}
      </div>
      <button onClick={() => setText('All changes are for good')}>
        Change text
      </button>
    </div>
    <ColorDiv>
      ColorDiv
    </ColorDiv>
  </React.Fragment>
)

const ConnectedComponent = compose(
  redux(
    (state: AppState) => ({
      text: state.text
    }),
    (dispatch: Dispatch<AppAction>) => ({
      setText: (text: string) => dispatch({ type: 'text/set', payload: text })
    })
  ),
  fela(mapStylesToProps)
)(Component);


export class Main extends React.Component {
  render() {
    return (
      <div>
        <button>Click me!</button>
        <ConnectedComponent />
      </div>
    )
  }
}
