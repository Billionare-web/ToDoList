"use client";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

export default function Todo() {
  const [tasks, setTasks] = useState<{ id: string; text: string }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const tasksCollection = collection(db, "tasks");

  // Ma'lumotlarni yuklash
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getDocs(tasksCollection);
      setTasks(data.docs.map((doc) => ({ id: doc.id, text: doc.data().text })));
    };
    fetchTasks();
  }, []);

  // Vazifa qo‘shish
  const addTask = async () => {
    if (!newTask.trim()) return;
    const docRef = await addDoc(tasksCollection, { text: newTask });
    setTasks([...tasks, { id: docRef.id, text: newTask }]);
    setNewTask("");
  };

  // Vazifani o‘chirish
  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Tahrirlashni boshlash
  const startEdit = (task: { id: string; text: string }) => {
    setEditingTask(task);
    setNewTask(task.text);
  };

  // Vazifani saqlash
  const saveEdit = async () => {
    if (!editingTask || !newTask.trim()) return;
    await updateDoc(doc(db, "tasks", editingTask.id), { text: newTask });
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, text: newTask } : task
      )
    );
    setEditingTask(null);
    setNewTask("");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-black shadow-md rounded-lg mt-40">
      <h2 className="text-xl font-bold mb-4">To-Do List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Yangi vazifa..."
        />
        <button
          onClick={editingTask ? saveEdit : addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTask ? "Saqlash" : "Qo‘shish"}
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span>{task.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(task)}
                className="text-yellow-500"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-white"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
