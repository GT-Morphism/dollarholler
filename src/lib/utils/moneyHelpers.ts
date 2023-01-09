/**
 * Takes all line items and sums them
 * @param   {Array|undefined} lineItems
 * @returns {number}
 */
export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
	if (!lineItems) return 0;

	return lineItems.reduce((prevValue, curValue) => prevValue + curValue.amount, 0);
};

/**
 * Takes and return a dollar amount, formatted with commas and 2 decimal places
 * @param   {number} cents
 * @returns {string}
 */
export const centsToDollars = (cents: number): string => {
	const dollars = cents / 100;
	const addDecimals = twoDecimals(dollars);
	return addThousandsSeparator(addDecimals);
};

/**
 * Takes number and returns number (as string) with two decimals
 * @param   {number} myNum
 * @returns {string}
 */
export const twoDecimals = (myNum: number): string => {
	return myNum.toFixed(2);
};

/**
 * Adds thousands separator
 * @param   {string} myNum
 * @returns {string}
 */
export const addThousandsSeparator = (myNum: string): string => {
	return myNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Takes all invoices and returns total
 * @param   {Array|undefined} Invoice
 * @returns {number}
 */
export const sumInvoices = (invoices: Invoice[] | undefined): number => {
	if (!invoices) return 0;

	return invoices.reduce((prevValue, curValue) => {
		const invoiceSum = sumLineItems(curValue.lineItems);
		return invoiceSum + prevValue;
	}, 0);
};
