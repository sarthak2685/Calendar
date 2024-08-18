import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EventForm({ addEvent, editEvent, events }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const existingEvent = events?.find(event => event.id === id) || {};
  const [title, setTitle] = useState(existingEvent.title || '');
  const [date, setDate] = useState(existingEvent.date || '');
  const [category, setCategory] = useState(existingEvent.category || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editEvent({ id, title, date, category });
    } else {
      addEvent({ id: Date.now(), title, date, category });
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded">
      <label className="block mb-2">Title</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full mb-4" required />

      <label className="block mb-2">Date</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 w-full mb-4" required />

      <label className="block mb-2">Category</label>
      <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 w-full mb-4" required>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Event</button>
    </form>
  );
}

export default EventForm;
