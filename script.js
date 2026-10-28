// Load courses from JSON
async function loadCourses() {
  const res = await fetch('courses.json');
  return await res.json();
}

function renderSiteShell() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navTarget = document.getElementById('site-nav');
  if (navTarget) {
    const navItems = [
      { href: 'index.html', label: 'Home' },
      { href: 'course.html', label: 'Courses' },
      { href: 'trial-plan.html', label: 'Trial Plan' },
      { href: '#', label: 'Evidence' },
      { href: '#', label: 'Testimony' },
      { href: '#', label: 'Contact / About', btn: true }
    ];

    navTarget.innerHTML = `
      <nav class="navbar">
        <div class="nav-container">
          <a href="index.html" class="logo">
            <i class="fas fa-cross"></i>
            <span>Faith Defense</span>
          </a>
          <button class="nav-toggle" aria-label="Toggle navigation">
            <span class="hamburger"></span>
          </button>
          <ul class="nav-menu">
            ${navItems.map(item => {
              const isActive = currentPage === item.href;
              const className = item.btn ? 'btn btn-primary nav-btn' : 'nav-link';
              const activeClass = item.btn ? '' : (isActive ? ' active' : '');
              return `
                <li>
                  <a href="${item.href}" class="${className}${activeClass}">${item.label}</a>
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      </nav>
    `;
  }

  const footerTarget = document.getElementById('site-footer');
  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <a href="index.html" class="footer-logo">
                <i class="fas fa-cross"></i>
                <span>Faith Defense</span>
              </a>
              <p>Defending faith and making disciples through historical evidence and biblical truth.</p>
            </div>
            <div class="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="trial-plan.html">Our Trial Plan</a></li>
                <li><a href="course.html">Courses</a></li>
                <li><a href="index.html">Home</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Testimony</a></li>
                <li><a href="#">Evidence</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Connect</h4>
              <p>info@faithdefense.org</p>
              <p>(555) 123-4567</p>
              <div class="social-links">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>© 2024 Faith Defense. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

// Render featured courses on home
async function renderFeatured() {
  const courses = await loadCourses();
  const container = document.getElementById('featured-grid');
  if (!container) return;

  container.innerHTML = courses.slice(0, 3).map(course => `
    <div class="course-card">
      <h3>${course.title}</h3>
      <p>${course.subtitle}</p>
      <p><strong>${course.num_sessions} Sessions</strong></p>
      <a href="course.html?id=${course.id}" class="button">Explore Course</a>
    </div>
  `).join('');
}

// Render all courses
async function renderAllCourses() {
  const courses = await loadCourses();
  const container = document.getElementById('courses-grid');
  if (!container) return;

  container.innerHTML = courses.map(course => `
    <div class="course-card">
      <h3>${course.title}</h3>
      <p>${course.subtitle}</p>
      <p>${course.num_sessions} Sessions</p>
      <a href="course.html?id=${course.id}" class="button">Explore Course</a>
    </div>
  `).join('');
}

// Render single course detail
async function renderCourseDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  const courses = await loadCourses();
  const course = courses.find(c => c.id === id);
  if (!course) return;

  const pageTitle = document.getElementById('page-title');
  const detailTitle = document.getElementById('course-title');
  const subtitle = document.getElementById('course-subtitle');
  const description = document.getElementById('course-description');
  const detail = document.getElementById('course-detail');
  const grid = document.getElementById('courses-grid');

  if (pageTitle) pageTitle.style.display = 'none';
  if (detailTitle) {
    detailTitle.textContent = course.title;
    detailTitle.style.display = 'block';
  }
  if (subtitle) {
    subtitle.textContent = course.subtitle;
    subtitle.style.display = 'block';
  }
  if (description) description.textContent = course.description;
  if (detail) detail.style.display = 'block';
  if (grid) grid.style.display = 'none';

  const sessionsContainer = document.getElementById('sessions-list');
  if (sessionsContainer) {
    sessionsContainer.innerHTML = course.sessions.map(s => `
      <div class="session">
        <h4>${s.number}. ${s.title}</h4>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  const includesContainer = document.getElementById('includes-list');
  if (includesContainer) {
    includesContainer.innerHTML = course.includes.map(item => `<li>${item}</li>`).join('');
  }
}

// Auto-run based on page
document.addEventListener('DOMContentLoaded', async () => {
  renderSiteShell();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (id) {
    await renderCourseDetail();
    return;
  }

  if (document.getElementById('featured-grid')) renderFeatured();
  if (document.getElementById('courses-grid')) renderAllCourses();
});
