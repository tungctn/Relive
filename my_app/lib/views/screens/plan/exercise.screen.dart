import 'package:fit_worker/utils/icon.dart';
import 'package:fit_worker/views/screens/plan/instruction.screen.dart';
import 'package:flutter/material.dart';

class ExercisePlan extends StatelessWidget {
  const ExercisePlan({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 200,
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/images/video.png"),
              fit: BoxFit.cover,
            ),
          ),
        ),
        leading: Align(
          alignment: Alignment.topLeft,
          child: IconButton(
            icon: closeIcon,
            onPressed: () => Navigator.pop(context),
          ),
        ),
      ),
      body: SingleChildScrollView(
          child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: Color(0xffEEF4F4),
              ),
              child: Column(
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
                          fontFamily: 'PlusBold',
                        ),
                      ),
                      Container(
                        // margin: const EdgeInsets.only(left: 5, top: 20),
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
                            fontSize: 12,
                            fontFamily: 'PlusRegular'
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
                        fontFamily: 'PlusBold'
                      ),
                    ),
                  ),
                  Center(
                    child: ElevatedButton(
                      style: ButtonStyle(
                          minimumSize:
                              MaterialStateProperty.all(const Size(300, 40)),
                          alignment: Alignment.center,
                          backgroundColor: MaterialStateProperty.all(
                              const Color(0xFF1B2C56))),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const InstructionScreen()),
                        );
                      },
                      child: const Text(
                        'Start Session  ->',
                        style: TextStyle(color: Colors.white, fontSize: 15, fontFamily: 'PlusBold'),
                      ),
                    ),
                  )
                ],
              )),
          Container(
            padding:
                const EdgeInsets.only(left: 20, right: 20, top: 10, bottom: 10),
            child: Row(
              children: [
                Text(
                  "1 of 5 exercises completed",
                  style: TextStyle(
                    color: Color(0xff1B2C56),
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                    fontFamily: 'PlusBold'
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: LinearProgressIndicator(
                      value: 1 / 5,
                      color: Color(0xff1B2C56),
                      backgroundColor: Colors.grey[300],
                    ),
                  ),
                ),
              ],
            ),
          ),
          const Divider(
            color: Color(0xFFF4F4F4),
            thickness: 1,
            indent: 0,
            endIndent: 0,
          ),
          const SizedBox(height: 10),
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(bottom: 20, left: 20),
            child: const Text(
              "What to expect",
              style: TextStyle(
                color: Color(0xff1B2C56),
                fontWeight: FontWeight.bold,
                fontSize: 20,
                fontFamily: 'PlusBold'
              ),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(bottom: 5, left: 20),
            child: const Text(
              "This exercise tackles these of your problems:",
              style: TextStyle(
                color: Color(0xff1B2C56),
                fontWeight: FontWeight.w400,
                fontSize: 14,
                fontFamily: 'PlusRegular'
              ),
            ),
          ),
          Row(children: [
            Container(
              margin: const EdgeInsets.only(left: 20),
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
                  fontSize: 10,
                  fontFamily: 'PlusRegular'
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(left: 5),
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
                  fontSize: 10,
                  fontFamily: 'PlusRegular'
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
            margin: const EdgeInsets.only(bottom: 20, left: 20),
            child: const Text(
              "How does it work",
              style: TextStyle(
                color: Color(0xff1B2C56),
                fontWeight: FontWeight.bold,
                fontSize: 20,
                fontFamily: 'PlusBold'
              ),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(bottom: 5, left: 20),
            child: const Text(
              "• First, this is just some mocks for the prototype",
              style: TextStyle(
                color: Color(0xff1B2C56),
                fontWeight: FontWeight.w400,
                fontSize: 14,
                fontFamily: 'PlusRegular'
              ),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(bottom: 5, left: 20),
            child: const Text(
              "• Second, when we stretch down, be careful if there is anybody behind you",
              style: TextStyle(
                color: Color(0xff1B2C56),
                fontWeight: FontWeight.w400,
                fontSize: 14,
                fontFamily: 'PlusRegular'
              ),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(bottom: 5, left: 20),
            child: const Text(
              "• Lastly, be happy because life is good man!",
              style: TextStyle(
                color: Color(0xff1B2C56),
                fontWeight: FontWeight.w400,
                fontSize: 14,
                fontFamily: 'PlusRegular'
              ),
            ),
          ),
          const SizedBox(height: 10),
          const Divider(
            color: Color(0xFFF4F4F4),
            thickness: 1,
            indent: 0,
            endIndent: 0,
          ),
        ],
      )),
    );
  }
}
