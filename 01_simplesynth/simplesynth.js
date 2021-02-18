import {createToggle, createVerticalSlider} from '../common/browsersynth.js'

export const simpleSynth = () => {
    let ctx = null;

    // oscilattors with decorators
    const oscTypes = {
        'sawtooth': { name: 'sawtooth',
            iconDraw: (c) => {
                const canvas = c.querySelector('.toggleButtonIcon');
                const context = canvas.getContext('2d');
                context.beginPath();
                context.moveTo(20, 20);
                context.lineTo(20, 40);
                context.lineTo(40, 40);
                context.closePath();
                context.lineWidth = 2;
                context.strokeStyle = '#666666';
                context.stroke();
                context.fillStyle = '#cf6680';
                context.fill();
            }
        },
        'square': { name: 'square',
            iconDraw: (c) => {
                const canvas = c.querySelector('.toggleButtonIcon');
                const context = canvas.getContext('2d');
                context.beginPath();
                context.moveTo(20, 20);
                context.lineTo(20, 40);
                context.lineTo(40, 40);
                context.lineTo(40, 20);
                context.closePath();
                context.lineWidth = 2;
                context.strokeStyle = '#666666';
                context.stroke();
                context.fillStyle = '#cf6680';
                context.fill();
            }
        },
        'sine': { name: 'sine',
            iconDraw: (c) => {
                const canvas = c.querySelector('.toggleButtonIcon');
                const context = canvas.getContext('2d');
                context.beginPath();
                context.moveTo(20, 40);
                context.bezierCurveTo(20, 20, 40, 20, 40, 40);
                context.stroke();
                context.closePath();
                context.lineWidth = 2;
                context.strokeStyle = '#666666';
                context.stroke();
                context.fillStyle = '#cf6680';
                context.fill();
            }
        },
    };
    let oscType = oscTypes.sawtooth;

    const ADSR = {
        A: 0.1,
        D: 2.0,
        S: 100.0,
        R: 5.0,
    };

    const Filter = {
        Cutoff: 10000,
    };

    const setStyles = (el, styles) => {
        for (const k in styles) {
            el.style[k] = styles[k];
        }
    };

    // build gui
    const gui = document.createElement('div');
    gui.classList.add('synth', 'simpleSynth');

    // create cool logo
    const logo = document.createElement('div');
    logo.innerText = 'SimpleSynth';
    logo.style.fontSize = '5rem';
    logo.style.fontFamily = 'system, helvetical, arial, sans-serif';
    logo.style.color = '#cf6680';
    logo.style.padding = '2rem 0';
    logo.style.textShadow = '0 -1px #666';
    logo.style.textAlign = 'center';
    gui.appendChild(logo);

    // set up gui for controls
    const mainControls = document.createElement('div');
    mainControls.innerText = '';
    setStyles(mainControls, {
        alignItems: 'center',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '1rem',
        justifyItems: 'center',
        padding: '2rem'
    });

    // oscType toggler
    const toggle = document.createElement('div');
    const initT = createToggle({items: oscTypes, active: oscType.name, iconDraw: oscType.iconDraw });
    toggle.appendChild(initT);
    if (oscType.iconDraw) {
        oscType.iconDraw(initT);
    }
    toggle.onclick = (e) => {
        let icon;
        switch (oscType.name) {
            case 'sine':
                oscType = oscTypes.sawtooth;
                break;
            case 'sawtooth':
                oscType = oscTypes.square;
                break;
            default:
                oscType = oscTypes.sine;
        }
        while (toggle.firstChild) {
            toggle.removeChild(toggle.lastChild);
        }
        const r = createToggle({items: oscTypes, active: oscType.name, iconDraw: oscType.iconDraw });
        toggle.appendChild(r);
        if (oscType.iconDraw) {
            oscType.iconDraw(r);
        }
    };
    mainControls.appendChild(toggle);
    gui.appendChild(mainControls);

    // envelope
    const env = document.createElement('div');
    setStyles(env, {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)'
    });
    const aSlider = createVerticalSlider({label: 'Att', value: ADSR.A, onChange: (t) => {
        ADSR.A = t.target.value;
    }});
    const dSlider = createVerticalSlider({label: 'Dec', value: ADSR.D, onChange: (t) => {
            ADSR.D = t.target.value;
        }});
    const sSlider = createVerticalSlider({label: 'Sus', value: ADSR.S, onChange: (t) => {
            ADSR.S = t.target.value;
        }});
    const rSlider = createVerticalSlider({label: 'Rel', value: ADSR.R, onChange: (t) => {
            ADSR.R = t.target.value;
    }});
    env.appendChild(aSlider);
    env.appendChild(dSlider);
    env.appendChild(sSlider);
    env.appendChild(rSlider);
    mainControls.appendChild(env);

    const filterControl = document.createElement('div');
    const filtSlider = createVerticalSlider({label: 'Cutoff', value: 10000, max: 10000, onChange: (t) => {
            Filter.Cutoff = t.target.value;
        }});
    filterControl.appendChild(filtSlider);
    mainControls.appendChild(filterControl);

    return {
        gui,
        playNote: (freq) => {
            const maxLength = 10.0;
            if (ctx == null) {
                ctx = new (window.AudioContext || window.webkitAudioContext)();
            }
            const oscillator = ctx.createOscillator();
            oscillator.type = oscType.name;
            oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

            const gainNode = ctx.createGain();
            gainNode.gain.value = .15;

            //gainNode.connect(ctx.destination);

            const filter = ctx.createBiquadFilter();
            filter.frequency.value = Filter.Cutoff;
            filter.type = 'lowpass';
            oscillator.connect(filter);
            //oscillator.connect(gainNode);

            filter.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.start();

            if (ADSR.A > 0) {
                gainNode.gain.value = 0;
                gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + (maxLength * ADSR.A / 100.0) );
            }
            gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + (maxLength * ADSR.R / 100.0) );
            oscillator.stop(ctx.currentTime + maxLength);

        },
    };
};
