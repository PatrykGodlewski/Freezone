import '../styles/globals.css';
import '../styles/resets.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const style = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const decorators = [
  (Story) => (
    <div style={style}>
      <Story />
    </div>
  ),
];
