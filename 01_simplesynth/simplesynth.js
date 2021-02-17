import {createToggle} from '../common/browsersynth.js'

export const simpleSynth = () => {
    let ctx = null;
    const oscTypes = ['sine','sawtooth','square'];
    let oscType = oscTypes[0];

    let ADSR = {
        A: 0.1,
        D: 2.0,
        S: 100.0,
        R: 5.0,
    }

    // build gui
    const gui = document.createElement('div');
    gui.classList.add('synth', 'simpleSynth');

    const toggle = document.createElement('div');
    toggle.innerHTML = createToggle({items: oscTypes, active: oscType}).outerHTML;
    toggle.onclick = (e) => {
        switch (oscType) {
            case 'sine':
                oscType = 'sawtooth';
                break;
            case 'sawtooth':
                oscType = 'square';
                break;
            default:
                oscType = 'sine';
        }
        toggle.innerHTML = createToggle({items: oscTypes, active: oscType}).outerHTML;
    };
    gui.appendChild(toggle);

    return {
        gui,
        playNote: (freq) => {
            const maxLength = 10.0;
            if (ctx == null) {
                ctx = new (window.AudioContext || window.webkitAudioContext)();
            }
            const oscillator = ctx.createOscillator();
            oscillator.type = oscType;
            oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

            const gainNode = ctx.createGain();
            gainNode.gain.value = .25;
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.start();
            gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + (maxLength * ADSR.R / 100.0) );
            oscillator.stop(ctx.currentTime + maxLength);
        },
    };
};
