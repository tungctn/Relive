import 'package:fit_worker/views/screens/pose_detector.screen.dart';
import 'package:flutter/material.dart';
import 'package:fit_worker/views/components/search_bar.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    void onPressed() {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const PoseDetectorView()),
      );
    }

    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 50),
            Container(
              padding: const EdgeInsets.only(left: 16.0, right: 16.0),
              child: const Text(
                'AlignAI',
                style: TextStyle(
                  color: Color(0xFFFE7C7C),
                  fontWeight: FontWeight.bold,
                  fontSize: 28.0,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(left: 16.0, right: 16.0),
              child: const Text(
                'Master Your Body Alignment',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.w400,
                  fontSize: 18.0,
                ),
              ),
            ),
            const SizedBox(height: 10),
            Image.asset('images/align.PNG'),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.only(left: 16.0, right: 16.0),
              child: const SizedBox(
                child: SearchBarComponent('What pose do you wish to align?'),
              ),
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.only(left: 16.0, right: 16.0),
              child: const Text(
                'Strength Alignment',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.w600,
                  fontSize: 24.0,
                ),
              ),
            ),
            SizedBox(
              height: 150,
              child: ListView(
                padding: const EdgeInsets.symmetric(vertical: 5.0),
                scrollDirection: Axis.horizontal,
                children: [
                  Stack(
                    children: <Widget>[
                      Container(
                        width: 140,
                        height: 140,
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.white),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                            ),
                          ),
                          child: Container(
                              padding: const EdgeInsets.all(10.0),
                              child: Image.asset('images/crunch.PNG')),
                          onPressed: () {
                            print('hello');
                          },
                        ),
                      ),
                    ],
                  ),
                  Stack(
                    children: <Widget>[
                      Container(
                        width: 140,
                        height: 140,
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.white),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                            ),
                          ),
                          onPressed: onPressed,
                          child: Container(
                              padding: const EdgeInsets.all(10.0),
                              child: Image.asset('images/arm_press.PNG')),
                        ),
                      ),
                    ],
                  ),
                  Stack(
                    children: <Widget>[
                      Container(
                        width: 140,
                        height: 140,
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.white),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                            ),
                          ),
                          child: Container(
                              padding: const EdgeInsets.all(10.0),
                              child: Image.asset('images/push_up.PNG')),
                          onPressed: () {
                            print('hello');
                          },
                        ),
                      ),
                    ],
                  ),
                  Stack(
                    children: <Widget>[
                      Container(
                        width: 140,
                        height: 140,
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.white),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                            ),
                          ),
                          onPressed: onPressed,
                          child: Container(
                              padding: const EdgeInsets.all(10.0),
                              child: Image.asset('images/squat.PNG')),
                        ),
                      ),
                    ],
                  ),
                  Stack(
                    children: <Widget>[
                      Container(
                        width: 140,
                        height: 140,
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.white),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                            ),
                          ),
                          child: Container(
                              padding: const EdgeInsets.all(10.0),
                              child: Image.asset('images/plank.PNG')),
                          onPressed: () {
                            print('hello');
                          },
                        ),
                      ),
                    ],
                  ),
                  Stack(
                    children: <Widget>[
                      Container(
                        width: 140,
                        height: 140,
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.white),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                            ),
                          ),
                          child: Container(
                              padding: const EdgeInsets.all(10.0),
                              child: Image.asset('images/lunge_squat.PNG')),
                          onPressed: () {
                            print('hello');
                          },
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 15.0),
            Container(
              padding: const EdgeInsets.only(left: 16.0, right: 16.0),
              child: const Text(
                'Yoga Alignment',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.w600,
                  fontSize: 24.0,
                ),
              ),
            ),
            Container(
              child: SizedBox(
                height: 150,
                child: ListView(
                  padding: const EdgeInsets.symmetric(vertical: 5.0),
                  scrollDirection: Axis.horizontal,
                  children: [
                    Stack(
                      children: <Widget>[
                        Container(
                          width: 140,
                          height: 140,
                          padding: const EdgeInsets.symmetric(horizontal: 10.0),
                          child: ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.white),
                              shape: MaterialStateProperty.all<
                                  RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(18.0),
                                ),
                              ),
                            ),
                            child: Container(
                                padding: const EdgeInsets.all(10.0),
                                child: Image.asset('images/yoga1.PNG')),
                            onPressed: () {
                              print('hello');
                            },
                          ),
                        ),
                      ],
                    ),
                    Stack(
                      children: <Widget>[
                        Container(
                          width: 140,
                          height: 140,
                          padding: const EdgeInsets.symmetric(horizontal: 10.0),
                          child: ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.white),
                              shape: MaterialStateProperty.all<
                                  RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(18.0),
                                ),
                              ),
                            ),
                            onPressed: onPressed,
                            child: Container(
                                padding: const EdgeInsets.all(10.0),
                                child: Image.asset('images/yoga4.PNG')),
                          ),
                        ),
                      ],
                    ),
                    Stack(
                      children: <Widget>[
                        Container(
                          width: 140,
                          height: 140,
                          padding: const EdgeInsets.symmetric(horizontal: 10.0),
                          child: ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.white),
                              shape: MaterialStateProperty.all<
                                  RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(18.0),
                                ),
                              ),
                            ),
                            child: Container(
                                padding: const EdgeInsets.all(10.0),
                                child: Image.asset('images/yoga2.PNG')),
                            onPressed: () {
                              print('hello');
                            },
                          ),
                        ),
                      ],
                    ),
                    Stack(
                      children: <Widget>[
                        Container(
                          width: 140,
                          height: 140,
                          padding: const EdgeInsets.symmetric(horizontal: 10.0),
                          child: ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.white),
                              shape: MaterialStateProperty.all<
                                  RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(18.0),
                                ),
                              ),
                            ),
                            child: Container(
                                padding: const EdgeInsets.all(10.0),
                                child: Image.asset('images/yoga3.PNG')),
                            onPressed: () {
                              print('hello');
                            },
                          ),
                        ),
                      ],
                    ),
                    Stack(
                      children: <Widget>[
                        Container(
                          width: 140,
                          height: 140,
                          padding: const EdgeInsets.symmetric(horizontal: 10.0),
                          child: ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.white),
                              shape: MaterialStateProperty.all<
                                  RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(18.0),
                                ),
                              ),
                            ),
                            child: Container(
                                padding: const EdgeInsets.all(10.0),
                                child: Image.asset('images/yoga5.PNG')),
                            onPressed: () {
                              print('hello');
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
