const noteInput = document.getElementById('note-input');
const categorySelect = document.getElementById('category-select');
const addBtn = document.getElementById('add-btn');
const notesList = document.getElementById('notes-list');
const noteCount = document.getElementById('note-count');
const filterBtns = document.querySelectorAll('.filter-btn');

let notes = JSON.parse(localStorage.getItem('devnotes')) || [];
let activeFilter = 'all';

function saveNotes() {
  localStorage.setItem('devnotes', JSON.stringify(notes));
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function render() {
  const visible = activeFilter === 'all'
    ? notes
    : notes.filter(n => n.category === activeFilter);

  notesList.innerHTML = '';

  if (visible.length === 0) {
    notesList.innerHTML = '<li class="empty-state">No notes yet. Add one above.</li>';
  } else {
    visible.forEach(note => {
      const li = document.createElement('li');
      li.className = 'note-item';
      li.dataset.id = note.id;
      li.innerHTML = `
        <div class="note-body">
          <p class="note-text">${escapeHtml(note.text)}</p>
          <div class="note-meta">
            <span class="category-badge badge-${note.category}">${note.category}</span>
            <span class="note-time">${formatTime(note.createdAt)}</span>
          </div>
        </div>
        <button class="delete-btn" title="Delete">×</button>
      `;
      notesList.appendChild(li);
    });
  }

  const total = notes.length;
  noteCount.textContent = `${total} ${total === 1 ? 'note' : 'notes'}`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function addNote() {
  const text = noteInput.value.trim();
  if (!text) return;

  const note = {
    id: Date.now(),
    text,
    category: categorySelect.value,
    createdAt: new Date().toISOString(),
  };

  notes.unshift(note);
  saveNotes();
  render();
  noteInput.value = '';
  noteInput.focus();
}

addBtn.addEventListener('click', addNote);

noteInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addNote();
});

notesList.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const id = Number(e.target.closest('.note-item').dataset.id);
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    render();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    render();
  });
});

render();
