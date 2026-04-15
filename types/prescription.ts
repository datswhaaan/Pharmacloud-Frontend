export type PrescriptionType = {
    order_id: string,
    visit_hn: string,
    visit_vn: string,
    patient_name: string,
    visit_begin_visit_time: string,
    status: string
}

export type RiskFactor = {
    alcoholUse: string,
    smokingHabits: string
}

export type OrderDrug = {
    t_order_drug_id: string,
    item_common_name: string,
    unit: string,
    quantity: number
}

export type PatientHistory = {
    past_history: string[]
    family_history: string[]
}

export type DrugAllergy = {
    drug_allergies: string[]
    monitoring: string[]
    suspected: string[]
}

export type PrescriptionDetail = {
    order_id: string,
    visit_hn: string,
    visit_vn: string,
    status: string,
    payment: string,
    symptom: string,
    visit_begin_visit_time: string,
    visit_diagnosis_notice: string,
    visit_patient_type: string,
    visit_dx: string,
    patient_name: string,
    visit_staff_doctor_discharge: string,
    visit_patient_age: string,
    risk_factors: RiskFactor,
    history: PatientHistory,
    drug_allergy: DrugAllergy
}

export type DrugDetectionItem = {
    t_order_drug_id: string,
    detection_item_id: string,
    item_common_name: string,
    confidence: number,
    confidence_level: string,
    quantity: number,
    unit: string,
    is_manually_edited: boolean,
    match_type: string
}

export type DetectionItem = {
    detection_id: string,
    image_url: string,
    status: string,
    verified_by: string,
    verified_at: string,
    drug_list: DrugDetectionItem[]
}

export type DetectionList = {
    order_drugs: OrderDrug[],
    detections: DetectionItem[]
}

export type OrderDrugWithMatch = OrderDrug & {
  match_type: "matched" | "missing" | "extra";
};