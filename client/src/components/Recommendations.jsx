import React from "react";
import styled from "styled-components";

const RecommendationsContainer = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 24px 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
`;

const RecommendationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RecommendationItem = styled.li`
  font-size: 1rem;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const Recommendations = () => {
  // Dummy data for demonstration
  const recommendations = {
    diet: ["Increase protein intake with foods like chicken, fish, and legumes."],
    exercise: ["Include more cardio activities like running, cycling, and swimming."],
  };

  return (
    <RecommendationsContainer>
      <SectionTitle>Personalized Recommendations</SectionTitle>
      <>
        <SectionTitle>Diet Recommendations</SectionTitle>
        <RecommendationList>
          {recommendations.diet.map((rec, index) => (
            <RecommendationItem key={index}>{rec}</RecommendationItem>
          ))}
        </RecommendationList>
        <SectionTitle>Exercise Recommendations</SectionTitle>
        <RecommendationList>
          {recommendations.exercise.map((rec, index) => (
            <RecommendationItem key={index}>{rec}</RecommendationItem>
          ))}
        </RecommendationList>
      </>
    </RecommendationsContainer>
  );
};

export default Recommendations;
