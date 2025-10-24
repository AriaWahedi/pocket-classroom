export function populateLearnDropdown() {
  const select = document.getElementById('selectCapsule');
  select.innerHTML = '';
  const capsules = JSON.parse(localStorage.getItem('pc_capsules_index') || '[]');
  capsules.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.innerText = c.title;
    select.appendChild(opt);
  });
  select.onchange = () => {
    const capsule = JSON.parse(localStorage.getItem('pc_capsule_' + select.value));
    renderLearn(capsule);
  };
}

export function renderLearn(capsule) {
  const learnNotes = document.getElementById('learnNotes');
  const learnFlashcards = document.getElementById('learnFlashcards');
  const learnQuiz = document.getElementById('learnQuiz');

  // note
  learnNotes.innerHTML = '<h4>Notes</h4>';
  if (capsule.notes.length === 0) learnNotes.innerHTML += '<p>No notes.</p>';
  else {
    const ul = document.createElement('ul');
    capsule.notes.forEach(n => { const li = document.createElement('li'); li.innerText = n; ul.appendChild(li); });
    learnNotes.appendChild(ul);
  }

  // flashcard
  learnFlashcards.innerHTML = '<h4>Flashcards</h4>';
  if (capsule.flashcards.length === 0) learnFlashcards.innerHTML += '<p>No flashcards.</p>';
  else {
    capsule.flashcards.forEach((f, i) => {
      const div = document.createElement('div');
      div.className = 'flashcard';
      div.innerText = f.front;
      div.onclick = () => { div.innerText = div.innerText === f.front ? f.back : f.front; div.classList.toggle('flip'); };
      learnFlashcards.appendChild(div);
    });
  }

  // quiz
  learnQuiz.innerHTML = '<h4>Quiz</h4>';
  if (!capsule.quiz || capsule.quiz.length === 0) learnQuiz.innerHTML += '<p>No quiz.</p>';
  else {
    let score = 0; let qIndex = 0;
    const progress = JSON.parse(localStorage.getItem('opc_progress_' + capsule.id) || '{}');

    function showQuestion() {
      learnQuiz.innerHTML = '';
      if (qIndex >= capsule.quiz.length) {
        learnQuiz.innerHTML = `<p>Score: ${score}/${capsule.quiz.length}</p>`;
        let bestScore = progress.bestScore || 0;
        if (score > bestScore) progress.bestScore = score;
        localStorage.setItem('opc_progress_' + capsule.id, JSON.stringify(progress));
        return;
      }
      const q = capsule.quiz[qIndex];
      const div = document.createElement('div'); div.className = 'quiz-question';
      div.innerHTML = `<strong>Q${qIndex + 1}: ${q.question}</strong><br>`;
      q.options.forEach((opt, j) => {
        const btn = document.createElement('button'); btn.className = 'btn btn-sm btn-outline-primary m-1';
        btn.innerText = opt;
        btn.addEventListener('click', () => {
          if (j === q.correct) score++;
          qIndex++;
          showQuestion();
        });
        div.appendChild(btn);
      });
      learnQuiz.appendChild(div);
    }
    showQuestion();
  }
}