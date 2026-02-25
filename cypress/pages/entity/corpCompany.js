const benefitCompanyData = require('../../fixtures/entity/bcBenefitCompany.json')
const ccoData = require('../../fixtures/entity/cco.json')
const agmExtData = require('../../fixtures/entity/agmExt.json')


require('cypress-plugin-tab')
import 'cypress-xpath';
export class CorpCompany {
  constructor() {
    this.selectAccount = '.v-list-item--link .v-list-item__title',
      this.getStarted = '#get-started-button',
      this.nrTitle = "#app-title",
      this.clickChevron = "#request-action-select  div.v-select__selections",
      this.actionDropDown = "#app > div.v-menu__content.theme--light.menuable__content__active",
      this.startNewBusinesses = '[role="menuitem"]:contains("For businesses that do not exist yet")',
      this.clickBusinessInBC = '[data-v-466d844c] .group-item:contains("Start a new BC-based business")',
      this.selectBusinessChevron = '#entity-type-options-select',
      this.viewAllBusinesses = '[role="listbox"] [class*="last-select-item"]',
      this.benefitCompanyBtn = 'button.link-sm-sans-ul:contains("Benefit Company")',
      this.benefitNumCompany = '#numbered-company-radio',
      this.incorpNow = '#action-now-button',
      this.incorporateANumberedCompanyButton = 'button[class*="btn-draft-resume"]',
      this.namesTranslationButton = '#name-translations  button',
      this.inputNameTranslation = '#name-translation-input',
      this.doneButton = '#name-translation-btn-done',
      this.mailingStreetAddress = '#street-address-3',
      this.canadaPostCheck = '.pcaitem.pcafirstitem.pcaselected',
      this.checkboxDefineCompanySameAsMailing = '#registered-mailing-same-chkbx',
      this.recordsOfficeCheckBox = '#records-mailing-same-chkbx',
      this.recordsMailingStreetAddress = 'label.v-label[for^="street-address"] + input[type="text"]',
      this.companyType = '#todo-list div.todo-label  h3',
      this.nameTranslationCheckbox = '#name-translation-checkbox',
      this.emailAdd = '#txt-email',
      this.emailAddConfirm = '#txt-confirm-email',
      this.phoneNum = '#txt-phone',
      this.phoneNumExt = '#txt-phone-extension',
      this.folioNum = '#folio-number-text-field',
      this.addPeopleAndRoles = '#next-btn',
      this.addCompletingParty = '#btn-start-add-cp',
      this.completingPartyFName = '#person__first-name',
      this.completingPartyLName = '#person__last-name',
      this.completingPartyDone = '#btn-done',
      this.directorFName = '#person__first-name',
      this.directorMName = '#person__middle-name',
      this.directorLName = '#person__last-name',
      this.addDirector = '#btn-add-person',
      this.directorChkBx = '#director-checkbox',
      this.dirMailingAdd = 'label.v-label[for^="street-address"] + input[type="text"]',
      this.checkboxDefineCompanySameAsMailingDir = '//label[contains(text(),"same as Mailing Address")]/preceding-sibling::div/input',
      this.addIncorp = "#btn-add-organization",
      this.dirDeliveryAdd = 'label.v-label[for^="street-address"] + input[type="text"]',
      this.corpLegalName = '#org-name',
      this.buttonAddShareClass = '#btn-start-add-cp'
    this.shareClassName = 'input[id="txt-name"]'
    this.maxNumOfShares = '#txt-max-shares'
    this.parValueOfShare = '#class-par-value'
    this.currencyDropdown = '#class-currency'
    this.specialRightsCheckbox = '#special-rights-check-box',
      this.shareSeriesBtn = 'div.actions-dropdown_item:nth-child(1)',
      this.seriesName = '#txt-name',
      this.doneButtonShareClass = 'button#btn-done',
      this.confirmIncorporationSampleAgreementOption = '#agreement-type-custom',
      this.saveAndResume = '#save-resume-btn',
      this.shareChevron = '#list-share-class  span:nth-child(2)  button',
      this.resumeDraft = 'button[class*="btn-draft-resume"]',
      this.stepIndicator = '#step-buttons-container  i.v-icon.notranslate.step__btn2.mdi.mdi-check-circle.theme--light.success--text.text--darken-1',
      this.courtOderCheckBox = '#plan-of-arrangement-checkbox',
      this.fileAndPay = '#file-pay-btn',
      this.reviewAndConfirm = '#step-5-btn',
      this.certify = '#AR-step-4-container   i',
      this.courtOder = '#court-order-number-input',
      this.filingHistoryList = '#filing-history-list  h3',
      this.viewDocuments = 'button.v-btn--outlined.primary--text:has(span.view-details.app-blue)',
      this.limitedCompanyButton = '#CR > button',
      this.ulcCompanyButton = '#UL > button'
      this.coo = '#consent-continue-out-list-item',
      this.ccoHeader = '#consent-header',
      this.ccoJurisdiction = '#country-selector',
      this.ccoJurisdictionCountry = '.v-menu__content .v-list-item',
      this.ccoBusinessContact = '#contact-value',
      this.ccoOptionalEmail = '#optionalEmail',
      this.ccoCerttifyField = '#certified-by-textfield',
      this.feeSummaryHeader = 'header.font-weight-bold',
      this.feeSummaryListName = '.fee-list__item-name',
      this.feeSummaryValueName = '.fee-list__item-value',
      this.feeTotal = '.fee-total__name',
      this.feeValue = '.fee-total__value',
      this.agmExtensionBtn = '#agm-ext-list-item',
      this.helpButton = '.help-btn.top',
      this.inGoodStanding = '#entity-in-good-standing',
      this.agmExtRadioBtn = '#first-agm-radio-group',
      this.agmExtYear = '#year-txt',
      this.agmDateExt = 'table tbody tr td button.v-btn',
      this.agmDateDone = '#btn-done',
      this.preAgmYear = '#prev-extension-radio-group',
      this.agmLocChangeBtn ='#agm-loc-chg-list-item',
      this.certifyChkBx = 'input[role="checkbox"][type="checkbox"]',
      this.agmLocDetailField ='#detail-comment-textarea',
      this.agmLocation ='#agm-location',
      this.agmFileAndPay ='#agm-loctn-chg-file-pay-btn',
      this.cccCompanyBtn ='#CC > button'

  }

