/// <reference types = "cypress" />
import spok from 'cy-spok'

describe('Get a Single List of a User via API', () => {
  it('TC_001_Validate get Single List via API', () => {
    cy.visit('/')
    cy.request({
      method: 'GET',
      url: '/api/users/2',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('data')
      expect(response.body).to.have.property('support')
      expect(response.body.data).to.have.property('id', 2)
      expect(response.body.data).to.have.property(
        'email',
        'janet.weaver@reqres.in',
      )
      expect(response.body.data).to.have.property('first_name', 'Janet')
      expect(response.body.data).to.have.property('last_name', 'Weaver')
      expect(response.body.data).to.have.property(
        'avatar',
        'https://reqres.in/img/faces/2-image.jpg',
      )
    })
  })

  it('TC_001_Validate Invalid user id with Single List via API', () => {
    cy.visit('/')
    cy.request({
      method: 'GET',
      url: '/api/users/23',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.be.empty
    })
  })
})

// Case 2: VALIDATING PROPERTIES AND VALUES with INTERCEPT via API
describe('Validate and processes the intercep object', () => {
  it('TC_001_Validate get Single List via API', () => {
    cy.intercept({ method: 'GET', url: '/api/users?page=2' }).as('listUsers')

    cy.visit('/')
    cy.wait('@listUsers')
      .its('response')
      .should(
        spok({
          statusCode: 200,
          body: {
            page: spok.number, // 2 is de value given
            per_page: 6,
            total: 12,
            data: [
              {
                id: 7,
                email: spok.string, // "michael.lawson@reqres.in",
              },
              {
                id: 8,
                email: 'lindsay.ferguson@reqres.in',
                first_name: 'Lindsay',
                last_name: spok.startsWith('Fer'), // "Ferguson",
                avatar: 'https://reqres.in/img/faces/8-image.jpg',
              },
            ],
          },
        }),
      )
  })
})
