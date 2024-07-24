import React from 'react';

interface DateLabelProps {
  date: string;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DateLabel: React.FC<DateLabelProps> = ({ date }) => {
  const year = date.slice(0, 4);
  const month = months[Number(date.slice(5, 7)) - 1];
  const day = date.slice(8, 10);

  return (
    <h6 className="h6">
      {`${day} ${month} ${year}`}
    </h6>
  );
};

export default DateLabel;
