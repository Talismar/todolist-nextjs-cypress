describe("Task list", () => {
  it("Deve obter do backend a lista de tarefas", () => {
    cy.intercept("GET", "**/api/task").as("TaskList");

    cy.visit("/");

    cy.wait("@TaskList").then(({ response }) => {
      if (response) {
        const { statusCode, body } = response;

        assert.equal(statusCode, 200);
        assert.isArray(body);

        if (Array.isArray(body) && body.length > 0) {
          const task = body[0];

          assert.isNumber(task.id);
          assert.isString(task.name);
          assert.isString(task.status);
        }
      }
    });
  });

  it("Deve exibir a lista de tarefas com a mesma quantidade de dados que vem do back", () => {
    cy.intercept("GET", "**/api/task").as("TaskList");

    cy.visit("/");

    cy.wait("@TaskList").then(({ response }) => {
      if (response) {
        const { body } = response;

        if (Array.isArray(body) && body.length > 0) {
          const listAmount = body.length;

          cy.get("ul").children().should("have.length", listAmount);
        }
      }
    });
  });

  it("Validar se os nomes das tarefas estao sendo exibido corretamente", () => {
    cy.intercept("GET", "**/api/task").as("TaskList");

    cy.visit("/");

    cy.wait("@TaskList").then(({ response }) => {
      if (response) {
        const { body } = response;

        if (Array.isArray(body) && body.length > 0) {
          for (let index = 0; index < body.length; index++) {
            const element = body[index];
            cy.get(`ul>li:nth-of-type(${index + 1})`).should(
              "have.text",
              element.name
            );
          }
        }
      }
    });
  });
});
