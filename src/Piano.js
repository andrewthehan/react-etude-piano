import { theory } from "etude";
import React, { useMemo } from "react";
import { isBlackKey } from "./EtudeUtils";
import "./Piano.css";
import PianoKey from "./PianoKey";

const { Letter, Pitch, Policy, Scale } = theory;

const WHITE_KEY_WIDTH = 30;

// for memo to recognize equality when a default no-op prop is needed
const NO_OP_KEY_ACTION = () => {};

function Piano({
  start,
  end,
  accidentalPolicy = Policy.DEFAULT_PRIORITY,
  onKeyPress = NO_OP_KEY_ACTION,
  onKeyRelease = NO_OP_KEY_ACTION,
  highlight = [],
  showLabel = false,
}) {
  function getPitches(start, end, accidentalPolicy) {
    const startPitch = Pitch.fromString(start).orElseThrow(
      () => new Error("Invalid start pitch.")
    );
    const endPitch = Pitch.fromString(end).orElseThrow(
      () => new Error("Invalid end pitch.")
    );

    if (isBlackKey(startPitch) || isBlackKey(endPitch)) {
      throw new Error("Start and end of piano should be a white key.");
    }

    // + 1 to include end pitch
    const numberOfPitches =
      endPitch.getProgramNumber() - startPitch.getProgramNumber() + 1;
    if (numberOfPitches <= 0) {
      throw new Error(
        "End pitch should be the same as or after the start pitch."
      );
    }

    const whitePitches = [];
    const blackPitches = [];

    const scale = new Scale(startPitch, Scale.Quality.CHROMATIC);
    scale
      .stream(accidentalPolicy)
      .limit(numberOfPitches)
      .forEach((p) => {
        if (isBlackKey(p)) {
          blackPitches.push(p);
        } else {
          whitePitches.push(p);
          // add invisible black key for gap
          const normalizedPitch = Pitch.fromProgramNumber(
            p.getProgramNumber()
          ).get();
          if (
            normalizedPitch.getKey().getLetter() === Letter.E ||
            normalizedPitch.getKey().getLetter() === Letter.B
          ) {
            blackPitches.push(null);
          }
        }
      });

    return {
      whitePitches,
      blackPitches,
    };
  }

  function getHighlightPitches(highlight) {
    if (highlight == null) {
      return [];
    }

    return highlight.length > 0 && typeof highlight[0] === "string"
      ? highlight.map((s) =>
          Pitch.fromString(s).orElseThrow(
            () => new Error("Invalid highlight pitch.")
          )
        )
      : highlight;
  }

  const { whitePitches, blackPitches } = useMemo(
    () => getPitches(start, end, accidentalPolicy),
    [start, end, accidentalPolicy]
  );

  const highlightPitches = useMemo(() => getHighlightPitches(highlight), [
    highlight,
  ]);

  const width = `${whitePitches.length * WHITE_KEY_WIDTH}px`;

  function renderPianoKey(pitch, i) {
    const highlightPitch =
      pitch == null
        ? null
        : highlightPitches.find((h) => Pitch.isEnharmonic(h, pitch));
    const isHighlight = pitch != null && highlightPitch != null;

    return (
      // key prop is required for loops; key prop is NOT music key
      <PianoKey
        key={i}
        pitch={isHighlight ? highlightPitch : pitch}
        isHighlight={isHighlight}
        onKeyPress={onKeyPress}
        onKeyRelease={onKeyRelease}
        showLabel={showLabel}
      />
    );
  }

  return (
    <div className="piano" style={{ width }}>
      <div className="keys white-keys">{whitePitches.map(renderPianoKey)}</div>
      <div className="keys black-keys">{blackPitches.map(renderPianoKey)}</div>
    </div>
  );
}

export default Piano;
