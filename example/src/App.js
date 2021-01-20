import { Piano as TonePiano } from "@tonejs/piano";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { Piano as EtudePiano } from "react-etude-piano";
import "./App.css";

function App() {
  const [piano, setPiano] = useState(null);
  const [showLabel, setShowLabel] = useState(false);

  const pressPitch = useCallback(
    (pitch) => {
      piano.keyDown({ note: pitch.getKey() + pitch.getOctave() });
    },
    [piano]
  );

  const releasePitch = useCallback(
    (pitch) => {
      piano.keyUp({ note: pitch.getKey() + pitch.getOctave() });
    },
    [piano]
  );

  const Piano = useMemo(() => {
    return lazy(async () => {
      if (piano == null) {
        const piano = await getPiano();
        setPiano(piano);
      }
      return { default: EtudePiano };
    });
  }, [piano]);

  async function getPiano() {
    const piano = new TonePiano({ velocities: 4 });
    piano.toDestination();
    await piano.load();

    return piano;
  }

  function renderLinks() {
    return (
      <a
        href="https://github.com/andrewthehan/react-etude-piano"
        target="_blank"
        rel="noopener noreferrer"
        className="links"
      >
        react-etude-piano on GitHub
      </a>
    );
  }

  function renderInputs() {
    return (
      <span className="inputs">
        <label htmlFor="show-labels-input">Show labels</label>
        <input
          name="show-labels-input"
          type="checkbox"
          checked={showLabel}
          onChange={() => setShowLabel(!showLabel)}
        />
      </span>
    );
  }

  function renderPiano() {
    return (
      <Piano
        start="A1"
        end="C8"
        onKeyPress={pressPitch}
        onKeyRelease={releasePitch}
        showLabel={showLabel}
      />
    );
  }

  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        {renderLinks()}
        {renderInputs()}
        {renderPiano()}
      </Suspense>
    </div>
  );
}

export default App;
