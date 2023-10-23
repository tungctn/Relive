import 'package:fit_worker/providers/notifiers/plan.notifier.dart';
import 'package:fit_worker/providers/store.dart';
import 'package:fit_worker/views/layouts/navigation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class MyApp extends StatelessWidget {
  MyApp({Key? key}) : super(key: key);
  final Store store = Store();

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          ChangeNotifierProvider<PlanNotifier>.value(value: store.planNotifier),
        ],
        child: MaterialApp(
          title: 'Fit Worker',
          theme: ThemeData(
              colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
              useMaterial3: true,
              textTheme: const TextTheme(
                  bodyLarge: TextStyle(fontFamily: "PlusRegular"))),
          home: const Navigation(),
          debugShowCheckedModeBanner: false,
        ));
  }
}
