import format from 'date-fns/format';

export const formatDate = (date: any, dateFormat?: 'd MMM yy') => format(new Date(date), dateFormat || 'd MMM yy');
