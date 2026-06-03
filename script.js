const ctx = new AudioContext()

function playNote(freq, startTime, duration) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.frequency.value = freq
    gain.gain.value = 0.2

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + duration)
}

function playBass(freq, startTime, duration) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'   // fuller, buzzier sound
    osc.frequency.value = freq
    gain.gain.value = 0.3

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + duration)
}

function playKick(startTime) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.frequency.value = 150
    osc.frequency.exponentialRampToValueAtTime(0.01, startTime + 0.3) // pitch drops fast

    gain.gain.setValueAtTime(1, startTime)
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)     // volume fades fast

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + 0.3)
}

function playSnare(startTime) {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1  // white noise
    }

    const source = ctx.createBufferSource()
    const gain = ctx.createGain()

    source.buffer = buffer
    gain.gain.setValueAtTime(0.5, startTime)
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1)

    source.connect(gain)
    gain.connect(ctx.destination)

    source.start(startTime)
}

const twinkleBtn = document.getElementById('twinkleBtn');
const letitgoBtn = document.getElementById('letitgoBtn');
const havanaBtn = document.getElementById('havanaBtn');
const snareBtn = document.getElementById('snareBtn');
const kickBtn = document.getElementById('kickBtn');
const bassBtn = document.getElementById('bassBtn');

twinkleBtn.addEventListener('click', () => {

    const t = ctx.currentTime
    
    playNote(261.63, t + 0.0, 0.5)  // C
    playNote(261.63, t + 0.5, 0.5)  // C
    playNote(392.00, t + 1.0, 0.5)  // G
    playNote(392.00, t + 1.5, 0.5)  // G
    playNote(440.00, t + 2.0, 0.5)  // A
    playNote(440.00, t + 2.5, 0.5)  // A
    playNote(392.00, t + 3.0, 1.0)  // G
    
})

letitgoBtn.addEventListener('click', () => {
    const t = ctx.currentTime
    playSnare(t)
    playNote(293.66, t + 0.0, 0.5); // D4
    playNote(329.63, t + 0.5, 0.5); // E4
    playNote(329.63, t + 1.0, 0.5); // E4
    playNote(329.63, t + 1.5, 0.5); // E4
    playNote(329.63, t + 2.0, 0.5); // E4
    playNote(329.63, t + 2.5, 0.5); // E4
    playNote(329.63, t + 3.0, 0.5); // E4
    playNote(293.66, t + 3.5, 0.5); // D4
    playNote(261.63, t + 4.0, 0.5); // C4
    playNote(261.63, t + 4.5, 1.0); // C4

    playNote(261.63, t + 6.0, 0.5); // C4
    playNote(261.63, t + 6.5, 0.5); // C4
    playNote(293.66, t + 7.0, 0.5); // D4
    playNote(293.66, t + 7.5, 0.5); // D4
    playNote(261.63, t + 8.0, 0.5); // C4
    playNote(246.94, t + 8.5, 0.5); // B3
    playNote(220.00, t + 9.0, 1.0); // A3
})

havanaBtn.addEventListener('click', () => {
    const t = ctx.currentTime
    // G-B-B-G-G-E
    playNote(392.00, t + 0.0, 0.25);   // G4
    playNote(493.88, t + 0.25, 0.25);  // B4
    playNote(493.88, t + 0.50, 0.25);  // B4
    playNote(392.00, t + 0.75, 0.25);  // G4
    playNote(392.00, t + 1.00, 0.25);  // G4
    playNote(329.63, t + 1.25, 0.50);  // E4

    // B-A-B-^C-B-A
    playNote(493.88, t + 1.75, 0.25);  // B4
    playNote(440.00, t + 2.00, 0.25);  // A4
    playNote(493.88, t + 2.25, 0.25);  // B4
    playNote(523.25, t + 2.50, 0.25);  // C5 (^C = higher octave)
    playNote(493.88, t + 2.75, 0.25);  // B4
    playNote(440.00, t + 3.00, 0.50);  // A4
    
})

bassBtn.addEventListener('click', ()=>{
    const t = ctx.currentTime
    playBass(65, t + 0, 0.5)   // low C
    playBass(98, t + 0.5, 0.5) // low G
})

snareBtn.addEventListener('click', ()=>{
    const t=ctx.currentTime
    playSnare(t);
})

kickBtn.addEventListener('click', ()=>{
    const t=ctx.currentTime
    playKick(t);
})

