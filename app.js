// app.js (NO JSX) — fixes "Unexpected token '<'"

const { useState, useEffect } = React;
const h = React.createElement;

// Symbol positions in the atlas
const SYMBOLS = [
  { id: 0,  name: 'Fish',            row: 0, col: 0 },
  { id: 1,  name: 'Dragon',          row: 0, col: 1 },
  { id: 2,  name: 'Snake Circle',    row: 0, col: 2 },
  { id: 3,  name: 'Bird Dragon',     row: 0, col: 3 },
  { id: 4,  name: 'Infinity Snake',  row: 1, col: 0 },
  { id: 5,  name: 'Double Snake',    row: 1, col: 1 },
  { id: 6,  name: 'S Snake',         row: 1, col: 2 },
  { id: 7,  name: 'Spiral',          row: 1, col: 3 },
  { id: 8,  name: 'Winged Dragon',   row: 2, col: 0 },
  { id: 9,  name: 'Standing Dragon', row: 2, col: 1 },
  { id: 10, name: 'Split Dragon',    row: 2, col: 2 },
  { id: 11, name: 'Sword Dragon',    row: 2, col: 3 },
  { id: 12, name: 'Griffin',         row: 3, col: 0 },
  { id: 13, name: 'Owl',             row: 3, col: 1 },
  { id: 14, name: 'Eagle Head',      row: 3, col: 2 },
  { id: 15, name: 'Eagle',           row: 3, col: 3 },
  { id: 16, name: 'Riven', standalone: true }   // Standalone symbol (NOT part of atlas grid)
];


const WISHES = [
  {
    number: 1,
    title: "Grants an etherial key, used in raid treasure room.",
    description: "A wish to feed an addiction.",
    pattern: [
      0, 0, 13, 13, 13,
      0, 0, null, 13, 13,
      5, 5, null, 3, 3,
      5, 5, 9, 3, 3
    ]
  },
  {
    number: 2,
    title: "Spawns chest between third and fourth encounters.",
    description: "A wish for material validation.",
    pattern: [
      3, null, 10, null, 2,
      3, null, 10, null, 2,
      1, null, 9,  null, 2,
      1, null, 9,  null, 4
    ]
  },
  {
    number: 3,
    title: "Awards 'Numbers of Power' emblem.",
    description: "A wish for others to celebrate your success.",
    pattern: [
      0, null, 0, null, 0,
      null, 4, null, 4, null,
      8, null, 8, null, 8,
      null, 12, null, 12, null
    ]
  },
  {
    number: 4,
    title: "Warp to second encounter (Shuro Chi).",
    description: "A wish to look athletic and elegant.",
    pattern: [
      14, 15, 15, 15, 12,
      6,  14, 4,  12, 6,
      6,  12, null, 14, 6,
      12, 5,  5,  5,  14
    ]
  },
  {
    number: 5,
    title: "Warp to third encounter (Morgeth).",
    description: "A wish for a promising future.",
    pattern: [
      4, 11, 14, 11, 4,
      null, 8, 15, 8, null,
      null, 8, 14, 8, null,
      4, 11, 14, 11, 4
    ]
  },
  {
    number: 6,
    title: "Warp to fourth encounter (The Vault).",
    description: "A wish to move the hands of time.",
    pattern: [
      9,  12, 15, 12, 9,
      0,  9,  null, 9,  0,
      0,  null, null, null, 0,
      10, 10, 10, 10, 10
    ]
  },
  {
    number: 7,
    title: "Warp to final encounter (Riven).",
    description: "A wish to help a friend in need.",
    pattern: [
      15, 3,  11, null, 5,
      8,  null, null, 6,  14,
      8,  null, 13, 6,  14,
      15, 3,  11, null, 5
    ]
  },
  {
    number: 8,
    title: "Plays song 'Hope for the Future'.",
    description: "A wish to stay here forever.",
    pattern: [
      null, 11, 13, 10, null,
      null, 11, 13, 10, null,
      null, 11, 15, 10, null,
      null, 11, 13, 10, null
    ]
  },
  {
    number: 9,
    title: "Adds Failsafe voicelines to moments in the raid.",
    description: "A wish to stay here forever.",
    pattern: [
      null, null, null, null, null,
      null, 1, 1, 1, null,
      null, 1, 1, 13, null,
      null, null, null, null, null
    ]
  },
  {
    number: 10,
    title: "Adds Drifter voicelines to moments in the raid.",
    description: "A wish to stay here forever.",
    pattern: [
      1, 1, null, null, 1,
      1, 11, 11, null, 3,
      1, null, 6, 6, 3,
      null, null, null, 3, 3
    ]
  },
  {
    number: 11,
    title: "Grunt birthday party effect within the raid.",
    description: "A wish to stay here forever..",
    pattern: [
      14, 14, null, 15, 15,
      14, null, 1, 4, 15,
      12, null, 1, null, 5,
      12, 12, null, 5, 5
    ]
  },
  {
    number: 12,
    title: "Adds unique effects to the heads of fireteam members.",
    description: "A wish to open your mind to new ideas.",
    pattern: [
      0, null, null, null, 8,
      0, 0, 8, 8, 8,
      3, 3, 11, 14, 14,
      3, null, null, null, 14
    ]
  },
  {
    number: 13,
    title: "Unlocks 'Petra's Run' Version of the raid (Flawless Mode).",
    description: "A wish for the means to feed an addiction.",
    pattern: [
      12, 1, 13, 14, 7,
      12, 1, null, 14, 7,
      7,  14, null, 1,  12,
      7,  14, null, 1,  12
    ]
  },
  {
    number: 14,
    title: "Spawns Ahamkara eggs throughout the raid.",
    description: "A wish for love and support.",
    pattern: [
      4, 9, 13, 8, 4,
      null, null, 15, null, null,
      0, null, 5, 7, null,
      4, 11, null, null, 10
    ]
  },
  {
    number: 15,
    title: "The Unknown Wish",
    description: "'This one you shall cherish.' -- Riven of a Thousand Voices",
    pattern: [
      null, null, 16, null, null,
      null, null, null, null, null,
      16, null, null, null, 16,
      null, null, null, 16, null
    ]
  }
];

