export const keyboard = ({octaves = 2, startOctave = 2, synth}) => {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    let notes = {
        0: { key: 'C', freq: 16.35160 },
        0.5: { key: 'C#/Db', freq: 17.32391 },
        1: { key: 'D', freq: 18.35405 },
        1.5: { key: 'D#/Eb', freq: 19.44544 },
        2: { key: 'E', freq: 20.60172 },
        3: { key: 'F', freq: 21.82676 },
        3.5: { key: 'F#/Gb', freq: 23.12465 },
        4: { key: 'G', freq: 24.49971 },
        4.5: { key: 'G#/Ab', freq: 25.95654 },
        5: { key: 'A', freq: 27.50000 },
        5.5: { key: 'A#/Bb', freq: 29.13524 },
        6: { key: 'B', freq: 30.86771 },
    };

    const naturalKeys = document.createElement('div');
    naturalKeys.classList.add('keybed','natural',`oct${octaves}`);

    for (const k in notes) {
        notes[k].freq = notes[k].freq * Math.pow(2, startOctave);
    }

    // Set our natural notes
    [...Array(7*octaves)].map((v,i) => {
        const nKey = document.createElement('div');
        const note = notes[i%7].key;
        const freq = notes[i%7].freq;
        nKey.classList.add('key','natural');
        nKey.innerHTML = note;
        nKey.setAttribute('data-note', freq);
        nKey.onmousedown = (n) => {
            synth(n.target.getAttribute('data-note'));
            n.target.classList.add('playing');
        };
        nKey.onmouseup = (n) => {
            n.target.classList.remove('playing');
        };
        nKey.onmouseout = (n) => {
            n.target.classList.remove('playing');
        };
        notes[i%7].freq = freq + freq;
        // Set #/b dependent on key. In our case we're always setting #
        if (['C','D','F','G','A'].includes(note)) {
            const semiTone = document.createElement('div');
            const freq = notes[i%7+.5].freq;
            semiTone.classList.add('key','semitone');
            semiTone.innerHTML = notes[i%7+.5].key;
            semiTone.setAttribute('data-note', freq);
            semiTone.onclick = (n) => {
                n.stopPropagation();
                synth(n.target.getAttribute('data-note'));
            }
            notes[i%7+.5].freq = freq + freq;
            nKey.appendChild(semiTone);
        }
        naturalKeys.appendChild(nKey);
    });

    keyboard.appendChild(naturalKeys);
    return keyboard;
};
