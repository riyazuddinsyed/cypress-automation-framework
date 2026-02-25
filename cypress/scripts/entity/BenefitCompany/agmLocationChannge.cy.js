import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompanyAlteration } from '../../../pages/entity/corpCompanyAlteration'
import { corpCompany } from '../../../pages/entity/corpCompany'
import { bcDissolutionFiling } from '../../../pages/entity/bcDissolution'


escribe('BC Benefit Company AGM Location Change', function () {

    it('start and complete a Benefit Company  AGM Location Change', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'));
      loginPage.verifyLanding();
      loginPage.logWithBCCard();
      corpCompanyAlteration.verifyBenefitCompanyActiveAndClick ();
      bcDissolutionFiling.assertAllowableActions ();
      corpCompany.clickAGMLocationChange();
      corpCompany.startAGMLocChange();
      corpCompany.verifyTheFilingIsCompleteAndDocuments();
    })
})