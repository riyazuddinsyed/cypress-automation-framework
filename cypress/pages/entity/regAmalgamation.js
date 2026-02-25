const amalgData = require('../../fixtures/entity/regAmalg.json')
require('cypress-plugin-tab')
import 'cypress-xpath';
export class RegAmalg {
    constructor() {
        this.amalgBtn='#amalgamate-list-item',
        this.amalgSelection ='#main-article h1',
        this.regBtn ='#regular-long-form-btn',
        this.amalgFilingHeader ='header > h1',
        this.amalgBusinessBtn ='#add-amalgamating-business-button',
        this.businessLookUpBtn ='#business-lookup',
        this.amalgResult ='[role="listbox" ][tabindex="-1"]',
        this.adoptFromAmalgChevron ='#x-panel-correct-aml-adopt',
        this.adoptinngBusinesses ='input#radio-1',
        this.done = '#done-btn',
        this.reviewAndConfirm ='#review-confirm-btn',
        this.mailingStreetAddress ='.v-input.street-address input[type="text"]',
        this.canadaPostCheck = '.pcaitem.pcafirstitem.pcaselected',
        this.recordsOfficeCheckBox = '#records-mailing-same-chkbx'
    }

    startRegAmalg(){
        cy.get(this.amalgBtn).click({force:true})
        cy.get(this.amalgSelection).contains(amalgData.amalgHeader)
        cy.get(this.regBtn).click({force:true})
    }

    verifyLandingPage() {
        cy.get(this.amalgFilingHeader).type(amalgData.regAmalgHeader)
    }

    addAmalgamatingBusiness() {
        cy.get(this.amalgBusinessBtn).click({force:true})
        cy.get(this.businessLookUpBtn).type(amalgData.lookUpBusinesses)
        cy.get(this.amalgResult).click({forrce:true})
        cy.get('table tbody').within(() => {      //asserts the table length is 2 after the businesses is added
            cy.get('tr').should('have.length', 2)
          })

    }

    selectResultingBusinessType () {
        cy.get(this.adoptFromAmalgChevron).click({force:true})
        cy.get(this.adoptFromAmalgChevron)
        .find('input[type="radio"]')
        .should('have.length', 2);
        cy.get(this.adoptinngBusinesses).click({force:true})
        cy.get(this.done).click({force:true})
        cy.get(this.reviewAndConfirm).click({force:true})
    }

    fillAmalgamatedRegisteredBusiness (){
        cy.get(this.mailingStreetAddress).eq(0).type(amalgData.mailingStreetAdd)
        cy.get(this.canadaPostCheck).click({force:true})
        cy.get(this.checkboxDefineCompanySameAsMailing).click({ force: true })
    }

    fillAmalgamatedRecordBusiness (){
        cy.get(this.recordsOfficeCheckBox).click({ force: true })
        cy.get(this.mailingStreetAddress).eq(1).type(amalgData.recordStreetAddStreetAdd)
        cy.get(this.canadaPostCheck).click({force:true})
        cy.get(this.checkboxDefineCompanySameAsMailing).click({ force: true})
        cy.get(this.reviewAndConfirm).click({force:true})
    }

    //records contact info take from corp company
    //completing party from corp companny
    //add director from corp company
    //share sstructure from corp comapny
    
}

    

    export const regamalg = new RegAmalg()
