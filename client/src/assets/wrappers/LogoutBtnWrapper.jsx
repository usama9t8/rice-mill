import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 0.875rem;
  position: relative;

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .img {
      display: block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
  }
  .logout {
    position: absolute;
    top: 40px;
    width: 100%;
    left: 0;
    padding: 0.5rem;
    text-transform: capitalize;
    cursor: pointer;
    background-color: var(--primary-500);
    color: var(--white);
    border: transparent;
    border-radius: var(--border-radius);
    letter-spacing: var(--letterspacing);
    display: none;
  }
  .show-logout {
    display: block;
  }
`;

export default Wrapper;
