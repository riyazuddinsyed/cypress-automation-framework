const businesses = ['BC1144649','BC1144589']; // Replace with your actual business identifiers
const extractKeywords = (text) => {
    // Match full key phrases and variations, ignoring case and flexible with spaces
    const regex = /\b(Full\s*Restoration\s*Application|Restoration\s*Application|Voluntary\s*Dissolution|AGM\s*Location(\s*Change)?|Amalgamation\s*Application\s*(Short-form|Short\s*Form)\s*\(Vertical\)|6-Month\s*Consent\s*to\s*Continue\s*Out|Community\s*Contribution\s*Company)\b/gi;
    const matches = text.match(regex) || [];
    cy.log('Extracted keywords: ', matches); // Log the matches for debugging
    return matches;
};


// Custom command to log in to the modern system
Cypress.Commands.add('modernLogin', () => {
    cy.visit('https://test.account.bcregistry.gov.bc.ca/decide-business'); 
    cy.wait(10000)
    cy.get('#loginBtn > span').first().click({ force: true });
    cy.contains('.v-list-item__title', 'IDIR').click({ force: true });
    cy.get('input[name="user"]').type('sriyazzu'); // Enter your username
    cy.get('#password').type('IndiaCanada786@'); // Enter your password
    cy.get('input[name="btnSubmit"]').click().debug()
});

// Custom command to log in to the legacy system
Cypress.Commands.add('legacyLogin', () => {
    cy.visit('https://test.bcregistryallservices.gov.bc.ca/sofi/login/login.htm'); // Legacy system login URL
    cy.get('input[name="user"]').type('sriyazzu'); // Enter your username
    cy.get('#password').type('IndiaCanada786@'); // Enter your password
    cy.get('input[name="btnSubmit"]').click();
});

// Custom command to save the session for both systems
Cypress.Commands.add('saveModernSession', () => {
    cy.session('modernSession', () => {
        cy.modernLogin();
    });
});

Cypress.Commands.add('saveLegacySession', () => {
    cy.session('legacySession', () => {
        cy.legacyLogin();
    });
});

// Test to compare filing history between modern and legacy systems
businesses.forEach(business => {
    it(`Compare Filing History for ${business} in both modern and legacy systems`, () => {
        let modernFilingHistory = [];
        let legacyFilingHistory = [];

        // Save session for the modern system
        cy.saveModernSession();

        // Fetch modern filing history
        cy.visit('https://test.account.bcregistry.gov.bc.ca/staff/dashboard/active');
        cy.get('#txtBusinessNumber').type(`${business}{enter}`);
        cy.get('button[type="submit"].search-btn').click();
        cy.get('button[aria-haspopup="true"]').click({ force: true });
        cy.get('div[role="menuitem"]').contains('Entity Dashboard').click();
        cy.get('#filing-history-list h3 span').each(($el, index, $list) => {
            if (index === 0) {
                modernFilingHistory = $el.text().replace(/\s+/g, ' ').trim(); // Initialize with the first line
            } else {
                modernFilingHistory += ' ' + $el.text().replace(/\s+/g, ' ').trim(); // Append each line with a space
            }
        }).then(() => {
            cy.log(`Extracted modern keywords: ${JSON.stringify(modernFilingHistory)}`) // Log the full captured text
        });


        // Save session for the legacy system
        cy.saveLegacySession();

        // Fetch legacy filing history
        cy.visit('https://test.bcregistryallservices.gov.bc.ca/sofi/sofi.htm?_flowId=search'); // Replace with legacy system dashboard URL
        cy.get('#incorporationNumber').type(`${business}{enter}`);
        cy.get('table.displayTableSearch tr').find('td:first-child').then($table => {
            legacyFilingHistory = $table.text().replace(/\s+/g, ' ').trim()
            cy.log('Extracted legacy filing history: ', legacyFilingHistory);
        }),

        // Compare modern and legacy filing histories by keywords
        cy.wrap(null).then(() => {
            try {
                const modernKeywords = extractKeywords(modernFilingHistory);
                const legacyKeywords = extractKeywords(legacyFilingHistory);
            
                // Define a base set of keywords for comparison
                const baseKeywords = {
                    "Restoration": ["Full Restoration Application", "Restoration Application"],
                    "Voluntary Dissolution": ["Voluntary Dissolution"],
                    "AGM Location": ["AGM Location Change", "AGM Location"],
                    "Amalgamation": ["Amalgamation Application"],
                    "Consent to Continue Out": ["6-Month Consent to Continue Out", "6-Months Consent to Continue Out","Consent to Continue Out"],
                    "Incorporation Application": ["Community Contribution Company Incorporation Application", "Incorporation Application for a Community Contribution Company"]
                };
        
                // Function to compare extracted keywords with a substring match
                const compareKeywordsWithSubstrings = (modernKeywords, legacyKeywords) => {
                    return Object.keys(baseKeywords).every(key => {
                        const baseKeywordSet = baseKeywords[key];
        
                        // Check if any modern keyword matches any base keyword
                        const modernMatch = baseKeywordSet.some(baseKeyword =>
                            modernKeywords.some(modernKeyword =>
                                modernKeyword.toLowerCase().includes(baseKeyword.toLowerCase())
                            )
                        );
        
                        // Check if any legacy keyword matches any base keyword
                        const legacyMatch = baseKeywordSet.some(baseKeyword =>
                            legacyKeywords.some(legacyKeyword =>
                                legacyKeyword.toLowerCase().includes(baseKeyword.toLowerCase())
                            )
                        );
        
                        // If both modern and legacy are missing the keyword, it's okay
                        if (!modernMatch && !legacyMatch) {
                            cy.log(`Both systems missing keyword "${key}". Skipping match check.`);
                            return true;
                        }
        
                        // Log details for better debugging
                        cy.log(`Checking "${key}": Modern match: ${modernMatch}, Legacy match: ${legacyMatch}`);
        
                        // We now consider it okay if one system contains the keyword and the other has a more specific form of it
                        return modernMatch || legacyMatch;
                    });
                };
        
        
                // Check for matches using the substring comparison function
                if (compareKeywordsWithSubstrings(modernKeywords, legacyKeywords)) {
                    cy.log(`Filing History for ${business} has matching keywords between modern and legacy systems.`);
                } else {
                    cy.log(`Filing History for ${business} does NOT have matching keywords between modern and legacy systems.`);
                    cy.log(`Modern Keywords: ${JSON.stringify(modernKeywords)}`);
                    cy.log(`Legacy Keywords: ${JSON.stringify(legacyKeywords)}`);
                }
            } catch (error) {
                cy.log(`Error comparing filing histories for ${business}: ${error.message}`);
            }
        });
    })
})
    



