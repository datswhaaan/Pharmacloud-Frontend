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
    b_item_id: string,
    item_common_name: string,
    unit: string,
    dose: number
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
    order_drugs: OrderDrug[]
    drug_allergy: DrugAllergy
}