import React, { useEffect, useRef, useState } from 'react';
import { Download, X } from 'lucide-react';
import { resumeData, resumeRoles, type ResumeProject, type ResumeRole } from '../data/resumeData';
import { RESUME_PRINT_CSS } from '../styles/resumePrint';

const linkedInIcon = '<svg class="contact-icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M14.5 0h-13C.67 0 0 .67 0 1.5v13c0 .83.67 1.5 1.5 1.5h13c.83 0 1.5-.67 1.5-1.5v-13c0-.83-.67-1.5-1.5-1.5ZM4.75 13H2.5V6h2.25v7ZM3.62 5.04a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6ZM13.5 13h-2.25V9.59c0-.81-.02-1.85-1.13-1.85-1.13 0-1.3.88-1.3 1.79V13H6.58V6h2.16v.96h.03c.3-.55 1.04-1.13 2.14-1.13 2.29 0 2.72 1.5 2.72 3.45V13Z"/></svg>';
const githubIcon = '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.5-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.76 2.5 3.82 1.76.1-.72.4-1.21.7-1.49-2.5-.28-5.14-1.25-5.14-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.69.11 2.98.72.79 1.15 1.79 1.15 3.02 0 4.33-2.64 5.29-5.16 5.56.41.36.77 1.04.77 2.1v3.13c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z"/></svg>';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });

