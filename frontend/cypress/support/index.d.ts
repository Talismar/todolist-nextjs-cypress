/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Fazer login no sistema
     * @example
     * cy.login(username, password)
     */
    login(username: string, password: string): Chainable<any>;
    /**
     * Creates one Todo using UI
     * @example
     * cy.createTodo('new item')
     */
    createTask(name: string): Chainable<any>;
  }
}
