import React from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
  const { logout, isAuthenticated, user, isLoading, loginWithRedirect } =
    useAuth0()
  const isUSer = isAuthenticated && user

  return (
    <Wrapper>
      {isUSer && user.picture && <img src={user.picture} alt={user.name} />}
      {isUSer && user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}

      {isUSer ? (
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin })
          }}
        >
          Logout
        </button>
      ) : (
        <button onClick={loginWithRedirect}>Login</button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`

export default Navbar
