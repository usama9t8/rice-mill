import styled from "styled-components";

const Wrapper = styled.nav`
  height: 5rem;
  background-color: var(--background-secondary-color);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .fa-bars {
      background-color: transparent;
      border: none;
      font-size: 1.75rem;
      color: var(--primary-500);
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    img {
      width: 100px;
    }

    .logout-btn-cont {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .theme-toggle-btn {
        margin-right: 1rem;
        display: flex;
        align-items: center;
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }

  @media screen and (min-width: 992px) {
    .nav-center {
      width: 90%;
      .logo-text {
        display: block;
      }
    }
  }
`;

export default Wrapper;
