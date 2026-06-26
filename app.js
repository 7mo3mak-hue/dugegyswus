/* ─────────────────────────────────────────────
   Akhbar Alyoum Academy — app.js
   ───────────────────────────────────────────── */

let currentUser = null;
let currentPage = 'dashboard';

// ── Helpers ───────────────────────────────────
function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function colorClass(color) {
  return 'chip-' + color;
}

function setDate() {
  const d = new Date();
  document.getElementById('topbar-date').textContent =
    d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
}

// ── Auth ──────────────────────────────────────
function doLogin() {
  const sid = document.getElementById('sid').value.trim();
  const pwd = document.getElementById('pwd').value;

  // Clear errors
  document.getElementById('err-sid').textContent = '';
  document.getElementById('err-pwd').textContent = '';
  document.getElementById('field-sid').classList.remove('error');
  document.getElementById('field-pwd').classList.remove('error');

  if (!sid) {
    document.getElementById('err-sid').textContent = 'Please enter your Student ID.';
    document.getElementById('field-sid').classList.add('error');
    return;
  }

  const student = STUDENTS.find(s => s.id === sid);
  if (!student) {
    document.getElementById('err-sid').textContent = 'Student ID not found.';
    document.getElementById('field-sid').classList.add('error');
    return;
  }

  if (student.password !== pwd) {
    document.getElementById('err-pwd').textContent = 'Incorrect password.';
    document.getElementById('field-pwd').classList.add('error');
    return;
  }

  currentUser = student;
  showApp();
}

function doLogout() {
  currentUser = null;
  document.getElementById('page-login').classList.remove('hidden');
  document.getElementById('page-app').classList.add('hidden');
  document.getElementById('sid').value = '';
  document.getElementById('pwd').value = '';
  document.getElementById('err-sid').textContent = '';
  document.getElementById('err-pwd').textContent = '';
  document.getElementById('field-sid').classList.remove('error');
  document.getElementById('field-pwd').classList.remove('error');
}

// Allow Enter key on login form
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sid').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  document.getElementById('pwd').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  setDate();
});

// ── Show app ──────────────────────────────────
function showApp() {
  document.getElementById('page-login').classList.add('hidden');
  document.getElementById('page-app').classList.remove('hidden');

  const data = CURRICULUM[currentUser.year];
  const totalCredits = data.subjects.reduce((a, s) => a + s.credits, 0);
  const ini = initials(currentUser.name);

  // Sidebar
  document.getElementById('sb-avatar').textContent = ini;
  document.getElementById('sb-name').textContent = currentUser.name;
  document.getElementById('sb-id').textContent = currentUser.id;

  // Dashboard
  document.getElementById('dash-avatar').textContent = ini;
  document.getElementById('dash-welcome').textContent = 'Welcome back, ' + currentUser.name + '!';
  document.getElementById('dash-sub').textContent =
    currentUser.id + '  ·  ' + YEAR_LABELS[currentUser.year] + ' — Department of Business Administration';

  document.getElementById('stat-year').textContent = YEAR_LABELS[currentUser.year];
  document.getElementById('stat-subjects').textContent = data.subjects.length;
  document.getElementById('stat-credits').textContent = totalCredits;
  document.getElementById('stat-semester').textContent = data.semester.split('–')[0].trim();

  // Profile
  document.getElementById('prof-avatar').textContent = ini;
  document.getElementById('prof-name').textContent = currentUser.name;
  document.getElementById('prof-gpa').textContent = currentUser.gpa ? currentUser.gpa.toFixed(1) : '—';
  document.getElementById('pi-id').textContent = currentUser.id;
  document.getElementById('pi-name').textContent = currentUser.name;
  document.getElementById('pi-year').textContent = YEAR_LABELS[currentUser.year];
  document.getElementById('pi-sem').textContent = data.semester;
  document.getElementById('pi-credits').textContent = totalCredits + ' hrs';

  renderDashSubjects(data);
  renderDashAnnouncements();
  renderSubjectsPage(data);
  renderSchedulePage(data);
  renderAnnouncementsPage();

  navigate('dashboard');
}

// ── Navigation ────────────────────────────────
const PAGES = ['dashboard', 'subjects', 'schedule', 'announcements', 'profile'];
const PAGE_TITLES = {
  dashboard: 'Dashboard',
  subjects: 'My Subjects',
  schedule: 'Weekly Schedule',
  announcements: 'Announcements',
  profile: 'My Profile'
};

