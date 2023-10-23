// import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:fit_worker/views/screens/auth/login.screen.dart';
import 'package:fit_worker/views/screens/home.screen.dart';
import 'package:fit_worker/views/screens/plan/today.screen.dart';
import 'package:fit_worker/views/screens/progress/calendar.screen.dart';
import 'package:flutter/material.dart';
import 'package:fit_worker/config/firebase.dart';
import 'package:fit_worker/utils/icon.dart';

class Navigation extends StatefulWidget {
  const Navigation({super.key});

  @override
  NavigationState createState() => NavigationState();
}

class NavigationState extends State<Navigation> {
  int _selectedIndex = 0;
  static final List<Widget> _widgetOptions = <Widget>[
    const TodayScreen(),
    const CalendarScreen(),
    const LoginScreen(),
    const HomeScreen(),
  ];

  @override
  void initState() {
    super.initState();
    checkLoginAndInitFCM();
    // AwesomeNotifications().isNotificationAllowed().then((isAllowed) => {
    //       if (isAllowed)
    //         {AwesomeNotifications().requestPermissionToSendNotifications()}
    //     });
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: Container(
        // height: 80,
        decoration: const BoxDecoration(
            border: Border(
                top: BorderSide(
          color: Color(0xFFEDF0F6),
          width: 1.5,
        ))),
        padding: const EdgeInsets.only(bottom: 8, top: 8),
        child: ClipRRect(
            borderRadius: const BorderRadius.vertical(
              top: Radius.circular(30),
            ),
            child: Stack(
              children: [
                BottomNavigationBar(
                  type: BottomNavigationBarType.fixed,
                  items: <BottomNavigationBarItem>[
                    BottomNavigationBarItem(
                      icon: SizedBox(
                        height: 25,
                        width: 25,
                        child:
                            _selectedIndex == 0 ? todayIconSelect : todayIcon,
                      ),
                      label: 'Today',
                    ),
                    BottomNavigationBarItem(
                      icon: SizedBox(
                        height: 25,
                        width: 25,
                        child: _selectedIndex == 1
                            ? calenderIconSelect
                            : calenderIcon,
                      ),
                      label: 'Progress',
                    ),
                    BottomNavigationBarItem(
                      icon: SizedBox(
                        height: 25,
                        width: 25,
                        child: _selectedIndex == 2 ? yogaIconSelect : yogaIcon,
                      ),
                      label: 'Browse',
                    ),
                    BottomNavigationBarItem(
                      icon: SizedBox(
                        height: 25,
                        width: 25,
                        child: _selectedIndex == 3
                            ? commentIconSelect
                            : commentIcon,
                      ),
                      label: 'Connect',
                    ),
                  ],
                  currentIndex: _selectedIndex,
                  selectedItemColor: Color(int.parse('FF1B2C56', radix: 16)),
                  unselectedItemColor: Color(int.parse('FF5B6172', radix: 16)),
                  onTap: _onItemTapped,
                ),
              ],
            )),
      ),
    );
  }
}
