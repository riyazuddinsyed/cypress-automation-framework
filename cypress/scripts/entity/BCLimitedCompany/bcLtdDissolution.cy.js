import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompanyAlteration } from '../../../pages/entity/corpCompanyAlteration'
import { corpCompany } from '../../../pages/entity/corpCompany'
import { bcDissolutionFiling } from '../../../pages/entity/bcDissolution'

describe('BC Benefit Company Dissolution', function () {

    it('start and complete a Benefit Company  Dissolution', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'));
      loginPage.verifyLanding();
      loginPage.logWithBCCard();
      corpCompany.changeAccountBen();
      corpCompanyAlteration.verifyBenefitCompanyActiveAndClick ();
      bcDissolutionFiling.assertAllowableActions ();
      bcDissolutionFiling.startDissolution ();
      bcDissolutionFiling.step1Dissolution ();
      bcDissolutionFiling.step2Dissolution ();
      bcDissolutionFiling.step3Dissolution ();
      bcDissolutionFiling.verifySaveAndResumeFunctionality ();
      bcDissolutionFiling.verifyFeeSummary ();
      bcDissolutionFiling.reviewAndConfirmStep ();
      bcDissolutionFiling.verifyTheFilingIsCompleteAndDocuments ();
    });
});