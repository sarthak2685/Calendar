import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetails({ events, deleteEvent }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(event => event.id === parseInt(id));

  if (!event) {
    return <div>Event not found.</div>;
  }

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate('/');
  };

  return (
    <div className="p-4 bg-white rounded">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p className="mb-2"><strong>Date:</strong> {event.date}</p>
      <p className="mb-2"><strong>Category:</strong> {event.category}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete Event</button>
      <button onClick={() => navigate(`/edit/${event.id}`)} className="bg-blue-500 text-white p-2 rounded ml-2">Edit Event</button>
    </div>
  );
}

export default EventDetails;
