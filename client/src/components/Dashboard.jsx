import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { dashboardData, todaysWorkouts1} from "../utils/Mockdata";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dashboardData); // Initialize with mock data
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState(todaysWorkouts1); // Initialize with mock data
  const [workout, setWorkout] = useState(`#Legs\n-Back Squat\n-5 setsX15 reps\n-30 kg\n-10 min`);

  const addNewWorkout = async () => {
    // Placeholder function for adding new workout
  };

  useEffect(() => {
    // Placeholder for any initial data fetching
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard key={item.name} item={item} data={data} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          {/* <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          /> */}
        </FlexWrap>

        <Section>
          <Title>Todays Workouts</Title>
          <CardWrapper>
            {todaysWorkouts.map((workout, index) => (
              <WorkoutCard key={index} workout={workout} />
            ))}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
