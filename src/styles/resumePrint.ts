export const RESUME_PRINT_CSS = `
  @page {
    size: A4;
    margin: 1in;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    color: #111;
    background: #fff;
    font-family: Cambria, Georgia, "Times New Roman", serif;
    font-size: 10.5pt;
    line-height: 1.22;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .resume-page {
    width: 100%;
    max-width: none;
    margin: 0 auto;
    padding: 0;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  h1 {
    margin: 0 0 3pt;
    text-align: center;
    font-size: 20pt;
    font-variant: small-caps;
    letter-spacing: 0.04em;
  }

  .resume-target-role {
    margin: 0 0 3pt;
    text-align: center;
    font-size: 10pt;
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .contact-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 3pt 9pt;
    margin-bottom: 9pt;
    font-family: Consolas, "Courier New", monospace;
    font-size: 8pt;
  }

  .contact-row a {
    color: #111;
    text-decoration: none;
    white-space: nowrap;
  }

  .contact-icon {
    display: inline-block;
    width: 10pt;
    height: 10pt;
    margin-right: 2pt;
    vertical-align: -2pt;
    flex: none;
  }

  .resume-section {
    margin: 0 0 7pt;
  }

  .section-heading {
    margin: 0 0 4pt;
    padding-bottom: 2pt;
    border-bottom: 1px solid #111;
    font-size: 10pt;
    font-weight: bold;
    line-height: 1.1;
    text-transform: uppercase;
  }

  .education-entry,
  .project-entry {
    margin: 0 0 5pt;
    break-inside: avoid;
  }

  .entry-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8pt;
  }

  .entry-name,
  .entry-date,
  .project-title {
    font-weight: bold;
  }

  .entry-date,
  .entry-location {
    flex-shrink: 0;
    text-align: right;
  }

  .education-detail {
    display: flex;
    justify-content: space-between;
    gap: 8pt;
    font-style: italic;
  }

  .affiliation {
    margin-top: 1pt;
    font-size: 9pt;
  }

  .project-title-line {
    margin: 0;
  }

  .project-tech {
    text-decoration: underline;
    text-underline-offset: 1px;
  }

  .project-entry ul {
    margin: 2pt 0 0;
    padding-left: 15pt;
  }

  .project-entry li {
    margin: 0 0 1.5pt;
    padding-left: 1pt;
  }

  .academic-subheading {
    margin: 5pt 0 3pt;
    font-weight: bold;
  }

  .skill-line {
    margin: 0 0 2pt;
  }

  .skill-label {
    font-weight: bold;
  }

  .certification-list,
  .extracurricular-list {
    margin: 0;
    padding-left: 15pt;
  }

  .certification-list li,
  .extracurricular-list li {
    margin: 0 0 1pt;
  }

  .resume-page.compact {
    font-size: 9.5pt;
    line-height: 1.15;
  }

  .resume-page.compact .resume-section {
    margin-bottom: 5pt;
  }

  .resume-page.compact .education-entry,
  .resume-page.compact .project-entry {
    margin-bottom: 3pt;
  }

  @media print {
    html,
    body {
      width: 100%;
      min-height: 0;
    }
  }
`;
