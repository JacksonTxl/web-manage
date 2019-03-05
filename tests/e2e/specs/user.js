describe('pages/user', () => {
  it('login account', () => {
    cy.visit('/user/login')
    cy.contains('登')
  })
})
