import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompany } from '../../../pages/entity/corpCompanyCompany';
import { corpCompanyAlteration } from '../../../pages/entity/bcBenefitCompanyAlteration';
import { addressChange} from '../../../pages/entity/bcAddressChange';

describe('BC Benefit Company Director Change', function () {

    it('start and complete a Benefit Company  Director Change', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'));
      loginPage.verifyLanding();
      loginPage.logWithBCCard();
      corpCompany.changeAccountBen();
      corpCompanyAlteration.verifyBenefitCompanyActiveAndClick ();
      addressChange.clickAddChange ();
      addressChange.assertAddDialog ();
      addressChange.startAddChange ();
      addressChange.verifyFeeSummary ();
      addressChange.verifyResumefunctionality ();
      addressChange.verifyTheFilingIsCompleteAndDocuments ();
    });
});