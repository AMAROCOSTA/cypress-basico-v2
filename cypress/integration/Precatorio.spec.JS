/// <reference types = "Cypress" />
describe('precatório', function () {
    const THREE_SECONDS_IN_MS = 29000

    this.beforeEach(function () {
        cy.visit('http://template.dev.educacao/')
    })

    it('logar com usuario de sucesso', function () {
        cy.intercept('/api/v1/inicio/secoes').as('conteudoDaPagina');
        cy.intercept('/api/v1/Inicio/Faq').as('faq');

        cy.wait(['@conteudoDaPagina', '@faq']);

        cy.get('[href="/app"]').click();

        cy.get('[placeholder="Nome de usuário"]').type('sistema');
        cy.get('[placeholder="Senha"]').type('12345678');
        cy.contains('button', 'Entrar').click()
    })

    it('desabilitar o botão-seção/menu', function () {
        cy.intercept('/api/v1/inicio/secoes').as('conteudoDaPagina');
        cy.intercept('/api/v1/Inicio/Faq').as('faq');
        cy.wait(['@conteudoDaPagina', '@faq']);
        cy.get('[href="/app"]').click();
        cy.get('[placeholder="Nome de usuário"]').type('sistema');
        cy.get('[placeholder="Senha"]').type('12345678');
        cy.contains('button', 'Entrar').click()
        cy.wait(6000)
        cy.get('.v-size--small').click()
        cy.get('[href="/exemplos"]').click();
        cy.get('.v-list > [href="/exemplos/editarpaginainicial"] > .v-list-item__content > .v-list-item__title').click()
        cy.get(':nth-child(2) > .v-list-item__action > .v-item-group > .v-btn > .v-btn__content > .v-icon').click()
        cy.get(':nth-child(1) > .ml-6 > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click()
        cy.get('.v-card > .v-sheet > .v-toolbar__content > .v-btn > .v-btn__content > .v-icon').click();
        cy.get('.text-capitalize > .v-btn__content').click();
      

     
        cy.visit('http://template.dev.educacao/')
        cy.get('.v-toolbar__content > :nth-child(4)').should('not.be.visible')
        
    })

    it('habilitar o botão-seção/menu', function () {
        cy.intercept('/api/v1/inicio/secoes').as('conteudoDaPagina');
        cy.intercept('/api/v1/Inicio/Faq').as('faq');
        cy.wait(['@conteudoDaPagina', '@faq']);
        cy.get('[href="/app"]').click();
        cy.get('[placeholder="Nome de usuário"]').type('sistema');
        cy.get('[placeholder="Senha"]').type('12345678');
        cy.contains('button', 'Entrar').click()
        cy.wait(6000)
        cy.get('.v-size--small').click()
        cy.get('[href="/exemplos"]').click();
        cy.get('.v-list > [href="/exemplos/editarpaginainicial"] > .v-list-item__content > .v-list-item__title').click()
        cy.get(':nth-child(2) > .v-list-item__action > .v-item-group > .v-btn > .v-btn__content > .v-icon').click()
        cy.get(':nth-child(1) > .ml-6 > .v-input__control > .v-input__slot').click()
        cy.get(':nth-child(1) > .ml-6 > .v-input__control > .v-input__slot').click()
      //  cy.get('.inputs > :nth-child(1)').type('Menu');
        cy.get('.v-card > .v-sheet > .v-toolbar__content > .v-btn > .v-btn__content > .v-icon').click();
        cy.get('.text-capitalize > .v-btn__content').click();
        cy.get(':nth-child(2) > .v-list-item__action > .v-item-group > .v-btn > .v-btn__content > .v-icon').click();
        cy.get(':nth-child(1) > .v-input--hide-details > .v-input__control > .v-input__slot').should('be.visible')
        
        
    })

    it('Incluir nova seção na pagina', function () {
        cy.intercept('/api/v1/inicio/secoes').as('conteudoDaPagina');
        cy.intercept('/api/v1/Inicio/Faq').as('faq');
        cy.wait(['@conteudoDaPagina', '@faq']);
        cy.get('[href="/app"]').click();
        cy.get('[placeholder="Nome de usuário"]').type('sistema');
        cy.get('[placeholder="Senha"]').type('12345678');
        cy.contains('button', 'Entrar').click()
        cy.wait(6000)
        cy.get('.v-size--small').click()
        cy.get('[href="/exemplos"]').click();
        cy.get('.v-list > [href="/exemplos/editarpaginainicial"] > .v-list-item__content > .v-list-item__title').click()
        cy.wait(4000)
        cy.get('.v-toolbar__content > .v-btn--plain > .v-btn__content > .v-icon').click()
        cy.contains('Seção').click()
        cy.get('.list-group > :nth-child(6) > .v-list-item__content > .v-list-item__title').should('be.visible')

     
        
    })

    it('Excluir seção na pagina', function () {
        cy.intercept('/api/v1/inicio/secoes').as('conteudoDaPagina');
        cy.intercept('/api/v1/Inicio/Faq').as('faq');
        cy.wait(['@conteudoDaPagina', '@faq']);
        cy.get('[href="/app"]').click();
        cy.get('[placeholder="Nome de usuário"]').type('sistema');
        cy.get('[placeholder="Senha"]').type('12345678');
        cy.contains('button', 'Entrar').click();
        cy.wait(6000);
        cy.get('.v-size--small').click();
        cy.get('[href="/exemplos"]').click();
        cy.get('.v-list > [href="/exemplos/editarpaginainicial"] > .v-list-item__content > .v-list-item__title').click();
        cy.wait(4000);
        cy.get(':nth-child(6) > .v-list-item__action > .v-item-group > .v-btn > .v-btn__content > .v-icon').click();
        cy.get('.text-capitalize > .v-btn__content').click()
        cy.get('.v-card__actions > .error--text > .v-btn__content').click();      
        cy.contains(':nth-child(6) > .v-list-item__action > .v-item-group > .v-btn > .v-btn__content > .v-icon').should('not.exist');
        
       
    })

})