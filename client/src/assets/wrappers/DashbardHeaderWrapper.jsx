import styled from "styled-components";

const Wrapper = styled.main`
  padding: 1.5rem;
  background-color: var(--background-secondary-color);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  box-shadow: var(--shadow-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-weight: 500;
  }
  .btn {
    height: auto;
  }
`;

export default Wrapper;
