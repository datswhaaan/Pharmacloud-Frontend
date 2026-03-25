import SystemSelectionButton from "@/components/entry/SystemSelectionButton"

export default function Entry() {
    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen justify-center items-center">
            <h1 className="text-primary-blue">กรุณาเลือกระบบที่คุณต้องการเข้าใช้งาน</h1>
            <div className="flex gap-8">
                <SystemSelectionButton system="Pharmacloud"/>
                <SystemSelectionButton system="Drug"/>
                <SystemSelectionButton system="Pharmacloud"/>
            </div>
        </div>
    )
}