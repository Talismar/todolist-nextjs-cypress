describe("Upload file page", () => {
  it("should be possible to upload a file", () => {
    cy.visit("/upload-file");

    cy.get("input:first").selectFile(
      "cypress/fixtures/coordinates-diagram.jpg"
    );

    cy.get("img").should("be.visible");
  });
});