function WishingWall() {
  const [atlasLoaded, setAtlasLoaded] = useState(false);
  const [grid, setGrid] = useState(Array(20).fill(null));
  
  const atlasUrl = './DF54A880_fixed.png';     // ids 0..15
  const rivenUrl = './symbol_16_riven.png';    // id 16 only

  const ATLAS_COLS = 4;
  const ATLAS_ROWS = 4;


  useEffect(() => {
    let alive = true;
  
    const load = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      img.src = src;
    });
  
    Promise.all([
      load(atlasUrl),
      load(rivenUrl)
    ])
      .then(() => { if (alive) setAtlasLoaded(true); })
      .catch((err) => {
        console.error('[WishingWall]', err);
        if (alive) setAtlasLoaded(false);
      });
  
    return () => { alive = false; };
  }, [atlasUrl, rivenUrl]);

  
  const getSymbolStyle = (symbol) => {
    // Standalone symbol (id:16)
    if (symbol && symbol.id === 16) {
      return {
        backgroundImage: `url(${rivenUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
  
    // Atlas symbols (ids 0..15)
    const denomX = Math.max(1, ATLAS_COLS - 1);
    const denomY = Math.max(1, ATLAS_ROWS - 1);
    const posX = (symbol.col / denomX) * 100;
    const posY = (symbol.row / denomY) * 100;
  
    return {
      backgroundImage: `url(${atlasUrl})`,
      backgroundSize: `${ATLAS_COLS * 100}% ${ATLAS_ROWS * 100}%`,
      backgroundPosition: `${posX}% ${posY}%`,
      backgroundRepeat: 'no-repeat'
    };
  };

  const handleGridClick = (index) => {
    setGrid(prev => {
      const next = [...prev];
      if (next[index] === null) {
        next[index] = SYMBOLS[0];
      } else {
      const CYCLE_SYMBOLS = SYMBOLS.filter(s => s.id !== 16);
      const currentIndex = CYCLE_SYMBOLS.findIndex(s => s.id === next[index].id);
      const nextIndex = (currentIndex + 1) % CYCLE_SYMBOLS.length;
      next[index] = CYCLE_SYMBOLS[nextIndex];
      }
      return next;
    });
  };

  const handleGridRightClick = (e, index) => {
    e.preventDefault();
    setGrid(prev => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const clearGrid = () => setGrid(Array(20).fill(null));

  const loadWish = (wish) => {
    if (!wish || !Array.isArray(wish.pattern)) return;

    const newGrid = wish.pattern.map(symbolId => {
      if (symbolId === null) return null;
      const sym = SYMBOLS.find(s => s.id === symbolId);
      return sym || null;
    });

    // Ensure exactly 20 cells (your grid is 4x5)
    if (newGrid.length !== 20) {
      console.warn(`[WishingWall] Wish ${wish.number} pattern has ${newGrid.length} cells; expected 20.`);
    }
    setGrid(newGrid.slice(0, 20).concat(Array(Math.max(0, 20 - newGrid.length)).fill(null)));
  };

  if (!atlasLoaded) {
    return h(
      'div',
      { className: 'loading-indicator' },
      h('div', { className: 'spinner' }),
      h(
        'div',
        { style: { color: 'var(--primary)', fontFamily: 'Orbitron' } },
        'INITIALIZING WISHING WALL...'
      )
    );
  }

  return h(
    'div',
    { className: 'container' },
    h(
      'div',
      { className: 'header' },
      h('h1', { className: 'title' }, 'Wishing Wall'),
      h('p', { className: 'subtitle' }, 'Last Wish Raid • The Dreaming City')
    ),
    h(
      'div',
      { className: 'main-content' },

      // Wall section
      h(
        'div',
        { className: 'wall-section' },
        h('h2', { className: 'section-title' }, 'Wishing Wall Grid'),
        h(
          'p',
          { className: 'instruction-text' },
          'Click cells to cycle through symbols • Right-click to clear a cell • Click a wish to load its pattern'
        ),
        h(
          'div',
          { className: 'wishing-grid' },
          grid.map((symbol, index) =>
            h(
              'div',
              {
                key: index,
                className: `grid-cell ${symbol ? 'active' : ''}`,
                onClick: () => handleGridClick(index),
                onContextMenu: (e) => handleGridRightClick(e, index),
                title: symbol ? symbol.name : 'Click to cycle symbols'
              },
              symbol
                ? h('div', { className: 'symbol-display', style: getSymbolStyle(symbol) })
                : null
            )
          )
        ),
        h(
          'div',
          { className: 'controls' },
          h('button', { className: 'reset-button', onClick: clearGrid }, 'Reset')
        )
      ),

      // Wishes list
      h(
        'div',
        { className: 'wishes-list' },
        h('h2', { className: 'section-title' }, 'Known Wishes'),
        WISHES.map(wish =>
          h(
            'div',
            { key: wish.number, className: 'wish-item', onClick: () => loadWish(wish) },
            h(
              'div',
              { className: 'wish-header' },
              h('span', { className: 'wish-number' }, `WISH ${wish.number}`)
            ),
            h(
              'div',
              { className: 'wish-title' },
              wish.number === 15
                ? h('span', { className: 'mystery' }, wish.title)
                : wish.title
            ),
            h('div', { className: 'wish-description' }, wish.description)
          )
        )
      )
    )
  );
}

// React 17 style mount
ReactDOM.render(h(WishingWall), document.getElementById('root'));
