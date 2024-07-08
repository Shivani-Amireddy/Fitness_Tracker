import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const CategoryChart = ({ data }) => {
  // Dummy pie chart data
  const pieChartData = [
    { name: "Running", value: 30 },
    { name: "Swimming", value: 20 },
    { name: "Cycling", value: 25 },
    { name: "Walking", value: 15 },
    { name: "Yoga", value: 10 },
  ];

  return (
    <Card>
      <Title>Weekly Activity Breakdown</Title>
      <PieChart
        series={[
          {
            data: pieChartData.map((item) => ({
              ...item,
              label: `${item.name}: ${item.value.toFixed(2)}%`,
            })),
            innerRadius: 30,
            outerRadius: 120,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        height={300}
      />
    </Card>
  );
};

export default CategoryChart;
