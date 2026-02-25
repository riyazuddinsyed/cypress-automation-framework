import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompany } from '../../../pages/entity/corpCompany'
describe('BC Limited Company Registration', function () {

    it.only('start and complete a Limited Company  Registration', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'),{
        onBeforeLoad(win) {
          win.sessionStorage.clear();
          win.localStorage.clear();
        },
        cache: false,})
      loginPage.verifyLanding()
      loginPage.logWithBCCard()
      corpCompany.changeAccountBen()
      corpCompany. navigateToNR()
      corpCompany.selectLimitedCompany()
      //corpCompany.assertNumberedCompany() should chnage
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