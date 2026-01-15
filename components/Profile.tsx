export default function Profile({
    name, position
} : {
    name: string, 
    position: string}
){
    return(
        <div>
            <div className="flex items-center justify-center space-x-4 p-4rounded-lg mx-4 mb-4">
                <div>
                    <p className="font-semibold text-gray-800">{name}</p>
                    <p className="text-sm text-gray-500">{position}</p>
                </div>
            </div>
        </div>
    )
}