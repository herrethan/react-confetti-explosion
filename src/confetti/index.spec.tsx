import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ConfettiExplosion from './';
import { act } from 'react-dom/test-utils';

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

const OnCompleteSample = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <ConfettiExplosion
      data-testid="confetti"
      duration={200}
      particleCount={3}
      onComplete={onComplete}
    />
  );
};

test('onComplete is called at end of duration', async () => {
  const onComplete = jest.fn();
  render(<OnCompleteSample onComplete={onComplete} />);
  expect(onComplete).toHaveBeenCalledTimes(0);
  await act(async () => new Promise(resolve => setTimeout(resolve, 400)));
  expect(onComplete).toHaveBeenCalledTimes(1);
  await act(async () => new Promise(resolve => setTimeout(resolve, 600)));
  expect(onComplete).toHaveBeenCalledTimes(1);
});

const ZIndexSample = () => {
  return <ConfettiExplosion data-testid="confetti" zIndex={321} />;
};

test('confetti inherits z-index', async () => {
  const { baseElement } = render(<ZIndexSample />);
  // sorry eslint, this is the best way
  // eslint-disable-next-line testing-library/no-node-access
  const portal = baseElement.querySelector('[class^="confetti-explosion-screen"]');
  expect(portal).toBeInTheDocument();
  expect(portal).toHaveStyle("z-index: 321");
});
