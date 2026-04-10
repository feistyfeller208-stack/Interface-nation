/* ============================================ */
/* INTERFACE :: Portal Controller               */
/* Handles territory clicks and overlay display */
/* ============================================ */

(function() {
    'use strict';
    
    // Territory data - Update with your actual links
    const territories = {
        'soft-doom': {
            name: 'Soft Doom Expanse',
            description: 'Where things end gently. Failed projects decompose into fertilizer. Abandoned experiments find peace in the ruins.',
            links: [
                { text: '→ View the Ruins', url: 'https://github.com/feistyfeller208-stack' },
                { text: '→ Archaeological Survey', https://github.com/feistyfeller208-stack: '#' }
            ]
        },
        'concrete-cloud': {
            name: 'Concrete & Cloud Prefecture',
            description: 'The administrative center. Mortals are permitted here. Clean interfaces. Reliable infrastructure. Professional portfolio and client work.',
            links: [
                { text: '→ Enter Prefecture', url: '#' },
                { text: '→ Professional Portfolio', url: '#' },
                { text: '→ Infrastructure Reports', url: '#' }
            ]
        },
        'candy-wrapper': {
            name: 'Candy Wrapper Badlands',
            description: 'Sticky. Disposable. Delicious. Temporary shelters for bright ideas. Side projects and micro-experiments live fast and die pretty.',
            links: [
                { text: '→ Unwrap Territory', url: '#' },
                { text: '→ Volatile Projects', url: '#' },
                { text: '→ Experimental Zone', url: '#' }
            ]
        },
        'silent-transit': {
            name: 'Silent Transit Corridor',
            description: 'The place between places. Raw code flows through here. Repositories. Commits. Fork the path and leave no trace.',
            links: [
                { text: '→ GitHub (Source)', url: 'https://github.com/YOUR_USERNAME' },
                { text: '→ View This Repository', url: 'https://github.com/YOUR_USERNAME/interface-nation' }
            ]
        },
        'embassy': {
            name: 'Embassy Row',
            description: 'Sovereignty requires paperwork. Diplomatic relations established through proper channels. Form I-404 must be completed in triplicate.',
            links: [
                { text: '→ Request Territorial Status', url: '#' },
                { text: '→ Diplomatic Cable', url: 'mailto:your@email.com' },
                { text: '→ Schedule an Audience', url: '#' }
            ]
        }
    };
    
    // DOM Elements
    const portalOverlay = document.getElementById('portal-overlay');
    const portalTitle = document.getElementById('portal-title');
    const portalDescription = document.getElementById('portal-description');
    const portalLinks = document.getElementById('portal-links');
    const portalClose = document.getElementById('portal-close');
    const statusText = document.getElementById('status-text');
    
    // Wait for globe to be ready
    window.addEventListener('load', function() {
        
        // Function to attach listeners to territories (called after globe renders)
        window.attachTerritoryListeners = function() {
            const territoryElements = document.querySelectorAll('.territory');
            
            territoryElements.forEach(t => {
                // Remove existing listeners
                t.removeEventListener('click', handleTerritoryClick);
                t.removeEventListener('mouseenter', handleTerritoryEnter);
                t.removeEventListener('mouseleave', handleTerritoryLeave);
                
                // Add new listeners
                t.addEventListener('click', handleTerritoryClick);
                t.addEventListener('mouseenter', handleTerritoryEnter);
                t.addEventListener('mouseleave', handleTerritoryLeave);
            });
            
            console.log('🗺️ Territory listeners attached. The nation awaits.');
        };
        
        // Handler functions
        function handleTerritoryClick(e) {
            const territory = e.currentTarget;
            const id = territory.dataset.id;
            const data = territories[id];
            
            if (!data) {
                console.warn(`No data for territory: ${id}`);
                return;
            }
            
            // Populate portal
            portalTitle.textContent = data.name;
            portalDescription.textContent = data.description;
            
            // Build links
            portalLinks.innerHTML = '';
            data.links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.className = 'portal-link';
                a.textContent = link.text;
                
                if (link.url.startsWith('http') || link.url.startsWith('mailto')) {
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                }
                
                portalLinks.appendChild(a);
            });
            
            // Show overlay
            portalOverlay.classList.add('active');
            statusText.textContent = `🏴 Territory Accessed: ${data.name}`;
            
            // Pause auto-rotation if globe has it
            if (window.pauseAutoRotate) {
                window.pauseAutoRotate();
            }
        }
        
        function handleTerritoryEnter(e) {
            const territory = e.currentTarget;
            const id = territory.dataset.id;
            const data = territories[id];
            
            if (data) {
                statusText.textContent = `📍 Now surveying: ${data.name}`;
            }
        }
        
        function handleTerritoryLeave() {
            statusText.textContent = '🗺️ Awaiting territorial selection...';
        }
        
        // Close portal
        portalClose.addEventListener('click', closePortal);
        
        portalOverlay.addEventListener('click', function(e) {
            if (e.target === portalOverlay) {
                closePortal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && portalOverlay.classList.contains('active')) {
                closePortal();
            }
        });
        
        function closePortal() {
            portalOverlay.classList.remove('active');
            statusText.textContent = '🗺️ Awaiting territorial selection...';
            
            // Resume auto-rotation
            if (window.resumeAutoRotate) {
                window.resumeAutoRotate();
            }
        }
        
        // Initial status
        statusText.textContent = '🗺️ Globe initializing... Cartographic engine starting.';
    });
    
})();
