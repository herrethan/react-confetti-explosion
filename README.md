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

## Updates in v2.x

- Remove dependency on `@material-ui/styles` in favor of `react-jss`
- Update peer dependencies to react 18.x
- Props `floorWidth` `floorHeight` -> `width` `height`
- Export `ConfettiProps` type
- Extend ConfettiProps with HTMLDivElement attributes (except `ref`)
- Support number or string for `height`, defaulting to `120vh`
- Fix rotation in Safari (thanks to [roydigerhund](https://github.com/roydigerhund))
- Use Portal for dom placement
- Use create-react-app for dev and example app
- Use rollup for package bundling (down to 31kb, woot!)

## Optional Props

<!-- prettier-ignore -->
| Name          | Type       | Default                                                       | Description                                                                                                                                   |
| ------------- | ---------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| particleCount | `number`   | 100                                                           | Total number of particles used. Generally try to stay under 400 for optimal performance.                                                      |
| particleSize  | `number`   | 12                                                            | Size of particles in pixels. This means width for squares, diameter for circles. Note there is also a bit of randomness added to these.       |
| duration      | `number`   | 2200                                                          | Duration of explosion in ms. This is the time it takes particles to travel from explosion point to the floor, as defined by `height`.         |
| onComplete    | `function` | undefined                                                     | Function that is called at end of `duration`                                                                                                  |
| zIndex        | `number`   | undefined                                                     | zIndex that will be applied to the explosion, in case higher Portal stacking order is required.                                                |
| colors        | `string[]` | [<br>'#FFC700',<br>'#FF0000',<br>'#2E3191',<br>'#41BBC7'<br>] | An array of any css-readable colors, which are evenly distributed across the number of total particles.                                       |
| force         | `number`   | 0.5                                                           | Between 0-1, roughly the vertical force at which particles initially explode. Straying too far away from 0.5 may start looking...interesting. |
| height        | `number` `string`   | '120vh'                                              | Pixel distance the particles will vertically spread from initial explosion point.                                                             |
| width         | `number`   | 1000                                                          | Pixel distance the particles will horizontally spread from initial explosion point.                                                           |

Although the above properties of the explosion is controlled, mounting/unmounting is entirely left to the consumer.

## Potential gotchas

- The `height` is defaulted to `120vh` in an attempt to guarantee particles land past the bottom of the viewport, which may not be ideal in some scenarios.
- If using a string for relative `height` (`vh` or `%` for example), the relative height changes between mobile/desktop screens, which means different looking explosions.
- If your `height` is too small, particles may visibly land on the floor instead of disappearing off-screen.
- The `ConfettiExplosion` is appended to the document body via `ReactDOM.createPortal()` to ensure it is positioned correctly and layered above all page content. Make sure to remember to unmount it when your explosion is finished!

To keep the library as little as possible much of the physics have been estimated, cheapened, and downright mutilated. There are certainly prop combinations that will not look realistic, due to the limitations of CSS animations. But there should be enough options to fit most needs.

## Examples

See src/example.tsx as an example app, bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This can be run locally with `yarn start`.

### Large explosion

```
{
  force: 0.8,
  duration: 3000,
  particleCount: 250,
  width: 1600,
}
```

![confetti-large-edit](https://user-images.githubusercontent.com/5460067/111782964-0c6bed80-8890-11eb-8a8b-0a4fdbc30cbd.gif)

### Medium explosion

```
{
  force: 0.6,
  duration: 2500,
  particleCount: 80,
  width: 1000,
}
```

![confetti-small-edit](https://user-images.githubusercontent.com/5460067/111782909-f8c08700-888f-11eb-9a90-4ef0931de730.gif)

### Small explosion

```
{
  force: 0.4,
  duration: 2200,
  particleCount: 30,
  width: 400,
}
```

![confetti-tiny](https://user-images.githubusercontent.com/5460067/111792596-c6685700-889a-11eb-8daf-7b234726041a.gif)

## Author

[herrethan](https://github.com/herrethan)

## License

MIT
