/**
 * Creates an array of note images based on the selected instrument.
 * @param {string} selectedInstrument - The selected instrument
 * @returns {Array} An array of objects containing the note names and image names.
 */

export function createNoteImages(selectedInstrument) {
  let noteImages = []
  console.log('selectedInstrument', selectedInstrument)
  if (
    selectedInstrument === 'violin' ||
    selectedInstrument === 'piano' ||
    selectedInstrument === 'guitar' ||
    selectedInstrument === 'flute' ||
    selectedInstrument === 'blockFl' ||
    selectedInstrument === 'bassInstrument'
  ) {
    noteImages = [
      { name: 'G3', image: 'g' },
      { name: 'A3', image: 'a' },
      { name: 'B3', image: 'b' },
      { name: 'C4', image: 'c1' },
      { name: 'D4', image: 'd1' },
      { name: 'E4', image: 'e1' },
      { name: 'F#4', image: 'f#1' },
      { name: 'G4', image: 'g1' },
      { name: 'A4', image: 'a1' },
      { name: 'B4', image: 'b1' },
      { name: 'C#5', image: 'c#2' },
      { name: 'D5', image: 'd2' },
      { name: 'E5', image: 'e2' },
      { name: 'F#5', image: 'f#2' },
      { name: 'G#5', image: 'g#2' },
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
  }
  return noteImages
}
