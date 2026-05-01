export type DetectedDrugInfo = {
    detection_item_id: string;
    quantity: number;
    is_checked: boolean;
}

export type DetectionUpdateParams = {
    detection_id: string;
    status: string;
    drug_list: DetectedDrugInfo[];
}

export type DetectionInferParams = {
    order_id: string;
    image: File;
}

export type OrderedDrugInfer = {
    t_order_drug_id: string;
    item_common_name: string;
    quantity: number;
    unit: string;
    match_type: string;
}

export type DetectedDrugInfer = {
    detection_item_id: string;
    t_order_drug_id: string;
    item_common_name: string;
    confidence: number;
    confidence_level: string;
    quantity: number;
    unit: string;
    is_manually_edited: boolean
    match_type: string;
}

export type DetectionInferResult = {
    detection_id: string;
    image_url: string;
    status: string;
    verified_by: string;
    verified_at: string;
    ordered_drugs: OrderedDrugInfer[];
    drug_list: DetectedDrugInfer[];
}