export function setSectionSelection(sections) {
  const select = document.querySelector("#sectionNumber");
  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = section.sectionNumber;
    select.appendChild(option);
  });
}
