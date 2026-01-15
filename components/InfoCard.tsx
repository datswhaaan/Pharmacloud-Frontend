import React from 'react';

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
  const defaultData: PatientData = {
    hn: '1234567',
    vn: '87654321',
    name: 'นายบัตร ออกหน่วย',
    age: '28 ปี 2 เดือน 28 วัน',
    gender: 'ชาย',
    diagnosis: 'ขออุปกรณ์ทำแผล (Z760)',
    rights: 'ฟรี',
    allergies: 'ไม่มี',
    doctor: 'ไม่มี',
    dateTime: '15/01/2568 เวลา 14:30 น.'
  };

  const data = patientData || defaultData;

  return (
    <div>
      {/* Header with title and timestamp */}
      <div className="flex justify-between items-start pb-4">
    
        <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold text-gray-800">{data.name}</h2>
            <div className="flex items-center gap-2">
                <p>ระดับความรุนแรง: </p>
                <span className="px-12 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                ขาว
                </span>
            </div>
        </div>
        <span className="text-sm text-gray-600">รับบริการ {data.dateTime}</span>
      </div>

      {/* Patient Information Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 ">
        <InfoField label="HN" value={data.hn} />
        <InfoField label="VN" value={data.vn} />
        <InfoField label="อายุ" value={data.age} />
        <InfoField label="การวินิจฉัย (Dx)" value={data.diagnosis} />
        <InfoField label="สิทธิ์" value={data.rights}/>
        <InfoField label="แพทย์" value={data.doctor} />
      </div>

    </div>
  );
};

export default InfoCard;