/* ============================================ */
/* INTERFACE :: Cartographic Globe Engine       */
/* A living simulation of a world that isn't    */
/* ============================================ */

const width = Math.min(window.innerWidth, 1200);
const height = Math.min(window.innerHeight, 1200);

// Territory definitions
const territories = {
    'soft-doom': {
        name: 'Soft Doom Expanse',
        description: 'Where things end gently. Failed projects decompose into fertilizer.',
        links: [
            { text: '→ View the Ruins', url: 'https://github.com/feistyfeller208-stack' }
        ]
    },
    'concrete-cloud': {
        name: 'Concrete & Cloud Prefecture',
        description: 'The administrative center. Clean interfaces. Professional portfolio.',
        links: [
            { text: '→ Enter Prefecture', https://github.com/feistyfeller208-stack: '#' }
        ]
    },
    'candy-wrapper': {
        name: 'Candy Wrapper Badlands',
        description: 'Sticky. Disposable. Delicious. Side projects and experiments.',
        links: [
            { text: '→ Unwrap Territory', https://github.com/feistyfeller208-stack: '#' }
        ]
    },
    'silent-transit': {
        name: 'Silent Transit Corridor',
        description: 'Raw code flows through here. Repositories. Fork and leave.',
        links: [
            { text: '→ GitHub', url: 'https://github.com/YOUR_USERNAME' }
        ]
    },
    'embassy': {
        name: 'Embassy Row',
        description: 'Sovereignty requires paperwork. Form I-404 required.',
        links: [
            { text: '→ Request Status', url: '#' },
            { text: '→ Contact', url: 'mailto:guyfei208@gmail.com' }
        ]
    }
};

// Generate fictional world data
function generateWorld() {
    // Create a fictional supercontinent with islands
    const world = {
        type: 'Topology',
        objects: {
            land: {
                type: 'GeometryCollection',
                geometries: []
            }
        },
        arcs: []
    };
    
    // Procedurally generate landmasses using multiple overlapping polygons
    // This creates organic-looking continents
    
    // Main continent (like Pangea but broken)
    const continents = [
        // Large northern landmass
        { coords: generateBlob(0.3, 0.3, 0.4, 0.3, 8), name: 'main' },
        // Southern continent
        { coords: generateBlob(0.5, 0.7, 0.3, 0.2, 6), name: 'south' },
        // Eastern islands
        { coords: generateBlob(0.75, 0.4, 0.15, 0.15, 5), name: 'east' },
        // Western archipelago
        { coords: generateBlob(0.15, 0.6, 0.12, 0.12, 4), name: 'west' },
        // Polar land
        { coords: generateBlob(0.5, 0.15, 0.2, 0.1, 5), name: 'north' }
    ];
    
    return continents;
}

// Generate an organic blob shape using multiple points with noise
function generateBlob(centerX, centerY, width, height, complexity) {
    const points = [];
    const steps = 12 + complexity * 2;
    
    for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const noise = Math.sin(i * 3) * 0.2 + Math.cos(i * 2) * 0.15;
        const r = (1 + noise) * 0.5;
        
        const x = centerX + Math.cos(angle) * width * r;
        const y = centerY + Math.sin(angle) * height * r;
        
        points.push([x, y]);
    }
    
    return points;
}

// Set up the globe projection
const projection = d3.geoOrthographic()
    .scale(width / 2.2)
    .translate([width / 2, height / 2])
    .rotate([0, -10])
    .clipAngle(90);

const path = d3.geoPath().projection(projection);

// Create SVG
const svg = d3.select('#globe')
    .attr('width', width)
    .attr('height', height);

// Add gradient for ocean
const defs = svg.append('defs');

const oceanGradient = defs.append('radialGradient')
    .attr('id', 'oceanGrad')
    .attr('cx', '50%')
    .attr('cy', '40%')
    .attr('r', '60%');

oceanGradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#1a3a4a');

oceanGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#0a1a2a');

// Ocean sphere
svg.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', projection.scale())
    .attr('fill', 'url(#oceanGrad)')
    .attr('stroke', '#2a5a6a')
    .attr('stroke-width', 0.5);

// Add graticule (latitude/longitude lines)
const graticule = d3.geoGraticule();
svg.append('path')
    .datum(graticule)
    .attr('class', 'graticule')
    .attr('d', path);

// Generate and render fictional landmasses
const world = generateWorld();

// Add continent glow
defs.append('filter')
    .attr('id', 'landGlow')
    .append('feGaussianBlur')
    .attr('stdDeviation', 3)
    .attr('result', 'blur');

// Land gradient
const landGradient = defs.append('linearGradient')
    .attr('id', 'landGrad')
    .attr('x1', '0%').attr('y1', '0%')
    .attr('x2', '100%').attr('y2', '100%');

landGradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#2d5a3d');

landGradient.append('stop')
    .attr('offset', '50%')
    .attr('stop-color', '#4a7a5d');

landGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#6b9a7d');

// Render each continent
world.forEach((continent, i) => {
    const geoJson = {
        type: 'Polygon',
        coordinates: [continent.coords.map(p => [p[0] * 360 - 180, p[1] * 180 - 90])]
    };
    
    // Main landmass
    svg.append('path')
        .datum(geoJson)
        .attr('class', 'continent')
        .attr('d', path)
        .attr('fill', 'url(#landGrad)')
        .attr('stroke', '#8abaa0')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.9);
    
    // Add terrain texture (secondary path for topography illusion)
    svg.append('path')
        .datum(geoJson)
        .attr('class', 'continent-topo')
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke', '#3d7a5d')
        .attr('stroke-width', 0.3)
        .attr('stroke-dasharray', '2,4')
        .attr('opacity', 0.5);
});

