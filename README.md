# react-etude-piano

[Interactive demo](example/)

```sh
npm install --save react-etude-piano
```

```js
import { Piano } from "react-etude-piano";

<Piano start="A1" end="C8" />;
```

## Props

#### **start**

type: `string`

The starting note of the piano.

#### **end**

type: `string`

The ending note of the piano.

#### **onKeyPress**

type: `(etude.theory.Pitch) => void`

default: `() => {}`

The action to take when a key is pressed. More details at [etude.js#pitch](https://github.com/andrewthehan/etude.js#pitch).

#### **onKeyPress**

type: `(etude.theory.Pitch) => void`

default: `() => {}`

The action to take when a key is released. More details at [etude.js#pitch](https://github.com/andrewthehan/etude.js#pitch).

#### **showLabel**

type: `boolean`

default: `false`

Whether labels should be displayed for every key.

#### **highlight**

type: `string[] | etude.theory.Pitch[]`

default: `[]`

The keys to highlight.

#### **accidentalPolicy**

type: `etude.theory.Policy`

default: `Policy.DEFAULT_PRIORITY`

Advanced prop to determine which enharmonic equivalent pitch labels to use. More details at [etude.js#policy](https://github.com/andrewthehan/etude.js#policy).
