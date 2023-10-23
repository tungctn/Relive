import 'package:fit_worker/views/screens/plan/detail_plan.screen.dart';
import 'package:flutter/material.dart';
import 'package:dotted_line/dotted_line.dart';

class PlanCard extends StatelessWidget {
  final planCard;
  const PlanCard({Key? key, this.planCard}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const SizedBox(width: 10),
        Column(
          children: [
            const DottedLine(
              direction: Axis.vertical,
              lineThickness: 3,
              dashColor: Color(0xFFBDC9E5),
              lineLength: 60,
              dashLength: 12,
            ),
            Icon(
              planCard["isSelected"]
                  ? Icons.check_circle
                  : Icons.circle_outlined,
              size: 30,
            ),
            const DottedLine(
              direction: Axis.vertical,
              lineThickness: 3,
              dashColor: Color(0xFFBDC9E5),
              lineLength: 55,
              dashLength: 12,
            ),
          ],
        ),
        Expanded(
            child: InkWell(
          onTap: () {
            if (planCard["isSelected"]) {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const DetailPlanScreen()));
            }
          },
          child: Container(
            margin: const EdgeInsets.only(left: 5, right: 15),
            child: Stack(
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Container(
                            height: 130,
                            padding: const EdgeInsets.only(
                                left: 20, right: 20, top: 30),
                            decoration: BoxDecoration(
                              borderRadius: const BorderRadius.vertical(
                                top: Radius.circular(30),
                                bottom: Radius.circular(30),
                              ),
                              color: Color(planCard["bgColor"]),
                            ),
                            child: Column(
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      flex: 4,
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          SizedBox(
                                              width: 200,
                                              child: Text(
                                                planCard["title"],
                                                style: const TextStyle(
                                                    fontSize: 18,
                                                    fontWeight: FontWeight.w700,
                                                    color: Color(0xFF1B2C56),
                                                    fontFamily: 'PlusBold'),
                                              )),
                                          const SizedBox(height: 4),
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.start,
                                            children: [
                                              planCard["Icon1"],
                                              const SizedBox(width: 5),
                                              Text(
                                                planCard["Text1"],
                                                style: const TextStyle(
                                                    color: Color(0xFF1B2C56),
                                                    fontFamily: 'PlusSemiBold'),
                                              ),
                                              const SizedBox(width: 14),
                                              planCard["Icon2"],
                                              const SizedBox(width: 5),
                                              Text(
                                                planCard["Text2"],
                                                style: const TextStyle(
                                                    color: Color(0xFF1B2C56),
                                                    fontFamily: 'PlusSemiBold'),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    const Expanded(
                                      flex: 1,
                                      child: Text(""),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                Positioned(
                  right: 18,
                  bottom: 0,
                  child: planCard["Layer"],
                ),
              ],
            ),
          ),
        )),
      ],
    );
  }
}
