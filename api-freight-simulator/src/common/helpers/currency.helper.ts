export function currencyFormat(
  value: number | string,
  currency: string = 'BRL',
  locale: string = 'pt-BR',
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    })
      .format(Number(value))
      .replace(/\s+/, ' ');
  } catch (error) {
    console.error('Ocorreu um erro ao formatar o valor.', error);
    return value.toString();
  }
}
