<<<<<<< HEAD

export const fetchEvents = async () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
  
    const url = `https://byabbe.se/on-this-day/${month}/${day}/events.json`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return { events: data.events, date: { day, month } };
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
=======

export const fetchEvents = async () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
  
    const url = `https://byabbe.se/on-this-day/${month}/${day}/events.json`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return { events: data.events, date: { day, month } };
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
>>>>>>> b892819 (Initial commit)
  };