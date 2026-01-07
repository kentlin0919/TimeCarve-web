export interface TeacherAvailabilityWeekly {
  id: string;
  teacherId: string;
  dayOfWeek: number; // 0=Sunday, 6=Saturday
  startTime: string; // HH:mm:ss
  endTime: string; // HH:mm:ss
}

export interface TeacherAvailabilityOverride {
  id: string;
  teacherId: string;
  date: string; // YYYY-MM-DD
  startTime: string | null; // HH:mm:ss
  endTime: string | null; // HH:mm:ss
  isUnavailable: boolean;
}

export interface AvailabilityRepository {
  getWeeklyAvailability(teacherId: string): Promise<TeacherAvailabilityWeekly[]>;
  getOverrides(teacherId: string, startDate: string, endDate: string): Promise<TeacherAvailabilityOverride[]>;
  
  saveWeeklyAvailability(teacherId: string, availability: Omit<TeacherAvailabilityWeekly, "id">[]): Promise<void>;
  saveOverrides(teacherId: string, date: string, overrides: Omit<TeacherAvailabilityOverride, "id">[]): Promise<void>;
  deleteOverride(overrideId: string): Promise<void>;
}
