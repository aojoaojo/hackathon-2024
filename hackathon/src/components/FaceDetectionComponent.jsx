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

  useEffect(() => {
    const onResults = (results) => {
      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(webcamRef.current.video, 0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.detections && results.detections.length > 0) {
        results.detections.forEach((detection) => {
          // Desenhar a detecção no canvas
          drawingUtils.drawRectangle(
            canvasCtx,
            detection.boundingBox,
            { color: 'blue', lineWidth: 4 }
          );
          // Podemos adicionar a confiança como texto diretamente no canvas
          canvasCtx.font = '16px Arial';
          canvasCtx.fillStyle = 'blue';
          canvasCtx.fillText(
            `${Math.floor(detection.score * 100)}%`,
            detection.boundingBox.xCenter * canvasRef.current.width,
            (detection.boundingBox.yCenter * canvasRef.current.height) - 10
          );
        });
        captureAndSendImage();
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

  const captureAndSendImage = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'capture.jpg');
        try {
          const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Image sent and response received:', response.data);
        } catch (error) {
          console.error('Error sending image:', error);
        }
      }, 'image/jpeg');
    }
  };

  useEffect(() => {
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
    </div>
  );
};
