import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ConfettiExplosion from './';

const Sample = () => {
  const [isExploding, setIsExploding] = React.useState(false);
  return (
    <div>
      <button onClick={() => setIsExploding(!isExploding)}>explode</button>
      {isExploding && <ConfettiExplosion data-testid="confetti" particleCount={3} />}
    </div>
  );
};
test('confetti explodes', async () => {
  render(<Sample />);
  const explode = screen.getByText(/explode/i);
  expect(explode).toBeInTheDocument();
  let confetti = screen.queryByTestId('confetti');
  expect(confetti).not.toBeInTheDocument();
  fireEvent.click(explode);
  confetti = screen.queryByTestId('confetti');
  expect(confetti).toBeInTheDocument();
  fireEvent.click(explode);
  confetti = screen.queryByTestId('confetti');
  expect(confetti).not.toBeInTheDocument();
});