// Add INTERFACE territories as marked points
const territoryLocations = [
    { id: 'soft-doom', name: 'Soft Doom', coords: [0.35, 0.35] },
    { id: 'concrete-cloud', name: 'Concrete & Cloud', coords: [0.55, 0.75] },
    { id: 'candy-wrapper', name: 'Candy Wrapper', coords: [0.8, 0.45] },
    { id: 'silent-transit', name: 'Silent Transit', coords: [0.2, 0.65] },
    { id: 'embassy', name: 'Embassy Row', coords: [0.5, 0.2] }
];

// Territory markers
territoryLocations.forEach(t => {
    const lon = t.coords[0] * 360 - 180;
    const lat = t.coords[1] * 180 - 90;
    
    const group = svg.append('g')
        .attr('class', 'territory')
        .attr('data-id', t.id)
        .style('cursor', 'pointer');
    
    // Pulsing ring
    group.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 8)
        .attr('fill', 'none')
        .attr('stroke', '#45A29E')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.6)
        .attr('transform', `translate(${projection([lon, lat]) || '0,0'})`);
    
    // Center dot
    group.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 3)
        .attr('fill', '#45A29E')
        .attr('transform', `translate(${projection([lon, lat]) || '0,0'})`);
    
    // Label
    group.append('text')
        .attr('x', 12)
        .attr('y', 4)
        .attr('fill', '#e8e4db')
        .attr('font-size', '9px')
        .attr('font-family', 'Space Mono, monospace')
        .attr('letter-spacing', '1px')
        .attr('transform', `translate(${projection([lon, lat]) || '0,0'})`)
        .text(t.name)
        .style('text-shadow', '0 1px 4px #000')
        .style('pointer-events', 'none');
});

// Rotation controls
let rotate = [0, -10];
let dragging = false;
let lastX, lastY;
const sensitivity = 0.25;

svg.on('mousedown', (event) => {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    svg.style('cursor', 'grabbing');
});

svg.on('mousemove', (event) => {
    if (!dragging) return;
    
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    
    rotate[0] += dx * sensitivity;
    rotate[1] -= dy * sensitivity;
    
    // Clamp latitude
    rotate[1] = Math.max(-90, Math.min(90, rotate[1]));
    
    projection.rotate(rotate);
    
    // Update all paths
    svg.selectAll('path').attr('d', path);
    svg.selectAll('.territory circle, .territory text')
        .attr('transform', function() {
            const parent = this.parentNode;
            const t = territoryLocations.find(t => t.id === parent.dataset.id);
            if (!t) return '';
            const lon = t.coords[0] * 360 - 180;
            const lat = t.coords[1] * 180 - 90;
            const proj = projection([lon, lat]);
            return proj ? `translate(${proj[0]}, ${proj[1]})` : 'translate(-9999, -9999)';
        });
    
    lastX = event.clientX;
    lastY = event.clientY;
});

