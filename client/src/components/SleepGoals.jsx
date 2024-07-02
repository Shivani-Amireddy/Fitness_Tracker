import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SleepContainer = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary_dark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.primary_light};
    cursor: not-allowed;
  }
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  padding: 12px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 12px;
`;

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.white};
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.secondary_dark};
  }
`;

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.white};
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.error_dark};
  }
`;

const RecommendationsContainer = styled.div`
  margin-top: 24px;
`;

const RecommendationItem = styled.p`
  color: ${({ theme }) => theme.text_primary};
`;

const SleepGoals = () => {
  const [sleepDurationGoal, setSleepDurationGoal] = useState("");
  const [sleepQualityGoal, setSleepQualityGoal] = useState("");
  const [sleepDurationLog, setSleepDurationLog] = useState("");
  const [sleepQualityLog, setSleepQualityLog] = useState("");
  const [sleepLogs, setSleepLogs] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [editLogId, setEditLogId] = useState(null);

  useEffect(() => {
    const storedSleepLogs = JSON.parse(localStorage.getItem("sleepLogs")) || [];
    setSleepLogs(storedSleepLogs);
    setCurrentDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    localStorage.setItem("sleepLogs", JSON.stringify(sleepLogs));
  }, [sleepLogs]);

  const handleSetGoals = (e) => {
    e.preventDefault();
    alert("Sleep goals set successfully!");
  };

  const handleLogSleep = (e) => {
    e.preventDefault();
    if (editLogId) {
      const updatedLogs = sleepLogs.map((log) =>
        log.id === editLogId
          ? { id: log.id, date: currentDate, duration: sleepDurationLog, quality: sleepQualityLog }
          : log
      );
      setSleepLogs(updatedLogs);
      setEditLogId(null);
    } else {
      const newLog = {
        id: sleepLogs.length + 1,
        date: currentDate,
        duration: sleepDurationLog,
        quality: sleepQualityLog,
      };
      setSleepLogs([...sleepLogs, newLog]);
    }
    setCurrentDate(new Date().toISOString().split("T")[0]);
    setSleepDurationLog("");
    setSleepQualityLog("");
  };

  const handleEditLog = (log) => {
    setEditLogId(log.id);
    setCurrentDate(log.date);
    setSleepDurationLog(log.duration);
    setSleepQualityLog(log.quality);
  };

  const handleDeleteLog = (logId) => {
    const updatedLogs = sleepLogs.filter((log) => log.id !== logId);
    setSleepLogs(updatedLogs);
  };

  const parseQuality = (quality) => {
    switch (quality) {
      case "Poor":
        return 1;
      case "Average":
        return 2;
      case "Good":
        return 3;
      case "Excellent":
        return 4;
      default:
        return 0;
    }
  };

  const averageSleepDuration = sleepLogs.reduce((total, log) => total + parseFloat(log.duration), 0) / sleepLogs.length || 0;
  const averageSleepQuality = sleepLogs.reduce((total, log) => total + parseQuality(log.quality), 0) / sleepLogs.length || 0;

  const qualityString = (value) => {
    switch (value) {
      case 1:
        return "Poor";
      case 2:
        return "Average";
      case 3:
        return "Good";
      case 4:
        return "Excellent";
      default:
        return "Unknown";
    }
  };

  let sleepDurationRecommendation = "";
  if (sleepDurationGoal && averageSleepDuration < sleepDurationGoal) {
    sleepDurationRecommendation = `You are currently sleeping less than your goal of ${sleepDurationGoal} hours per night. Try to go to bed earlier to achieve your goal.`;
  } else if (sleepDurationGoal && averageSleepDuration > sleepDurationGoal) {
    sleepDurationRecommendation = `You are currently sleeping more than your goal of ${sleepDurationGoal} hours per night. Consider adjusting your bedtime to meet your goal consistently.`;
  }

  let sleepQualityRecommendation = "";
  if (sleepQualityGoal && parseQuality(averageSleepQuality) < parseQuality(sleepQualityGoal)) {
    sleepQualityRecommendation = `Your average sleep quality is lower than your goal. Focus on improving sleep conditions or habits to enhance sleep quality.`;
  } else if (sleepQualityGoal && parseQuality(averageSleepQuality) > parseQuality(sleepQualityGoal)) {
    sleepQualityRecommendation = `Congratulations! Your average sleep quality exceeds your goal. Keep up the good habits to maintain quality sleep.`;
  }

  return (
    <SleepContainer>
      <SectionTitle>Sleep Goals</SectionTitle>
      <Form onSubmit={handleSetGoals}>
        <FormGroup>
          <Label>Sleep Duration Goal (hours)</Label>
          <Input
            type="number"
            value={sleepDurationGoal}
            onChange={(e) => setSleepDurationGoal(e.target.value)}
            placeholder="Enter sleep duration goal"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Sleep Quality Goal</Label>
          <Select
            value={sleepQualityGoal}
            onChange={(e) => setSleepQualityGoal(e.target.value)}
            required
          >
            <option value="">Select sleep quality goal</option>
            <option value="Poor">Poor</option>
            <option value="Average">Average</option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
          </Select>
        </FormGroup>
        <Button type="submit">Set Goals</Button>
      </Form>

      <SectionTitle>Log Sleep</SectionTitle>
      <Form onSubmit={handleLogSleep}>
        <FormGroup>
          <Label>Date</Label>
          <Input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Sleep Duration (hours)</Label>
          <Input
            type="number"
            value={sleepDurationLog}
            onChange={(e) => setSleepDurationLog(e.target.value)}
            placeholder="Enter sleep duration"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Sleep Quality</Label>
          <Select
            value={sleepQualityLog}
            onChange={(e) => setSleepQualityLog(e.target.value)}
            required
          >
            <option value="">Select sleep quality</option>
            <option value="Poor">Poor</option>
            <option value="Average">Average</option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
          </Select>
        </FormGroup>
        <Button type="submit">{editLogId ? "Update Log" : "Log Sleep"}</Button>
      </Form>

      <HistoryTable>
        <thead>
          <tr>
            <TableHeader>Date</TableHeader>
            <TableHeader>Duration (hours)</TableHeader>
            <TableHeader>Quality</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {sleepLogs.length === 0 ? (
            <tr>
              <TableCell colSpan="4">No sleep logs yet.</TableCell>
            </tr>
          ) : (
            sleepLogs.map((log) => (
              <tr key={log.id}>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.duration}</TableCell>
                <TableCell>{log.quality}</TableCell>
                <TableCell>
                  <EditButton onClick={() => handleEditLog(log)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDeleteLog(log.id)}>Delete</DeleteButton>
                </TableCell>
              </tr>
            ))
          )}
        </tbody>
      </HistoryTable>

      {(sleepDurationRecommendation || sleepQualityRecommendation) && (
        <RecommendationsContainer>
          {sleepDurationRecommendation && (
            <RecommendationItem>{sleepDurationRecommendation}</RecommendationItem>
          )}
          {sleepQualityRecommendation && (
            <RecommendationItem>{sleepQualityRecommendation}</RecommendationItem>
          )}
        </RecommendationsContainer>
      )}
    </SleepContainer>
  );
};

export default SleepGoals;
