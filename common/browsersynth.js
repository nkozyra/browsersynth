export const browsersynth = () => {
}

export const createToggle = ({items = [], active = ''}) => {
    const t = document.createElement('div');
    t.classList.add('toggle');

    const button = document.createElement('div');
    button.classList.add('toggleButton');
    t.appendChild(button);

    const options = document.createElement('div');
    items.map(i => {
       const el = document.createElement('div');
       el.classList.add('toggleOption')
       const indicator = document.createElement('div');
       indicator.innerHTML = '<span></span>';
       if (i === active) {
           indicator.classList.add('active');
       }
       const label = document.createElement('div');
       label.innerText = i;
       el.appendChild(indicator);
       el.appendChild(label);
       options.appendChild(el);
    });
    t.appendChild(options);

    return t;
};
