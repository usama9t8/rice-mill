import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;

  @media screen and (min-width: 992px) {
    display: block;
    .sidebar-cont {
      width: 250px;
      background-color: #4c065f;
      min-height: 100vh;
      height: 100%;
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;

      .content {
        position: sticky;
        top: 0;

        .links-header {
          padding: 1rem 2rem;
          transition: padding-left 0.3s ease-in-out;
        }
        .links-cont a:hover {
          padding-left: 2rem;
        }
      }

      header {
        display: grid;
        place-items: center;
        .logo {
          width: 160px;
          height: 80px;
          margin: 1rem 0;
        }
        h1 {
          color: var(--white);
        }
      }
      .dashboard-links {
        padding: 1rem 0;
      }

      .dashboard-links a {
        padding-left: 2rem;
        transition: padding-left 0.3s ease-in-out;
      }

      .dashboard-links a:hover {
        padding-left: 2.5rem;
        transition: var(--transition);
      }
    }

    .show-sidebar {
      margin-left: 0;
    }
  }
`;

export default Wrapper;
