import { currencyFormat } from '../currency.helper';

describe('Currency helper', () => {
  it('should format value with default options', () => {
    expect(currencyFormat(0.12312)).toEqual('R$ 0,12');
    expect(currencyFormat(21.33555)).toEqual('R$ 21,34');
    expect(currencyFormat(10000)).toEqual('R$ 10.000,00');
  });

  it('should format value with provide options', () => {
    const formattedValue = currencyFormat(24.5, 'EUR', 'en');
    expect(formattedValue).toEqual('€24.50');
  });
});
