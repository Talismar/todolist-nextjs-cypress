describe("Task Toggle status", () => {
  beforeEach(() => {
    cy.task("reset_database");
  });

  it("Deve ser alternar os status (checked or unchecked) de uma tarefa", () => {
    cy.visit("/");

    cy.createTask("Task name");

    cy.get("ul")
      .get("li")
      .first()
      .invoke("attr", "data-task-id")
      .then((_taskId) => {
        const taskId = parseInt(_taskId);

        cy.get(`li[data-task-id="${taskId}"]`)
          .get("#cy-component-checkbox")
          .click();
        cy.contains("Tarefa atualizada com sucesso!").should("be.visible");
      });
  });
});
