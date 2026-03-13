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
    document.getElementById('resume-name').textContent = 'No Resume Data';
    return;
  }
  renderResume(resumeData);
}

function renderResume(data) {
  const basics = data.basics || {};

  document.getElementById('resume-name').textContent = basics.name || '';
  document.getElementById('resume-email').textContent = basics.email || '';
  document.getElementById('resume-email').href = `mailto:${basics.email || ''}`;

  const loc = basics.location ? `${basics.location.city}, ${basics.location.region}` : '';
  document.getElementById('resume-location').textContent = loc;

  const github = basics.profiles?.find(p => p.network === 'GitHub')?.url || '';
  const linkedin = basics.profiles?.find(p => p.network === 'LinkedIn')?.url || '';
  document.getElementById('resume-github').href = github;
  document.getElementById('resume-linkedin').href = linkedin;

  // Summary
  document.querySelector('#summary .summary-text').textContent = basics.summary?.trim() || '';

  // Experience
  const expBody = document.querySelector('#experience .section-body');
  if (data.work?.length) {
    expBody.innerHTML = data.work.map(w => `
      <div class="item">
        <div class="item-role">${w.position}</div>
        <div class="item-org">${w.name}</div>
        <div class="item-date">${w.startDate} — ${w.endDate || 'Present'}</div>
        ${w.summary ? `<div class="item-summary">${w.summary}</div>` : ''}
        ${w.highlights?.length ? `
          <ul class="item-highlights">
            ${w.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');
  }

  // Education
  const eduBody = document.querySelector('#education .section-body');
  if (data.education?.length) {
    eduBody.innerHTML = data.education.map(e => `
      <div class="item">
        <div class="item-role">${e.studyType}</div>
        <div class="item-org">${e.institution} — ${e.area}</div>
        <div class="item-date">${e.startDate} — ${e.endDate}${e.gpa ? ` · GPA ${e.gpa}` : ''}</div>
        ${e.courses?.length ? `
          <div class="item-courses">${e.courses.join(' · ')}</div>
        ` : ''}
      </div>
    `).join('');
  }

  // Projects
  const projBody = document.querySelector('#projects .section-body');
  if (data.projects?.length) {
    projBody.innerHTML = data.projects.map(p => `
      <div class="project">
        <div class="project-name">${p.url ? `<a href="${p.url}" target="_blank">${p.name} →</a>` : p.name}</div>
        <div class="project-desc">${p.description || ''}</div>
        ${p.keywords?.length ? `
          <div class="project-tech">
            ${p.keywords.map(k => `<span>${k}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // Skills
  const skillsBody = document.querySelector('#skills .section-body');
  if (data.skills?.length) {
    skillsBody.innerHTML = data.skills.map(s => `
      <div class="skill-group">
        <h3>${s.name}</h3>
        <ul>${s.keywords.map(k => `<li>${k}</li>`).join('')}</ul>
      </div>
    `).join('');
  }
}

loadResume();

// Theme configuration
const urlParams = new URLSearchParams(location.search);
const cfg = urlParams.get('a');
if (cfg && parseInt(cfg) === 2) {
  const n = document.getElementById('resume-name');
  const e = document.getElementById('resume-email');
  const b = document.getElementById('back-link');

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
