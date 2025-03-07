import {defineStore} from 'pinia';
import api from "@/services/api";
import axios from "axios";
interface FilePayload {
  folderId?: string | null;
}
interface FilePayload {
  folderId?: string | null;
  isMenu: boolean | null;
}

interface FileResponse {
  status: string;
  data: never;
}
export const useFileStore = defineStore('files', {
  state: () => ({
    currentFolderId: "" as string,
    fileList: [],
    folderList: [],
    folderListMenu: [],
    isLoading: false as boolean,
    isLoadingFolder: false as boolean,
    isGridView: false as boolean,
  }),

  actions: {
    async getFilesByFolderId({folderId}: FilePayload): Promise<{ success: boolean; message?: string }> {
      this.isLoading = true;
      try {
        const response = await api.post<FileResponse>('/file/list', {folderId});
        const responseData: FileResponse = response.data;

        if (responseData.status === 'success') {
          this.fileList = responseData.data;
          return {success: true};
        } else {
          return {success: false, message: 'Invalid login response'};
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Login failed:', error.response?.data || error.message);
          return {success: false, message: error.response?.data?.message || 'Login failed'};
        } else {
          console.error('Unexpected error:', error);
          return {success: false, message: 'An unexpected error occurred'};
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getFolder({folderId, isMenu}: FilePayload): Promise<{ success: boolean; message?: string }> {
      this.isLoadingFolder = true;
      try {
        const response = await api.get<FileResponse>(`/folder/${folderId ? folderId : ''}`);
        const responseData: FileResponse = response.data;

        if (responseData.status === 'success') {
          if (isMenu) {
            this.folderListMenu = responseData.data;
          } else  {
            this.folderList = responseData.data;
          }
          return {success: true};
        } else {
          return {success: false, message: 'Invalid login response'};
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Login failed:', error.response?.data || error.message);
          return {success: false, message: error.response?.data?.message || 'Login failed'};
        } else {
          console.error('Unexpected error:', error);
          return {success: false, message: 'An unexpected error occurred'};
        }
      } finally {
        this.isLoadingFolder = false;
      }
    }
  },
});
