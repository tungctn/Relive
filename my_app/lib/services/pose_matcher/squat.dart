import 'package:fit_worker/services/pose_matcher/utils.dart';
import 'package:google_mlkit_pose_detection/google_mlkit_pose_detection.dart';

enum MoveStateType { still, down, up, none }

class SquatPoseMatcher {
  final List<List<double>> _referencePoseValues = [
    [
      1.64566319e2,
      1.65426829e2,
      9.7480081e1,
      8.36205334e1,
      1.47215434e2,
      1.50791226e2,
      2.38987973e-2
    ],
    [
      1.61180652e2,
      1.65983236e2,
      1.00294241e2,
      8.39433279e1,
      1.44128993e2,
      1.52763967e2,
      5.37274523e-2
    ],
    [
      1.70762288e2,
      1.63882896e2,
      1.06351705e2,
      8.4941609e1,
      1.01209117e2,
      1.28780394e2,
      7.96201761e-2
    ],
    [
      1.74986412e2,
      1.60718109e2,
      1.05017051e2,
      9.0685085e1,
      8.37645627e1,
      1.01118596e2,
      8.55776335e-2
    ],
    [
      1.73198836e2,
      1.55574606e2,
      1.09034474e2,
      9.42085447e1,
      7.49683672e1,
      8.08804467e1,
      4.65468846e-2
    ],
    [
      1.73934198e2,
      1.62168753e2,
      1.08740501e2,
      9.74603711e1,
      8.23437311e1,
      9.17521242e1,
      5.87761616e-2
    ],
    [
      1.74415484e2,
      1.6261495e2,
      1.06699999e2,
      8.9327813e1,
      1.2151755e2,
      1.425552e2,
      3.80979769e-2
    ],
    [
      1.71880546e2,
      1.62862361e2,
      1.05359875e2,
      8.84977495e1,
      1.54443719e2,
      1.5807256e2,
      -1.10828641e-2
    ]
  ];

  final List<double> tolerance = [40.0, 40.0, 30.0, 30.0, 20.0, 20.0, 0.0];

  int _currentRefPoseIndex = 0;
  int _reps = 0;

  int _poseCount = 0;
  double _tempMoveValue = 0;
  MoveStateType moveState = MoveStateType.none;

  int _passCount = 0;

  SquatPoseMatcher();

  // Create a method to compute pose values
  List<double> _computePoseValues(Pose pose) {
    final PoseLandmark leftWrist = pose.landmarks[PoseLandmarkType.leftWrist]!;
    final PoseLandmark rightWrist =
        pose.landmarks[PoseLandmarkType.rightWrist]!;
    final PoseLandmark leftShoulder =
        pose.landmarks[PoseLandmarkType.leftShoulder]!;
    final PoseLandmark rightShoulder =
        pose.landmarks[PoseLandmarkType.rightShoulder]!;
    final PoseLandmark leftElbow = pose.landmarks[PoseLandmarkType.leftElbow]!;
    final PoseLandmark rightElbow =
        pose.landmarks[PoseLandmarkType.rightElbow]!;
    final PoseLandmark leftHip = pose.landmarks[PoseLandmarkType.leftHip]!;
    final PoseLandmark rightHip = pose.landmarks[PoseLandmarkType.rightHip]!;
    final PoseLandmark leftKnee = pose.landmarks[PoseLandmarkType.leftKnee]!;
    final PoseLandmark rightKnee = pose.landmarks[PoseLandmarkType.rightKnee]!;
    final PoseLandmark leftAnkle = pose.landmarks[PoseLandmarkType.leftAnkle]!;
    final PoseLandmark rightAnkle =
        pose.landmarks[PoseLandmarkType.rightAnkle]!;

    final double elbowLeftAngle =
        angleCalculate(leftWrist, leftElbow, leftShoulder);
    final double elbowRightAngle =
        angleCalculate(rightWrist, rightElbow, rightShoulder);
    final double shoulderLeftAngle =
        angleCalculate(leftElbow, leftShoulder, leftHip);
    final double shoulderRightAngle =
        angleCalculate(rightElbow, rightShoulder, rightHip);
    final double kneeLeftAngle = angleCalculate(leftHip, leftKnee, leftAnkle);
    final double kneeRightAngle =
        angleCalculate(rightHip, rightKnee, rightAnkle);
    final double shoulderDistance =
        distanceCalculate(leftShoulder, rightShoulder);
    final double legDistance = distanceCalculate(leftAnkle, rightAnkle);
    final double diffDistance = legDistance - shoulderDistance;

    return [
      elbowLeftAngle,
      elbowRightAngle,
      shoulderLeftAngle,
      shoulderRightAngle,
      kneeLeftAngle,
      kneeRightAngle,
      diffDistance
    ];
  }

