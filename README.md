# React Confetti Explosion

[![npm version](https://img.shields.io/npm/v/react-confetti-explosion.svg?style=flat-square)](https://www.npmjs.com/package/react-confetti-explosion)

This is inspired by [this](https://codepen.io/Gthibaud/pen/ENzXbp) beautiful and oft-used confetti which uses canvas, but equally inspired by how many bad looking CSS examples there are out there. The goal was to create a super lightweight confetti component that would not require canvas, use only CSS for animation, and could also be controlled as an explosion (rather than raining confetti), without the need to write a full-blown particle generator.

Install:

```bash
$ yarn add react-confetti-explosion
```

## Usage

```jsx
import ConfettiExplosion from 'react-confetti-explosion';

function App() {
  const [isExploding, setIsExploding] = React.useState(false);
  return <>{isExploding && <ConfettiExplosion />}</>;
}
```

## Optional Props

| Name          | Type       | Default                                                       | Description                                                                                                                                   |
| ------------- | ---------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| particleCount | `number`   | 150                                                           | Total number of particles used. Generally try to stay under 400 for optimal performance.                                                      |
| particleSize  | `number`   | 12                                                            | Size of particles in pixels. This means width for squares, diameter for circles. Note there is also a bit of randomness added to these.       |
| duration      | `number`   | 3500                                                          | Duration of explosion in ms. This is the time it takes particles to travel from explosion point to the floor, as defined by `height`.         |
| colors        | `string[]` | [<br>'#FFC700',<br>'#FF0000',<br>'#2E3191',<br>'#41BBC7'<br>] | An array of any css-readable colors, which are evenly distributed across the number of total particles.                                       |
| force         | `number`   | 0.5                                                           | Between 0-1, roughly the vertical force at which particles initially explode. Straying too far away from 0.5 may start looking...interesting. |
| height        | `number`   | 800                                                           | Pixel distance the particles will vertically spread from initial explosion point.                                                             |
| width         | `number`   | 1600                                                          | Pixel distance the particles will horizontally spread from initial explosion point.                                                           |  |

Although the duration of the explosion is controlled, it is up to the consumer how and when the `ConfettiExplosion` is rendered and positioned (and, hey, maybe even faded out?).

## Potential gotchas

- Your container must be `overflow: visible` in order to allow elements to fully spread across area.
- If your `height` is too small, particles may visibly land on the floor instead of disappearing off-screen.

To keep the library as little as possible much of the physics have been estimated, cheapened, and downright mutilated. There are certainly prop combinations that will not look realistic, due to the limitations of CSS animations. But there should be enough options to fit most needs.

## Example Screenshots

### Big explosion

```
{
  force: 0.6,
  duration: 5000,
  particleCount: 200,
  height: 1600,
  width: 1600
}
```

![confetti-large-edit](https://user-images.githubusercontent.com/5460067/111782964-0c6bed80-8890-11eb-8a8b-0a4fdbc30cbd.gif)

### Little explosion

```
{
  force: 0.4,
  duration: 3000,
  particleCount: 60,
  height: 1000,
  width: 1000
}
```

![confetti-small-edit](https://user-images.githubusercontent.com/5460067/111782909-f8c08700-888f-11eb-9a90-4ef0931de730.gif)

### Tiny explosion

```
{
  force: 0.4,
  duration: 2000,
  particleCount: 30,
  height: 500,
  width: 300
}
```

![confetti-tiny](https://user-images.githubusercontent.com/5460067/111792596-c6685700-889a-11eb-8daf-7b234726041a.gif)

## Author

[herrethan](https://github.com/herrethan)

## License

MIT
