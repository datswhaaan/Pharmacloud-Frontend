import React from 'react';
import Card from '@/components/Card';
import Badges from './Badges';
import { DrugResponse } from '@/types/drug';

interface InfoFieldProps {
  label: string;
  value: string;
  color?: string;
  type?: 'badge' | 'text';
  inline?: boolean;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, color = 'text-gray-700', type = 'text', inline = false }) => (
  <div className={`flex ${inline ? 'flex-row items-start gap-4' : 'flex-col'}`}>
    <span className=" text-gray-500 mb-1">{label}</span>
    {type === 'badge' ? (
      <Badges varient="status" status={value} />
    ) : (
      <span className={`font-semibold ${color}`}>{value}</span>
    )}
  </div>
);

interface DrugInfoHeaderProps {
  drugData?: DrugResponse;
  type?: 'detection' | 'additional' | 'images';
}


const DrugInfo: React.FC<DrugInfoHeaderProps> = ({ drugData, type}) => {

  return (
    <Card>
      {drugData && type === 'detection' && (
        <div>
        {/* Header with title and timestamp */}
          <div className="flex justify-between items-start pb-4">
        
            <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <h1 className="text-gray-800">{drugData.names.generic}</h1>
                    <Badges 
                      varient="riskLevel"
                      level={drugData.flags.is_high_alert ? "high" : ""}
                    />
                </div>
                  <InfoField inline label="รหัส" value={drugData.code || '-'} />
            </div>
          </div>

          {/* Patient Information Grid */}
          <div className="grid grid-cols-3 gap-6">
            <InfoField label="ชื่อสามัญ" value={drugData.names.generic || '-'} />
            <InfoField label="ชื่อทางการค้า" value={drugData.names.trade || '-'} />
            <InfoField label="ชื่อภาษาไทย" value={drugData.names.thai || '-'} />
            <InfoField label="กลุ่มรายการตรวจรักษา" value={drugData.categories.therapeutic || '-'} />
            <InfoField label="กลุ่มรายการใบเสร็จ" value={drugData.categories.pharmacological || '-'}/>
            <InfoField label="กลุ่มสามัญ" value={drugData.categories.standard || '-'} />
          </div>
        </div>
        )}

        {drugData && type == 'additional' && (
          <div>
            <h2 className="pb-4">รายละเอียดการใช้ยา</h2>
            <div className="grid grid-cols-3 gap-6">
              <InfoField label="วิธีการใช้" value={drugData.instructions.instruction || '-'} />
              <InfoField label="คำเตือน" value={drugData.instructions.caution || '-'} />
              <InfoField label="รายละเอียด" value={drugData.instructions.description || '-'} />
              <InfoField label="ข้อบ่งชี้การใช้ยา" value={drugData.instructions.special_prescription || '-'} />
            </div>
          </div>
        )}
    </Card>
  );
};

export default DrugInfo;