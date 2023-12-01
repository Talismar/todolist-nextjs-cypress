describe("Task Create", () => {
  it("Deve possivel criar uma tarefa", () => {
    cy.intercept("POST", "**/api/task").as("TaskCreate");

    cy.visit("/");

    cy.fixture("task.json").then((item) => {
      cy.get("input").type(item.name);
      cy.get("button").contains("Criar").click();
    });

    cy.wait("@TaskCreate").then(({ response }) => {
      if (response) {
        const { statusCode, body } = response;

        // cy.contains("Dados atualizados!");
        assert.equal(statusCode, 201);
        assert.isObject(body);
      }
    });
  });

  it("Validar se a tarefa está sendo adicionada a lista", () => {
    cy.intercept("POST", "**/api/task").as("TaskCreate");

    cy.visit("/");

    let total = 0;

    cy.get("ul")
      .children()
      .then((items) => {
        total = items.length;
      });

    cy.fixture("task.json").then((item) => {
      cy.get("input").type(item.name);
      cy.get("button").contains("Criar").click();
    });

    cy.wait("@TaskCreate").then(({ response }) => {
      if (response) {
        const { statusCode, body } = response;

        if (statusCode === 201) {
          cy.get("ul").children().should("have.length.greaterThan", total);
        }
      }
    });
  });

  it("Validar se uma mensagem de sucesso está aparecendo quando uma nova é cadastrada", () => {
    cy.intercept("POST", "**/api/task").as("TaskCreate");

    cy.visit("/");

    cy.fixture("task.json").then((item) => {
      cy.get("input").type(item.name);
      cy.get("button").contains("Criar").click();
    });

    cy.wait("@TaskCreate").then(({ response }) => {
      if (response) {
        const { statusCode, body } = response;

        if (statusCode === 201) {
          cy.contains("Nova tarefa cadastrada com sucesso!");
        }
      }
    });
  });
});
