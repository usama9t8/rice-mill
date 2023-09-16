import styled from "styled-components";

const Wrapper = styled.aside`
  .sidebar-cont {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    z-index: -1;
    transition: 0.3s ease-in-out opacity, 0.15s ease-in-out z-index;

    .content-cont {
      width: 90vw;
      height: 95vh;
      background-color: #4c065f;
      border-radius: var(--border-radius);
      padding: 4rem 2rem;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      .links-header {
        max-width: 175px;
      }
      img {
        margin-bottom: 2rem;
      }
      h4 {
        color: var(--grey-500);
        font-weight: 500;
        margin-top: 1rem;
        align-self: flex-start;
      }
      .close-btn {
        font-size: 2rem;
        background: transparent;
        border: none;
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: var(--red-dark);
        cursor: pointer;
      }
    }
  }
  .show-sidebar {
    opacity: 1;
    z-index: 2;
  }

  @media screen and (min-width: 992px) {
    display: none;
  }
`;

export default Wrapper;
