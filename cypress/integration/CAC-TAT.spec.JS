/// <reference types = "Cypress" />
describe('central de atendimento ao cliente TAT', function(){
    const THREE_SECONDS_IN_MS = 3000

    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it.only('verifica o título da aplicação', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
        

    })

    it('preenche os campos obrigatorios e enviar o formuáril', function(){
        const longText = 'Teste, teste, teste ,tes ,teste , teste, tes, tess'
    
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('amarocosta@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('span.success').should('be.visible')
    })

    it('exibe mesmo de erro ao submeter o formulário com um email com formatação', function(){
        cy.clock()

        cy.get('#firstName').type('Amaro')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('amarocosta@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('campo de telefone continua vazio quando preenchido com valor não-númerico', function(){
        cy.get('#phone')
        .type('asdfergtgh')
        .should('have.value', '')

    })

    it('campo de telefone continua vazio quando preenchido com valor não-númerico', function(){
        cy.clock()
        cy.get('#firstName').type('Amaro')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('amarocosta@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('preencher e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
        .type('Amaro')
        .should('have.value', 'Amaro')
        .clear()
        .should('have.value', '')
    cy.get('#lastName')
        .type('Costa')
        .should('have.value', 'Costa')
        .clear()
        .should('have.value', '')
    cy.get('#email')
        .type('amarocosta@gmail.com')
        .should('have.value', 'amarocosta@gmail.com')
        .clear()
        .should('have.value', '')
    cy.get('#phone')
        .type('81999991212')
        .should('have.value', '81999991212')
        .clear()
        .should('have.value', '')
    cy.get('#open-text-area')
        .type('teste')
        .should('have.value', 'teste')
        .clear()
        .should('have.value', '')

    })

    it('exibir a msg de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.clock()

        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })
    it('enviar o formulário com sucesso usando um comando customizado', function(){
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('span.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('span.success').should('not.be.visible')
        
    })

    it('seleciona um produto (youtube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')      
        
    })

    it('seleciona um produto (mentoria) por seu valor', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')      
        
    })
    
    it('seleciona um produto (mentoria) por seu indice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')      
        
    })


    
it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
         
    
})

it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })    
    
})

it('Como marcar e desmacar checkboxes', function(){
    cy.get ('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last ()
    .uncheck()
    .should('not.be.checked')

    
})
it('campo de telefone continua vazio quando preenchido com valor não-númerico com Check', function(){
    cy.get('#firstName').type('Amaro')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('amarocosta@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
        
    cy.get('.error').should('be.visible')

    
})

it('Seleciona o arquivo da pasta file', function(){
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')

    })

    
})

it('Seleciona o arquivo da pasta drag-drop', function(){
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {oction: 'drag-drop'})
    .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
})

})

it('Seleciona o arquivo da pasta drag-dropum arquivo utilizando ua fixture para a qual foi dada um alias', function(){
   cy.fixture('example.json').as('sampleFile')
   cy.get('input[type="file"]#file-upload')
   .selectFile('@sampleFile')
   .should(function($input){
     expect($input[0].files[0].name).to.equal('example.json')
   })
})

it('Abrir em outra abra uma pagina', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })


it('acessar a página da pitica de privacidade removendo o target e entãp', function(){
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
    
    cy.contains('Talking About Testing').should('be.visible')
    }) 

    it('preenche os campos obrigatorios e enviar o formuáril congelar o relógio', function(){
        const longText = 'Teste, teste, teste ,tes ,teste , teste, tes, tess'

        cy.clock()

        cy.get('#firstName').type('Amaro')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('amarocosta@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('span.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        
        cy.get('.success').should('not.be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    it.only('preenche a area de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat(' Amaro costa ', 2000)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
        
    })

    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
          .should(function(response){
            const{ status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')

          })

        })
    it('encontar o gato escondido', function(){
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
            
        
   


})

})