  String compareWithReferencePoses(List<Pose> poses) {
    if ((poses.isEmpty) | (poses.length > 1)) {
      return '';
    }

    final List<double> poseValues = _computePoseValues(poses[0]);

    if (_tempMoveValue == 0) {
      moveState = MoveStateType.none;
    } else if (_poseCount % 8 == 0) {
      if ((poseValues[4] - _tempMoveValue).abs() < 3) {
        moveState = MoveStateType.still;
      } else if (poseValues[4] - _tempMoveValue < 0) {
        moveState = MoveStateType.down;
      } else {
        moveState = MoveStateType.up;
      }
    }

    _tempMoveValue = poseValues[4];

    for (int i = _passCount; i < _referencePoseValues.length; i++) {
      List<double> refAngle = _referencePoseValues[i];

      if (poseValues
          .getRange(0, poseValues.length - 1)
          .toList()
          .asMap()
          .entries
          .every((entry) =>
              (entry.value - refAngle[entry.key]).abs() <
              tolerance[entry.key])) {
        _passCount++;
      } else if (_passCount == 0) {
        // Maybe do something here
      } else {
        List<double> diff = poseValues
            .toList()
            .asMap()
            .entries
            .map((entry) => (entry.value - refAngle[entry.key]).abs())
            .toList();

        // Check state of left elbow angle
        if (diff[0].abs() > tolerance[0]) {
          return 'Maintain your left-elbow straightness';
        }

        // Check state of right elbow angle
        if (diff[1].abs() > tolerance[1]) {
          return 'Maintain your right-elbow straightness';
        }

        // Check state of return back to initial position

        // Check state of left shoulder angle
        if (diff[2] < 0 && diff[2].abs() < -tolerance[2]) {
          return 'Raise your left shoulder to create a 90-degree angle with your body';
        }

        if (diff[2] > 0 && diff[2].abs() > tolerance[2]) {
          return 'Lower your left shoulder to create a 90-degree angle with your body';
        }

        // Check state of right shoulder angle
        if (diff[3] < 0 && diff[3].abs() < -tolerance[3]) {
          return 'Raise your right shoulder to create a 90-degree angle with your body';
        }

        if (diff[3] > 0 && diff[3].abs() > tolerance[3]) {
          return 'Lower your right shoulder to create a 90-degree angle with your body';
        }

        // Check state of left knee angle
        if (diff[4] > tolerance[4] || diff[4] < -tolerance[4]) {
          return 'Squat down deeper';
        }
      }

      if (_passCount == _referencePoseValues.length - 1) {
        _passCount = 0;
        _reps++;
        return 'Good job! You have completed $_reps reps';
      }

      if (_passCount < _referencePoseValues.length - 1 &&
          _passCount > 5 &&
          moveState == MoveStateType.still) {
        _passCount = 0;
      }
    }

    _poseCount++;

    return '';
  }

  String debugMessage() {
    String state;
    switch (moveState) {
      case MoveStateType.none:
        state = 'none';
        break;
      case MoveStateType.still:
        state = 'still';
        break;
      case MoveStateType.down:
        state = 'down';
        break;
      case MoveStateType.up:
        state = 'up';
        break;
    }
    return '$_reps, $_passCount, $state';
  }
}
