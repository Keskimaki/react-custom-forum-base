describe('Forum', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'Tester', password: 'password' })
    cy.visit('http://localhost:3003')
  })

  it('front page can be opened', () => {
    cy.contains('TEST')
    cy.contains('board for testing purposes')
    cy.contains('Create Account')
    cy.contains('Latest Posts')
  })

  it('account creation form can be opened', () => {
    cy.contains('Create Account').click()

    cy.get('h1').contains('Create Account')
    cy.get('input').should('exist')
    cy.contains('create')
  })

  it('account can be created', () => {
    cy.contains('Create Account').click()

    cy.get('input:first').type('Cypress')
    cy.get('input:eq(2)').type('salasana')
    cy.get('input:last').type('salasana')
    cy.contains('create').click()

    cy.contains('Account created')
    cy.contains('Logout')
  })

  it('login form can be opened', () => {
    cy.contains('Login').click()

    cy.get('input:first').should('exist')
    cy.get('input:last').should('exist')
    cy.contains('login')
  })

  it('user can log in', () => {
    cy.contains('Login').click()

    cy.get('input:first').type('Tester')
    cy.get('input:last').type('password')
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
      cy.request('POST', 'http://localhost:3003/api/login', {username: 'Tester', password: 'password'})
        .then(response => {
          response.body.token = 'bearer ' + response.body.token
          localStorage.setItem('loggedForumUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3003')
        })
      })

    it('user info can be viewed', () => {
      cy.contains('Tester').click()
      cy.get('h1').contains('Tester')
    })

    it('user info can be edited', () => {
      cy.contains('Tester').click()
      cy.contains('edit profile').click()
      cy.get('input:first').type('Test Tester')
      cy.get('textarea').type('Testing User Info Editing')
      cy.contains('Update profile').click()

      cy.contains('Profile updated')
      cy.contains('Test Tester')
      cy.contains('Testing User Info Editing')
    })

    it('user password can be changed', () => {
      cy.contains('Tester').click()
      cy.contains('edit profile').click()
      cy.contains('change password').click()
      cy.get('input:first').type('salasana')
      cy.get('input:last').type('salasana')
      cy.contains('Update Password').click()
      cy.contains('Password updated')

      cy.contains('Logout').click()
      cy.contains('Login').click()
      cy.get('input:first').type('Tester')
      cy.get('input:last').type('password')
      cy.contains('login').click()
      cy.contains('Incorrect password')
    })

    it('create thread form exists', () => {
      cy.contains('TEST - testing').click()
      cy.contains('Make a new thread')
      cy.get('textarea').should('exist')
      cy.contains('Create Thread')
    })

    it('a new thread can be created', () => {
      cy.contains('TEST - testing').click()
      cy.get('input:last').type('Cypress Test')
      cy.get('textarea').type('Testing Thread Creation')
      cy.contains('Create Thread').click()
      cy.contains('Cypress Test').contains('created by Tester').contains('posts: 1')
    })

    describe('Thread exists', () => {
      beforeEach(() => {
        cy.contains('TEST - testing').click()
        cy.get('input:last').type('Cypress Test')
        cy.get('textarea').type('Testing Thread Creation')
        cy.contains('Create Thread').click()
      })

      it('thread can be entered', () => {
        cy.contains('Cypress Test').click()
        cy.get('h1').contains('Cypress Test')
      })

      it('create post form exists', () => {
        cy.contains('Cypress Test').click()
        cy.get('textarea')
      })

      it('a new post can be created', () => {
        cy.contains('Cypress Test').click()
        cy.get('textarea').type('Testing Post Creation')
        cy.wait(30000) //Wait for spam prevention
        cy.contains('Submit').click()
        cy.go('back')
        cy.go('forward')
        cy.contains('Testing Post Creation')
      })
    })
  })
})
