import { isAxiosError } from "axios";
import { apiProvider } from "../../services/api.provider";

const path = `event`;

export const createEventService = async (data: unknown, authToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const createdEvent = await apiProvider.post(path, data, { headers });

    return createdEvent.data;

  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      return error.response?.data?.message || "Error when trying to create event";
    }
  }
};

export const listEventsService = async (authToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const events = await apiProvider.get(path, { headers });

    return events.data;

  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      return error.response?.data?.message || "Error when trying to list events";
    }
  }
};

export const updateEventService = async (data: unknown, authToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const createdEvent = await apiProvider.put(path, data, { headers });

    return createdEvent.data;

  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      return error.response?.data?.message || "Error when trying to update event";
    }
  }
};

export const deleteEventService = async (eventId: string, authToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const removedEvent = await apiProvider.post(`${path}/${eventId}`, { headers });

    return removedEvent.data;

  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      return error.response?.data?.message || "Error when trying to delete event";
    }
  }
};