import 'package:fit_worker/services/notification.service.dart';
import 'package:fit_worker/utils/constants.dart';
import 'package:fit_worker/utils/icon.dart';
import 'package:fit_worker/views/components/plan/plan.card.dart';
import 'package:fit_worker/views/components/plan/plan.list.after.dart';
import 'package:fit_worker/views/components/plan/plan.list.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TodayScreen extends StatefulWidget {
  const TodayScreen({Key? key}) : super(key: key);

  @override
  _TodayScreenState createState() => _TodayScreenState();
}

class _TodayScreenState extends State<TodayScreen> {
  
  void _showTimePiker() {
    showTimePicker(context: context, initialTime: TimeOfDay.now())
        .then((value) => {
              NotificationService().sendNotification({
                "hour": value?.hour,
                "minute": value?.minute,
              })
            });
  }

  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      // padding: const EdgeInsets.only(top: 5, bottom: 5),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            height: 100,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  margin: const EdgeInsets.only(bottom: 5),
                  child: const Text(
                    "Today's Plan",
                    style: TextStyle(
                      color: Color(0xff1B2C56),
                      fontWeight: FontWeight.w800,
                      fontSize: 28,
                      fontFamily: 'PlusSemiBold'
                    ),
                  ),
                ),
                const Text(
                  "This is your plan for today based on your progress",
                  style: TextStyle(
                    color: Color(0xff5B6172),
                    fontWeight: FontWeight.normal,
                    fontSize: 14,
                    fontFamily: 'PlusBold'
                  ),
                ),
              ],
            ),
          ),
          

          //Row two Container --> Container 1 margin-left & crossAxis start / Container 2 margin right & crossAxis end
          Container(
            height: 40,
              margin: const EdgeInsets.only(left: 40, right: 20),
              alignment: Alignment.centerLeft,
              
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const SizedBox(width: 10),
                  const Text(
                    "Before work",
                    style: TextStyle(
                      color: Color(0xFF1B2C56),
                      fontWeight: FontWeight.w800,
                      fontSize: 18,
                      fontFamily: 'PlusSemiBold',
                    ),
                  ),
                  const SizedBox(width: 75),
                  GestureDetector(
                    onTap: _showTimePiker,
                    child: Container(
                      height: 28,
                      padding: const EdgeInsets.only(left: 10,right: 10),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(25),
                        border: Border.all(
                          color: const Color(0xff646B7B),
                          width: 1,
                        ),
                      ),
                      child: Row(
                        children: [
                          const Text(
                            "Set Timer Here",
                            style: TextStyle(
                              color: Color(0xff646B7B),
                              fontWeight: FontWeight.normal,
                              fontSize: 13,
                              fontFamily: 'PlusRegular'
                            ),
                          ),
                          Container(color: Colors.transparent,width: 15,height: 15,child: clockIcon,),
                        ],
                      ),
                    ),
                  )
                ],
              )),
          Container(height:300, child: PlanList()),


          //Row two Container --> Container 1 margin-left & crossAxis start / Container 2 margin right & crossAxis end
          Container(
            height: 25,
            margin: const EdgeInsets.only(left: 40, right: 20),
              alignment: Alignment.centerLeft,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const SizedBox(width: 10),
                  const Text(
                    "Before lunch",
                    style: TextStyle(
                      color: Color(0xFF1B2C56),
                      fontWeight: FontWeight.w800,
                      fontSize: 18,
                      fontFamily: 'PlusSemiBold',
                    ),
                  ),
                  const SizedBox(width: 75),
                  GestureDetector(
                    onTap: _showTimePiker,
                    child: Container(
                      height: 28,
                      padding: const EdgeInsets.only(left: 10,right: 10),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(25),
                        border: Border.all(
                          color: const Color(0xff646B7B),
                          width: 1,
                        ),
                      ),
                      child: Row(
                        children: [
                          const Text(
                            "Set Timer Here",
                            style: TextStyle(
                              color: Color(0xff646B7B),
                              fontWeight: FontWeight.normal,
                              fontSize: 13,
                              fontFamily: 'PlusRegular'
                            ),
                          ),
                          Container(color: Colors.transparent,width: 15,height: 15,child: clockIcon,),
                        ],
                      ),
                    ),
                  )
                ],
              )),
              Container( child: PlanCard(planCard: planCardsafter[0],)),
              
              Container(
                height: 25,
                margin: const EdgeInsets.only(left: 40, right: 20),
                alignment: Alignment.centerLeft,
                child: const Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    SizedBox(width: 10),
                    Text(
                      "Got time for more?",
                      style: TextStyle(
                        color: Color(0xFF1B2C56),
                        fontWeight: FontWeight.w800,
                        fontSize: 18,
                        fontFamily: 'PlusSemiBold',
                      ),
                    ),
                  ],
                )),
                
              Container(child: PlanCard(planCard: planCardsafter[1],))
        ],
        
      ),
    );
  }
}
