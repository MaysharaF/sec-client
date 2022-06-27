export interface WorkspaceDto {
  id: number
  name: string
  owner_id: number
  created_at: Date
  deleted_at?: Date
}
