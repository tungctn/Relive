import 'package:fit_worker/views/screens/plan/exercise.screen.dart';
import 'package:flutter/material.dart';
import 'package:fit_worker/utils/icon.dart';
import 'package:fit_worker/utils/image.dart';

class DetailPlanScreen extends StatefulWidget {
  const DetailPlanScreen({
    super.key,
  });

  @override
  _DetailPlanScreenState createState() => _DetailPlanScreenState();
}

class _DetailPlanScreenState extends State<DetailPlanScreen> {
  late String selected;
  final imagesList = [
    squadImg,
    squadImg,
    squadImg,
  ];
  @override
  void initState() {
    super.initState();
    selected = '8 mins';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 200,
        backgroundColor: const Color(0xFFB9E9FD),
        leading: Align(
          alignment: Alignment.topLeft,
          child: IconButton(
            icon: closeIcon,
            onPressed: () => Navigator.pop(context),
          ),
        ),
        title: Align(
          alignment: Alignment.bottomCenter,
          child: SizedBox(
            height: 200,
            width: 250,
            child: exerciseIcon,
          ),
        ),
      ),
      body: Column(
        children: [
          Row(children: [
            Container(
                margin: const EdgeInsets.only(left: 20, top: 20),
                padding: const EdgeInsets.only(
                    left: 10, top: 7, bottom: 7, right: 10),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: const Color(0xffEEF4F4),
                ),
                child: Row(children: [
                  Container(
                    color: Colors.transparent,
                    height: 12,
                    width: 12,
                    child: fitnessIcon,
                  ),
                  const SizedBox(width: 5),
                  const Text(
                    "Chest",
                    style: TextStyle(
                      color: Color(0xff1B2C56),
                      fontSize: 10,
                      fontFamily: 'PlusSemiBold'
                    ),
                  ),
                ])),
            Container(
                margin: const EdgeInsets.only(left: 7, top: 20),
                padding: const EdgeInsets.only(
                    left: 10, top: 7, bottom: 7, right: 12),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: const Color(0xffEEF4F4),
                ),
                child: Row(children: [
                  Container(
                    child: fitnessIcon,
                    color: Colors.transparent,
                    height: 12,
                    width: 12,
                  ),
                  const SizedBox(width: 5),
                  const Text(
                    "Knee",
                    style: TextStyle(
                      color: Color(0xff1B2C56),
                      fontSize: 10,
                      fontFamily: 'PlusSemiBold'
                    ),
                  ),
                ])),
          ]),
          const SizedBox(height: 10),
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(bottom: 5, left: 20),
            child: const Text(
              "Today recovery session",
              style: TextStyle(
                color: Color(0xff1B2C56),
                fontSize: 28,
                fontFamily: 'PlusBold'
              ),
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Container(
              alignment: Alignment.centerLeft,
              margin: const EdgeInsets.only(left: 20),
              child: const Text(
                "Created only for you, based on what you told us: ",
                style: TextStyle(
                  color: Color(0xff5B6172),
                  fontWeight: FontWeight.normal,
                  fontFamily: "PlusRegular",
                  fontSize: 14,
                ),
              )),
          Row(children: [
            const SizedBox(width: 13),
            Container(
              margin: const EdgeInsets.only(left: 5, top: 5),
              padding:
                  const EdgeInsets.only(left: 10, right: 10, top: 5, bottom: 5),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: const Color(0xffEEF4F4),
              ),
              child: const Text(
                "chest pain",
                style: TextStyle(
                  color: Color(0xff1B2C56),
                  fontWeight: FontWeight.w400,
                  fontFamily: 'PlusRegular',
                  fontSize: 10,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(left: 5, top: 5),
              padding:
                  const EdgeInsets.only(left: 10, right: 10, top: 5, bottom: 5),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: const Color(0xffEEF4F4),
              ),
              child: const Text(
                "moderate level",
                style: TextStyle(
                  color: Color(0xff1B2C56),
                  fontWeight: FontWeight.w400,
                  fontFamily: 'PlusRegular',
                  fontSize: 10,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(left: 5, top: 5),
              padding:
                  const EdgeInsets.only(left: 10, right: 10, top: 5, bottom: 5),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: const Color(0xffEEF4F4),
              ),
              child: const Text(
                "knee pain",
                style: TextStyle(
                  color: Color(0xff1B2C56),
                  fontWeight: FontWeight.w400,
                  fontFamily: 'PlusRegular',
                  fontSize: 10,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(left: 5, top: 5),
              padding:
                  const EdgeInsets.only(left: 10, right: 10, top: 5, bottom: 5),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: const Color(0xffEEF4F4),
              ),
              child: const Text(
                "mild level",
                style: TextStyle(
                  color: Color(0xff1B2C56),
                  fontWeight: FontWeight.w400,
                  fontFamily: 'PlusRegular',
                  fontSize: 10,
                ),
              ),
            ),
          ]),
          const SizedBox(height: 10),
          const Divider(
            color: Color(0xFFF4F4F4),
            thickness: 1,
            indent: 0,
            endIndent: 0,
          ),
          const SizedBox(height: 10),
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(bottom: 10, left: 20),
            child: const Text(
              "Session lengths for today",
              style: TextStyle(
                color: Color(0xff1B2C56),
                fontWeight: FontWeight.bold,
                fontFamily: 'PlusBold',
                fontSize: 20,
              ),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(bottom: 10, left: 20),
            child: const Text(
              "Select your session length and preview the exercises below",
              style: TextStyle(
                color: Color(0xff1B2C56),
                fontWeight: FontWeight.w400,
                fontFamily: 'PlusRegular',
                fontSize: 14,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(5),
            margin: const EdgeInsets.only(left: 20, right: 20),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              color: const Color(0xffEEF4F4),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              mainAxisSize: MainAxisSize.max,
              children: [
                Expanded(
                  child: TextButton(
                    style: TextButton.styleFrom(
                      foregroundColor: selected == '8 mins'
                          ? Colors.white
                          : const Color(0xff1B2C56),
                      padding: const EdgeInsets.symmetric(vertical: 15),
                      backgroundColor: selected == '8 mins'
                          ? const Color(0xFF4073C7)
                          : const Color(0xffEEF4F4),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                    ),
                    onPressed: () {
                      setState(() {
                        selected = '8 mins';
                      });
                    },
                    child: Column(children: [
                      const Text('8 mins', style: TextStyle(fontSize: 18, fontFamily: 'PlusBold')),
                      if (selected == '8 mins')
                        const Text('1 round',
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.w400, fontFamily: 'PlusRegular'))
                    ]),
                  ),
                ),
                Expanded(
                  child: TextButton(
                    style: TextButton.styleFrom(
                      foregroundColor: selected == '20 mins'
                          ? Colors.white
                          : const Color(0xff1B2C56),
                      padding: const EdgeInsets.symmetric(vertical: 15),
                      backgroundColor: selected == '20 mins'
                          ? const Color(0xFF4073C7)
                          : const Color(0xffEEF4F4),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                    ),
                    onPressed: () {
                      setState(() {
                        selected = '20 mins';
                      });
                    },
                    child: Column(children: [
                      const Text('20 mins', style: TextStyle(fontSize: 18, fontFamily: 'PlusBold')),
                      if (selected == '20 mins')
                        const Text('4 round',
                            style: TextStyle(
                                fontSize: 12, fontWeight: FontWeight.w400, fontFamily: 'PlusRegular'))
                    ]),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          const Divider(
            color: Color(0xFFF4F4F4),
            thickness: 1,
            indent: 0,
            endIndent: 0,
          ),
          Expanded(
              child: Stack(
            children: [
              Opacity(
                opacity: 0.5,
                child: SizedBox(
                  height: 145,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: imagesList.length,
                    itemBuilder: (context, index) {
                      return Padding(
                          padding: const EdgeInsets.only(top: 10, left: 20),
                          child: Image.asset(
                            "assets/images/squad.jpeg",
                            // width: 200,
                            // height: 200,
                          ));
                    },
                  ),
                ),
              ),
              Positioned(
                bottom: 60,
                left: 0,
                right: 0,
                child: Center(
                  child: ElevatedButton(
                      style: ButtonStyle(
                          minimumSize:
                              MaterialStateProperty.all(const Size(220, 55)),
                          maximumSize:
                              MaterialStateProperty.all(const Size(320, 85)),
                          alignment: Alignment.center,
                          backgroundColor: MaterialStateProperty.all(
                              const Color(0xFF1B2C56))),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const ExercisePlan()),
                        );
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Start Session',
                            style: TextStyle(color: Colors.white, fontSize: 16, fontFamily: 'PlusSemiBold'),
                          ),
                          SizedBox(
                            width: 5,
                          ),
                          Icon(
                            Icons.arrow_forward_outlined,
                            color: Colors.white,
                            size: 17,
                          ),
                        ],
                      )),
                ),
              ),
            ],
          )),
        ],
      ),
    );
  }
}
