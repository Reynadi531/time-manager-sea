import { invoke } from "@tauri-apps/api/core";

// Types
export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  position: number;
  priority: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

// Task API
export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    return await invoke("get_all_tasks");
  },

  getById: async (id: number): Promise<Task> => {
    return await invoke("get_task_by_id", { id });
  },

  create: async (
    title: string,
    status: string,
    priority?: string,
    dueDate?: string,
    description?: string
  ): Promise<Task> => {
    return await invoke("create_task", {
      request: {
        title,
        status,
        description: description || null,
        priority: priority || null,
        due_date: dueDate || null,
      },
    });
  },

  update: async (
    id: number,
    updates: {
      title?: string;
      description?: string;
      position?: number;
      priority?: string;
      dueDate?: string;
    }
  ): Promise<Task> => {
    return await invoke("update_task", {
      id,
      request: {
        title: updates.title || null,
        description: updates.description || null,
        position: updates.position || null,
        priority: updates.priority || null,
        due_date: updates.dueDate || null,
      },
    });
  },

  updateStatus: async (id: number, status: string): Promise<Task> => {
    return await invoke("update_task_status", { id, status });
  },

  delete: async (id: number): Promise<void> => {
    return await invoke("delete_task", { id });
  },
};
