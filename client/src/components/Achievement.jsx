import React from "react";
import styled from "styled-components";
import SocialSharing from "./SocialSharing";


const AchievementContainer = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const AchievementTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const MetricsContainer = styled.div`
  margin-top: 16px;
`;

const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const MetricLabel = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  flex: 1; /* Ensure label takes up space */
`;

const MetricValue = styled.span`
  font-weight: 400;
  margin-left: 10px; /* Add margin for separation */
`;

const ShareButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary_dark};
  }
`;
const Achievement = ({ title, metrics }) => {
    const shareUrl = "https://yourfitnesswebsite.com";
    const shareQuote = `I achieved ${title} with ${metrics.steps} steps and ${metrics.calories} calories burned!`;

    const handleShare = () => {
        console.log("Sharing:", shareQuote, shareUrl);
    };

    return (
        <AchievementContainer>
            <AchievementTitle>{title}</AchievementTitle>
            <MetricsContainer>
                <MetricItem>
                    <MetricLabel>Steps:</MetricLabel>
                    <MetricValue>{metrics.steps}</MetricValue>
                </MetricItem>
                <MetricItem>
                    <MetricLabel>Calories Burned:</MetricLabel>
                    <MetricValue>{metrics.calories}</MetricValue>
                </MetricItem>
                <MetricItem>
                    <MetricLabel>Distance:</MetricLabel>
                    <MetricValue>{metrics.distance}</MetricValue>
                </MetricItem>
            </MetricsContainer>
            <SocialSharing url={shareUrl} quote={shareQuote} />
            {/* <ShareButton onClick={handleShare}>Share Now</ShareButton> */}
        </AchievementContainer>
    );
};

export default Achievement;