svg.on('mouseup', () => {
    dragging = false;
    svg.style('cursor', 'grab');
});

svg.on('mouseleave', () => {
    dragging = false;
    svg.style('cursor', 'grab');
});

svg.style('cursor', 'grab');

// Auto-rotate slowly when idle
let autoRotate = true;
let lastInteraction = Date.now();

svg.on('mousedown', () => { autoRotate = false; lastInteraction = Date.now(); });
svg.on('mouseup', () => { lastInteraction = Date.now(); });

function animate() {
    if (autoRotate && Date.now() - lastInteraction > 3000) {
        rotate[0] += 0.15;
        projection.rotate(rotate);
        svg.selectAll('path').attr('d', path);
        svg.selectAll('.territory circle, .territory text')
            .attr('transform', function() {
                const parent = this.parentNode;
                const t = territoryLocations.find(t => t.id === parent.dataset.id);
                if (!t) return '';
                const lon = t.coords[0] * 360 - 180;
                const lat = t.coords[1] * 180 - 90;
                const proj = projection([lon, lat]);
                return proj ? `translate(${proj[0]}, ${proj[1]})` : 'translate(-9999, -9999)';
            });
    }
    requestAnimationFrame(animate);
}
animate();

// Portal system
const portalOverlay = document.getElementById('portal-overlay');
const portalTitle = document.getElementById('portal-title');
const portalDescription = document.getElementById('portal-description');
const portalLinks = document.getElementById('portal-links');
const portalClose = document.getElementById('portal-close');
const statusText = document.getElementById('status-text');

// Territory click handlers
document.querySelectorAll('.territory').forEach(t => {
    t.addEventListener('click', () => {
        const id = t.dataset.id;
        const data = territories[id];
        if (!data) return;
        
        portalTitle.textContent = data.name;
        portalDescription.textContent = data.description;
        
        portalLinks.innerHTML = '';
        data.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'portal-link';
            a.textContent = link.text;
            if (link.url.startsWith('http')) {
                a.target = '_blank';
                a.rel = 'noopener';
            }
            portalLinks.appendChild(a);
        });
        
        portalOverlay.classList.add('active');
        statusText.textContent = `🏴 Territory Accessed: ${data.name}`;
        
        autoRotate = false;
        lastInteraction = Date.now();
    });
    
    t.addEventListener('mouseenter', () => {
        const id = t.dataset.id;
        const data = territories[id];
        if (data) {
            statusText.textContent = `📍 Now surveying: ${data.name}`;
        }
    });
    
    t.addEventListener('mouseleave', () => {
        statusText.textContent = '🗺️ Awaiting territorial selection...';
    });
});

// Close portal
portalClose.addEventListener('click', () => {
    portalOverlay.classList.remove('active');
    statusText.textContent = '🗺️ Awaiting territorial selection...';
    lastInteraction = Date.now();
});

portalOverlay.addEventListener('click', (e) => {
    if (e.target === portalOverlay) {
        portalOverlay.classList.remove('active');
        statusText.textContent = '🗺️ Awaiting territorial selection...';
        lastInteraction = Date.now();
    }
});

// Coordinates display
document.addEventListener('mousemove', (e) => {
    const coordsEl = document.getElementById('coordinates');
    const lat = ((e.clientY / height) * 180 - 90).toFixed(2);
    const lon = ((e.clientX / width) * 360 - 180).toFixed(2);
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    coordsEl.textContent = `${Math.abs(lat)}° ${latDir}, ${Math.abs(lon)}° ${lonDir}`;
});

// Initialize
statusText.textContent = '🗺️ Globe initialized. The nation is sovereign.';
