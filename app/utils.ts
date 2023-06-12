type FormatType = 'time' | 'date' | 'datetime' | 'datetime-no-year';

const formatOptions: { [key in FormatType]: Intl.DateTimeFormatOptions } = {
  time: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  date: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  },
  datetime: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  'datetime-no-year': {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
};
export function formatDate(
  dateTimeString: string,
  format: FormatType,
  locale: string = 'de-DE',
): string {
  if (!dateTimeString || isNaN(Date.parse(dateTimeString))) {
    console.error('Invalid date string:', dateTimeString);
    return '';
  }
  const date = new Date(dateTimeString);

  switch (format) {
    case 'time':
      return new Intl.DateTimeFormat(locale, formatOptions[format]).format(
        date,
      );
    case 'date':
      return new Intl.DateTimeFormat(locale, formatOptions[format]).format(
        date,
      );
    case 'datetime':
      return `${new Intl.DateTimeFormat(locale, formatOptions['date']).format(
        date,
      )} ${new Intl.DateTimeFormat(locale, formatOptions['time']).format(
        date,
      )}`;
    case 'datetime-no-year':
      const dayAndMonth = new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
      }).format(date);
      const time = new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date);
      return `${dayAndMonth} ${time}`;
    default:
      return new Intl.DateTimeFormat(locale, formatOptions[format]).format(
        date,
      );
  }
}
