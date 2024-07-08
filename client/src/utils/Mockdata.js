// Sample counts data for CountsCard component
export const counts = [
    {
      name: 'Steps',
      key: 'steps',
      unit: 'steps',
      desc: 'Total steps taken today',
      icon: '👣',
      color: '#4CAF50',
      lightColor: '#E8F5E9',
    },
    {
      name: 'Calories',
      key: 'calories',
      unit: 'kcal',
      desc: 'Total calories burned today',
      icon: '🔥',
      color: '#FF9800',
      lightColor: '#FFE0B2',
    },
    // Add more items as needed
  ];
  
  // Sample data for WeeklyStatCard component
  const weeklyStatData = {
    totalWeeksCaloriesBurnt: {
      weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      caloriesBurned: [2000, 2200, 2400, 2100], // Replace with actual data
    },
  };
  
  // Sample data for CategoryChart component
  const categoryChartData = {
    pieChartData: [
      { category: 'Running', value: 30 },
      { category: 'Cycling', value: 20 },
      { category: 'Swimming', value: 25 },
      { category: 'Walking', value: 15 },
      { category: 'Others', value: 10 },
    ],
  };
  
  // Sample data for TodaysWorkouts
  const todaysWorkouts1 = [
    {
      category: 'Legs',
      workoutName: 'Back Squat',
      sets: 5,
      reps: 15,
      weight: 30,
      duration: 10,
    },
    {
      category: 'Upper Body',
      workoutName: 'Bench Press',
      sets: 4,
      reps: 12,
      weight: 50,
      duration: 8,
    },
    {
      category: 'Cardio',
      workoutName: 'Running',
      distance: '5 km',
      duration: 30,
    },
    {
      category: 'Core',
      workoutName: 'Plank',
      duration: 5,
    },
  ];
  
  
  // Sample data for Dashboard component (main data)
  const dashboardData = {
    steps: 5000,
    calories: 1200,
    // Add more fields as needed
    totalWeeksCaloriesBurnt: weeklyStatData.totalWeeksCaloriesBurnt,
    pieChartData: categoryChartData.pieChartData,
  };
  
  export { dashboardData, todaysWorkouts1 };
  