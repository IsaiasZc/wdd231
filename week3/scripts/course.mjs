const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development I",
  sections: [
    { sectionNumber: 1, enrolled: 88, instructor: "Brother Bingham" },
    { sectionNumber: 2, enrolled: 81, instructor: "Sister Shultz" },
    { sectionNumber: 3, enrolled: 95, instructor: "Sister Smith" },
  ],
  changeEnrollment(sectionNumber, add = true) {
    const section = this.sections.find((item) => item.sectionNumber === sectionNumber);
    if (section) section.enrolled += add ? 1 : -1;
  },
};

export default byuiCourse;
