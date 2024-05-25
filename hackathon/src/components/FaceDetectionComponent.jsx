import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceDetection from '@mediapipe/face_detection';
import * as drawingUtils from '@mediapipe/drawing_utils';
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
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.detections) {
        results.detections.forEach((detection) => {
          drawingUtils.drawDetection(canvasCtx, detection);
        });
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

    loadModel();
  }, []);

  useEffect(() => {
    const captureFrame = async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const imageCapture = new ImageCapture(video);
        const imageBitmap = await imageCapture.grabFrame();
        const imgElement = document.createElement('img');
        imgElement.src = URL.createObjectURL(imageBitmap);

        if (detector) {
          await detector.send({ image: imgElement });
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
