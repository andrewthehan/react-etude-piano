import React, { memo } from "react";
import { isBlackKey } from "./EtudeUtils";

// for memo to recognize equality when a default no-op prop is needed
const NO_OP_KEY_ACTION = () => {};

function PianoKey({
  pitch,
  onKeyPress = NO_OP_KEY_ACTION,
  onKeyRelease = NO_OP_KEY_ACTION,
  isHighlight = false,
  showLabel = false,
}) {
  const isInvisible = pitch == null;
  const isInvisibleOrBlackKey = isInvisible || isBlackKey(pitch);

  const button = (
    <button
      className={`${isInvisibleOrBlackKey ? "black-key" : "white-key"} key ${
        isHighlight ? "highlight-key" : ""
      }`}
      type="button"
      onMouseDown={(e) => onKeyPress(pitch)}
      onMouseUp={(e) => onKeyRelease(pitch)}
      onMouseEnter={(e) => {
        if (e.buttons & 1) onKeyPress(pitch);
      }}
      onMouseLeave={(e) => {
        if (e.buttons & 1) onKeyRelease(pitch);
      }}
    >
      <div className="key-text">
        {isInvisible || !showLabel
          ? ""
          : pitch.getKey().toString() + pitch.getOctave()}
      </div>
    </button>
  );
  return isInvisibleOrBlackKey ? (
    <div className={`black-key-container ${isInvisible ? "invisible" : ""}`}>
      {button}
    </div>
  ) : (
    button
  );
}

function areEqual(
  {
    pitch: prevPitch,
    onKeyPress: prevOnKeyPress,
    onKeyRelease: prevOnKeyRelease,
    isHighlight: prevIsHighlight,
    showLabel: prevShowLabel,
  },
  {
    pitch: nextPitch,
    onKeyPress: nextOnKeyPress,
    onKeyRelease: nextOnKeyRelease,
    isHighlight: nextIsHighlight,
    showLabel: nextShowLabel,
  }
) {
  if (prevPitch == null && nextPitch == null) {
    return true;
  }

  if (prevIsHighlight !== nextIsHighlight) {
    return false;
  }

  if (prevShowLabel !== nextShowLabel) {
    return false;
  }

  if (prevPitch.toString() !== nextPitch.toString()) {
    return false;
  }

  if (prevOnKeyPress !== nextOnKeyPress) {
    return false;
  }

  if (prevOnKeyRelease !== nextOnKeyRelease) {
    return false;
  }

  return true;
}

export default memo(PianoKey, areEqual);
