import { loginPage } from '../../../pages/entity/loginPage'
import { bcLimitedRestoration } from '../../../pages/entity/bcLimitedRestoration'
import { corpCompany } from '../../../pages/entity/corpCompany'
const testData = require('../../fixtures/entity/logincreds.json')

describe('Community Contribution Company Full Restoration', function () {

    it('start and complete a Community Contribution Company Full resatoration', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'))
      loginPage.loginWithIdir()
      loginPage.verifyStaffDashboard(testData.searchResult5)
      bcLimitedRestoration.assertAllowableActionsStaff()
      bcLimitedRestoration.startRestoration()
      bcLimitedRestoration.step1Restore()
      bcLimitedRestoration.namesTranslation()
      bcLimitedRestoration.fullRestoration()
      bcLimitedRestoration.moveToNxtPage()
      bcLimitedRestoration.addBusinessRestoration()
      bcLimitedRestoration.moveToNxtPage()
      bcLimitedRestoration.step3Restore()
      corpCompany.fillRegisterContactInfo()
      bcLimitedRestoration.moveToNxtPage()
      bcLimitedRestoration.verifyChangesSaved()
      bcLimitedRestoration.fillCertifyBlock()
      bcLimitedRestoration. verifyFeeSummary()
      bcLimitedRestoration.staffNoFee()
      bcLimitedRestoration.verifyTheFilingIsCompleteAndDocuments()

    })
})
