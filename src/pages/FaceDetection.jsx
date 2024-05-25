import { FaceDetectionComponent } from '../components/FaceDetectionComponent'
import { Header } from '../components/Header'


export function FaceDetection() {
    return (
        <div>
            <Header />
            <FaceDetectionComponent />
        </div>
    )
}

export default FaceDetection; // Exportação padrão do componente FaceDetection
