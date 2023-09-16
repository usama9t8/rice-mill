import styled from "styled-components";

const Wrapper = styled.div`
  .dashboard-links {
    display: flex;
    flex-direction: column;

    .active {
      color: var(--primary-500);
    }
    .pending {
      background-color: #4c065f;
    }
    a,
    .links-header {
      padding: 1rem 0;
      display: flex;
      align-items: center;
      color: var(--white);
      text-transform: capitalize;
      transition: var(--transition);
      span {
        margin-right: 1rem;
        display: grid;
        place-items: center;
        font-size: 1.5rem;
      }
    }
    .links-cont {
      overflow: hidden;
      transition: var(--transition);
      .nav-links {
        padding-left: 2.5rem;

        a {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
      }
    }
    .links-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-header-section {
        display: flex;
        align-items: center;
      }
    }
    a:hover {
      color: var(--primary-500);
    }
  }
`;

export default Wrapper;