function navigate(page) {
  currentPage = page;
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.toggle('hidden', p !== page);
    const nav = document.querySelector('[data-page="' + p + '"]');
    if (nav) nav.classList.toggle('active', p === page);
  });
  document.getElementById('topbar-title').textContent = PAGE_TITLES[page];
  if (currentUser) {
    document.getElementById('topbar-meta').textContent =
      currentUser.name + ' · ' + YEAR_LABELS[currentUser.year];
  }
}

// ── Dashboard renders ─────────────────────────
function renderDashSubjects(data) {
  const el = document.getElementById('dash-subjects-list');
  el.innerHTML = data.subjects.map(s => `
    <div class="mini-subject">
      <div class="mini-icon ${colorClass(s.color)}">
        <i class="ti ti-${s.icon}"></i>
      </div>
      <div class="mini-info">
        <div class="subj-name">${s.name}</div>
        <div class="subj-code">${s.code}</div>
      </div>
      <div class="mini-credits">${s.credits} cr</div>
    </div>
  `).join('');
}

function renderDashAnnouncements() {
  const el = document.getElementById('dash-announcements');
  el.innerHTML = ANNOUNCEMENTS.slice(0, 4).map(a => `
    <div class="ann-item ann-type-${a.type}">
      <div class="ann-dot"><i class="ti ti-${a.icon}"></i></div>
      <div>
        <div class="ann-title">${a.title}</div>
        <div class="ann-body">${a.body}</div>
        <div class="ann-date">${a.date}</div>
      </div>
    </div>
  `).join('');
}

// ── Subjects page ─────────────────────────────
function renderSubjectsPage(data) {
  document.getElementById('subj-page-meta').textContent =
    data.subjects.length + ' subjects registered · ' + data.semester;

  const grid = document.getElementById('subjects-grid');
  grid.innerHTML = data.subjects.map(s => `
    <div class="subject-card">
      <div class="subject-card-top">
        <div class="subject-icon ${colorClass(s.color)}">
          <i class="ti ti-${s.icon}"></i>
        </div>
        <div>
          <div class="subject-name">${s.name}</div>
          <div class="subject-code">${s.code}</div>
        </div>
      </div>
      <div class="subject-divider"></div>
      <div class="subject-meta">
        <div class="meta-item">
          <i class="ti ti-user"></i>
          <div>
            <div class="meta-label">Instructor</div>
            <div class="meta-value">${s.instructor}</div>
          </div>
        </div>
        <div class="meta-item">
          <i class="ti ti-door"></i>
          <div>
            <div class="meta-label">Room</div>
            <div class="meta-value">${s.room}</div>
          </div>
        </div>
        <div class="meta-item" style="grid-column:1/-1">
          <i class="ti ti-clock"></i>
          <div>
            <div class="meta-label">Schedule</div>
            <div class="meta-value">${s.schedule}</div>
          </div>
        </div>
      </div>
      <div class="subject-footer">
        <span class="badge badge-active"><i class="ti ti-circle-check" style="font-size:12px"></i> Active</span>
        <span class="badge badge-credits">${s.credits} credit hrs</span>
      </div>
    </div>
  `).join('');
}

// ── Schedule page ─────────────────────────────
function renderSchedulePage(data) {
  document.getElementById('sched-meta').textContent =
    YEAR_LABELS[currentUser.year] + ' · ' + data.semester;

  const tbody = document.getElementById('schedule-tbody');
  tbody.innerHTML = data.subjects.map((s, i) => `
    <tr>
      <td style="color:var(--text-3);font-size:.82rem;">${String(i + 1).padStart(2, '0')}</td>
      <td>
        <div class="subj-pill">
          <span class="dot dot-${s.color}"></span>
          <strong>${s.name}</strong>
        </div>
      </td>
      <td style="color:var(--text-2);font-size:.82rem;">${s.code}</td>
      <td>${s.instructor}</td>
      <td style="font-size:.875rem;">${s.schedule}</td>
      <td><span class="badge badge-credits">${s.room}</span></td>
      <td style="font-weight:600;color:var(--navy);">${s.credits}</td>
    </tr>
  `).join('');
}

// ── Announcements page ────────────────────────
function renderAnnouncementsPage() {
  const el = document.getElementById('announcements-list');
  el.innerHTML = ANNOUNCEMENTS.map(a => `
    <div class="ann-card ann-type-${a.type}">
      <div class="ann-card-icon"><i class="ti ti-${a.icon}"></i></div>
      <div style="flex:1">
        <div class="ann-card-title">${a.title}</div>
        <div class="ann-card-body">${a.body}</div>
        <div class="ann-card-date"><i class="ti ti-calendar" style="font-size:13px"></i> ${a.date}</div>
      </div>
    </div>
  `).join('');
}
