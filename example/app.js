import * as React from 'react';
import ReactDOM from 'react-dom';
import ConfettiExplosion from 'react-confetti-explosion';

const container = {
  position: 'absolute',
  overflow: 'hidden',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: '#29313d'
};

const button = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateY(-50%) translateX(-50%)',
  padding: '20px 40px',
  color: 'white',
  backgroundColor: '#36634d',
  fontFamily: 'sans-serif',
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontWeight: 'bold',
  border: '2px solid white',
  borderRadius: 4,
  boxShadow: '0 0 20px black',
  cursor: 'pointer'
};

const source = {
  position: 'absolute',
  right: '50%',
  left: '50%',
  bottom: 50
};
const bigExplodeProps = {
  force: 0.6,
  duration: 5000,
  particleCount: 200,
  height: 1600,
  width: 1600
};

const littleExplodeProps = {
  force: 0.4,
  duration: 3000,
  particleCount: 60,
  height: 1000,
  width: 1000
};

const tinyExplodeProps = {
  force: 0.4,
  duration: 2000,
  particleCount: 30,
  height: 500,
  width: 300
};

function Button() {
  const [isExploding, setIsExploding] = React.useState(false);
  return (
    <div style={container}>
      <button type="button" onClick={() => setIsExploding(!isExploding)} style={button}>
        {isExploding && (
          <div style={source}>
            <ConfettiExplosion {...littleExplodeProps} />
          </div>
        )}
        Explode!
      </button>
    </div>
  );
}

ReactDOM.render(<Button />, document.getElementById('app'));
