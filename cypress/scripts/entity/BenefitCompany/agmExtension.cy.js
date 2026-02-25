import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompanyAlteration } from '../../../pages/entity/corpCompanyAlteration'
import { corpCompany } from '../../../pages/entity/corpCompany'
import { bcDissolutionFiling } from '../../../pages/entity/bcDissolution'
import { soleprop } from '../../../pages/entity/soleProp'

describe('BC Benefit Company AGM Extension', function () {

    it('start and complete a Benefit Company  AGM Extenson', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'));
      loginPage.verifyLanding();
      loginPage.logWithBCCard();
      corpCompany.changeAccountBen();
      corpCompanyAlteration.verifyBenefitCompanyActiveAndClick ();
      bcDissolutionFiling.assertAllowableActions ();
      corpCompany. clickAgmExtenssion();
      corpCompany.verifyAgmExtHideButton();
      corpCompany.enterAndVerifyExtensionDetails();
      soleprop.clickOnFileAndPayAndCompletePayment();
      corpCompany.verifyTheFilingIsCompleteAndDocuments();
    })
})