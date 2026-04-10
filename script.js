/* ============================================ */
/* INTERFACE :: Cartographic Engine             */
/* The map knows when you're looking at it.     */
/* ============================================ */

(function() {
    'use strict';
    
    // Wait for everything to load
    window.addEventListener('load', function() {
        
        const svgObject = document.getElementById('atlas-map');
        const statusText = document.getElementById('status-text');
        const coordinatesEl = document.getElementById('coordinates');
        const portalOverlay = document.getElementById('portal-overlay');
        const portalTitle = document.getElementById('portal-title');
        const portalDescription = document.getElementById('portal-description');
        const portalLinks = document.getElementById('portal-links');
        const portalClose = document.getElementById('portal-close');
        
        // Territory data - The heart of the nation
        const territories = {
            'soft-doom': {
                name: 'The Soft Doom Expanse',
                description: 'Where things end gently. Failed projects decompose into fertilizer. Abandoned experiments find peace here.',
                links: [
                    { text: '→ View the Ruins', url: 'https://github.com/YOUR_USERNAME' },
                    { text: '→ Archaeological Survey', url: '#' }
                ]
            },
            'concrete-cloud': {
                name: 'The Concrete & Cloud Prefecture',
                description: 'The administrative center. Mortals are permitted here. Clean interfaces. Reliable infrastructure. Professional portfolio.',
                links: [
                    { text: '→ Enter Prefecture', url: '#' },
                    { text: '→ View Professional Works', url: '#' },
                    { text: '→ Infrastructure Reports', url: '#' }
                ]
            },
            'candy-wrapper': {
                name: 'The Candy Wrapper Badlands',
                description: 'Sticky. Disposable. Delicious. Temporary shelters for bright ideas. Side projects and micro-experiments live fast and die pretty.',
                links: [
                    { text: '→ Unwrap Territory', url: '#' },
                    { text: '→ View Volatile Projects', url: '#' }
                ]
            },
            'silent-transit': {
                name: 'The Silent Transit Corridor',
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
        
        // Update coordinates based on mouse position
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX;
            const y = e.clientY;
            
            // Generate fake but plausible coordinates
            const lat = ((y / window.innerHeight) * 180 - 90).toFixed(2);
            const lon = ((x / window.innerWidth) * 360 - 180).toFixed(2);
            
            const latDir = lat >= 0 ? 'N' : 'S';
            const lonDir = lon >= 0 ? 'E' : 'W';
            
            coordinatesEl.textContent = `${Math.abs(lat)}° ${latDir}, ${Math.abs(lon)}° ${lonDir}`;
        });
        
        // Once the SVG loads, attach event listeners
        svgObject.addEventListener('load', function() {
            const svgDoc = svgObject.contentDocument;
            
            if (!svgDoc) {
                console.error('Could not access SVG document. Check CORS or file path.');
                statusText.textContent = '⚠️ Cartographic Error: Cannot read atlas plate';
                return;
            }
            
            // Find all territories
            const territoryElements = svgDoc.querySelectorAll('.territory');
            
            if (territoryElements.length === 0) {
                console.warn('No territories found in SVG.');
                statusText.textContent = '🗺️ Atlas loaded. No claimed territories found.';
            }
            
            // Attach events to each territory
            territoryElements.forEach(function(territory) {
                
                // Find the parent region with data-region attribute
                const regionGroup = territory.closest('[data-region]');
                const regionId = regionGroup ? regionGroup.dataset.region : null;
                
                if (!regionId) {
                    console.warn('Territory found without data-region parent');
                    return;
                }
                
                // Hover effects
                territory.addEventListener('mouseenter', function() {
                    const data = territories[regionId];
                    if (data) {
                        statusText.textContent = `📍 Now surveying: ${data.name}`;
                    } else {
                        statusText.textContent = `📍 Now surveying: Uncharted Territory (${regionId})`;
                    }
                    territory.style.cursor = 'pointer';
                });
                
                territory.addEventListener('mouseleave', function() {
                    statusText.textContent = '🗺️ Awaiting cartographic selection...';
                    territory.style.cursor = 'pointer';
                });
                
                // Click handler - Opens the portal
                territory.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const data = territories[regionId];
                    
                    if (!data) {
                        statusText.textContent = `⚠️ No cartographic data for: ${regionId}`;
                        return;
                    }
                    
                    // Populate portal
                    portalTitle.textContent = data.name;
                    portalDescription.textContent = data.description;
                    
                    // Build links
                    portalLinks.innerHTML = '';
                    data.links.forEach(function(link) {
                        const a = document.createElement('a');
                        a.href = link.url;
                        a.className = 'portal-link';
                        a.textContent = link.text;
                        
                        // External links open in new tab
                        if (link.url.startsWith('http') || link.url.startsWith('mailto')) {
                            a.target = '_blank';
                            a.rel = 'noopener noreferrer';
                        }
                        
                        portalLinks.appendChild(a);
                    });
                    
                    // Show overlay
                    portalOverlay.classList.add('active');
                    statusText.textContent = `🏴 Territory Accessed: ${data.name}`;
                });
                
            });
            
            statusText.textContent = '🗺️ Atlas loaded. Territories await claiming.';
            console.log('🗺️ Cartographic Engine initialized. The nation is sovereign.');
            
        });
        
        // Close portal
        portalClose.addEventListener('click', function() {
            portalOverlay.classList.remove('active');
            statusText.textContent = '🗺️ Awaiting cartographic selection...';
        });
        
        // Close on overlay click (clicking outside the window)
        portalOverlay.addEventListener('click', function(e) {
            if (e.target === portalOverlay) {
                portalOverlay.classList.remove('active');
                statusText.textContent = '🗺️ Awaiting cartographic selection...';
            }
        });
        
        // Escape key closes portal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && portalOverlay.classList.contains('active')) {
                portalOverlay.classList.remove('active');
                statusText.textContent = '🗺️ Awaiting cartographic selection...';
            }
        });
        
        // Handle SVG loading errors
        svgObject.addEventListener('error', function() {
            statusText.textContent = '⚠️ Cartographic Error: Atlas plate not found';
            console.error('Could not load map-plate.svg');
        });
        
    });
    
})();
