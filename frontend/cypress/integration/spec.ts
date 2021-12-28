import env from '../../src/.env'

describe('Forum', () => {
  beforeEach(() => {
    cy.request('POST', `${env.API_BASE_URL}/api/testing/reset`)
    const user = {
      username: 'Tester',
      password: 'password'
    }
    cy.request('POST', `${env.API_BASE_URL}/api/users`, user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('TEST')
    cy.contains('board for testing purposes')
    cy.contains('Create Account')
    cy.contains('Latest Posts')
  })

  it('account creation form can be opened', () => {
    cy.contains('Create Account').click()

    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('#repeatPassword').should('exist')
    cy.contains('create')
  })

  it('account can be created', () => {
    cy.contains('Create Account').click()

    cy.get('#username').type('Testaaja')
    cy.get('#password').type('salasana')
    cy.get('#repeatPassword').type('salasana')
    cy.contains('create').click()

    cy.contains('Account created')
    cy.contains('Logout')
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
    
    cy.get('#username').type('Tester')
    cy.get('#password').type('salasana')
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
      cy.contains('Create Thread').click()
      cy.contains('Cypress Test').contains('created by Tester').contains('posts: 1')
    })
  })
})
