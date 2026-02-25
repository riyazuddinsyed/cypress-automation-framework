describe('Compare Ledgers Between Modern and Legacy URLs', () => {
    // Array of company names
    const companies = [
        'BC1055141'
      
      // Add more company names as needed
    ];
  
    let modernResults = [];
    let legacyResults = [];
  
    // Iterate over each company in the array
    companies.forEach((company) => {
  
      // Modern URL login and search
      it(`Login and search in modern system for company ${company}`, () => {
        cy.visit('https://test.business.bcregistry.gov.bc.ca/');
        cy.get('#loginBtn > span').first().click({force:true})
        cy.contains('.v-list-item__title', 'IDIR').click({force:true})
        cy.get('#user').type('sriyazzu'); 
        cy.get('#password').type('IndiaCanada786@');
        cy.get('input[name="btnSubmit"]').click();
  
        cy.url().should('include', '/dashboard');
        //cy.visit('https://modern-url.com/search');
  
        // Search for the company from the array
        cy.get('#txtBusinessNumber').type(company);
        cy.get('button[type="submit"].search-btn').click();
        cy.get('button[aria-haspopup="true"]').click({force:true})
        cy.get('div[role="menuitem"]').contains('Entity Dashboard').click()
  
        // Grab the search results
        cy.get('#filing-history-list').find('h3 span').each(($el) => {
          modernResults.push($el.text())
        }).then(() => {
            cy.log('Modern Results:', modernResults.join(', ')); 
          });
      });
  
     // Legacy URL login and search
      it(`Login and search in legacy system for company ${company}`, () => {
        cy.visit('https://test.bcregistryallservices.gov.bc.ca/sofi/login/login.htm');
  
        cy.get('input[name="username"]').type('yourLegacyUsername'); // Replace with your legacy login credentials
        cy.get('input[name="password"]').type('yourLegacyPassword');
        cy.get('form').submit();
  
        cy.url().should('include', '/home');
        cy.visit('https://legacy-url.com/search');
  
        // Search for the company from the array
        cy.get('input[name="searchField"]').type(company);
        cy.get('button[type="submit"]').click();
  
        // Grab the search results
        cy.get('.legacy-result-item').each(($el) => {
          legacyResults.push($el.text());
        });
      });
  
      // Compare the results for each company
      it(`Compare results for company ${company}`, () => {
        cy.wrap(modernResults).then(() => {
          cy.wrap(legacyResults).then(() => {
            expect(modernResults).to.deep.equal(legacyResults);
          });
        });
      });
  
    });
  });
  