// Load courses from JSON
async function loadCourses() {
  const res = await fetch('courses.json');
  return await res.json();
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

  document.getElementById('course-title').textContent = course.title;
  document.getElementById('course-subtitle').textContent = course.subtitle;
  document.getElementById('course-description').textContent = course.description;

  // Sessions
  const sessionsContainer = document.getElementById('sessions-list');
  sessionsContainer.innerHTML = course.sessions.map(s => `
    <div class="session">
      <h4>${s.number}. ${s.title}</h4>
      <p>${s.desc}</p>
    </div>
  `).join('');

  // Includes
  const includesContainer = document.getElementById('includes-list');
  includesContainer.innerHTML = course.includes.map(item => `<li>${item}</li>`).join('');
}

// Auto-run based on page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('featured-grid')) renderFeatured();
  if (document.getElementById('courses-grid')) renderAllCourses();
  if (document.getElementById('course-title')) renderCourseDetail();
});
