/* ============================================ */
/* INTERFACE :: Portal Controller               */
/* Handles territory clicks and overlay display */
/* ============================================ */

(function() {
    'use strict';
    
    // DOM Elements
    const portalOverlay = document.getElementById('portal-overlay');
    const portalTitle = document.getElementById('portal-title');
    const portalDescription = document.getElementById('portal-description');
    const portalLinks = document.getElementById('portal-links');
    const portalClose = document.getElementById('portal-close');
    const statusText = document.getElementById('status-text');
    
    // Wait for globe to be ready
    window.addEventListener('load', function() {
        
        // Get territories data from globe
        const territories = window.territoriesData || {};
        
        // Attach listeners to all territory markers
        function attachListeners() {
            const territoryElements = document.querySelectorAll('.territory');
            
            territoryElements.forEach(t => {
                // Remove any existing listeners
                t.removeEventListener('click', handleClick);
                t.removeEventListener('mouseenter', handleEnter);
                t.removeEventListener('mouseleave', handleLeave);
                
                // Add fresh listeners
                t.addEventListener('click', handleClick);
                t.addEventListener('mouseenter', handleEnter);
                t.addEventListener('mouseleave', handleLeave);
            });
            
            console.log(`🗺️ ${territoryElements.length} territories ready for diplomatic contact.`);
        }
        
        function handleClick(e) {
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
            
            // Pause auto-rotation
            if (window.pauseAutoRotate) {
                window.pauseAutoRotate();
            }
        }
        
        function handleEnter(e) {
            const territory = e.currentTarget;
            const id = territory.dataset.id;
            const data = territories[id];
            
            if (data) {
                statusText.textContent = `📍 Now surveying: ${data.name}`;
            }
        }
        
        function handleLeave() {
            if (!portalOverlay.classList.contains('active')) {
                statusText.textContent = '🗺️ Awaiting territorial selection...';
            }
        }
        
        function closePortal() {
            portalOverlay.classList.remove('active');
            statusText.textContent = '🗺️ Awaiting territorial selection...';
            
            // Resume auto-rotation
            if (window.resumeAutoRotate) {
                window.resumeAutoRotate();
            }
        }
        
        // Close portal events
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
        
        // Attach listeners now
        attachListeners();
        
        // Re-attach if globe rotates (delegation handles this)
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.getElementById('globe'), { 
            childList: true, 
            subtree: true 
        });
        
    });
    
})();
