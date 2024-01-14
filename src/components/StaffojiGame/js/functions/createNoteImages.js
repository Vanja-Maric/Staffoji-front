/**
 * Creates an array of note images based on the selected instrument.
 * @param {string} selectedInstrument - The selected instrument
 * @returns {Array} An array of objects containing the note names and image names.
 */

export function createNoteImages(selectedInstrument) {
  let noteImages = []
  // console.log('selectedInstrument', selectedInstrument)
  if (selectedInstrument === 'violin') {
    noteImages = [
      { name: 'G3', image: 'g' },
      { name: 'A3', image: 'a' },
      { name: 'B3', image: 'b' },
      { name: 'C4', image: 'c1' },
      { name: 'D4', image: 'd1' },
      { name: 'E4', image: 'e1' },
      { name: 'F#4', image: 'fiss1' },
      { name: 'G4', image: 'g1' },
      { name: 'A4', image: 'a1' },
      { name: 'B4', image: 'b1' },
      { name: 'C#5', image: 'ciss2' },
      { name: 'D5', image: 'd2' },
      { name: 'E5', image: 'e2' },
      { name: 'F#5', image: 'fiss2' },
      { name: 'G#5', image: 'g2' },
      { name: 'A5', image: 'a2' },
      { name: 'B5', image: 'b2' },
    ]
  } else if (selectedInstrument === 'viola') {
    noteImages = [
      { name: 'C3', image: 'c-Alto' },
      { name: 'D3', image: 'd-Alto' },
      { name: 'E3', image: 'e-Alto' },
      { name: 'F3', image: 'f-Alto' },
      { name: 'G3', image: 'g-Alto' },
      { name: 'A3', image: 'a-Alto' },
      { name: 'B3', image: 'b-Alto' },
      { name: 'C4', image: 'c1-Alto' },
      { name: 'D4', image: 'd1-Alto' },
      { name: 'E4', image: 'e1-Alto' },
      { name: 'F#4', image: 'fiss1-Alto' },
      { name: 'G4', image: 'g1-Alto' },
      { name: 'A4', image: 'a1-Alto' },
      { name: 'B4', image: 'b1-Alto' },
      { name: 'C#5', image: 'ciss2-Alto' },
      { name: 'D5', image: 'd2-Alto' },
      { name: 'E5', image: 'e2-Alto' },
    ]
  } else if (selectedInstrument === 'cello') {
    noteImages = [
      { name: 'C2', image: 'C-Bass' },
      { name: 'D2', image: 'D-Bass' },
      { name: 'E2', image: 'E-Bass' },
      { name: 'F2', image: 'F-Bass' },
      { name: 'G2', image: 'G-Bass' },
      { name: 'A2', image: 'A-Bass' },
      { name: 'B2', image: 'B-Bass' },
      { name: 'C3', image: 'c-Bass' },
      { name: 'D3', image: 'd-Bass' },
      { name: 'E3', image: 'e-Bass' },
      { name: 'F#3', image: 'fiss-Bass' },
      { name: 'G3', image: 'g-Bass' },
      { name: 'A3', image: 'a-Bass' },
      { name: 'B3', image: 'b-Bass' },
      { name: 'C#4', image: 'ciss1-Bass' },
      { name: 'D4', image: 'd1-Bass' },
    ]
  } else if (selectedInstrument === 'bassInstrument') {
    noteImages = [
      { name: 'E1', image: 'E-Bass' },
      { name: 'F1', image: 'F-Bass' },
      { name: 'G1', image: 'G-Bass' },
      { name: 'A1', image: 'A-Bass' },
      { name: 'B1', image: 'B-Bass' },
      { name: 'C2', image: 'c-Bass' },
      { name: 'D2', image: 'd-Bass' },
      { name: 'E2', image: 'e-Bass' },
      { name: 'F#2', image: 'fiss-Bass' },
      { name: 'G2', image: 'g-Bass' },
      { name: 'A2', image: 'a-Bass' },
      { name: 'B2', image: 'b-Bass' },
    ]
  } else if (selectedInstrument === 'piano') {
    noteImages = [
      { name: 'G3', image: 'g' },
      { name: 'G#3', image: 'giss' },
      { name: 'A3', image: 'a' },
      { name: 'A#3', image: 'aiss' },
      { name: 'B3', image: 'b' },
      { name: 'C4', image: 'c1' },
      { name: 'C#4', image: 'ciss1' },
      { name: 'D4', image: 'd1' },
      { name: 'D#4', image: 'diss1' },
      { name: 'E4', image: 'e1' },
      { name: 'F4', image: 'f1' },
      { name: 'F#4', image: 'fiss1' },
      { name: 'G4', image: 'g1' },
      { name: 'G#4', image: 'giss1' },
      { name: 'A4', image: 'a1' },
      { name: 'A#4', image: 'aiss1' },
      { name: 'B4', image: 'b1' },
      { name: 'C5', image: 'c2' },
      { name: 'C#5', image: 'ciss2' },
      { name: 'D5', image: 'd2' },
      { name: 'D#5', image: 'diss2' },
      { name: 'E5', image: 'e2' },
    ]
  } else if (selectedInstrument === 'pianoF') {
    noteImages = [
      { name: 'E2', image: 'E-Bass' },
      { name: 'F2', image: 'F-Bass' },
      { name: 'F#2', image: 'Fiss-Bass' },
      { name: 'G2', image: 'G-Bass' },
      { name: 'G#2', image: 'Giss-Bass' },
      { name: 'A2', image: 'A-Bass' },
      { name: 'A#2', image: 'Aiss-Bass' },
      { name: 'B2', image: 'B-Bass' },
      { name: 'C3', image: 'c-Bass' },
      { name: 'C#3', image: 'ciss-Bass' },
      { name: 'D3', image: 'd-Bass' },
      { name: 'F2', image: 'diss-Bass' },
      { name: 'E3', image: 'e-Bass' },
      { name: 'F3', image: 'f-Bass' },
      { name: 'F#3', image: 'fiss-Bass' },
      { name: 'G3', image: 'g-Bass' },
      { name: 'G#3', image: 'giss-Bass' },
      { name: 'A3', image: 'a-Bass' },
      { name: 'A#3', image: 'aiss-Bass' },
      { name: 'B3', image: 'b-Bass' },
      { name: 'C4', image: 'c1-Bass' },
      { name: 'C#4', image: 'ciss1-Bass' },
      { name: 'D4', image: 'd1-Bass' },
      { name: 'D#4', image: 'diss1-Bass' },
    ]
  } else if (selectedInstrument === 'guitar') {
    noteImages = [
      { name: 'E3', image: 'e' },
      { name: 'F3', image: 'f' },
      { name: 'F#3', image: 'fiss' },
      { name: 'G3', image: 'g' },
      { name: 'G#3', image: 'giss' },
      { name: 'A3', image: 'a' },
      { name: 'A#3', image: 'aiss' },
      { name: 'B3', image: 'b' },
      { name: 'C4', image: 'c1' },
      { name: 'C#4', image: 'ciss1' },
      { name: 'D4', image: 'd1' },
      { name: 'D#4', image: 'diss1' },
      { name: 'E4', image: 'e1' },
      { name: 'F4', image: 'f1' },
      { name: 'F#4', image: 'fiss1' },
      { name: 'G4', image: 'g1' },
      { name: 'G#4', image: 'giss1' },
      { name: 'A4', image: 'a1' },
      { name: 'A#4', image: 'aiss1' },
      { name: 'B4', image: 'b1' },
      { name: 'C5', image: 'c2' },
      { name: 'C#5', image: 'ciss2' },
      { name: 'D5', image: 'd2' },
      { name: 'D#5', image: 'diss2' },
      { name: 'E5', image: 'e2' },
    ]
  } else if (
    selectedInstrument === 'flute' ||
    selectedInstrument === 'blockFl'
  ) {
    noteImages = [
      { name: 'C4', image: 'c1' },
      { name: 'D4', image: 'd1' },
      { name: 'E4', image: 'e1' },
      { name: 'F4', image: 'f1' },
      { name: 'G4', image: 'g1' },
      { name: 'A4', image: 'a1' },
      { name: 'B4', image: 'b1' },
      { name: 'C5', image: 'c2' },
      { name: 'D5', image: 'd2' },
      { name: 'E5', image: 'e2' },
      { name: 'F5', image: 'f2' },
      { name: 'G5', image: 'g2' },
      { name: 'A5', image: 'a2' },
      { name: 'B5', image: 'b2' },
      { name: 'C6', image: 'c3' },
      { name: 'D6', image: 'd3' },
    ]
  }

  return noteImages
}
