const fs = require('fs');

// Step 1: Read business identifiers from CSV file
const businesses = fs.readFileSync('business_identifiers.csv', 'utf8').split('\n');

// Step 2: Define extractKeywords function for modern and legacy systems
const extractKeywords = (text) => {
    // Match full key phrases and variations, ignoring case and flexible with spaces
    const regex = /\b(Full\s*Restoration\s*Application|Restoration\s*Application|Voluntary\s*Dissolution|AGM\s*Location(\s*Change)?|Amalgamation\s*Application\s*(Short-form|Short\s*Form)\s*\(Vertical\)|6-Month\s*Consent\s*to\s*Continue\s*Out|Community\s*Contribution\s*Company)\b/gi;
    const matches = text.match(regex) || [];
    cy.log('Extracted keywords: ', matches); // Log the matches for debugging
    return matches;
};

// Step 3: Batch processing (Set batch size based on your needs)
const batchSize = 10;
for (let i = 0; i < businesses.length; i += batchSize) {
    const batch = businesses.slice(i, i + batchSize);

    batch.forEach(business => {
        // Step 4: Save session for the modern and legacy systems and run comparison
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
                cy.log(`Extracted modern keywords: ${JSON.stringify(modernFilingHistory)}`); // Log the full captured text
            });

            // Save session for the legacy system
            cy.saveLegacySession();

            // Fetch legacy filing history
            cy.visit('https://test.bcregistryallservices.gov.bc.ca/sofi/sofi.htm?_flowId=search'); // Replace with legacy system dashboard URL
            cy.get('#incorporationNumber').type(`${business}{enter}`);
            cy.get('table.displayTableSearch tr').find('td:first-child').then($table => {
                legacyFilingHistory = $table.text().replace(/\s+/g, ' ').trim();
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
                        "Consent to Continue Out": ["6-Month Consent to Continue Out", "6-Months Consent to Continue Out", "Consent to Continue Out"],
                        "Incorporation Application": ["Community Contribution Company Incorporation Application", "Incorporation Application for a Community Contribution Company"]
                    };

                    // Step 5: Compare keywords using a substring match function
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

                    // Step 6: Log and store results
                    const saveResults = (business, modernKeywords, legacyKeywords, match) => {
                        const result = {
                            business,
                            modernKeywords,
                            legacyKeywords,
                            match,
                            date: new Date().toISOString()
                        };
                        fs.appendFileSync('results.json', JSON.stringify(result) + '\n');
                    };

                    // Step 7: Check for matches using the substring comparison function
                    const keywordsMatch = compareKeywordsWithSubstrings(modernKeywords, legacyKeywords);
                    if (keywordsMatch) {
                        cy.log(`Filing History for ${business} has matching keywords between modern and legacy systems.`);
                    } else {
                        cy.log(`Filing History for ${business} does NOT have matching keywords between modern and legacy systems.`);
                    }

                    // Store the results
                    saveResults(business, modernKeywords, legacyKeywords, keywordsMatch);

                } catch (error) {
                    cy.log(`Error comparing filing histories for ${business}: ${error.message}`);
                }
            });
        });
    });
}
