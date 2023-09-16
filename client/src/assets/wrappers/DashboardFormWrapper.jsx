import styled from "styled-components";

const Wrapper = styled.main`
  .form {
    margin: 0;
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    .form-header {
      padding-top: 1.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .form-cont {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-bottom: 1.5rem;
    }
    .form-footer {
      background-color: var(--grey-100);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 1rem 1.5rem;
    }
    a {
      display: grid;
      place-items: center;
      font-size: 0.875rem;
    }
    h1 {
      margin-bottom: 0.5rem;
    }
    p {
      color: var(--grey-500);
      font-size: var(--small-text);
    }
  }
  @media screen and (min-width: 768px) {
    .form-cont {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
    }

    a {
      width: auto;
    }
  }
`;

export default Wrapper;
