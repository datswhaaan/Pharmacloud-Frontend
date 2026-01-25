import Card from "@/components/Card";
import InfoCard from "@/components/InfoCard";


const prescriptionData = {
    hn: '1234567',
    vn: '87654321',
    name: 'นายบัตร ออกหน่วย',
    age: '28 ปี 2 เดือน 28 วัน',
    gender: 'ชาย',
    diagnosis: 'ขออุปกรณ์ทำแผล (Z760)',
    rights: 'ฟรี',
    allergies: 'ไม่มี',
    doctor: 'ไม่มี',
    dateTime: '15/01/2568 เวลา 14:30 น.',
    severity: 'ขาว',
    status: 'รอตรวจสอบ'
  };

export default function PrescriptionDetail() {
    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-between">  
            <InfoCard prescriptionData={prescriptionData} type='prescription'/>
        </div>
    )
}