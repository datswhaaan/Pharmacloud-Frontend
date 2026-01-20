import React from 'react';
import Badges from './Badges';

interface PatientData {
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
}

interface InfoFieldProps {
  label: string;
  value: string;
  color?: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, color = 'text-gray-700' }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500 mb-1">{label}</span>
    <span className={`font-semibold ${color}`}>{value}</span>
  </div>
);

interface PatientInfoHeaderProps {
  patientData?: PatientData;
}

const InfoCard: React.FC<PatientInfoHeaderProps> = ({ patientData }) => {
  return (
    <div>
      {patientData &&(
        <div>
        
        {/* Header with title and timestamp */}
          <div className="flex justify-between items-start pb-4">
        
            <div className="flex flex-col items-start">
                <h1 className="text-gray-800">{patientData.name}</h1>
                <div className="flex items-center gap-2">
                    <p className='text-sm text-gray-500'>ระดับความรุนแรง</p>
                    <Badges 
                      varient="severity"
                      level={patientData.severity}
                    />
                </div>
            </div>
            <span className="text-sm text-gray-500">รับบริการ {patientData.dateTime}</span>
          </div>

          {/* Patient Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 ">
            <InfoField label="HN" value={patientData.hn} />
            <InfoField label="VN" value={patientData.vn} />
            <InfoField label="อายุ" value={patientData.age} />
            <InfoField label="การวินิจฉัย (Dx)" value={patientData.diagnosis} />
            <InfoField label="สิทธิ์" value={patientData.rights}/>
            <InfoField label="แพทย์" value={patientData.doctor} />
          </div>
        </div>
        )}
    </div>
  );
};

export default InfoCard;