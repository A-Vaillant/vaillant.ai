const projects = [
    {
        name: "factorio-working-group-one",
        description: "An investigation into the application of convolutional neural networks towards automating factory creation through Factorio.",
        type: "Research Project",
        modified: "2025-05-19",
        // link: "https://github.com/A-Vaillant/factorio-working-group-1"
        // icon: "&#x2699;"
    },
    {
        name: "negative-qwop",
        description: "Made for the Stupid Hackathon 2025 at NYU's ISB dept. Solving going backwards in QWOP. Ended up hitting a wall.",
        type: "Reinforcement Learning",
        modified: "2025-05-21",
        // link: "powq.html"
    },
    {
        name: "petrock",
        description: "A Raspberry Pi-able visual LLM + chatbot combination. Can look at pictures (including taken from a camera) and make comments nicely or rudely.",
        type: "Large Language Models",
        modified: "2024-05-14",
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
}    // function renderProjects() {
    //   const folderContent = document.querySelector('.folder-content');
    //   folderContent.innerHTML = projects.map(project => `
    //     <div class="file" onclick="window.location.href='${project.link}'">
    //       <span class="file-icon">${project.icon || '&#x2022;'}</span>
    //       <span class="file-name">${project.name}</span>
    //       <span class="file-meta">${project.type} | ${project.modified}</span>
    //     </div>
    //   `).join('');
    // }

renderProjects();

// Simple name switch based on URL parameter
if (new URLSearchParams(location.search).get('a') === '2') {
    document.getElementById('name').textContent = 'Alice Vaillant';
    const email = document.querySelector('a.subtitle');
    email.textContent = 'alice@vaillant.ai';
    email.href = 'mailto:alice@vaillant.ai';
}
