import styled from "styled-components";
const Wrapper = styled.main`
  display: flex;
  align-items: center;
  min-height: 100vh;

  .form {
    max-width: 400px;
    background: transparent;
    box-shadow: none;
    img {
      display: block;
      margin: 0 auto;
      margin-bottom: 1.38rem;
    }
    h4 {
      text-align: center;
      margin-bottom: 1.38rem;
      color: var(--primary-500);
    }
    .btn {
      margin-top: 1rem;
      height: 35px;
    }
    .form-label {
      color: var(--white);
    }
    p {
      text-align: center;
      margin-top: 1rem;
      color: var(--white);
      a {
        color: var(--primary-500);
        text-transform: capitalize;
        letter-spacing: var(--letter-spacing);
      }
    }
  }
`;

export default Wrapper;
