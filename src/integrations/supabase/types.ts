export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      departments: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      faculty_self_appraisals: {
        Row: {
          academic_year: string
          admin_score: number | null
          administrative_responsibilities: string | null
          awards_received: string | null
          books_authored: number | null
          certifications_obtained: string | null
          committee_memberships: string | null
          conferences_attended: number | null
          consultancy_projects: number | null
          course_files_prepared: number | null
          courses_taught: Json | null
          created_at: string
          date_of_joining: string | null
          department_id: string
          designation: string
          experience_years: number | null
          faculty_id: string
          id: string
          innovative_teaching_methods: string | null
          institutional_activities: string | null
          lab_manuals_prepared: number | null
          name: string
          online_courses_completed: number | null
          patents_filed: number | null
          phd_guidance: number | null
          professional_dev_score: number | null
          professional_memberships: string | null
          qualification: string | null
          question_papers_set: number | null
          research_papers_published: number | null
          research_projects: number | null
          research_score: number | null
          seminars_conducted: number | null
          signature_confirmed: boolean | null
          status: string | null
          student_feedback_score: number | null
          student_strength: number | null
          submitted_at: string | null
          supporting_documents: Json | null
          teaching_load_hours: number | null
          teaching_score: number | null
          total_classes_taken: number | null
          total_score: number | null
          updated_at: string
          workshops_attended: number | null
        }
        Insert: {
          academic_year: string
          admin_score?: number | null
          administrative_responsibilities?: string | null
          awards_received?: string | null
          books_authored?: number | null
          certifications_obtained?: string | null
          committee_memberships?: string | null
          conferences_attended?: number | null
          consultancy_projects?: number | null
          course_files_prepared?: number | null
          courses_taught?: Json | null
          created_at?: string
          date_of_joining?: string | null
          department_id: string
          designation: string
          experience_years?: number | null
          faculty_id: string
          id?: string
          innovative_teaching_methods?: string | null
          institutional_activities?: string | null
          lab_manuals_prepared?: number | null
          name: string
          online_courses_completed?: number | null
          patents_filed?: number | null
          phd_guidance?: number | null
          professional_dev_score?: number | null
          professional_memberships?: string | null
          qualification?: string | null
          question_papers_set?: number | null
          research_papers_published?: number | null
          research_projects?: number | null
          research_score?: number | null
          seminars_conducted?: number | null
          signature_confirmed?: boolean | null
          status?: string | null
          student_feedback_score?: number | null
          student_strength?: number | null
          submitted_at?: string | null
          supporting_documents?: Json | null
          teaching_load_hours?: number | null
          teaching_score?: number | null
          total_classes_taken?: number | null
          total_score?: number | null
          updated_at?: string
          workshops_attended?: number | null
        }
        Update: {
          academic_year?: string
          admin_score?: number | null
          administrative_responsibilities?: string | null
          awards_received?: string | null
          books_authored?: number | null
          certifications_obtained?: string | null
          committee_memberships?: string | null
          conferences_attended?: number | null
          consultancy_projects?: number | null
          course_files_prepared?: number | null
          courses_taught?: Json | null
          created_at?: string
          date_of_joining?: string | null
          department_id?: string
          designation?: string
          experience_years?: number | null
          faculty_id?: string
          id?: string
          innovative_teaching_methods?: string | null
          institutional_activities?: string | null
          lab_manuals_prepared?: number | null
          name?: string
          online_courses_completed?: number | null
          patents_filed?: number | null
          phd_guidance?: number | null
          professional_dev_score?: number | null
          professional_memberships?: string | null
          qualification?: string | null
          question_papers_set?: number | null
          research_papers_published?: number | null
          research_projects?: number | null
          research_score?: number | null
          seminars_conducted?: number | null
          signature_confirmed?: boolean | null
          status?: string | null
          student_feedback_score?: number | null
          student_strength?: number | null
          submitted_at?: string | null
          supporting_documents?: Json | null
          teaching_load_hours?: number | null
          teaching_score?: number | null
          total_classes_taken?: number | null
          total_score?: number | null
          updated_at?: string
          workshops_attended?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "faculty_self_appraisals_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faculty_self_appraisals_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hod_performance_appraisals: {
        Row: {
          admin_weighted_score: number | null
          administrative_efficiency: number | null
          attire_punctuality: number | null
          class_control_innovation: number | null
          collegiality_teamwork: number | null
          created_at: string
          domain_knowledge: number | null
          faculty_appraisal_id: string
          final_weighted_score: number | null
          hod_assessment_score: number | null
          hod_id: string
          hod_name: string | null
          hod_signature_confirmed: boolean | null
          id: string
          initiative_drive: number | null
          leave_permissions: number | null
          performance_category: string | null
          policy_compliance: number | null
          professional_dev_weighted_score: number | null
          research_weighted_score: number | null
          show_cause_notices: string | null
          status: string | null
          student_mentoring: number | null
          submitted_at: string | null
          suggestions_improvement: string | null
          task_completion: number | null
          teaching_weighted_score: number | null
          updated_at: string
        }
        Insert: {
          admin_weighted_score?: number | null
          administrative_efficiency?: number | null
          attire_punctuality?: number | null
          class_control_innovation?: number | null
          collegiality_teamwork?: number | null
          created_at?: string
          domain_knowledge?: number | null
          faculty_appraisal_id: string
          final_weighted_score?: number | null
          hod_assessment_score?: number | null
          hod_id: string
          hod_name?: string | null
          hod_signature_confirmed?: boolean | null
          id?: string
          initiative_drive?: number | null
          leave_permissions?: number | null
          performance_category?: string | null
          policy_compliance?: number | null
          professional_dev_weighted_score?: number | null
          research_weighted_score?: number | null
          show_cause_notices?: string | null
          status?: string | null
          student_mentoring?: number | null
          submitted_at?: string | null
          suggestions_improvement?: string | null
          task_completion?: number | null
          teaching_weighted_score?: number | null
          updated_at?: string
        }
        Update: {
          admin_weighted_score?: number | null
          administrative_efficiency?: number | null
          attire_punctuality?: number | null
          class_control_innovation?: number | null
          collegiality_teamwork?: number | null
          created_at?: string
          domain_knowledge?: number | null
          faculty_appraisal_id?: string
          final_weighted_score?: number | null
          hod_assessment_score?: number | null
          hod_id?: string
          hod_name?: string | null
          hod_signature_confirmed?: boolean | null
          id?: string
          initiative_drive?: number | null
          leave_permissions?: number | null
          performance_category?: string | null
          policy_compliance?: number | null
          professional_dev_weighted_score?: number | null
          research_weighted_score?: number | null
          show_cause_notices?: string | null
          status?: string | null
          student_mentoring?: number | null
          submitted_at?: string | null
          suggestions_improvement?: string | null
          task_completion?: number | null
          teaching_weighted_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hod_performance_appraisals_faculty_appraisal_id_fkey"
            columns: ["faculty_appraisal_id"]
            isOneToOne: false
            referencedRelation: "faculty_self_appraisals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hod_performance_appraisals_hod_id_fkey"
            columns: ["hod_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      principal_remarks: {
        Row: {
          created_at: string
          final_decision: string | null
          hod_appraisal_id: string
          id: string
          observations_remarks: string | null
          principal_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          final_decision?: string | null
          hod_appraisal_id: string
          id?: string
          observations_remarks?: string | null
          principal_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          final_decision?: string | null
          hod_appraisal_id?: string
          id?: string
          observations_remarks?: string | null
          principal_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "principal_remarks_hod_appraisal_id_fkey"
            columns: ["hod_appraisal_id"]
            isOneToOne: false
            referencedRelation: "hod_performance_appraisals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "principal_remarks_principal_id_fkey"
            columns: ["principal_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          department_id: string | null
          email: string
          full_name: string
          id: string
          position: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          email: string
          full_name: string
          id?: string
          position?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          email?: string
          full_name?: string
          id?: string
          position?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "faculty" | "hod" | "principal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["faculty", "hod", "principal"],
    },
  },
} as const
