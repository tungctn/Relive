import 'dart:io';

import 'package:camera/camera.dart';
import 'package:fit_worker/services/pose_matcher/squat.dart';
import 'package:fit_worker/utils/icon.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_mlkit_commons/google_mlkit_commons.dart';
import 'package:flutter_tts/flutter_tts.dart';

class CameraView extends StatefulWidget {
  const CameraView(
      {Key? key,
      required this.customPaint,
      required this.onImage,
      required this.poseMatcher,
      this.onCameraFeedReady,
      this.onCameraLensDirectionChanged,
      this.initialCameraLensDirection = CameraLensDirection.back})
      : super(key: key);

  final CustomPaint? customPaint;
  final Function(InputImage inputImage) onImage;
  final VoidCallback? onCameraFeedReady;
  final Function(CameraLensDirection direction)? onCameraLensDirectionChanged;
  final CameraLensDirection initialCameraLensDirection;
  final SquatPoseMatcher? poseMatcher;

  @override
  State<CameraView> createState() => _CameraViewState();
}

class _CameraViewState extends State<CameraView> {
  static List<CameraDescription> _cameras = [];
  CameraController? _controller;
  int _cameraIndex = -1;
  double _currentZoomLevel = 1.0;
  double _minAvailableZoom = 1.0;
  double _maxAvailableZoom = 1.0;
  double _minAvailableExposureOffset = 0.0;
  double _maxAvailableExposureOffset = 0.0;
  double _currentExposureOffset = 0.0;
  bool _changingCameraLens = false;
  bool _showGreat = false;
  bool _showWrong = false;

  @override
  void initState() {
    super.initState();

    _initialize();
  }

