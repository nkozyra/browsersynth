export const browsersynth = () => {
}

export const createToggle = ({items = [], active = '', iconDraw = null}) => {
    const t = document.createElement('div');
    t.classList.add('toggle');

    const button = document.createElement('div');
    button.classList.add('toggleButton');
    const iconEl = document.createElement('canvas');
    iconEl.setAttribute('width', '60px');
    iconEl.setAttribute('height', '60px');
    iconEl.style.position = 'absolute';
    iconEl.style.left = '5px';
    iconEl.style.top = '5px';
    iconEl.classList.add('toggleButtonIcon');

    button.appendChild(iconEl);
    t.appendChild(button);

    const options = document.createElement('div');
    let arr = [];
    for (const k in items) {
        arr.push(items[k]);
    }
    arr.map((v,i) => {
       const el = document.createElement('div');
       el.classList.add('toggleOption')
       const indicator = document.createElement('div');
       indicator.innerHTML = '<span></span>';
       if (v.name === active) {
           indicator.classList.add('active');
       }
       const label = document.createElement('div');
       label.innerText = v.name;
       el.appendChild(indicator);
       el.appendChild(label);
       options.appendChild(el);
    });
    t.appendChild(options);

    return t;
};


export const createVerticalSlider = ({ label = '', value = 0, max = 100, onChange }) => {
    const cont = document.createElement('div');
    cont.style.display = 'grid';
    cont.style.gridTemplateRows = '5fr 1fr';
    cont.style.textAlign = 'center';

    const slCont = document.createElement('div');
    slCont.style.display = 'relative';

    const sl = document.createElement('input');
    sl.setAttribute('orient', 'vertical');
    sl.setAttribute('type','range');
    sl.setAttribute('min','1');
    sl.setAttribute('max',max);
    sl.setAttribute('value',value);
    sl.classList.add('slider','vertical');
    if (onChange) {
        sl.onchange = onChange;
    }
    slCont.appendChild(sl);

    const lb = document.createElement('div');
    lb.innerText = label;

    cont.appendChild(slCont);
    cont.appendChild(lb);
    return cont;
};
