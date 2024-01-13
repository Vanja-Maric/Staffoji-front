/**
 * The audio context module.
 * @module AudioContext
 */

/**
 * The audio context object.
 * @type {AudioContext}
 */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

/**
 * The analyser node for audio processing.
 * @type {AnalyserNode}
 */
let analyser = audioCtx.createAnalyser()
analyser.fftSize = 2048

/**
 * Provides access to the audio context.
 * @type {Object}
 */
const AudioContext = {
  /**
   * Gets the audio context.
   * @returns {AudioContext} The audio context.
   */
  getAudioContext() {
    return audioCtx
  },

  /**
   * Gets the analyser node.
   * @returns {AnalyserNode} The analyser node.
   */
  getAnalyser() {
    return analyser
  },

  /**
   * Resets the analyser node.
   */
  resetAnalyser() {
    analyser = audioCtx.createAnalyser()
  },
}

export default AudioContext