  changeAccountBen() {
    cy.wait(10000)
    cy.get('div.account-name').invoke('attr', 'style', 'display: block').click({ force: true });
    cy.get(this.selectAccount).eq(8).click();
  }

  navigateToNR() {
    cy.get(this.getStarted).click({ force: true })
    cy.get(this.nrTitle).should('be.visible')
    cy.get(this.clickChevron).should('be.visible')
    cy.get(this.clickChevron).click()
    cy.get(this.actionDropDown).should('be.visible')
    cy.get(this.startNewBusinesses).click();
    cy.wait(2000)
    cy.get(this.clickBusinessInBC).should('be.visible')
    cy.get(this.clickBusinessInBC).click()
    cy.get(this.selectBusinessChevron).should('be.visible')
    cy.get(this.selectBusinessChevron).click()
    cy.get(this.viewAllBusinesses).should('be.visible')
    cy.get(this.viewAllBusinesses).click()
  }

  selectBenefitCompany() {
    cy.get('.copy-small').should(($element) => {
      expect($element).to.contain('British Columbia');
    });

    cy.get('.font-weight-bold').should(($element) => {
      const text = $element.text();
      expect(text).to.include('Corporations');
    })

    cy.get(this.benefitCompanyBtn).should('be.visible').click();
    cy.get(this.benefitNumCompany).click({ force: true })
    cy.get(this.incorpNow).should('be.visible').click()
  }

  assertNumberedCompany() {
    cy.wait(10000)
    cy.get(this.companyType).contains(benefitCompanyData.firmRegDetails.regType)
  }

  startNumCompanyReg() {
    cy.get(this.incorporateANumberedCompanyButton).click({ force: true })
  }

  surveyDialog() {
    cy.get('div.v-card').then(($dialog) => {
      // Check if the dialog is present
      if ($dialog.length > 0) {
        // Dialog is present, select "Not Right Now"
        cy.get('#dialog-no-button').click();
      } else {
        cy.log('No Survey Dialog')
      }
    })
  }

