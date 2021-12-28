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

    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.contains('login')
  })

  it('user can log in', () => {
    cy.contains('Login').click()

    cy.get('#username').type('Tester')
    cy.get('#password').type('password')
    cy.contains('login').click()
    
    cy.contains('Logged in')
    cy.contains('Logout')
  })

  it('login fails with wrong password', () => {
    cy.contains('Login').click()
    
    cy.get('input:first').type('Tester')
    cy.get('input:last').type('salasana')
    cy.contains('login').click()

    cy.contains('Incorrect password')
    cy.contains('Logout').should('not.exist')
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.contains('Login').click()
      cy.get('input:first').type('Tester')
      cy.get('input:last').type('password')
      cy.contains('login').click()
    })

    it('create thread form exists', () => {
      cy.contains('TEST - testing').click()
      cy.contains('Make a new thread')
      cy.get('textarea').should('exist')
      cy.contains('Create Thread')
    })

    it('a new thread can be created', () => {
      cy.contains('TEST - testing').click()
      cy.get('input:last').type(`Cypress Test`)
      cy.get('textarea').type('Testing Thread Creation')
      cy.contains('Create Thread').click() //TODO testing mode for database
      cy.contains('Cypress Test').contains('created by Tester').contains('posts: 1')
    })
  })
})
