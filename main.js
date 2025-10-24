import { renderAuthor } from './author.js';
import { renderLibrary, getCapsules } from './library.js';
import { renderLearn, populateLearnDropdown } from './learn.js';

const libraryBtn = document.getElementById('libraryBtn');
const authorBtn = document.getElementById('authorBtn');
const learnBtn = document.getElementById('learnBtn');

const librarySection = document.getElementById('librarySection');
const authorSection = document.getElementById('authorSection');
const learnSection = document.getElementById('learnSection');
const newCapsuleBtn = document.getElementById('newCapsuleBtn');

newCapsuleBtn.onclick = () => {
  showSection(authorSection); 
  renderAuthor();             
}

function showSection(section) {
  librarySection.classList.add('d-none');
  authorSection.classList.add('d-none');
  learnSection.classList.add('d-none');
  section.classList.remove('d-none');
}

libraryBtn.onclick = () => { showSection(librarySection); renderLibrary(); };
authorBtn.onclick = () => { showSection(authorSection); renderAuthor(); };

learnBtn.onclick = () => {
  showSection(learnSection);
  populateLearnDropdown();
  const capsules = getCapsules();
  if (capsules.length > 0) {
    document.getElementById('selectCapsule').value = capsules[0].id;
    renderLearn(capsules[0]);
  }
};