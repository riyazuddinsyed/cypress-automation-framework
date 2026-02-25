import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompany } from '../../../pages/entity/corpCompany';
import { corpCompanyAlteration } from '../../../pages/entity/corpCompanyAlteration';
import { directorChange} from '../../../pages/entity/bcDirectorChange';

describe('BC Limited Company Director Change', function () {

    it('start and complete a BC Limited Company  Director Change', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'));
      loginPage.verifyLanding();
      loginPage.logWithBCCard();
      corpCompany.changeAccountBen();
      corpCompanyAlteration.verifyBenefitCompanyActiveAndClick ();
      directorChange.clickDirectorChange ();
      directorChange.newDirDate ();
      directorChange.addNewDirector ();
      directorChange.editAddressOfDirector ();
      directorChange.editLegalName ();
      directorChange.verifyChagesAreSaved ();
      directorChange.clickOnReviewAndConfirm ();
      directorChange.verifyTheFilingIsCompleteAndDocuments ();
    });
})