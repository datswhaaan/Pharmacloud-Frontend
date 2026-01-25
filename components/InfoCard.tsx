import React from 'react';
import Card from '@/components/Card';
import Badges from './Badges';

interface PrescriptionData {
    hn: string;
    vn: string;
    name: string;
    age: string;
    gender: string;
    diagnosis: string;
    rights: string;
    doctor: string;
    dateTime: string;
    severity: string;
    status: string;
    symptoms?: string;
    alcoholUse?: string;
    smokingHabits?: string;
    history?: string;
    familyHistory?: string;
    drugAllergies: string;
    drugAllergyMonitoring?: string;
    suspectedDrugAllergys?: string;
}

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
  prescriptionData?: PrescriptionData;
  type?: 'detection' | 'prescription' | 'additional';
}

const InfoCard: React.FC<PatientInfoHeaderProps> = ({ prescriptionData, type}) => {
  return (
    <Card>
      {prescriptionData && type === 'detection' && (
        <div>
        {/* Header with title and timestamp */}
          <div className="flex justify-between items-start pb-4">
        
            <div className="flex flex-col items-start">
                <h1 className="text-gray-800">{prescriptionData.name}</h1>
                <div className="flex items-center gap-2">
                    <p className='text-sm text-gray-500'>ระดับความรุนแรง</p>
                    <Badges 
                      varient="severity"
                      level={prescriptionData.severity}
                    />
                </div>
            </div>
            <span className="text-sm text-gray-500">รับบริการ {prescriptionData.dateTime}</span>
          </div>

          {/* Patient Information Grid */}
          <div className="grid grid-cols-6 gap-6 ">
            <InfoField label="HN" value={prescriptionData.hn} />
            <InfoField label="VN" value={prescriptionData.vn} />
            <InfoField label="อายุ" value={prescriptionData.age} />
            <InfoField label="การวินิจฉัย (Dx)" value={prescriptionData.diagnosis} />
            <InfoField label="สิทธิ์" value={prescriptionData.rights}/>
            <InfoField label="แพทย์" value={prescriptionData.doctor} />
          </div>
        </div>
        )}

      {prescriptionData && type === 'prescription' && (
        <div>
        {/* Header with title and timestamp */}
          <div className="flex justify-between items-start pb-4">
        
            <div className="flex flex-col items-start">
                <h1 className="text-gray-800">{prescriptionData.name}</h1>
                <div className="flex items-center gap-2">
                    <p className='text-sm text-gray-500'>ระดับความรุนแรง</p>
                    <Badges 
                      varient="severity"
                      level={prescriptionData.severity}
                    />
                </div>
            </div>
            <span className="text-sm text-gray-500">รับบริการ {prescriptionData.dateTime}</span>
          </div>

          {/* Patient Information Grid */}
          <div className="grid grid-cols-5 gap-6 ">
            <InfoField label="HN" value={prescriptionData.hn} />
            <InfoField label="VN" value={prescriptionData.vn} />
            <InfoField label="อายุ" value={prescriptionData.age} />
            <InfoField label="สิทธิ์" value={prescriptionData.rights}/>
            <InfoField label="แพทย์" value={prescriptionData.doctor} />
            <InfoField label="การวินิจฉัย (Dx)" value={prescriptionData.diagnosis} />
            <InfoField label="สถานะ" value={prescriptionData.status} type="badge" />
          </div>
        </div>
        )}

        {prescriptionData && type == 'additional' && (
          <div>
            <h2>ข้อมูลเพิ่มเติม</h2>
            <div>
              <InfoField inline label="อาการสำคัญ 1 07:04" value={prescriptionData.symptoms || '-'} />
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3>ประวัติผู้ป่วย</h3>
                  <div className="pl-8">
                    <p className="text-gray-500">ปัจจัยเสี่ยง</p>
                    <div className="pl-8">
                      <InfoField inline label="แอลกอฮอล์" value={prescriptionData.alcoholUse || '-'} />
                      <InfoField inline label="การสูบบุหรี่" value={prescriptionData.smokingHabits || '-'} />
                    </div>
                    <InfoField inline label="ประวัติในอดีต" value={prescriptionData.history || '-'} />
                    <InfoField inline label="ประวัติในครอบครัว" value={prescriptionData.familyHistory || '-'} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3>คำแนะนำหลังตรวจ</h3>
                  <InfoField inline label="ประวัติการแพ้ยา" value={prescriptionData.drugAllergies || '-'} />
                  <InfoField inline label="การเฝ้าระวังการแพ้ยา" value={prescriptionData.drugAllergyMonitoring || '-'} />
                  <InfoField inline label="ยาที่สงสัยว่าแพ้ยา" value={prescriptionData.suspectedDrugAllergys || '-'} />
                </div>
              </div>
            </div>
          </div>
        )}
    </Card>
  );
};

export default InfoCard;