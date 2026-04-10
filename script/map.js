// INTERFACE :: Cartographic Engine
// The map is alive. Borders shift.

const compass = document.getElementById('compass');
const statusText = document.getElementById('status-text');
const coordinates = document.getElementById('coordinates');
const portalOverlay = document.getElementById('portal-overlay');
const portalContent = document.getElementById('portal-content-inner');
const closePortal = document.getElementById('close-portal');

// Custom cursor (Compass Rose)
document.addEventListener('mousemove', (e) => {
    compass.style.left = e.clientX + 'px';
    compass.style.top = e.clientY + 'px';
    
    // Update fake coordinates
    const lat = ((e.clientY / window.innerHeight) * 180 - 90).toFixed(2);
    const lon = ((e.clientX / window.innerWidth) * 360 - 180).toFixed(2);
    coordinates.textContent = `${Math.abs(lat)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon)}° ${lon >= 0 ? 'E' : 'W'}`;
});

// Region definitions
const regions = {
    'soft-doom': {
        name: 'The Soft Doom Expanse',
        description: 'Where things end gently. Failed projects go here to decompose into fertilizer.',
        links: [
            { text: 'View the Ruins', url: 'https://github.com/feistyfeller208-stack' }
        ]
    },
    'concrete-cloud': {
        name: 'The Concrete & Cloud Prefecture',
        description: 'The administrative center. Mortals are permitted here. Client work and professional builds.',
        links: [
            { text: 'Enter Prefecture', https://github.com/feistyfeller208-stack/BizBook: '#' },
            { text: 'View Portfolio', https://github.com/feistyfeller208-stack/BizBook: '#' }
        ]
    },
    'candy-wrapper': {
        name: 'The Candy Wrapper Badlands',
        description: 'Sticky. Disposable. Delicious. Temporary shelters for bright ideas and side projects.',
        links: [
            { text: 'Unwrap', https://github.com/feistyfeller208-stack/Lancaster: '#' }
        ]
    },
    'silent-transit': {
        name: 'The Silent Transit Corridor',
        description: 'The place between places. Raw code. Repositories. Fork the path and leave.',
        links: [
            { text: 'GitHub', url: 'https://github.com/YOUR_USERNAME' },
            { text: 'View Source', url: 'https://github.com/feistyfeller208-stack/interface-nation' }
        ]
    },
    'embassy': {
        name: 'Embassy Row',
        description: 'Sovereignty is granted only to those who fill out the proper forms in triplicate.',
        links: [
            { text: 'Request Territorial Status', https://github.com/feistyfeller208-stack/Boom-pixel: '#' },
            { text: 'Diplomatic Channels', url: 'mailto:guyfei208@gmail.com' }
        ]
    }
};

// Region click handlers
document.querySelectorAll('.region').forEach(region => {
    region.addEventListener('mouseenter', () => {
        const regionName = region.querySelector('.region-label').textContent;
        statusText.textContent = `Now Entering: ${regionName}`;
        
        // Slight curve bend effect (would be more sophisticated with real SVG manipulation)
        document.querySelector('.curve-line').style.stroke = '#F3EED9';
    });
    
    region.addEventListener('mouseleave', () => {
        statusText.textContent = 'Awaiting territorial selection...';
        document.querySelector('.curve-line').style.stroke = '#45A29E';
    });
    
    region.addEventListener('click', (e) => {
        const portal = region.dataset.portal;
        const regionData = regions[portal];
        
        if (regionData) {
            openPortal(regionData);
        }
    });
});

// Portal functions
function openPortal(data) {
    let html = `
        <h2 style="color: var(--data); font-weight: 400; letter-spacing: 0.2em; margin-bottom: 1rem; text-transform: uppercase;">${data.name}</h2>
        <p style="margin-bottom: 2rem; line-height: 1.6; opacity: 0.8;">${data.description}</p>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
    `;
    
    data.links.forEach(link => {
        html += `<a href="${link.url}" style="color: var(--flesh); text-decoration: none; border: 0.5px solid var(--data); padding: 1rem; text-align: center; text-transform: uppercase; letter-spacing: 0.2em; transition: all 0.3s;" onmouseover="this.style.background='rgba(69,162,158,0.1)'" onmouseout="this.style.background='transparent'">→ ${link.text}</a>`;
    });
    
    html += `</div>`;
    html += `<p style="margin-top: 2rem; font-size: 0.7rem; opacity: 0.4; text-align: center;">Form I-404 :: Application for Non-Existent Space</p>`;
    
    portalContent.innerHTML = html;
    portalOverlay.classList.add('active');
    statusText.textContent = `TERRITORY ACCESSED: ${data.name}`;
}

closePortal.addEventListener('click', () => {
    portalOverlay.classList.remove('active');
    statusText.textContent = 'Awaiting territorial selection...';
});

portalOverlay.addEventListener('click', (e) => {
    if (e.target === portalOverlay) {
        portalOverlay.classList.remove('active');
        statusText.textContent = 'Awaiting territorial selection...';
    }
});

// Glitch effect on page load
window.addEventListener('load', () => {
    document.body.style.animation = 'none';
    setTimeout(() => {
        statusText.textContent = 'Cartographic Engine Initialized. Borders Unstable.';
    }, 1000);
});

// Easter egg: Konami code or specific key combo could reveal hidden region
let keySequence = [];
document.addEventListener('keydown', (e) => {
    keySequence.push(e.key);
    if (keySequence.slice(-5).join('') === 'INTER') {
        statusText.textContent = '!!! TERRITORY ANOMALY DETECTED !!!';
        document.querySelector('.curve-line').style.animation = 'glitch-pulse 0.3s infinite';
    }
});
