
export function getCapsulesIndex() {
  return JSON.parse(localStorage.getItem('pc_capsules_index') || '[]');
}

export function saveCapsulesIndex(index) {
  localStorage.setItem('pc_capsules_index', JSON.stringify(index));
}


export function saveCapsule(capsule) {
  localStorage.setItem('pc_capsule_${capsule.id}', JSON.stringify(capsule));

  let index = getCapsulesIndex();
  const exist = index.find(i => i.id === capsule.id);
  if (!exist) {
    index.push({
      id: capsule.id,
      title: capsule.title,
      subject: capsule.subject,
      level: capsule.level,
      updatedAt: capsule.updatedAt
    });
  } else {
    exist.title = capsule.title;
    exist.subject = capsule.subject;
    exist.level = capsule.level;
    exist.updatedAt = capsule.updatedAt;
  }

  saveCapsulesIndex(index);
}


export function getCapsule(id) {
  return JSON.parse(localStorage.getItem('pc_capsule_${id}') || '{}');
}


export function deleteCapsule(id) {
  localStorage.removeItem('pc_capsule_${id}');
  saveCapsulesIndex(getCapsulesIndex().filter(i => i.id !== id));
}


export function saveProgress(id, progress) {
  localStorage.setItem('opc_progress_${id}', JSON.stringify(progress));
}

export function getProgress(id) {
  return JSON.parse(localStorage.getItem('opc_progress_${id}') || '{"bestScore":0,"knownFlashcards":[]}');
}


export function exportCapsuleJSON(id) {
  const capsule = getCapsule(id);
  capsule.schema = "pocket-classroom/v1";
  return JSON.stringify(capsule, null, 2);
}

export function importCapsuleJSON(json) {
  try {
    const capsule = JSON.parse(json);
    if (capsule.schema !== "pocket-classroom/v1") throw new Error("Invalid schema");
    saveCapsule(capsule);
    return true;
  } catch (e) {
    return false;
  }
}


if (getCapsulesIndex().length === 0) {
  saveCapsule({
    id: 'sample1',
    title: 'Sample Capsule',
    subject: 'Math',
    level: 'Beginner',
    notes: ['This is a note'],
    flashcards: [
      { front: '1+1', back: '2' },
      { front: '2+2', back: '4' }
    ],
    quiz: [
      { question: '2+2?', choices: ['3', '4', '5', '6'], correct: 1 }
    ],
    updatedAt: new Date().toLocaleString()
  });
}