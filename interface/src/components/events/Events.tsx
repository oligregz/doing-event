import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import Dialog from "../dialog/Dialog";
import trashImg from "../../../assets/excluir.png";
import {
  createEventService,
  deleteEventService,
  listEventsService,
  updateEventService,
} from "./events.service"; // Importando o serviço
import { useNavigate } from "react-router-dom"; // Para redirecionar o usuário

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
  const [eventToBeEdited, setEventToBeEdited] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>(""); // Estado para o token de autenticação
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para a mensagem de erro
  const navigate = useNavigate(); // Hook para redirecionamento

  // Verifica se o token existe no localStorage ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem("token"); // Busca o token no localStorage

    if (!token) {
      // Se o token não existir, redireciona para a tela de login
      navigate("/");
    } else {
      // Se o token existir, define no estado
      setAuthToken(token);
    }
  }, [navigate]);

  useEffect(() => {
    if (authToken) {
      loadEvents();
    }
  }, [authToken]);

  const loadEvents = async () => {
    try {
      const events = await listEventsService(authToken);
      if (Array.isArray(events)) {
        setEvents(events);
      } else {
        setErrorMessage("Failed to load events.");
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error loading events:", error);
      setErrorMessage("Failed to load events. Please try again.");
      setIsDialogOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      description,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };

    try {
      const createdEvent = await createEventService(eventData, authToken);
      console.log("Event created:", createdEvent);

      // Verifica se o evento criado possui a chave 'id'
      if (createdEvent && createdEvent.id) {
        // Atualiza a lista de eventos com o novo evento
        setEvents([...events, createdEvent]);

        // Limpa o formulário
        setDescription("");
        setStartDate(new Date());
        setEndDate(new Date());
      } else {
        // Se não tiver a chave 'id', exibe o diálogo com a mensagem de erro
        setErrorMessage(JSON.stringify(createdEvent));
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setErrorMessage("Failed to create event. Please try again.");
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setEventToBeDeleted(event);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (eventToBeDeleted) {
      try {
        const response = await deleteEventService(
          eventToBeDeleted.id,
          authToken
        );

        if (response && response.message) {
          // Se houver uma mensagem de erro, exibe o diálogo de erro
          setErrorMessage(response.message);
          setIsDialogOpen(true);
        } else {
          // Se a exclusão for bem-sucedida, atualiza a lista de eventos
          await loadEvents();
          setIsDialogOpen(false);
          setEventToBeDeleted(null);
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        setErrorMessage("Failed to delete event. Please try again.");
        setIsDialogOpen(true);
      }
    }
  };

  const handleEditClick = (event: Event) => {
    setEventToBeEdited(event);
    setStartDate(new Date(event.startDate));
    setEndDate(new Date(event.endDate));
    setDescription(event.description);
    setIsEditing(true);
    setIsChanged(false);
  };

  const handleUpdate = async () => {
    if (eventToBeEdited) {
      const updatedEventData = {
        id: eventToBeEdited.id,
        description,
        startDate: startDate?.toISOString() || eventToBeEdited.startDate,
        endDate: endDate?.toISOString() || eventToBeEdited.endDate,
      };

      try {
        // Chama a função de atualização do serviço
        const updatedEvent = await updateEventService(
          updatedEventData,
          authToken
        );

        // Verifica se a atualização foi bem-sucedida
        if (updatedEvent && updatedEvent.id) {
          // Atualiza a lista de eventos com o novo evento
          const updatedEvents = events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          );
          setEvents(updatedEvents);

          // Exibe o diálogo com os novos dados do evento
          setErrorMessage(null);
          setIsDialogOpen(true);
          console.log("Event updated successfully:", updatedEvent);
        } else {
          // Se a atualização falhar, exibe a mensagem de erro
          setErrorMessage(updatedEvent || "Failed to update event.");
          setIsDialogOpen(true);
        }
      } catch (error) {
        console.error("Error updating event:", error);
        setErrorMessage("Failed to update event. Please try again.");
        setIsDialogOpen(true);
      } finally {
        // Fecha o modo de edição
        setIsEditing(false);
        setEventToBeEdited(null);
        setIsChanged(false);
      }
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setIsChanged(true);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    setIsChanged(true);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setIsChanged(true);
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
            onChange={handleStartDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="border p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">End Date & Time:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
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
            onChange={handleDescriptionChange}
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
            <tr
              key={event.id}
              className="text-center"
              onClick={() => handleEditClick(event)}
            >
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
                  onClick={(e) => handleDeleteClick(event, e)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  <img className="trash-png" src={trashImg} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        showCloseButton={true}
      >
        {eventToBeDeleted ? (
          <>
            <p className="text-lg font-medium">
              Event with cod.{" "}
              <strong>{eventToBeDeleted?.id.slice(0, 2)}</strong>
            </p>
            <button
              onClick={confirmDelete}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </>
        ) : errorMessage ? (
          <>
            <p className="text-lg font-medium">Error:</p>
            <p className="text-sm">{errorMessage}</p>
          </>
        ) : (
          <>
            <p className="text-lg font-medium">Event Updated Successfully!</p>
            <p className="text-sm">
              <strong>Description:</strong> {description}
            </p>
            <p className="text-sm">
              <strong>Start Date:</strong> {startDate?.toLocaleString()}
            </p>
            <p className="text-sm">
              <strong>End Date:</strong> {endDate?.toLocaleString()}
            </p>
          </>
        )}
      </Dialog>
      {/* Diálogo de edição */}
      {isEditing && (
        <Dialog
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          showCloseButton={true}
        >
          <p className="text-lg font-medium">
            Editing Event with id: <br />
            <strong>{eventToBeEdited?.id}</strong>
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Start Date & Time:</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                showTimeSelect
                dateFormat="Pp"
                className="border p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">End Date & Time:</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
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
                onChange={handleDescriptionChange}
                className="border p-2 rounded-md"
              />
            </div>

            <button
              onClick={handleUpdate}
              className={`mt-4 ${
                isChanged ? "bg-green-500" : "bg-gray-500"
              } text-white px-4 py-2 rounded-md hover:bg-green-600 transition`}
              disabled={!isChanged}
            >
              Update Event
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Events;
