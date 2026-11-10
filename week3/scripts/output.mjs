export function setTitle(course) {
  document.querySelector("#courseName").textContent = course.name;
  document.querySelector("#courseCode").textContent = course.code;
}

export function renderSections(sections) {
  document.querySelector("#sections").innerHTML = sections.map((section) =>
    `<tr><td>${section.sectionNumber}</td><td>${section.enrolled}</td><td>${section.instructor}</td></tr>`
  ).join("");
}
