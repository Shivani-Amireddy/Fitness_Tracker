import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useNavigate } from "react-router-dom";
import LogoImage from "../utils/Logo.png";
import AuthImage from "../utils/AuthImage.jpg";

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bg};
  height: 100vh; /* Set the height of the container to full viewport height */
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%; /* Set height to 100% to cover entire vertical space */
`;
const Logo = styled.img`
  position: absolute;
  width: 70px;
  top: 40px;
  left: 60px;
  z-index: 10;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    // setLoading(true);
    // setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const response = await UserSignUp({ name, email, password });
        if (!response) {
          throw new Error("Empty response received");
        }
        console.log("Response data:", response.data);
        alert("Sign Up Success");
        setLoading(false);
        setButtonDisabled(false);
        navigate("/");
      } catch (err) {
        console.error("Sign up error:", err);
        setLoading(false);
        setButtonDisabled(false);
      }
    }
  };

  return (
    <Container>
      <Left>
        <Logo src={LogoImage} />
        <Image src={AuthImage} />
      </Left>
      <Right>
        <div>
          <Title>Create Account</Title>
          <Span>Please fill in your details</Span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <TextInput
            label="Name"
            placeholder="Enter your name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            password
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text="Sign Up"
            onClick={handleSignUp}
            isLoading={loading}
            isDisabled={buttonDisabled}
          />
        </div>
        <Text>
          Already have an account?{" "}
          <TextButton onClick={() => navigate("/")}>SignIn</TextButton>
        </Text>
      </Right>
    </Container>
  );
};

export default SignUp;
