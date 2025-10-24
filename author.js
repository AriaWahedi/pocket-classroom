export function renderAuthor() {
  const form = document.getElementById('authorForm');
  form.reset();

  form.onsubmit = (e) => {
    e.preventDefault();
    const id = 'capsule_' + Date.now();
    const capsule = {
      id,
      title: document.getElementById('capsuleTitle').value,
      subject: document.getElementById('capsuleSubject').value,
      level: document.getElementById('capsuleLevel').value,
      notes: document.getElementById('capsuleNotes').value.split('\n').filter(n => n),
      flashcards: document.getElementById('capsuleFlashcards').value.split('\n').map(f => {
        const [front, back] = f.split('|');
        return { front, back };
      }),
      quiz: document.getElementById('capsuleQuiz').value.split('\n').map(q => {
        const [question, A, B, C, D, correct] = q.split('|');
        return { question, options: [A, B, C, D], correct: Number(correct) };
      }),
      updatedAt: new Date().toISOString()
    };

    const index = JSON.parse(localStorage.getItem('pc_capsules_index') || '[]');
    index.push({ id, title: capsule.title, subject: capsule.subject, level: capsule.level, updatedAt: capsule.updatedAt });
    localStorage.setItem('pc_capsules_index', JSON.stringify(index));
    localStorage.setItem('pc_capsule_' + id, JSON.stringify(capsule));
    alert('Capsule saved!');
    form.reset();
  };
}