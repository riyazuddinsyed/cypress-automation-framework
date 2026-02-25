import { loginPage } from '../../../pages/entity/loginPage'
import { corpCompany } from '../../../pages/entity/corpCompany'
import { corpCompanyAlteration } from '../../../pages/entity/corpCompanyAlteration'
import { regamalg } from '../../../pages/entity/regAmalgamation'

describe('BC Benefit Company Amalgamation', function () {

    it('start and complete a Benefit Company  Amalgamation', function () {
      loginPage.visit(Cypress.env('BCRS_DOMAIN'))
      loginPage.verifyLanding()
      loginPage.logWithBCCard()
      corpCompany.changeAccountBen()
      corpCompanyAlteration.verifyBenefitCompanyActiveAndClick ()
      regamalg.startRegAmalg()
      regamalg.verifyLandingPage()
      regamalg.addAmalgamatingBusiness()
      regamalg.selectResultingBusinessType()
      regamalg.fillAmalgamatedRegisteredBusiness()
      regamalg.fillAmalgamatedRecordBusiness()
      corpCompany.fillCompletingParty()
      corpCompany.fillDirectorInfo()
      corpCompany.fillIncorpInfo()
      corpCompany. moveToNextPage()
      corpCompany.fillShareStructure()
      corpCompany.fillShareSeries()
      corpCompany. moveToNextPage()
    })
})