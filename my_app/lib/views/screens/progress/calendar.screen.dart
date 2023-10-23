import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

class CalendarScreen extends StatefulWidget {
  const CalendarScreen({Key? key}) : super(key: key);

  @override
  State<CalendarScreen> createState() => CalendarScreenState();
}

class CalendarScreenState extends State<CalendarScreen> {
  CalendarFormat _format = CalendarFormat.month;
  DateTime _focusDay = DateTime.now();
  DateTime _currentDay = DateTime.now();
  int? _currentIndex;
  bool _isWeekend = false;
  bool _dateSelected = false;
  bool _timeSelected = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.only(bottom: 30), // Adjust this value as needed
            child: Text("Progress",
                style: TextStyle(
                    color: Color(0xff1B2C56),
                    fontSize: 20,
                    fontWeight: FontWeight.bold)),
          ),
          Align(
              alignment: Alignment.centerLeft,
              child: Container(
                  margin: const EdgeInsets.only(left: 20, bottom: 10),
                  child: const Text(
                    "Activity",
                    style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                        color: Color(0xff1B2C56)),
                  ))),
          Container(
            margin: const EdgeInsets.only(left: 30, right: 30),
            child: Image.asset(
              "assets/images/calendar.png",
              // width: 304,
              // height: 284,
              fit: BoxFit.cover,
            ),
          ),
          Align(
              alignment: Alignment.centerLeft,
              child: Container(
                  margin: const EdgeInsets.only(left: 20, bottom: 10),
                  child: const Text(
                    "Pain progress",
                    style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                        color: Color(0xff1B2C56)),
                  ))),
          Image.asset(
            "assets/images/progress.png",
            fit: BoxFit.cover,
            // width: 315,
            // height: 242,
          ),
        ],
      ),
    ));
  }

  Widget tableCalendar() {
    return TableCalendar(
      selectedDayPredicate: (day) {
        return isSameDay(day, DateTime(2023, 8, 15));
      },
      focusedDay: _focusDay,
      firstDay: DateTime.now(),
      lastDay: DateTime(2023, 12, 31),
      calendarFormat: _format,
      currentDay: _currentDay,
      rowHeight: 48,
      availableCalendarFormats: const {
        CalendarFormat.month: 'Month',
      },
      headerStyle: const HeaderStyle(
        titleCentered: true,
        formatButtonVisible: false,
        titleTextStyle: TextStyle(
          fontSize: 25,
          color: Color(0xff1B2C56),
          fontWeight: FontWeight.bold,
        ),
      ),
      calendarStyle: const CalendarStyle(
        defaultTextStyle: TextStyle(color: Color(0xff1B2C56), fontSize: 20),
        todayDecoration: BoxDecoration(
          color: Color(0xffA4D869),
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
        todayTextStyle: TextStyle(
          color: Color(0xff1B2C56),
          fontWeight: FontWeight.bold,
        ),
        selectedDecoration: BoxDecoration(
          color: Color(0xffA4D869),
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
        selectedTextStyle: TextStyle(color: Color(0xff1B2C56)),
      ),
    );
  }
}
