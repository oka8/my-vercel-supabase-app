export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: Record<string, {
      Row: Record<string, unknown>
      Insert: Record<string, unknown>
      Update: Record<string, unknown>
    }>
    Views: Record<string, {
      Row: Record<string, unknown>
    }>
    Functions: Record<string, {
      Args: Record<string, unknown>
      Returns: unknown
    }>
    Enums: Record<string, string>
    CompositeTypes: Record<string, Record<string, unknown>>
  }
}

// Helper types for common operations
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]
export type TablesInsert<T extends keyof Database['public']['Tables']> = Tables<T>['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Tables<T>['Update']
export type TablesRow<T extends keyof Database['public']['Tables']> = Tables<T>['Row']

export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]