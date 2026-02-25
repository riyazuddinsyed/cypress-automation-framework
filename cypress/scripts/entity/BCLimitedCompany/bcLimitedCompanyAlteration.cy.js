import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompany } from '../../../pages/entity/bcBenefitCompany';
import { corpCompanyAlteration } from '../../../pages/entity/corpCompanyAlteration';

describe('BC Benefit Company Registration', function () {

    it('start and complete a Benefit Company  Registration', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'));
      loginPage.verifyLanding();
      loginPage.logWithBCCard();
      corpCompany.changeAccountBen();
      corpCompanyAlteration.verifyBenefitCompanyActiveAndClick ();
      corpCompanyAlteration.clickOnViewAndChange ();
      corpCompanyAlteration.changeBusinessType ();
      corpCompanyAlteration.assertBusinessTypes ();
      corpCompanyAlteration.selectBusinesstype ();
      corpCompanyAlteration.changeNamesTranslation ();
      corpCompanyAlteration.addNamesTranslationAlter ();
      corpCompanyAlteration.alterContactInfo();
      corpCompanyAlteration. alterShareClass();
      corpCompanyAlteration.addResolutionDate ();
      corpCompanyAlteration.verifyChangesSaved ();
      corpCompanyAlteration.setAlterDateAndTime ();
      corpCompanyAlteration.verifyFees ();
      corpCompanyAlteration.verifyPADPayment ();
      corpCompanyAlteration.verifyTheFilingIsCompleteAndDocuments();
    })
})