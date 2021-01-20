import { theory } from "etude";

const { Pitch } = theory;

export function isBlackKey(pitch) {
  if (pitch == null) {
    throw new Error(`Invalid pitch: ${pitch}`);
  }

  return (
    Pitch.fromProgramNumber(pitch.getProgramNumber())
      .orElseThrow(() => new Error(`Invalid pitch: ${pitch}`))
      .getKey()
      .getAccidental()
      .map((a) => a.getOffset())
      .orElse(0) !== 0
  );
}
