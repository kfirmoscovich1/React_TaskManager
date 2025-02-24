import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, where, getDoc } from "firebase/firestore";
import { firestore, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const getCurrentUserId = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
};

const isUserExists = async (userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnapshot = await getDoc(userRef);

    return userSnapshot.exists();
  } catch (error) {
    console.error(`Error checking user existence for ID ${userId}:`, error);
    return false;
  }
};

export async function addTask({ title, assignedTo, description, dueDate, priority, status = "To Do", createdDate }) {
  try {
    const userId = await getCurrentUserId(); 
    const tasksCollection = collection(firestore, "tasks");

    const formattedDueDate = dueDate && !isNaN(new Date(dueDate).getTime())
      ? new Date(dueDate)
      : null;

    const formattedCreatedDate = createdDate && !isNaN(new Date(createdDate).getTime())
      ? new Date(createdDate)
      : serverTimestamp();

    console.log("Adding task with data:", {
      title,
      assignedTo,
      description,
      dueDate: formattedDueDate,
      createdDate: formattedCreatedDate,
      priority,
      status,
      userId
    });

    const docRef = await addDoc(tasksCollection, {
      title,
      assignedTo,
      description,
      dueDate: formattedDueDate,
      createdDate: formattedCreatedDate,
      priority,
      status,
      userId,
      createdAt: serverTimestamp()
    });

    console.log("Task added successfully with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

export const getAllTasks = async () => {
  try {
    const userId = await getCurrentUserId();

    if (!(await isUserExists(userId))) {
      console.error("User does not exist in the 'users' collection.");
      return [];
    }

    const tasksCollection = collection(firestore, "tasks");
    const q = query(tasksCollection, where("userId", "==", userId));
    const tasksSnapshot = await getDocs(q);

    const allTasks = tasksSnapshot.docs.map((taskDoc) => {
      const data = taskDoc.data();
      return {
        id: taskDoc.id,
        ...data,
        dueDate: data.dueDate
          ? new Date(data.dueDate.seconds * 1000).toLocaleDateString("en-GB")
          : null,
      };
    });

    return allTasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const updateTask = async (taskId, updatedData) => {
  try {
    const userId = await getCurrentUserId();

    if (!(await isUserExists(userId))) {
      console.error("User does not exist in the 'users' collection.");
      return;
    }

    const taskRef = doc(firestore, "tasks", taskId);
    const taskSnapshot = await getDoc(taskRef);

    if (taskSnapshot.exists() && taskSnapshot.data().userId === userId) {
      await updateDoc(taskRef, updatedData);
      console.log(`Task with ID: ${taskId} updated successfully`);
    } else {
      console.error(`Unauthorized to update task with ID: ${taskId}`);
    }
  } catch (error) {
    console.error(`Error updating task with ID: ${taskId}`, error);
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const userId = await getCurrentUserId();

    if (!(await isUserExists(userId))) {
      console.error("User does not exist in the 'users' collection.");
      return;
    }

    const taskRef = doc(firestore, "tasks", taskId);
    const taskSnapshot = await getDoc(taskRef);

    if (taskSnapshot.exists() && taskSnapshot.data().userId === userId) {
      await updateDoc(taskRef, { status });
      console.log(`Task status updated to '${status}' for ID: ${taskId}`);
    } else {
      console.error(`Unauthorized to update status for task ID: ${taskId}`);
    }
  } catch (error) {
    console.error(`Error updating status for task ID: ${taskId}`, error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const userId = await getCurrentUserId();

    if (!(await isUserExists(userId))) {
      console.error("User does not exist in the 'users' collection.");
      return;
    }

    const taskRef = doc(firestore, "tasks", taskId);
    const taskSnapshot = await getDoc(taskRef);

    if (taskSnapshot.exists() && taskSnapshot.data().userId === userId) {
      await deleteDoc(taskRef);
      console.log(`Task with ID: ${taskId} deleted successfully`);
    } else {
      console.error(`Unauthorized to delete task with ID: ${taskId}`);
    }
  } catch (error) {
    console.error(`Error deleting task with ID: ${taskId}`, error);
  }
};