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
    allergies: string;
    doctor: string;
    dateTime: string;
    severity: string;
    status: string;
}

interface InfoFieldProps {
  label: string;
  value: string;
  color?: string;
  type?: 'badge' | 'text';
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, color = 'text-gray-700', type = 'text' }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500 mb-1">{label}</span>
    {type === 'badge' ? (
      <Badges varient="status" status={value} />
    ) : (
      <span className={`font-semibold ${color}`}>{value}</span>
    )}
  </div>
);

interface PatientInfoHeaderProps {
  prescriptionData?: PrescriptionData;
  type?: 'detection' | 'prescription';
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
    </Card>
  );
};

export default InfoCard;