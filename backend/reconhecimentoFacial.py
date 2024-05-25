from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Função para identificar o rosto na imagem
def identificar_rosto(imagem):
    # Carregar o classificador pré-treinado para detecção de faces
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Converter a imagem em escala de cinza
    imagem_cinza = cv2.cvtColor(imagem, cv2.COLOR_BGR2GRAY)

    # Detectar faces na imagem
    faces = face_cascade.detectMultiScale(imagem_cinza, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    # Identificar os rostos
    for (x, y, w, h) in faces:
        # Desenhar um retângulo ao redor do rosto
        cv2.rectangle(imagem, (x, y), (x+w, y+h), (255, 0, 0), 2)
    
    # Salvar a imagem com o retângulo do rosto identificado (opcional)
    cv2.imwrite('rostos_identificados.jpg', imagem)

    # Retorna o número de rostos identificados
    return len(faces)

# Rota para receber a imagem e identificar o rosto
@app.route('/identificar_rosto', methods=['POST'])
def receber_imagem():
    # Verificar se a imagem foi enviada
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    # Ler a imagem
    imagem = cv2.imdecode(np.frombuffer(request.files['image'].read(), np.uint8), cv2.IMREAD_COLOR)

    # Identificar o rosto na imagem
    num_rostos = identificar_rosto(imagem)

    # Retornar o número de rostos identificados
    return jsonify({'num_rostos': num_rostos}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
