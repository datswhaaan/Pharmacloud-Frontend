import React from 'react';
import Card from '@/components/Card';
import Badges from './Badges';

import type { PrescriptionDetail } from '@/types/prescription';

interface InfoFieldProps {
  label: string;
  value: string;
  color?: string;
  type?: 'badge' | 'text';
  inline?: boolean;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, color = 'text-gray-700', type = 'text', inline = false }) => (
  <div className={`flex ${inline ? 'flex-row items-start gap-8' : 'flex-col'}`}>
    <span className=" text-gray-500 mb-1">{label}</span>
    {type === 'badge' ? (
      <Badges varient="status" status={value} />
    ) : (
      <span className={`font-semibold ${color}`}>{value}</span>
    )}
  </div>
);

interface PatientInfoHeaderProps {
  prescriptionData?: PrescriptionDetail;
  type?: 'detection' | 'prescription' | 'additional';
}

const PrescriptionInfo: React.FC<PatientInfoHeaderProps> = ({ prescriptionData, type}) => {
  return (
    <Card>
      {prescriptionData && type === 'detection' && (
        <div>
        {/* Header with title and timestamp */}
          <div className="flex justify-between items-start pb-4">
        
            <div className="flex flex-col items-start">
                <h1 className="text-gray-800">{prescriptionData.patient_name}</h1>
            </div>
            <span className="text-sm text-gray-500">รับบริการ {prescriptionData.visit_begin_visit_time}</span>
          </div>

          {/* Patient Information Grid */}
          <div className="grid grid-cols-6 gap-6 ">
            <InfoField label="HN" value={prescriptionData.visit_hn} />
            <InfoField label="VN" value={prescriptionData.visit_vn} />
            <InfoField label="อายุ" value={prescriptionData.visit_patient_age} />
            <InfoField label="การวินิจฉัย (Dx)" value={prescriptionData.visit_diagnosis_notice} />
            <InfoField label="สิทธิ์" value={prescriptionData.payment}/>
            <InfoField label="แพทย์" value={prescriptionData.visit_staff_doctor_discharge} />
          </div>
        </div>
        )}

      {prescriptionData && type === 'prescription' && (
        <div>
        {/* Header with title and timestamp */}
          <div className="flex justify-between items-start pb-4">
        
            <div className="flex flex-col items-start">
                <h1 className="text-gray-800">{prescriptionData.patient_name}</h1>
            </div>
            <span className="text-sm text-gray-500">รับบริการ {prescriptionData.visit_begin_visit_time}</span>
          </div>

          {/* Patient Information Grid */}
          <div className="grid grid-cols-5 gap-6 ">
            <InfoField label="HN" value={prescriptionData.visit_hn} />
            <InfoField label="VN" value={prescriptionData.visit_vn} />
            <InfoField label="อายุ" value={prescriptionData.visit_patient_age} />
            <InfoField label="สิทธิ์" value={prescriptionData.payment}/>
            <InfoField label="แพทย์" value={prescriptionData.visit_staff_doctor_discharge} />
            <InfoField label="การวินิจฉัย (Dx)" value={prescriptionData.visit_diagnosis_notice} />
            <InfoField label="สถานะ" value={prescriptionData.status} type="badge" />
          </div>
        </div>
        )}

        {prescriptionData && type == 'additional' && (
          <div>
            <h2>ข้อมูลเพิ่มเติม</h2>
            <div>
              <InfoField inline label="อาการสำคัญ 1 07:04" value={prescriptionData.symptom || '-'} />
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3>ประวัติผู้ป่วย</h3>
                  <div className="pl-8">
                    <p className="text-gray-500">ปัจจัยเสี่ยง</p>
                    <div className="pl-8">
                      <InfoField inline label="แอลกอฮอล์" value={prescriptionData.risk_factors.alcoholUse || '-'} />
                      <InfoField inline label="การสูบบุหรี่" value={prescriptionData.risk_factors.smokingHabits || '-'} />
                    </div>
                    <InfoField inline label="ประวัติในอดีต" value={prescriptionData.history.past_history?.join(', ') || '-'} />
                    <InfoField inline label="ประวัติในครอบครัว" value={prescriptionData.history.family_history?.join(', ') || '-'} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3>คำแนะนำหลังตรวจ</h3>
                  <InfoField inline label="ประวัติการแพ้ยา" value={prescriptionData.drug_allergy.drug_allergies?.join(', ') || '-'} />
                  <InfoField inline label="การเฝ้าระวังการแพ้ยา" value={prescriptionData.drug_allergy.monitoring?.join(', ') || '-'} />
                  <InfoField inline label="ยาที่สงสัยว่าแพ้ยา" value={prescriptionData.drug_allergy.suspected?.join(', ') || '-'} />
                </div>
              </div>
            </div>
          </div>
        )}
    </Card>
  );
};

export default PrescriptionInfo;