const highlightKeywords = (value: string, keywords: string[]) => {
  const escaped = escapeHtml(value);
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  if (sortedKeywords.length === 0) return escaped;

  const pattern = new RegExp(`(${sortedKeywords.map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return escaped.replace(pattern, '<strong>$1</strong>');
};

const sortSkills = (items: string[], preferred: string[] = []) => {
  const preferredSet = new Set(preferred);
  return [...items].sort((a, b) => {
    const aIndex = preferred.indexOf(a);
    const bIndex = preferred.indexOf(b);
    if (aIndex !== -1 || bIndex !== -1) {
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    }
    return Number(preferredSet.has(b)) - Number(preferredSet.has(a));
  });
};

const renderProject = (project: ResumeProject, role: ResumeRole) => {
  const bulletCount = role.bulletLimits[project.id] ?? 1;
  const orderedBullets = role.projectBulletOrder[project.id]?.map((index) => project.bullets[index])
    .filter((bullet): bullet is string => Boolean(bullet)) ?? project.bullets;
  const bullets = orderedBullets.slice(0, bulletCount);
  return `
    <article class="project-entry">
      <p class="project-title-line">
        <span class="project-title">${escapeHtml(project.title)}</span>
        | <span class="project-tech">${highlightKeywords(project.technologies.join(' + '), role.boldKeywords)}</span>
      </p>
      <ul>${bullets.map((bullet) => `<li>${highlightKeywords(bullet, role.boldKeywords)}</li>`).join('')}</ul>
    </article>
  `;
};

const renderProjects = (role: ResumeRole) => {
  const orderedProjects = role.projectOrder
    .map((id) => resumeData.projects.find((project) => project.id === id))
    .filter((project): project is ResumeProject => Boolean(project));

  const groups: Array<{ academic: boolean; projects: ResumeProject[] }> = [];
  for (const project of orderedProjects) {
    const lastGroup = groups[groups.length - 1];
    if (!lastGroup || lastGroup.academic !== project.academic) {
      groups.push({ academic: project.academic, projects: [project] });
    } else {
      lastGroup.projects.push(project);
    }
  }

  return groups
    .map((group) => `
      ${group.academic ? '<h3 class="academic-subheading">Academic Projects -</h3>' : ''}
      ${group.projects.map((project) => renderProject(project, role)).join('')}
    `)
    .join('');
};

const buildResumeDocument = (role: ResumeRole) => {
  const title = `Naman_Tiwari_Resume_${role.filename}`;
  const education = resumeData.education.map((entry) => `
    <article class="education-entry">
      <div class="entry-row">
        <span class="entry-name">${escapeHtml(entry.institution)}</span>
        <span class="entry-date">${escapeHtml(entry.dates)}</span>
      </div>
      ${entry.affiliation ? `<div class="affiliation">${escapeHtml(entry.affiliation)}</div>` : ''}
      <div class="education-detail">
        <span>${escapeHtml(entry.degree)}</span>
        <span class="entry-location">${escapeHtml(entry.location)}</span>
      </div>
    </article>
  `).join('');

  const skills = resumeData.skills.map((line) => {
    const ordered = sortSkills(line.items, role.skillOrder[line.label]);
    return `<p class="skill-line"><strong class="skill-label">${escapeHtml(line.label)}:</strong> ${ordered.map((item) => highlightKeywords(item, role.boldKeywords)).join(', ')}</p>`;
  }).join('');
  const credentials = [...new Set([...resumeData.certifications, ...resumeData.achievements])];
  const certifications = role.credentialOrder
    .filter((item) => credentials.includes(item))
    .slice(0, 4)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');
  const extracurricular = resumeData.extracurricular
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <style>${RESUME_PRINT_CSS}</style>
  </head>
  <body>
    <main class="resume-page">
      <header>
        <h1>${escapeHtml(resumeData.name)}</h1>
        <p class="resume-target-role">${escapeHtml(role.label)}</p>
        <div class="contact-row">
          <a href="tel:${escapeHtml(resumeData.contact.phone)}"><span class="contact-icon">☎</span>${escapeHtml(resumeData.contact.phone)}</a>
          <a href="mailto:${escapeHtml(resumeData.contact.email)}"><span class="contact-icon">✉</span>${escapeHtml(resumeData.contact.email)}</a>
          <a aria-label="LinkedIn profile" href="${escapeHtml(resumeData.contact.linkedin.url)}">${linkedInIcon}${escapeHtml(resumeData.contact.linkedin.handle)}</a>
          <a aria-label="GitHub profile" href="${escapeHtml(resumeData.contact.github.url)}">${githubIcon}${escapeHtml(resumeData.contact.github.handle)}</a>
        </div>
      </header>
      <section class="resume-section">
        <h2 class="section-heading">Education</h2>
        ${education}
      </section>
      <section class="resume-section">
        <h2 class="section-heading">Projects</h2>
        ${renderProjects(role)}
      </section>
      <section class="resume-section">
        <h2 class="section-heading">Technical Skills</h2>
        ${skills}
      </section>
      <section class="resume-section">
        <h2 class="section-heading">Certifications &amp; Achievements</h2>
        <ul class="certification-list">${certifications}</ul>
      </section>
      <section class="resume-section">
        <h2 class="section-heading">Extracurricular</h2>
        <ul class="extracurricular-list">${extracurricular}</ul>
      </section>
    </main>
  </body>
</html>`;
};

interface ResumeDownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeDownloadDialog: React.FC<ResumeDownloadDialogProps> = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState(resumeRoles[0].filename);
  const [error, setError] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const roleSelectRef = useRef<HTMLSelectElement>(null);
  const activeRole = resumeRoles.find((role) => role.filename === selectedRole) ?? resumeRoles[0];

  const closeDialog = () => {
    onClose();
    setError('');
  };

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    roleSelectRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), select:not([disabled]), a[href]'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const generateResume = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setError('The print window was blocked. Allow pop-ups for this site, then try again.');
      return;
    }

    const printDocument = printWindow.document;
    printDocument.open();
    printDocument.write(buildResumeDocument(activeRole));
    printDocument.close();

    window.setTimeout(() => {
      const resumePage = printDocument.querySelector<HTMLElement>('.resume-page');
      const maximumTwoPageHeightPx = (2 * 297 * 96) / 25.4;
      if (resumePage && resumePage.scrollHeight > maximumTwoPageHeightPx) {
        resumePage.classList.add('compact');
        if (resumePage.scrollHeight > maximumTwoPageHeightPx) {
          setError('This role-tailored resume exceeds two pages and could not be fitted without removing content.');
          printWindow.close();
          return;
        }
      }
      printWindow.onafterprint = () => printWindow.close();
      printWindow.focus();
      printWindow.print();
    }, 0);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="resume-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <div
        ref={dialogRef}
        className="resume-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        <button
          type="button"
          className="resume-modal-close"
          onClick={closeDialog}
          aria-label="Close resume dialog"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="resume-modal-kicker">ROLE-TAILORED RESUME</p>
        <h2 id="resume-modal-title">Choose your target role</h2>
        <label className="resume-role-label" htmlFor="resume-role">
          Resume focus
        </label>
        <select
          ref={roleSelectRef}
          id="resume-role"
          value={selectedRole}
          onChange={(event) => setSelectedRole(event.target.value)}
        >
          {resumeRoles.map((role) => (
            <option key={role.filename} value={role.filename}>{role.label}</option>
          ))}
        </select>
        {error && <p className="resume-error" role="alert">{error}</p>}
        <button
          type="button"
          className="resume-generate-button"
          onClick={generateResume}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Generate &amp; Download
        </button>
      </div>
    </div>
  );
};
