describe("Task Delete", () => {
  beforeEach(() => {
    cy.task("reset_database");
  });

  it("Deve ser possivel deletar uma tarefa", () => {
    let taskId = 0;

    cy.intercept("DELETE", "**/api/task/**").as("TaskDelete");

    cy.visit("/");

    cy.createTask("Task name");

    cy.get("ul")
      .get("li")
      .first()
      .invoke("attr", "data-task-id")
      .then((_taskId) => {
        taskId = parseInt(_taskId);
      });

    cy.get(`li[data-task-id="${taskId}"]`).find("img").click();
    cy.get("button").contains("Confirme").click();

    cy.wait("@TaskDelete").then(({ response }) => {
      if (response) {
        const { statusCode, body } = response;

        assert.equal(statusCode, 204);
        assert.equal(body, "");
      }
    });
  });

  it.only("Validar se a mensagem de sucesso (delete) está aparecendo", () => {
    let taskId = 0;

    cy.visit("/");

    cy.createTask("Task name");

    cy.get("ul")
      .get("li")
      .first()
      .invoke("attr", "data-task-id")
      .then((_taskId) => {
        taskId = parseInt(_taskId);
      });

    cy.get(`li[data-task-id="${taskId}"]`).find("img").click();
    cy.get("button").contains("Confirme").click();

    cy.contains("Tarefa removida com sucesso!").should("be.visible");
  });
});
