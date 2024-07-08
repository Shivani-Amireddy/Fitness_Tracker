import React from "react";
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from "react-share";
import styled from "styled-components";

const ShareContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 16px;
`;

const ShareButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary_dark};
  }
`;

const SocialSharing = ({ url, quote }) => {
  return (
    <ShareContainer>
      <TwitterShareButton url={url} title={quote}>
        <ShareButton>Share on Twitter</ShareButton>
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={quote}>
        <ShareButton>Share on Facebook</ShareButton>
      </FacebookShareButton>
      <LinkedinShareButton url={url} title={quote}>
        <ShareButton>Share on LinkedIn</ShareButton>
      </LinkedinShareButton>
    </ShareContainer>
  );
};

export default SocialSharing;
