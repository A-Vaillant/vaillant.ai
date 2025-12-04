const projects = [
    {
        name: 'factorio-working-group-one',
        description: 'An investigation into the application of convolutional neural networks towards automating factory creation through Factorio.',
        type: 'Research Project',
        modified: '2025-05-19',
        // link: "https://github.com/A-Vaillant/factorio-working-group-1"
        // icon: "&#x2699;"
    },
    {
        name: 'negative-qwop',
        description: 'Made for the Stupid Hackathon 2025 at NYU\'s ISB dept. Solving going backwards in QWOP. Ended up hitting a wall.',
        type: 'Reinforcement Learning',
        modified: '2025-05-21',
        // link: "powq.html"
    },
    {
        name: 'petrock',
        description: 'A Raspberry Pi-able visual LLM + chatbot combination. Can look at pictures (including taken from a camera) and make comments nicely or rudely.',
        type: 'Large Language Models',
        modified: '2024-05-14',
        // link: "https://github.com/A-Vaillant/petrock"
    }
    ];

    document.querySelectorAll('.folder-header').forEach(header => {
    header.addEventListener('click', () => {
        const folder = header.parentElement;
        folder.classList.toggle('open');
        });
    });


// Add this to your projects array (keeping existing properties)
// Each project already has a description, so no changes needed there

// Replace the existing renderProjects function:
function renderProjects() {
    const folderContent = document.querySelector('.folder-content');
    if (!folderContent) return; // Projects section was removed from HTML

    folderContent.innerHTML = projects.map((project, index) => `
        <div class="file" data-index="${index}">
            <div class="file-header">
                <span class="file-icon">${project.icon || '&#x2022;'}</span>
                <span class="file-name">${project.name}</span>
                <span class="file-meta">${project.type} | ${project.modified}</span>
            </div>
            <div class="file-description" style="display: none;">
                ${project.description}
            </div>
        </div>
    `).join('');

    // Add click handlers for file expansion
    document.querySelectorAll('.file-header').forEach(header => {
        header.addEventListener('click', () => {
            const file = header.parentElement;
            const description = file.querySelector('.file-description');
            const isVisible = description.style.display !== 'none';

            description.style.display = isVisible ? 'none' : 'block';
            file.classList.toggle('expanded', !isVisible);
        });
    });
}

// Theme configuration
const urlParams = new URLSearchParams(location.search);
const cfg = urlParams.get('a');
if (cfg && parseInt(cfg) === 2) {
    const n = document.getElementById('name');
    const e = document.querySelector('a.subtitle');
    const r = document.getElementById('resume-link');

    n.textContent = String.fromCharCode(65,108,105,99,101,32,86,97,105,108,108,97,110,116);
    e.textContent = String.fromCharCode(97,108,105,99,101,64,118,97,105,108,108,97,110,116,46,97,105);
    e.href = 'mailto:' + String.fromCharCode(97,108,105,99,101,64,118,97,105,108,108,97,110,116,46,97,105);

    if (r) r.href = 'resume.html?a=' + cfg;
}

renderProjects();
