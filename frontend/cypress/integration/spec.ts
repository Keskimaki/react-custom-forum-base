describe('Forum', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('TEST')
    cy.contains('board for testing purposes')
    cy.contains('Create Account')
    cy.contains('Latest Posts')
  })

  it('login form can be opened', () => {
    cy.contains('Login').click()
  })

  it('user can log in', () => {
    cy.contains('Login').click()

    cy.get('input:first').type('Tester')
    cy.get('input:last').type('password')
    cy.contains('login').click()
    
    cy.contains('Logged in')
    cy.contains('Tester')
  })
})
