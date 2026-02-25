import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompanyAlteration } from '../../../pages/entity/corpCompanyAlteration'
import { corpCompany } from '../../../pages/entity/corpCompany'
import { bcDissolutionFiling } from '../../../pages/entity/bcDissolution'
import { soleprop } from '../../../pages/entity/soleProp'

describe('BC Benefit Company Consent To Continue Out', function () {

    it('start and complete a Benefit Company  Consent To Continue Out', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'));
      loginPage.verifyLanding();
      loginPage.logWithBCCard();
      corpCompany.changeAccountBen();
      corpCompanyAlteration.verifyBenefitCompanyActiveAndClick ();
      bcDissolutionFiling.assertAllowableActions ();
      corpCompany.clickConsentToContinueOut();
      corpCompany.startConnsentToContinueOut();
      corpCompany.verifyFeeSummaryCco();
      soleprop.clickOnFileAndPayAndCompletePayment();
      corpCompany.verifyFilingHistoryHeaderCCO ();
      corpCompany.verifyTheFilingIsCompleteAndDocuments ();
    })
})