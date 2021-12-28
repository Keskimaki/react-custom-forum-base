describe('Forum', () => {
  it('can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('TEST')
    cy.contains('board for testing purposes')
    cy.contains('Create Account')
    cy.contains('Latest Posts')
  })
})
