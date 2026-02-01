import mockDrugDetail from "@/components/mockDrugDetail.json"
import DrugInfo from "@/components/DrugInfo"
import ImageSection from "@/components/application/drugs/ImageSection"

export default function DrugDetail() {
    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">
            <DrugInfo drugData={mockDrugDetail} type="detection"/>
            <DrugInfo drugData={mockDrugDetail} type="additional"/>
            <ImageSection images={mockDrugDetail.images}/>
        </div>
    )
}