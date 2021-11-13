import React from 'react';
import PropTypes from 'prop-types';

// components
import Navbar from '../components/Navbar/Navbar';

// styles
import styled from 'styled-components';

// animations
import { pageAnimation } from '../animation';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <Navbar />
      <Container variants={pageAnimation} initial="hidden" animate="show" exit="exit">
        {children}
      </Container>
    </StyledLayout>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const StyledLayout = styled.div`
  display: flex;
  position: relative;
`;

const Container = styled(motion.div)`
  width: 83%;
  background: #f0f0f0;
`;

export default Layout;
