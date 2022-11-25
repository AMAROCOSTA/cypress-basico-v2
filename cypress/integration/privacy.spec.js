Cypress._.times(100, function(){
    it('testa a página da politica de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
    
        cy.contains('Talking About Testing').should('be.visible')
        
        }) 
})