/* eslint-disable max-len */
import { endOfWeek, format, startOfWeek } from 'date-fns';

export const FORMAT_DATE_TIME = 'yyyy-MM-dd HH:mm:ss';
export const FORMAT_DATE_ONLY = 'yyyy-MM-dd';
export const FORMAT_TIME_ONLY = 'HH:mm';

/**
 * Main Data and Time conversion utility to keep formats the same across entire Application
 * @param {string|object} dateOrString - date to show as UTC string or Date object instance
 * @param {string} [dateFormat] - time conversion template in 'date-fns' format, `FORMAT_DATE_TIME` by default
 * @param {string} [fallbackValue] - optional fallback value if data conversion is not possible
 */
export function dateToString(dateOrString: string | Date, dateFormat = FORMAT_DATE_TIME, fallbackValue = ''): string {
  const date = typeof dateOrString === 'object' ? dateOrString : new Date(dateOrString);
  let result;
  try {
    result = format(date, dateFormat);
  } catch (error) {
    result = fallbackValue;
  }
  return result;
}

export function getDate(date: Date, dateFormat = FORMAT_DATE_ONLY, fallbackValue = ''): string {
  let result;
  try {
    result = format(date, dateFormat);
  } catch (error) {
    result = fallbackValue;
  }
  return result;
}

export function getTime(dateOrString: Date, dateFormat = FORMAT_TIME_ONLY, fallbackValue = ''): string {
  const date = typeof dateOrString === 'object' ? dateOrString : new Date(dateOrString);

  let result;
  try {
    result = format(date, dateFormat);
  } catch (error) {
    result = fallbackValue;
  }
  return result;
}

export function getAge(dateString: string) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

export function isoToString(isoDate: string) {
  return isoDate.split('-').reverse().join('/');
}

export const months = [
  {
    name: 'Janeiro',
    id: 1,
    lastDay: 31,
  },
  {
    name: 'Fevereiro',
    id: 2,
    lastDay: 28,
  },
  {
    name: 'Março',
    id: 3,
    lastDay: 31,
  },
  {
    name: 'Abril',
    id: 4,
    lastDay: 30,
  },
  {
    name: 'Maio',
    id: 5,
    lastDay: 31,
  },
  {
    name: 'Junho',
    id: 6,
    lastDay: 30,
  },
  {
    name: 'Julho',
    id: 7,
    lastDay: 30,
  },
  {
    name: 'Agosto',
    id: 8,
    lastDay: 31,
  },
  {
    name: 'Setembro',
    id: 9,
    lastDay: 30,
  },
  {
    name: 'Outubro',
    id: 10,
    lastDay: 31,
  },
  {
    name: 'Novembro',
    id: 11,
    lastDay: 30,
  },
  {
    name: 'Dezembro',
    id: 12,
    lastDay: 31,
  },
];

export function getWeekRange(year:number, month:number, weekNumber:number) {
  // Get the first day of the month
  const firstDayOfMonth = new Date(year, month - 1, 1);

  // Get the start date of the specified week
  const startDateOfWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });

  // Calculate the start date of the desired week
  const desiredStartDate = new Date(startDateOfWeek.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000);

  // Calculate the end date of the desired week
  const desiredEndDate = endOfWeek(desiredStartDate, { weekStartsOn: 0 });

  // Format the dates for display
  const formattedStartDate = format(desiredStartDate, 'yyyy-MM-dd');
  const formattedEndDate = format(desiredEndDate, 'yyyy-MM-dd');

  // Return the first and last dates of the desired week
  return {
    weekStartDate: formattedStartDate,
    weekEndDate: formattedEndDate,
  };
}
