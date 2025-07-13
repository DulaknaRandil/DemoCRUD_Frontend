'use client';

import React from 'react';
import styled from 'styled-components';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className }) => {
  return (
    <StyledWrapper className={className}>
      <div className="card">
        {children}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    min-height: 254px;
    background: rgb(223, 225, 235);
    overflow: hidden;
    border-radius: 20px;
    box-shadow:
      inset 0px 56px 40px rgba(34, 34, 36, 0.1),
      inset 0px -56px 40px rgba(255, 255, 255, 0.3),
      1px 1px 2px rgba(255, 255, 255, 0.8),
      -1px -1px 2px rgba(68, 68, 68, 0.2);
    padding: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow:
      inset 0px 56px 40px rgba(34, 34, 36, 0.15),
      inset 0px -56px 40px rgba(255, 255, 255, 0.4),
      5px 5px 15px rgba(0, 0, 0, 0.1),
      -2px -2px 8px rgba(255, 255, 255, 0.9);
  }

  /* Dark theme support */
  [data-theme="dark"] & .card {
    background: rgb(45, 47, 55);
    box-shadow:
      inset 0px 56px 40px rgba(0, 0, 0, 0.2),
      inset 0px -56px 40px rgba(255, 255, 255, 0.05),
      1px 1px 2px rgba(255, 255, 255, 0.1),
      -1px -1px 2px rgba(0, 0, 0, 0.3);
  }

  [data-theme="dark"] & .card:hover {
    box-shadow:
      inset 0px 56px 40px rgba(0, 0, 0, 0.3),
      inset 0px -56px 40px rgba(255, 255, 255, 0.08),
      5px 5px 15px rgba(0, 0, 0, 0.4),
      -2px -2px 8px rgba(255, 255, 255, 0.05);
  }
`;

export default AnimatedCard;