  getRandomName() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let name = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      name += alphabet.charAt(randomIndex);
    }

    return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
  }

  fillNamesTranslation() {
    cy.get(this.nameTranslationCheckbox).click({ force: true })
    cy.get(this.namesTranslationButton).should('be.visible').click({ force: true })
    cy.get(this.inputNameTranslation).clear().type(this.getRandomName())
    cy.get(this.doneButton).scrollIntoView().click({ force: true })
  }

  fillOfficeAddress() {
    cy.get(this.mailingStreetAddress)
  .type(benefitCompanyData.firmRegDetails.mailingaddress.streetaddress, { delay: 100 })
  .then(() => {
    cy.get(this.canadaPostCheck).click();
  });
    cy.get(this.checkboxDefineCompanySameAsMailing).click({ force: true })
  }

  fillRecordsOffice() {
    cy.get(this.recordsOfficeCheckBox).click({ force: true })
    cy.get(this.recordsMailingStreetAddress).eq(1).type(benefitCompanyData.firmRegDetails.mailingaddressRecords.streetaddress, { delay: 100 })
    cy.get(this.canadaPostCheck).click({ force: true })
  }

  fillRegisterContactInfo() {
    cy.get(this.emailAdd).type(benefitCompanyData.firmRegDetails.email)
    cy.get(this.emailAddConfirm).type(benefitCompanyData.firmRegDetails.confirmEmail)
    cy.get(this.phoneNum).type(benefitCompanyData.firmRegDetails.phoneNum)
    cy.get(this.phoneNumExt).type(benefitCompanyData.firmRegDetails.phoneNumExt)
  }

  fillFolioNumber() {
    cy.get(this.folioNum).type(benefitCompanyData.firmRegDetails.folioNum)
  }

  moveToNextPage() {
    cy.get(this.addPeopleAndRoles).click({ force: true })
  }

  fillCompletingParty() {
    cy.get(this.addCompletingParty).eq(0).click({ force: true })
    cy.get(this.completingPartyFName).should('have.value', benefitCompanyData.firmRegDetails.completingPartyFName)
    cy.get(this.completingPartyLName).should('have.value', benefitCompanyData.firmRegDetails.completingPartyLName)
    cy.get(this.completingPartyDone).click({ force: true }).click({ force: true })
  }

  fillDirectorInfo() {
    cy.get(this.addDirector).click({ force: true })
    cy.get(this.directorFName).type(benefitCompanyData.firmRegDetails.directorInfo.FName)
    cy.get(this.directorMName).type(benefitCompanyData.firmRegDetails.directorInfo.MName)
    cy.get(this.directorLName).type(benefitCompanyData.firmRegDetails.directorInfo.LName)
    cy.get(this.directorChkBx).click({ force: true })
    cy.get(this.dirMailingAdd).eq(2).type(benefitCompanyData.firmRegDetails.directorInfo.streetaddress, { delay: 200 })
    cy.get(this.canadaPostCheck).eq(0).click({ force: true })
    cy.get(this.dirDeliveryAdd).eq(3).type(benefitCompanyData.firmRegDetails.directorInfo.deliveryStreetAddress,{ delay: 200 })
    cy.get(this.canadaPostCheck).eq(0).click({ force: true })
    cy.wait(500)
    cy.get(this.completingPartyDone).click({ force: true })
  }

  fillIncorpInfo() {
    cy.get(this.addIncorp).click({ force: true })
    cy.get(this.corpLegalName).type(benefitCompanyData.firmRegDetails.Incorporation.legalName)
    cy.get(this.dirMailingAdd).eq(2).type(benefitCompanyData.firmRegDetails.Incorporation.streetaddress)
    cy.get(this.canadaPostCheck).eq(0).click({ force: true })
    cy.wait(500)
    cy.get(this.completingPartyDone).click({ force: true }).click({ force: true })
  }

  getRandomString() {
    let anySize = 8;
    let charset = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < anySize; i++)
      result += charset[Math.floor(Math.random() * charset.length)];
    return result;
  }

  fillShareStructure() {
    cy.get(this.buttonAddShareClass).click({ force: true })
    cy.get(this.shareClassName).clear().type('S Class ' + this.getRandomString())
    cy.get(this.maxNumOfShares).clear().type(benefitCompanyData.firmRegDetails.noOfShares)
    cy.get(this.parValueOfShare).clear().type(benefitCompanyData.firmRegDetails.priceOfShare)
    cy.get(this.specialRightsCheckbox).click({ force: true })
    cy.get(this.doneButtonShareClass).scrollIntoView().click({ force: true })
  }

  fillShareSeries() {
    cy.get(this.shareChevron).click({ force: true })
    cy.get(this.shareSeriesBtn).click({ force: true })
    cy.get(this.seriesName).type(benefitCompanyData.firmRegDetails.seriesName)
    cy.get(this.maxNumOfShares).clear().type(benefitCompanyData.firmRegDetails.priceOfShareSeries)
    cy.get(this.doneButtonShareClass).scrollIntoView().click({ force: true })
  }

  fillIncorporationAgreementForm() {
    cy.get(this.confirmIncorporationSampleAgreementOption).click({ force: true });
  }

  verifyAllStepsAreSavedAndResumed() {
    cy.get(this.saveAndResume).click({ forec: true })
    cy.get(this.resumeDraft).click({ force: true })
    cy.get('div.v-card').then(($dialog) => {
      // Check if the dialog is present
      if ($dialog.length > 0) {
        // Dialog is present, select "Not Right Now"
        cy.get('#dialog-no-button').click();
      } else {
        cy.log('No Survey Dialog')
      }
    })
    cy.get(this.stepIndicator).eq(0).should('be.visible')//this check says that all the entered values are stored by showing the click
    cy.get(this.stepIndicator).eq(1).should('be.visible')
    cy.get(this.stepIndicator).eq(2).should('be.visible')
    cy.get(this.stepIndicator).eq(3).should('be.visible')
  }

  clickCertifyAndEnterCourtOrder() {
    cy.get(this.reviewAndConfirm).click({ force: true })
    cy.get(this.certify).click({ force: true })
    //cy.get(this.courtOder).type(benefitCompanyData.firmRegDetails.courtOrder)
    //cy.get(this.courtOderCheckBox).click({ force: true })
  }

  verifyPADPayment() {
    cy.get(this.fileAndPay).click({ force: true }, { delay: 100})
  }

  selectLimitedCompany() {
    cy.get('.copy-small').should(($element) => {
      expect($element).to.contain('British Columbia');
    });

    cy.get('.font-weight-bold').should(($element) => {
      const text = $element.text();
      expect(text).to.include('Corporations');
    })

    cy.get(this.limitedCompanyButton).should('be.visible').click();
    cy.get(this.benefitNumCompany).click({ force: true })
    cy.get(this.incorpNow).should('be.visible').click()
  }

  clickConsentToContinueOut() {
    cy.get(this.cco).should('be.visible')
    cy.get(this.cco).click({ force: true })
  }

  startConnsentToContinueOut() {
    cy, get(this.ccoHeader).contains(ccoData.headerName)
    cy.get(this.ccoJurisdiction).click({ forrce: true })
    cy.get(this.ccoJurisdictionCountry)
      .contains('India')
      .click()
    cy.get(this.ccoJurisdiction).should('have.value', 'India')
    cy.get(this.ccoBusinessContact).contains(ccoData.businessesEmail)
    cy.get(this.ccoOptionalEmail).type(ccoData.OptionalEmail)
    cy.get(this.ccoCerttifyField).click({ force: true })
  }

  verifyFeeSummaryCco() {
    cy.get(this.feeSummaryHeader).should('contain', 'Fee Summary')
    cy.get(this.feeSummaryListName).eq(0).should('contain', '6 Months Consent to Continue Out')
    cy.get(this.feeSummaryValueName).eq(0).should('contain', '$350.00')
    cy.get(this.feeSummaryListName).eq(1).should('contain', 'Service Fee')
    cy.get(this.feeSummaryValueName).eq(1).should('contain', '$1.50')
    cy.get(this.feeTotal).should('contain', 'Total Fees')
    cy.get(this.feeValue).should('contain', '$351.50')
  }

  verifyFilingHistoryHeaderCCO() {
    cy.get(this.filingHistoryList).eq(0).contains(ccoData.headerName)
  }

  verifyTheFilingIsCompleteAndDocuments() {
    cy.reload()
    cy.get(this.viewDocuments).eq(0).click({ force: true })
    cy.get('div.documents-list button').each(($button) => {
      cy.wrap($button).click({ force: true });
    });
  }

  clickAgmExtenssion() {
    cy.get(this.agmExtensionBtn).click({ force: true })
    cy, get(this.agmExtensionHeader).contains(agmExtData.agmExtHeader)
  }

  verifyAgmExtHideButton() {
    cy.get(this.helpButton).click({ force: true })
  }

  enterAndVerifyExtensionDetails() {
    cy.get(this.inGoodStanding).should('contain', 'Yes')
    cy.get(this.agmExtRadioBtn).within(() => {
      cy.get('input[type="radio"][value="false"]').check({ force: true });
    })
    cy.get(this.agmExtYear).type(agmExtData.agmYear)
    cy.get(this.agmDateExt).not('.v-btn--disabled').last().click()
    cy.get(this.agmDateDone).click({ force: true })
    cy.get(this.preAgmYear).within(() => {
      cy.get('input[type="radio"][value="false"]').check({ force: true })
    })
    cy.get(this.ccoCerttifyField).click({force:true})
  }

  clickAGMLocationChange(){
    cy.get(this.agmLocChangeBtn).click({force:true})
  }
  startAGMLocChange(){
    cy.contains('AGM Location Change')
    cy.get(this.agmExtYear).type(agmExtData.agmYear)
    cy.get(this.agmLocDetailField ).type(agmExtData.detailText)
    cy.get(this.agmLocation).type(agmExtData.agmLocation)
    cy.get(this.certifyChkBx).check({ force: true })
    cy.get(thus.agmFileAndPay).click({forrec:true})
  }

  selectulcCompany() {
    cy.get('.copy-small').should(($element) => {
      expect($element).to.contain('British Columbia');
    });

    cy.get('.font-weight-bold').should(($element) => {
      const text = $element.text();
      expect(text).to.include('Corporations');
    })

    cy.get(this.ulcCompanyButton).should('be.visible').click();
    cy.get(this.benefitNumCompany).click({ force: true })
    cy.get(this.incorpNow).should('be.visible').click()
  }

  selectcccCompany() {
    cy.get('.copy-small').should(($element) => {
      expect($element).to.contain('British Columbia');
    });

    cy.get('.font-weight-bold').should(($element) => {
      const text = $element.text();
      expect(text).to.include('Corporations');
    })

    cy.get(this.cccCompanyBtn).should('be.visible').click();
    cy.get(this.benefitNumCompany).click({ force: true })
    cy.get(this.incorpNow).should('be.visible').click()
  }

  fillDirector1() {
    cy.get(this.addDirector).click({ force: true })
    cy.get(this.directorFName).type(benefitCompanyData.firmRegDetails.directorInfo1.FName)
    cy.get(this.directorMName).type(benefitCompanyData.firmRegDetails.directorInfo1.MName)
    cy.get(this.directorLName).type(benefitCompanyData.firmRegDetails.directorInfo1.LName)
    cy.get(this.directorChkBx).click({ force: true })
    cy.get(this.dirMailingAdd).eq(2).type(benefitCompanyData.firmRegDetails.directorInfo1.streetaddress, { delay: 200 })
    cy.get(this.canadaPostCheck).eq(0).click({ force: true })
    cy.get(this.dirDeliveryAdd).eq(3).type(benefitCompanyData.firmRegDetails.directorInfo1.deliveryStreetAddress,{ delay: 200 })
    cy.get(this.canadaPostCheck).eq(0).click({ force: true })
    cy.wait(500)
    cy.get(this.completingPartyDone).click({ force: true })
  }

  fillDirector2() {
    cy.get(this.addDirector).click({ force: true })
    cy.get(this.directorFName).type(benefitCompanyData.firmRegDetails.directorInfo2.FName)
    cy.get(this.directorMName).type(benefitCompanyData.firmRegDetails.directorInfo2.MName)
    cy.get(this.directorLName).type(benefitCompanyData.firmRegDetails.directorInfo2.LName)
    cy.get(this.directorChkBx).click({ force: true })
    cy.get(this.dirMailingAdd).eq(2).type(benefitCompanyData.firmRegDetails.directorInfo2.streetaddress, { delay: 200 })
    cy.get(this.canadaPostCheck).eq(0).click({ force: true })
    cy.get(this.dirDeliveryAdd).eq(3).type(benefitCompanyData.firmRegDetails.directorInfo2.deliveryStreetAddress,{ delay: 200 })
    cy.get(this.canadaPostCheck).eq(0).click({ force: true })
    cy.wait(500)
    cy.get(this.completingPartyDone).click({ force: true })
  }

}

export const corpCompany = new CorpCompany()