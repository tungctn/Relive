import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_pose_detection/google_mlkit_pose_detection.dart';

import 'coordinates_translator.dart';

class ReferencePosePainter extends CustomPainter {
  ReferencePosePainter(
    this.poses,
    this.imageSize,
    this.rotation,
    this.cameraLensDirection,
  );

  final List<Pose> poses;
  final Size imageSize;
  final InputImageRotation rotation;
  final CameraLensDirection cameraLensDirection;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4.0
      ..color = Colors.green;

    final leftPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0
      ..color = Colors.yellow;

    final rightPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0
      ..color = Colors.blueAccent;

    double minX = double.infinity;
    double maxX = double.negativeInfinity;
    double minY = double.infinity;
    double maxY = double.negativeInfinity;

    for (final pose in poses) {
      pose.landmarks.forEach((_, landmark) {
        final x = translateX(
          landmark.x,
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );
        final y = translateY(
          landmark.y,
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      });
    }

    // Calculate center and scale factor for bounding box
    final double centerX = (minX + maxX) / 2;
    final double centerY = (minY + maxY) / 2;
    final double scaleFactor =
        150.0 / (maxY - minY); // The "200.0" could be adjusted to your needs

    // Step 2: Apply translation and scaling
    for (final pose in poses) {
      pose.landmarks.forEach((_, landmark) {
        final x = translateX(
          landmark.x,
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );
        final y = translateY(
          landmark.y,
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );

        final scaledX = (x - centerX) * scaleFactor + size.width / 2;
        final scaledY = (y - centerY) * scaleFactor + size.height / 2;

        // Draw each landmark
        canvas.drawCircle(
          Offset(scaledX, scaledY),
          1,
          paint,
        );
      });

      void paintLine(
        PoseLandmarkType type1,
        PoseLandmarkType type2,
        Paint paintType,
      ) {
        final PoseLandmark joint1 = pose.landmarks[type1]!;
        final PoseLandmark joint2 = pose.landmarks[type2]!;

        final x1 = translateX(
          joint1.x,
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );
        final y1 = translateY(
          joint1.y,
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );

        final x2 = translateX(
          joint2.x,
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );
        final y2 = translateY(
          joint2.y,
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );

        final scaledX1 = (x1 - centerX) * scaleFactor + size.width / 2;
        final scaledY1 = (y1 - centerY) * scaleFactor + size.height / 2;

        final scaledX2 = (x2 - centerX) * scaleFactor + size.width / 2;
        final scaledY2 = (y2 - centerY) * scaleFactor + size.height / 2;

        canvas.drawLine(
            Offset(scaledX1, scaledY1), Offset(scaledX2, scaledY2), paintType);
      }

      //Draw arms
      paintLine(
          PoseLandmarkType.leftShoulder, PoseLandmarkType.leftElbow, leftPaint);
      paintLine(
          PoseLandmarkType.leftElbow, PoseLandmarkType.leftWrist, leftPaint);
      paintLine(PoseLandmarkType.rightShoulder, PoseLandmarkType.rightElbow,
          rightPaint);
      paintLine(
          PoseLandmarkType.rightElbow, PoseLandmarkType.rightWrist, rightPaint);

      //Draw Body
      paintLine(
          PoseLandmarkType.leftShoulder, PoseLandmarkType.leftHip, leftPaint);
      paintLine(PoseLandmarkType.rightShoulder, PoseLandmarkType.rightHip,
          rightPaint);

      //Draw legs
      paintLine(PoseLandmarkType.leftHip, PoseLandmarkType.leftKnee, leftPaint);
      paintLine(
          PoseLandmarkType.leftKnee, PoseLandmarkType.leftAnkle, leftPaint);
      paintLine(
          PoseLandmarkType.rightHip, PoseLandmarkType.rightKnee, rightPaint);
      paintLine(
          PoseLandmarkType.rightKnee, PoseLandmarkType.rightAnkle, rightPaint);
    }
  }

  @override
  bool shouldRepaint(covariant ReferencePosePainter oldDelegate) {
    return oldDelegate.imageSize != imageSize || oldDelegate.poses != poses;
  }
}
