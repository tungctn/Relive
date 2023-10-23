import 'package:fit_worker/utils/icon.dart';
import 'package:fit_worker/views/screens/pose_detector.screen.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class InstructionScreen extends StatefulWidget {
  const InstructionScreen({Key? key}) : super(key: key);

  @override
  _InstructionScreenState createState() => _InstructionScreenState();
}

class _InstructionScreenState extends State<InstructionScreen> {
  late VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.asset('assets/videos/squat.mp4')
      ..initialize().then((_) {
        _controller.play();
        _controller.setLooping(true);
        setState(() {});
      });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 500,
        flexibleSpace: Container(
          child: _controller.value.isInitialized
              ? AspectRatio(
                  aspectRatio: _controller.value.aspectRatio,
                  child: VideoPlayer(_controller),
                )
              : const Center(child: CircularProgressIndicator()),
        ),
        leading: Align(
          alignment: Alignment.topLeft,
          child: IconButton(
            icon: backIcon,
            onPressed: () => Navigator.pop(context),
          ),
        ),
      ),
      body: SingleChildScrollView(
          child: Container(
        padding: const EdgeInsets.all(20),
        decoration: const BoxDecoration(
          color: Color(0xffEEF4F4),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      "Exercise 01",
                      style: TextStyle(
                        color: Color(0xff1B2C56),
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.only(
                          left: 10, right: 10, top: 5, bottom: 5),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        color: Colors.white,
                      ),
                      child: const Text(
                        "03 mins",
                        style: TextStyle(
                          color: Color(0xff1B2C56),
                          fontWeight: FontWeight.w400,
                          fontSize: 14,
                        ),
                      ),
                    ),
                  ],
                ),
                Container(
                  margin: const EdgeInsets.only(top: 15, bottom: 15),
                  child: const Text(
                    "Stretch down with square arms",
                    style: TextStyle(
                      color: Color(0xff1B2C56),
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                ),
                Center(
                  child: ElevatedButton(
                    style: ButtonStyle(
                        minimumSize:
                            MaterialStateProperty.all(const Size(300, 40)),
                        alignment: Alignment.center,
                        backgroundColor:
                            MaterialStateProperty.all(const Color(0xFF1B2C56))),
                    onPressed: () {
                      _controller.pause(); // Pause the video
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const PoseDetectorView()),
                      ).then((value) {
                        // This block will be executed when you pop 'PoseDetectorView'
                        _controller.play(); // Resume the video
                      });
                    },
                    child: const Text(
                      'Skip guide video  ->',
                      style: TextStyle(color: Colors.white, fontSize: 14),
                    ),
                  ),
                )
              ],
            ),
          ],
        ),
      )),
    );
  }
}
