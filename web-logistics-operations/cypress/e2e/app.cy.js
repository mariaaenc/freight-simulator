const freightSimulationsMock = [
  {
    name: 'Operador 1',
    deliveryTime: 1,
    totalCost: 'R$ 9,60',
    fastestDelivery: true,
    lowestCost: true,
  },
  {
    name: 'Operador 2',
    deliveryTime: 1,
    totalCost: 'R$ 10,80',
    fastestDelivery: false,
    lowestCost: false,
  },
];

describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  afterEach(() => cy.logout());
  describe('Login and Logout', () => {
    it('should render login page correctly', () => {
      cy.logout()
      cy.get('.MuiTypography-h4').should('have.text', 'Bem vindo(a)!');
      cy.get('.MuiButtonBase-root').should('have.text', 'Login com o Google');
    });
  
    it('should make login and redirect to freight simulator', () => {
      cy.get('.MuiButtonBase-root').click();
      cy.login();
      cy.get('h1').should('exist');
      cy.get('h1').should('have.text', 'Simulador de Frete');
    });
  
    it('should logout and redirect to login page', () => {
      const logoutButton = '.App-header > .MuiButtonBase-root'
      cy.login();
      cy.get('h1').should('have.text', 'Simulador de Frete');
      cy.get(logoutButton).should('be.enabled')
      cy.get(logoutButton).click();
      cy.get('h1').should('not.exist');
      cy.get('.MuiTypography-h4').should('have.text', 'Bem vindo(a)!');
    });
  });

  describe('Freight Simulator', () => {
    const routeToIntercept = 'https://api-freight-simulator-b7aa6dc01480.herokuapp.com/freight-simulation'
    const calculateButton = '.MuiBox-root button'
    const originZipCodeInput = '#originZipCode'
    const destinationZipCodeInput = '#destinationZipCode'
    const widthInput = '#width'
    const heightInput = '#height'
    const lengthInput = '#length'

    it('should simulate freight with success and load options', () => {
      cy.intercept('POST', routeToIntercept, freightSimulationsMock).as('freightSimulation')

      cy.login();

      cy.get('h1').should('have.text', 'Simulador de Frete');
      cy.get(originZipCodeInput).should('have.exist')
      cy.get(destinationZipCodeInput).should('have.exist')
      cy.get(widthInput).should('have.exist')
      cy.get(heightInput).should('have.exist')
      cy.get(lengthInput).should('have.exist')
      cy.get('.MuiBox-root').should('have.text',
        'CEP de origem *CEP de origem *CEP de destino *CEP de destino *Altura *Altura *Largura *Largura *Comprimento *Comprimento *Calcular'
      )
      cy.get(calculateButton).should('have.exist')
      cy.get(calculateButton).should('have.text', 'Calcular')
      cy.get(calculateButton).should('be.disabled')

      cy.get(originZipCodeInput).type('89222520')
      cy.get(destinationZipCodeInput).type('89245000')
      cy.get(widthInput).type('10')
      cy.get(heightInput).type('20')
      cy.get(lengthInput).type('30')

      cy.get(calculateButton).should('be.enabled')

      cy.get(calculateButton).click()
      
      cy.wait('@freightSimulation').its('request.body')
      .should(
        'deep.eq',
        {
          customerId: Cypress.env('TEST_UID'),
          originZipCode: '89222520',
          destinationZipCode: '89245000',
          height: 20,
          width: 10,
          length: 30
        }
      )

      cy.get('h2').should('have.text', 'Opções de Frete')

      cy.get('.Operator').should('have.exist')
      cy.get('.Operator > :nth-child(1)').should('have.text', 'Operador 1Tempo de entrega: 1Custo Total: R$ 9,60*Melhor tempo*Menor custo')
      cy.get('.Operator > :nth-child(2)').should('have.text', 'Operador 2Tempo de entrega: 1Custo Total: R$ 10,80')
    });

    it('should show error when simulate freight retun error', () => {
      cy.intercept('POST', routeToIntercept, { forceNetworkError: true }).as('freightSimulation')

      cy.login();

      cy.get(originZipCodeInput).type('89222520')
      cy.get(destinationZipCodeInput).type('89245000')
      cy.get(widthInput).type('10')
      cy.get(heightInput).type('20')
      cy.get(lengthInput).type('30')

      cy.get(calculateButton).click()
      
      cy.wait('@freightSimulation').should('have.property', 'error')

      cy.get('h2').should('not.exist')

      cy.get('.MuiPaper-root').should('have.text', 'Ocorreu um erro ao realizar a simulação, tente novamente mais tarde.')

      cy.get('.Operator').should('not.exist')
    });
  });
});
