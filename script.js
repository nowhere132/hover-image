const projects = document.querySelector('.projects');
const preview = document.querySelector('.preview');
const previewImg = document.querySelector('.preview-img');

let isInside = false;

const bgPositions = {
  p1: '0 0',
  p2: '0 25%',
  p3: '0 50%',
  p4: '0 75%',
  p5: '0 100%',
};

const isMouseInsideContainer = (e) => {
  const containerRect = projects.getBoundingClientRect();
  return (
    e.pageX >= containerRect.left &&
    e.pageX <= containerRect.right &&
    e.pageY >= containerRect.top &&
    e.pageX <= containerRect.bottom
  );
};

const moveStuff = (e) => {
  const mouseInside = isMouseInsideContainer(e);

  if (mouseInside === isInside) return;
  isInside = mouseInside;
  if (isInside) {
    gsap.to(preview, 0.3, { scale: 1 });
  } else {
    gsap.to(preview, 0.3, { scale: 0 });
  }
};

const moveProject = (e) => {
  const previewRect = preview.getBoundingClientRect();
  const offsetX = previewRect.width / 2;
  const offsetY = previewRect.height / 2;

  preview.style.left = e.pageX + 30 + 'px';
  preview.style.top = e.pageY + 30 + 'px';
};

const moveProjectImg = (project) => {
  const projectId = project.id;
  gsap.to(previewImg, 0.4, { backgroundPosition: bgPositions[projectId] || '0 0' });
};

window.addEventListener('mousemove', moveStuff);

Array.from(projects.children).forEach((project) => {
  project.addEventListener('mousemove', moveProject);
  project.addEventListener('mousemove', moveProjectImg.bind(null, project));
});
