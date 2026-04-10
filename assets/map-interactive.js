// Cartographic Interactive Layer
// The map knows when you're looking at it.

document.addEventListener('DOMContentLoaded', () => {
    const territories = document.querySelectorAll('.territory');
    const statusEl = document.getElementById('status-text') || createStatusBar();
    
    const regionData = {
        'soft-doom': {
            name: 'The Soft Doom Expanse',
            description: 'Where things end gently. Failed projects decompose into fertilizer.',
            links: [
                { text: 'Visit the Ruins', url: 'https://github.com/YOUR_USERNAME' }
            ]
        },
        'concrete-cloud': {
            name: 'The Concrete & Cloud Prefecture',
            description: 'Administrative center. Mortals permitted. Professional portfolio.',
            links: [
                { text: 'Enter Prefecture', url: '#' }
            ]
        },
        'candy-wrapper': {
            name: 'The Candy Wrapper Badlands',
            description: 'Sticky. Disposable. Delicious. Side projects and experiments.',
            links: [
                { text: 'Unwrap Territory', url: '#' }
            ]
        },
        'silent-transit': {
            name: 'The Silent Transit Corridor',
            description: 'Raw code. Repositories. Fork the path and leave.',
            links: [
                { text: 'GitHub', url: 'https://github.com/YOUR_USERNAME' },
                { text: 'View Source', url: 'https://github.com/YOUR_USERNAME/interface-nation' }
            ]
        },
        'embassy': {
            name: 'Embassy Row',
            description: 'Sovereignty requires paperwork. Form I-404 must be completed in triplicate.',
            links: [
                { text: 'Request Territorial Status', url: '#' },
                { text: 'Diplomatic Contact', url: 'mailto:your@email.com' }
            ]
        }
    };
    
    territories.forEach(territory => {
        const region = territory.closest('[data-region]')?.dataset.region;
        
        territory.addEventListener('mouseenter', () => {
            const name = regionData[region]?.name || 'Uncharted Territory';
            statusEl.textContent = `📍 Now surveying: ${name}`;
            territory.style.filter = 'brightness(1.1) drop-shadow(0 0 5px rgba(69,162,158,0.3))';
        });
        
        territory.addEventListener('mouseleave', () => {
            statusEl.textContent = '🗺️ Awaiting cartographic selection...';
            territory.style.filter = '';
        });
        
        territory.addEventListener('click', () => {
            const data = regionData[region];
            if (data) {
                showPortal(data);
            }
        });
    });
    
    function showPortal(data) {
        // Create or show portal overlay with territory information
        console.log(`Accessing territory: ${data.name}`);
        // Implementation depends on your overlay system
    }
    
    function createStatusBar() {
        const bar = document.createElement('div');
        bar.id = 'cartographic-status';
        bar.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #D4C4A8;
            border: 1px solid #3D2B1F;
            padding: 8px 16px;
            font-family: serif;
            font-size: 12px;
            color: #3D2B1F;
            z-index: 1000;
            opacity: 0.9;
        `;
        bar.textContent = '🗺️ Awaiting cartographic selection...';
        document.body.appendChild(bar);
        return bar;
    }
});
