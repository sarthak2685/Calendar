import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek,endOfWeek, addDays, subMonths, addMonths, isSameDay, isSameMonth } from 'date-fns';
import { Link } from 'react-router-dom';

function CalendarView({ events }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;
  
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-xl font-bold">&lt;</button>
        <h2 className="text-2xl font-bold">{format(currentMonth, dateFormat)}</h2>
        <button onClick={nextMonth} className="text-xl font-bold">&gt;</button>
      </div>
    );
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const formattedDate = format(day, "d");
          const cloneDay = day;
          return (
            <div
              key={day}
              className={`justify-center items-center flex p-2 h-20 ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""} ${
                isSameDay(day, new Date()) ? "bg-blue-500 text-white rounded" : ""
              }`}
            >
              <div className="text-center mb-1">{formattedDate}</div>
              {events
                .filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(cloneDay, 'yyyy-MM-dd'))
                .map(event => (
                  <Link
                    to={`/event/${event.id}`}
                    key={event.id}
                    className="block bg-blue-200 text-xs rounded p-1 mt-1"
                  >
                    {event.title}
                  </Link>
                ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className='flex items-center justify-center'>
      <Link to="/add" className="items-center justify-center bg-green-500 text-white p-2 rounded mt-4">Add Event</Link>
      </div>
    </div>
  );
}

export default CalendarView;