  void showGreat() {
    setState(() {
      _showGreat = true;
    });
    Future.delayed(Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _showGreat = false;
        });
      }
    });
  }

  void showWrong() {
    setState(() {
      _showWrong = true;
    });
    Future.delayed(Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _showWrong = false;
        });
      }
    });
  }

  Future _speak() async {
    FlutterTts flutterTts = FlutterTts();
    var result = await flutterTts.speak("Địt mẹ mày");
    // if (result == 1) setState(() => ttsState = TtsState.playing);
  }

  void _initialize() async {
    if (_cameras.isEmpty) {
      _cameras = await availableCameras();
    }
    for (var i = 0; i < _cameras.length; i++) {
      if (_cameras[i].lensDirection == widget.initialCameraLensDirection) {
        _cameraIndex = i;
        break;
      }
    }
    if (_cameraIndex != -1) {
      _startLiveFeed();
    }
  }

  @override
  void dispose() {
    _stopLiveFeed();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: _liveFeedBody());
  }

  Widget _liveFeedBody() {
    if (_cameras.isEmpty) return Container();
    if (_controller == null) return Container();
    if (_controller?.value.isInitialized == false) return Container();
    return Container(
      color: Colors.black,
      child: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          Center(
            child: _changingCameraLens
                ? const Center(
                    child: Text('Changing camera lens'),
                  )
                : CameraPreview(
                    _controller!,
                    child: widget.customPaint,
                  ),
          ),
          _backButton(),
          _switchLiveCameraToggle(),
          // referencePosePane(),
          repsCountPane(),
          // _zoomControl(),
          // _exposureControl(),
          // if (_showGreat)
          greatPosePain(),
          // if (_showWrong)
          wrongPosePain(),
          // showMessage(),
        ],
      ),
    );
  }

  // Widget showMessage() => Positioned(
  //     top: 100,
  //     bottom: 100,
  //     // left: 100,
  //     // right: 100,
  //     child: ElevatedButton(
  //         onPressed: () => showGreat(), child: Text("Show great")));

  Widget referencePosePane() => Positioned(
        top: 40,
        right: 8,
        child: Container(
          padding: const EdgeInsets.all(15),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(30),
          ),
          child: SizedBox(
            height: 176,
            width: 99,
            child: widget.customPaint,
          ),
        ),
      );

  Widget repsCountPane() => Positioned(
        bottom: 130,
        right: 80,
        left: 80,
        child: Container(
          padding: const EdgeInsets.all(15),
          height: 60,
          width: 200,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(30),
          ),
          child: Center(
            child: Text(
              widget.poseMatcher!.debugMessage(),
              style: const TextStyle(
                  color: Color(0xff1B2C56),
                  fontSize: 25,
                  fontWeight: FontWeight.w800),
            ),
          ),
        ),
      );
  Widget wrongPosePain() => Positioned(
        top: 200,
        right: 20,
        left: 20,
        child: LayoutBuilder(
          builder: (context, constraints) {
            // var text = widget.message;
            const text = "Wrong pose! Try again.";
            const textStyle = TextStyle(
              color: Color(0xff1B2C56),
              fontSize: 20,
              fontWeight: FontWeight.w800,
            );

            final textPainter = TextPainter(
              text: TextSpan(text: text, style: textStyle),
              textDirection: TextDirection.ltr,
              maxLines: 1,
            );

            textPainter.layout(maxWidth: constraints.maxWidth - 100);

            final isOverflown = textPainter.didExceedMaxLines;

            return Container(
              padding: const EdgeInsets.all(15),
              height: isOverflown ? null : 75,
              width: 250,
              decoration: BoxDecoration(
                color: const Color(0xffEEF4F4),
                borderRadius: BorderRadius.circular(30),
              ),
              child: Row(children: [
                wrongIcon,
                const SizedBox(width: 10),
                const Expanded(
                  child: Text(
                    text,
                    style: textStyle,
                  ),
                ),
                // button
                ElevatedButton(
                    onPressed: () => _speak(), child: Text("Show great"))
              ]),
            );
          },
        ),
      );

  Widget greatPosePain() => Positioned(
        top: 100,
        right: 20,
        left: 20,
        child: LayoutBuilder(
          builder: (context, constraints) {
            const text = "Great! Let's continue.";
            const textStyle = TextStyle(
              color: Color(0xff1B2C56),
              fontSize: 20,
              fontWeight: FontWeight.w800,
            );

            final textPainter = TextPainter(
              text: const TextSpan(text: text, style: textStyle),
              textDirection: TextDirection.ltr,
              maxLines: 1,
            );

            textPainter.layout(maxWidth: constraints.maxWidth - 100);

            final isOverflown = textPainter.didExceedMaxLines;

            return Container(
              padding: const EdgeInsets.all(15),
              height: isOverflown ? null : 75,
              width: 250,
              decoration: BoxDecoration(
                color: const Color(0xffEEF4F4),
                borderRadius: BorderRadius.circular(30),
              ),
              child: Row(children: [
                greatIcon,
                const SizedBox(width: 10),
                const Expanded(
                  child: Text(
                    text,
                    style: textStyle,
                  ),
                ),
              ]),
            );
          },
        ),
      );

  Widget _backButton() => Positioned(
        top: 40,
        left: 8,
        child: SizedBox(
          height: 50.0,
          width: 50.0,
          child: IconButton(
            icon: backIcon,
            onPressed: () => Navigator.pop(context),
          ),
        ),
      );

  Widget _switchLiveCameraToggle() => Positioned(
        bottom: 8,
        right: 8,
        child: SizedBox(
          height: 50.0,
          width: 50.0,
          child: FloatingActionButton(
            heroTag: Object(),
            onPressed: _switchLiveCamera,
            backgroundColor: Colors.white,
            child: Icon(
              Platform.isIOS
                  ? Icons.flip_camera_ios_outlined
                  : Icons.flip_camera_android_outlined,
              size: 25,
            ),
          ),
        ),
      );

  Future _startLiveFeed() async {
    final camera = _cameras[_cameraIndex];
    _controller = CameraController(
      camera,
      ResolutionPreset.high,
      enableAudio: false,
      imageFormatGroup: Platform.isAndroid
          ? ImageFormatGroup.nv21
          : ImageFormatGroup.bgra8888,
    );
    _controller?.initialize().then((_) {
      if (!mounted) {
        return;
      }
      _controller?.getMinZoomLevel().then((value) {
        _currentZoomLevel = value;
        _minAvailableZoom = value;
      });
      _controller?.getMaxZoomLevel().then((value) {
        _maxAvailableZoom = value;
      });
      _currentExposureOffset = 0.0;
      _controller?.getMinExposureOffset().then((value) {
        _minAvailableExposureOffset = value;
      });
      _controller?.getMaxExposureOffset().then((value) {
        _maxAvailableExposureOffset = value;
      });
      _controller?.startImageStream(_processCameraImage).then((value) {
        if (widget.onCameraFeedReady != null) {
          widget.onCameraFeedReady!();
        }
        if (widget.onCameraLensDirectionChanged != null) {
          widget.onCameraLensDirectionChanged!(camera.lensDirection);
        }
      });
      setState(() {});
    });
  }

  Future _stopLiveFeed() async {
    await _controller?.stopImageStream();
    await _controller?.dispose();
    _controller = null;
  }

  Future _switchLiveCamera() async {
    setState(() => _changingCameraLens = true);
    _cameraIndex = (_cameraIndex + 1) % _cameras.length;

    await _stopLiveFeed();
    await _startLiveFeed();
    setState(() => _changingCameraLens = false);
  }

  void _processCameraImage(CameraImage image) {
    final inputImage = _inputImageFromCameraImage(image);
    if (inputImage == null) return;
    widget.onImage(inputImage);
  }

  final _orientations = {
    DeviceOrientation.portraitUp: 0,
    DeviceOrientation.landscapeLeft: 90,
    DeviceOrientation.portraitDown: 180,
    DeviceOrientation.landscapeRight: 270,
  };

  InputImage? _inputImageFromCameraImage(CameraImage image) {
    if (_controller == null) return null;

    // get image rotation
    // it is used in android to convert the InputImage from Dart to Java: https://github.com/flutter-ml/google_ml_kit_flutter/blob/master/packages/google_mlkit_commons/android/src/main/java/com/google_mlkit_commons/InputImageConverter.java
    // `rotation` is not used in iOS to convert the InputImage from Dart to Obj-C: https://github.com/flutter-ml/google_ml_kit_flutter/blob/master/packages/google_mlkit_commons/ios/Classes/MLKVisionImage%2BFlutterPlugin.m
    // in both platforms `rotation` and `camera.lensDirection` can be used to compensate `x` and `y` coordinates on a canvas: https://github.com/flutter-ml/google_ml_kit_flutter/blob/master/packages/example/lib/vision_detector_views/painters/coordinates_translator.dart
    final camera = _cameras[_cameraIndex];
    final sensorOrientation = camera.sensorOrientation;
    // print(
    //     'lensDirection: ${camera.lensDirection}, sensorOrientation: $sensorOrientation, ${_controller?.value.deviceOrientation} ${_controller?.value.lockedCaptureOrientation} ${_controller?.value.isCaptureOrientationLocked}');
    InputImageRotation? rotation;
    if (Platform.isIOS) {
      rotation = InputImageRotationValue.fromRawValue(sensorOrientation);
    } else if (Platform.isAndroid) {
      var rotationCompensation =
          _orientations[_controller!.value.deviceOrientation];
      if (rotationCompensation == null) return null;
      if (camera.lensDirection == CameraLensDirection.front) {
        // front-facing
        rotationCompensation = (sensorOrientation + rotationCompensation) % 360;
      } else {
        // back-facing
        rotationCompensation =
            (sensorOrientation - rotationCompensation + 360) % 360;
      }
      rotation = InputImageRotationValue.fromRawValue(rotationCompensation);
      // print('rotationCompensation: $rotationCompensation');
    }
    if (rotation == null) return null;
    // print('final rotation: $rotation');

    // get image format
    final format = InputImageFormatValue.fromRawValue(image.format.raw);
    if (format == null ||
        (Platform.isAndroid && format != InputImageFormat.nv21) ||
        (Platform.isIOS && format != InputImageFormat.bgra8888)) return null;
    if (image.planes.length != 1) return null;
    final plane = image.planes.first;
    return InputImage.fromBytes(
      bytes: plane.bytes,
      metadata: InputImageMetadata(
        size: Size(image.width.toDouble(), image.height.toDouble()),
        rotation: rotation, // used only in Android
        format: format, // used only in iOS
        bytesPerRow: plane.bytesPerRow, // used only in iOS
      ),
    );
  }
}
