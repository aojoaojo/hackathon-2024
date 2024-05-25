import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceDetection from '@mediapipe/face_detection';
import * as drawingUtils from '@mediapipe/drawing_utils';
import axios from 'axios';
import styles from './FaceDetectionComponent.module.css';

export const FaceDetectionComponent = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do "pop-up"

  useEffect(() => {
    const onResults = (results) => {
      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(webcamRef.current.video, 0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.detections && results.detections.length > 0) {
        results.detections.forEach((detection) => {
          // Desenhar a detecção no canvas
          const bbox = detection.boundingBox;
          canvasCtx.strokeStyle = 'yellow';
          canvasCtx.lineWidth = 4;
          canvasCtx.strokeRect(
            bbox.xCenter * canvasRef.current.width - (bbox.width * canvasRef.current.width) / 2,
            bbox.yCenter * canvasRef.current.height - (bbox.height * canvasRef.current.height) / 2,
            bbox.width * canvasRef.current.width,
            bbox.height * canvasRef.current.height
          );
        });
        setShowPopup(true); // Mostrar o "pop-up" quando um rosto for detectado
      } else {
        setShowPopup(false); // Ocultar o "pop-up" quando nenhum rosto for detectado
      }
      canvasCtx.restore();
    };

    const loadModel = async () => {
      const faceDetectionInstance = new faceDetection.FaceDetection({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      });

      faceDetectionInstance.setOptions({
        model: 'short',
        minDetectionConfidence: 0.5,
      });

      faceDetectionInstance.onResults(onResults);
      setDetector(faceDetectionInstance);
    };

    loadModel().catch(error => {
      console.error('Error loading MediaPipe model:', error);
    });
  }, []);

  const captureFrame = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4 && detector) {
      try {
        await detector.send({ image: webcamRef.current.video });
      } catch (error) {
        console.error('Error sending video frame to MediaPipe:', error);
      }
    }
    requestAnimationFrame(captureFrame);
  };

  useEffect(() => {
    captureFrame();
  }, [detector]);

  return (
    <div>
      <h1 className={styles.titulo}>Presença por Imagem</h1>
      <div className={styles.container}>
        <Webcam
          className={styles.webcam}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          width={640}
          height={480}
        />
      </div>
      {showPopup && <PopupComponent />} {/* Renderizar o "pop-up" se showPopup for verdadeiro */}
    </div>
  );
};

const PopupComponent = () => {

  var agora = new Date();

  // Extrai a hora, minutos e segundos
  var horas = agora.getHours();    // Retorna a hora (0-23)
  var minutos = agora.getMinutes(); // Retorna os minutos (0-59)
  var segundos = agora.getSeconds(); // Retorna os segundos (0-59)

  return (
    <div className={styles.popup}>
      <p>Adriano presente!</p>
      <p className={styles.hora}>{horas + ":" + minutos + ":" + segundos}</p>
    </div>
  );
};
