import styled from "styled-components";

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);

  .logout-cont {
    background-color: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    h4 {
      margin-bottom: 1rem;
      color: var(--primary-500);
    }
    button {
      height: 35px;
      margin-top: 1rem;
    }
    .no-btn {
      background-color: var(--green-dark);
      color: var(--green-light);
    }
    .yes-btn {
      background-color: var(--red-dark);
      color: var(--red-light);
      margin-right: 1rem;
    }
  }
`;

export default Wrapper;
