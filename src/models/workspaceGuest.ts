import { WorkspaceDto } from "./workspace"

export interface WorkspaceGuestDto {
  id: number
  user_id: number
  workspace: WorkspaceDto
  workspace_id: number
  created_at: Date
  deleted_at: Date
}

