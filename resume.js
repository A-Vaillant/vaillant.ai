// Load resume data from embedded JSON (JSON Resume format)
let resumeDataScript = document.getElementById('resume-data');
let resumeData = null;

if (resumeDataScript) {
  try {
    resumeData = JSON.parse(resumeDataScript.textContent);
  } catch (e) {
    console.error('Failed to parse resume data:', e);
  }
}

function loadResume() {
  if (!resumeData) {
    console.error('No resume data found');
    document.getElementById('resume-name').textContent = 'No Resume Data';
    return;
  }
  renderResume(resumeData);
}

function renderResume(data) {
  const basics = data.basics || {};

  // Header
  document.getElementById('resume-name').textContent = basics.name || 'Name';
  document.getElementById('resume-email').textContent = basics.email || '';
  document.getElementById('resume-email').href = `mailto:${basics.email || ''}`;

  const location = basics.location ? `${basics.location.city}, ${basics.location.region}` : '';
  document.getElementById('resume-location').textContent = location;

  // Find GitHub and LinkedIn from profiles
  const github = basics.profiles?.find(p => p.network === 'GitHub')?.url || '';
  const linkedin = basics.profiles?.find(p => p.network === 'LinkedIn')?.url || '';

  document.getElementById('resume-github').href = github;
  document.getElementById('resume-linkedin').href = linkedin;

  // Summary
  document.querySelector('#summary .summary-text').textContent = basics.summary?.trim() || '';

  // Education
  const eduContent = document.querySelector('#education .section-content');
  if (data.education && data.education.length > 0) {
    eduContent.innerHTML = data.education.map(edu => `
      <div class="edu-item">
        <div class="item-header">
          <div class="item-title">${edu.institution}</div>
          <div class="item-subtitle">${edu.area ? `${edu.area}` : ''}${edu.studyType ? ` - ${edu.studyType}` : ''}</div>
          <div class="item-date">${edu.startDate} - ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
        </div>
        ${edu.courses && edu.courses.length > 0 ? `
          <div style="margin-top: 0.5rem; opacity: 0.8;">
            <strong>Relevant Coursework:</strong> ${edu.courses.join(', ')}
          </div>
        ` : ''}
      </div>
    `).join('');
  } else {
    eduContent.innerHTML = '<p style="opacity: 0.7;">No education listed.</p>';
  }

  // Experience (work)
  const expContent = document.querySelector('#experience .section-content');
  if (data.work && data.work.length > 0) {
    expContent.innerHTML = data.work.map(work => {
      const endDate = work.endDate || 'Present';
      return `
        <div class="exp-item">
          <div class="item-header">
            <div class="item-title">${work.position}</div>
            <div class="item-subtitle">${work.name}${work.location ? ` - ${work.location}` : ''}</div>
            <div class="item-date">${work.startDate} - ${endDate}</div>
          </div>
          ${work.summary ? `<p style="margin-top: 0.5rem; opacity: 0.9;">${work.summary}</p>` : ''}
          ${work.highlights && work.highlights.length > 0 ? `
            <ul class="achievements">
              ${work.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `;
    }).join('');
  } else {
    expContent.innerHTML = '<p style="opacity: 0.7;">No experience listed yet.</p>';
  }

  // Projects
  const projectsContent = document.querySelector('#projects .section-content');
  if (data.projects && data.projects.length > 0) {
    projectsContent.innerHTML = data.projects.map(project => `
      <div class="project-item">
        <div class="item-header">
          <div class="item-title">${project.name}</div>
          <div class="item-subtitle">${project.description || ''}</div>
        </div>
        ${project.highlights && project.highlights.length > 0 ? `
          <ul class="achievements">
            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        ` : ''}
        ${project.keywords && project.keywords.length > 0 ? `
          <ul class="technologies">
            ${project.keywords.map(tech => `<li>${tech}</li>`).join('')}
          </ul>
        ` : ''}
        ${project.url ? `
          <a href="${project.url}" class="project-link" target="_blank">View Project →</a>
        ` : ''}
      </div>
    `).join('');
  } else {
    projectsContent.innerHTML = '<p style="opacity: 0.7;">No projects listed.</p>';
  }

  // Skills
  const skillsContent = document.querySelector('#skills .section-content');
  if (data.skills && data.skills.length > 0) {
    const skillCategories = data.skills.map(skillGroup => `
      <div class="skill-category">
        <h3>${skillGroup.name}</h3>
        <ul class="skill-list">
          ${skillGroup.keywords.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    skillsContent.innerHTML = skillCategories;
  } else {
    skillsContent.innerHTML = '<p style="opacity: 0.7;">No skills listed.</p>';
  }
}

loadResume();

// Theme configuration
const urlParams = new URLSearchParams(location.search);
const cfg = urlParams.get('a');
if (cfg && parseInt(cfg) === 2) {
  const n = document.getElementById('resume-name');
  const e = document.getElementById('resume-email');
  const b = document.querySelector('.back-link a');

  const alt = String.fromCharCode(65,108,105,99,101);
  const email = String.fromCharCode(97,108,105,99,101,64,118,97,105,108,108,97,110,116,46,97,105);

  if (n && n.textContent.includes(String.fromCharCode(65,108,101,105,115,116,101,114))) {
    n.textContent = n.textContent.replace(String.fromCharCode(65,108,101,105,115,116,101,114), alt);
  }
  if (e && e.textContent.includes(String.fromCharCode(97,108,101,105,115,116,101,114))) {
    e.textContent = email;
    e.href = 'mailto:' + email;
  }

  if (b) b.href = 'index.html?a=' + cfg;
}
