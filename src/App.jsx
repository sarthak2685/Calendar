import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './components/CalendarView.jsx';
import EventForm from './components/EventForm.jsx';
import EventDetails from './components/EventDetails.jsx';

function App() {
  const [events, setEvents] = useState([]);
  const addEvent = (event) => setEvents([...events, event]);
  const editEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };
  const deleteEvent = (id) => setEvents(events.filter(event => event.id !== id));

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<CalendarView events={events} />} />
          <Route path="/add" element={<EventForm addEvent={addEvent} />} />
          <Route path="/edit/:id" element={<EventForm events={events} editEvent={editEvent} />} />
          <Route path="/event/:id" element={<EventDetails events={events} deleteEvent={deleteEvent} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
