import { isBefore } from "date-fns";

/**
 * This takes yyyy-mm-dd and returns m-d-yyyy
 * @param   {string} myDate
 * @returns {string} m-d-yyyy
 */

export const convertDate = (myDate: string): string => {
	// break apart date
	const [year, month, day] = myDate.split("-");
	// return in correct format
	if (!day || !month) {
		return year || "No Due Date";
	}
	return `${parseInt(month)} / ${parseInt(day)} / ${year}`;
};

/**
 * Determine wheter particular date is before current date
 * @param   {string}  myDate
 * @returns {boolean} m-d-yyyy
 */

export const isLate = (myDate: string): boolean => {
	const [year, month, day] = myDate.split("-");
	if (!day || !month || !year) {
		return false;
	}
	const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
	const today = new Date();
	return isBefore(dueDate, today);
};
