export function getCapsules() {
  const index = JSON.parse(localStorage.getItem('pc_capsules_index') || '[]');
  return index.map(i => JSON.parse(localStorage.getItem('pc_capsule_' + i.id)));
}

export function renderLibrary() {
  const libraryList = document.getElementById('libraryList');
  libraryList.innerHTML = '';
  const capsules = getCapsules();
  capsules.forEach(c => {
    const div = document.createElement('div');
    div.className = 'col-md-4 mb-3';

    div.innerHTML = `
      <div class="card p-2">
        <div class="card-body">
          <h5>${c.title}</h5>
          <p>${c.subject} | ${c.level}</p>
          <p>Updated: ${new Date(c.updatedAt).toLocaleString()}</p>
          <button class="btn btn-sm btn-primary me-1 exportBtn">Export</button>
          <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
        </div>
      </div>`;


    div.querySelector('.exportBtn').onclick = () => {
      const blob = new Blob([JSON.stringify(c, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${c.title.replace(/\s+/g, '_')}`.json;
      a.click();
    };


    div.querySelector('.deleteBtn').onclick = () => {
      if (confirm('Are you sure you want to delete this capsule?')) {

        let index = JSON.parse(localStorage.getItem('pc_capsules_index') || '[]');
        index = index.filter(i => i.id !== c.id);
        localStorage.setItem('pc_capsules_index', JSON.stringify(index));

        localStorage.removeItem('pc_capsule_' + c.id);
        renderLibrary();
      }
    };

    libraryList.appendChild(div);
  });
}