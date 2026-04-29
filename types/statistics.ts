export type StatisticsData = {
  status_summary: {
    label: string[];
    value: number[];
    unit?: string;
  };
  error_summary: {
    label: string[];
    value: number[];
    unit?: string;
  };
  annual_error_summary: {
    label: string[];
    value: number[];
    unit?: string;
  };
};

export type DetectionLogItem = {
  detection_id: string;
  order_id: string;
  visit_hn: string;
  visit_vn: string;
  patient_name: string;
  verified_by: string;
  verified_at: string;
};

export type DetectionLogResponse = {
  detections: DetectionLogItem[];
  total: number;
  page: number;
  size: number;
};