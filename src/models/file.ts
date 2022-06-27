export interface FileDto {
  id: number
  name: string
  file: string
  type: string
  workspace_id: number
  created_at: Date
  deleted_at?: Date
}