import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompany } from '../../../pages/entity/corpCompany'
describe('Community Contrribution Company Registration', function () {

    it('start and complete a Community Contrribution Company Registration', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'),{
        onBeforeLoad(win) {
          win.sessionStorage.clear();
          win.localStorage.clear();
        },
        onLoad(win) {
          // Ensure the app is fully loaded after the browser triggers the 'load' event
          cy.wrap(win.document).its('readyState').should('eq', 'complete');
        },
        //cache: false,
      });
      loginPage.verifyLanding()
      loginPage.logWithBCCard()
      corpCompany.changeAccountBen()
      corpCompany. navigateToNR()
      corpCompany.selectcccCompany()
      //corpCompany.assertNumberedCompany()
      corpCompany.startNumCompanyReg()
      corpCompany.surveyDialog()
      corpCompany.fillNamesTranslation()
      corpCompany.fillOfficeAddress()
      corpCompany.fillRecordsOffice()
      corpCompany.fillRegisterContactInfo()
      corpCompany.fillFolioNumber()
      corpCompany. moveToNextPage()
      corpCompany.fillCompletingParty()
      corpCompany.fillDirectorInfo()
      corpCompany.fillDirector1()
      corpCompany.fillDirector2()
      corpCompany.fillIncorpInfo()
      corpCompany. moveToNextPage()
      corpCompany.fillShareStructure()
      corpCompany.fillShareSeries()
      corpCompany. moveToNextPage()
      corpCompany.fillIncorporationAgreementForm()
      corpCompany.verifyAllStepsAreSavedAndResumed()
      corpCompany.clickCertifyAndEnterCourtOrder ()
      corpCompany.verifyPADPayment()
      corpCompany.verifyTheFilingIsCompleteAndDocuments()
    })
})