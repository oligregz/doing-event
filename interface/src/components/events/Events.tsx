import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import Dialog from "../dialog/Dialog";
import trashImg from "../../../assets/excluir.png";

type Event = {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
};

const Events = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [eventToBeDeleted, setEventToBeDeleted] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Simula uma requisição à API para buscar eventos
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: "A1B2C3D4E5",
        description: "Meeting with client",
        startDate: "2025-02-15T10:00:00",
        endDate: "2025-02-15T11:00:00",
      },
      {
        id: "F6G7H8I9J0",
        description: "Team brainstorming",
        startDate: "2025-02-16T14:00:00",
        endDate: "2025-02-16T16:00:00",
      },
      {
        id: "K1L2M3N4O5",
        description: "Product launch",
        startDate: "2025-02-18T09:00:00",
        endDate: "2025-02-18T12:00:00",
      },
      {
        id: "P6Q7R8S9T0",
        description: "Workshop",
        startDate: "2025-02-20T13:00:00",
        endDate: "2025-02-20T15:00:00",
      },
    ];

    setTimeout(() => {
      setEvents(mockEvents);
    }, 1000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ startDate, endDate, description });
  };

  const handleDeleteClick = (event: Event) => {
    setEventToBeDeleted(event);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (eventToBeDeleted) {
      console.log(`Deleting event with ID: ${eventToBeDeleted.id}`);
      // Aqui poderia ser feita a chamada para a API para deletar o evento
    }
    setIsDialogOpen(false);
    setEventToBeDeleted(null);
  };

  return (
    <div id="event-main" className="event-main p-4">
      <h2 className="text-xl font-semibold mb-2">Create Event</h2>

      {/* Formulário */}
      <form
        id="event-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label className="font-medium">Start Date & Time:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="border p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">End Date & Time:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="border p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Description:</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Create Event
        </button>
      </form>

      <table
        id="event-table"
        className="w-full mt-4 border-collapse border border-gray-300 table-fixed"
      >
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 w-12">
              <h2 className="text-xl font-semibold mt-6">Events</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.id} className="text-center">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">
                {event.id.slice(0, 2)}
              </td>
              <td className="border border-gray-300 p-2">
                {`${event.description.slice(0, 15)}...`}
              </td>
              <td className="border border-gray-300 p-2">
                {`Start - ${new Date(event.startDate)
                  .toLocaleString()
                  .slice(0, 15)}...`}
              </td>
              <td className="border border-gray-300 p-2">
                {`End - ${new Date(event.endDate)
                  .toLocaleString()
                  .slice(0, 15)}...`}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  id="trash-button"
                  onClick={() => handleDeleteClick(event)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  <img className="trash-png" src={trashImg} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Diálogo de confirmação */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        showCloseButton={true}
      >
        <p className="text-lg font-medium">
          Event with cod. <strong>{eventToBeDeleted?.id.slice(0, 2)}</strong>
        </p>
        <button
          onClick={confirmDelete}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </Dialog>
    </div>
  );
};

export default Events;
