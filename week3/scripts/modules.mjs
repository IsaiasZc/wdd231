import byuiCourse from './course.mjs';
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

document.querySelector("#enrollStudent").addEventListener("click", () => {
  byuiCourse.changeEnrollment(Number(document.querySelector("#sectionNumber").value));
  renderSections(byuiCourse.sections);
});
document.querySelector("#dropStudent").addEventListener("click", () => {
  byuiCourse.changeEnrollment(Number(document.querySelector("#sectionNumber").value), false);
  renderSections(byuiCourse.sections);
});

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);
