describe("Home Page", () => {
  beforeEach(() => {
    // need to provide mock data when there is no backend
    // TODO: login at the beginning
    //   // http response
    //   cy.fixture("course.json").as("courseJSON");
    //   moke backend running
    //   cy.server();
    //   // route related to http response
    //   cy.route("/api/router/courses", "@courseJSON").as("courses"); // name of this event
    //   cy.visit("/");
  });

  // it("should display a list of listings", () => {
  //   cy.visit("/");
  //   cy.contains("my-listings");
  //   cy.contains("Guitar but new");
  // });

  // it("should display a list of courses", () => {

  //   cy.contains("All Courses");
  //   cy.wait('@courses');
  //   cy.get("card").should("have.length", 15);
  // });

  // it("should display the advanced courses", () => {
  //   cy.get(".nav-item").should("have.length", 2);
  //   cy.get(".nav-item").last().click();

  //   cy.get(".card .card-body .card-title").its("length").should("be.gt", 1);
  //   cy.get(".card .card-body .card-title")
  //     .first()
  //     .should("contain", "Angular Security Course");
  // });
});
