// Use proxy in development, direct URL in production
const API_BASE_URL =
  import.meta.env.DEV ? "/api" : "https://api-taskflow-iprh.onrender.com"

// API Task format (from backend)
interface ApiTask {
  id: number
  nombre: string
  descripcion: string
  fecha_limite: string
  prioridad: "Alta" | "Media" | "Baja"
  estado: "Pendiente" | "En proceso" | "Completada"
}

// Internal Task format (used in frontend)
import type { Task, Priority, Status } from "./types"

// Mapper: API -> Internal
function apiToTask(apiTask: ApiTask | Partial<ApiTask>): Task {
  if (!apiTask || apiTask.id === undefined) {
    throw new Error("Invalid API task response: missing id")
  }
  return {
    id: apiTask.id.toString(),
    title: apiTask.nombre || "",
    description: apiTask.descripcion || "",
    deadline: apiTask.fecha_limite || "",
    priority: apiTask.prioridad || "Media",
    status: apiTask.estado === "En proceso" ? "En Progreso" : (apiTask.estado || "Pendiente"),
    createdAt: new Date().toISOString(), // API doesn't provide this, using current date
  }
}

// Mapper: Internal -> API
function taskToApi(task: Omit<Task, "id" | "createdAt"> | Partial<Task>): Partial<ApiTask> {
  const apiTask: Partial<ApiTask> = {}
  if ("title" in task && task.title !== undefined) apiTask.nombre = task.title
  if ("description" in task && task.description !== undefined) apiTask.descripcion = task.description
  if ("deadline" in task && task.deadline !== undefined) apiTask.fecha_limite = task.deadline
  if ("priority" in task && task.priority !== undefined) apiTask.prioridad = task.priority
  if ("status" in task && task.status !== undefined) {
    apiTask.estado = task.status === "En Progreso" ? "En proceso" : task.status
  }
  return apiTask
}

// Helper to create complete API task (for POST)
function taskToApiComplete(task: Omit<Task, "id" | "createdAt">): Omit<ApiTask, "id"> {
  return {
    nombre: task.title,
    descripcion: task.description,
    fecha_limite: task.deadline,
    prioridad: task.priority,
    estado: task.status === "En Progreso" ? "En proceso" : task.status,
  }
}

// GET all tasks
export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tareas`)
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`)
  }
  const apiTasks: ApiTask[] = await response.json()
  return apiTasks.map(apiToTask)
}

// GET task by ID
export async function fetchTaskById(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tareas/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch task: ${response.statusText}`)
  }
  const apiTask: ApiTask = await response.json()
  return apiToTask(apiTask)
}

// POST create task
export async function createTask(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
  const apiTask = taskToApiComplete(task)
  const response = await fetch(`${API_BASE_URL}/tareas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiTask),
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to create task: ${response.statusText} - ${errorText}`)
  }
  
  // Handle empty responses
  const contentType = response.headers.get("content-type")
  let responseData: any = null
  
  try {
    const text = await response.text()
    console.log("POST /tareas response:", {
      status: response.status,
      statusText: response.statusText,
      contentType,
      text,
      headers: Object.fromEntries(response.headers.entries()),
    })
    
    if (text) {
      try {
        responseData = JSON.parse(text)
        console.log("Parsed response data:", responseData)
      } catch (e) {
        // Not JSON, might be empty or plain text
        console.warn("Response is not JSON:", text)
        // If response is just a number as string, try to parse it
        const numMatch = text.trim().match(/^\d+$/)
        if (numMatch) {
          responseData = parseInt(numMatch[0], 10)
          console.log("Extracted ID from text:", responseData)
        }
      }
    }
  } catch (e) {
    console.warn("Failed to read response:", e)
  }
  
  // Handle different response formats
  // Case 1: API returns full task object
  if (responseData && responseData.id !== undefined && responseData.nombre !== undefined) {
    console.log("Using full task object from response")
    return apiToTask(responseData as ApiTask)
  }
  
  // Case 2: API returns only ID (number or string), fetch the full task
  if (responseData !== null && responseData !== undefined) {
    let taskId: string | null = null
    
    if (typeof responseData === "number") {
      taskId = responseData.toString()
    } else if (typeof responseData === "string" && /^\d+$/.test(responseData)) {
      taskId = responseData
    } else if (responseData && typeof responseData === "object" && responseData.id) {
      taskId = responseData.id.toString()
    }
    
    if (taskId) {
      console.log("Fetching task by ID:", taskId)
      try {
        return await fetchTaskById(taskId)
      } catch (e) {
        console.error("Failed to fetch task by ID:", e)
      }
    }
  }
  
  // Case 3: API returns empty or different format, try to get the task from Location header
  const location = response.headers.get("Location")
  if (location) {
    const taskId = location.split("/").pop()
    if (taskId) {
      console.log("Using Location header, fetching task:", taskId)
      try {
        return await fetchTaskById(taskId)
      } catch (e) {
        console.error("Failed to fetch task from Location:", e)
      }
    }
  }
  
  // Case 4: If status is 201 Created, try to get the last created task by fetching all
  if (response.status === 201) {
    console.log("Status 201, attempting to get latest task")
    try {
      const allTasks = await fetchTasks()
      if (allTasks.length > 0) {
        // Return the last task (assuming it's the newly created one)
        const latestTask = allTasks[allTasks.length - 1]
        console.log("Using latest task from list:", latestTask)
        return latestTask
      }
    } catch (e) {
      console.error("Failed to fetch all tasks:", e)
    }
  }
  
  // Fallback: If we can't get the task, refresh the list and return a placeholder
  // The context will refresh anyway, so this is just to satisfy the return type
  console.error("Could not determine created task, all methods failed")
  throw new Error("API did not return a valid task or ID after creation. Please refresh the page.")
}

// PUT update task
export async function updateTask(id: string, task: Partial<Task>): Promise<Task> {
  const apiTask = taskToApi(task)
  const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiTask),
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to update task: ${response.statusText} - ${errorText}`)
  }
  
  // Handle empty responses
  const contentType = response.headers.get("content-type")
  let responseData: any = null
  
  try {
    const text = await response.text()
    if (text && contentType && contentType.includes("application/json")) {
      responseData = JSON.parse(text)
    } else if (text) {
      // Try to parse as JSON even if content-type is missing
      try {
        responseData = JSON.parse(text)
      } catch (e) {
        // Not JSON, might be empty or plain text
        console.warn("Response is not JSON:", text)
      }
    }
  } catch (e) {
    console.warn("Failed to read response:", e)
  }
  
  // Handle different response formats
  // Case 1: API returns full task object
  if (responseData && responseData.id !== undefined && responseData.nombre !== undefined) {
    return apiToTask(responseData as ApiTask)
  }
  
  // Case 2: API returns only ID or confirmation, fetch the full task
  if (responseData && (typeof responseData === "number" || responseData.id)) {
    const taskId = typeof responseData === "number" ? responseData.toString() : responseData.id.toString()
    return await fetchTaskById(taskId)
  }
  
  // Case 3: API returns empty/confirmation, fetch the updated task using the original id
  return await fetchTaskById(id)
}

// DELETE task
export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.statusText}`)
  }
}

