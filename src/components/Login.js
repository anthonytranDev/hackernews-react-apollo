import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { AUTH_TOKEN } from '../constants'
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../apollo/mutation'

const Login = (props) => {
  const [authorised, setAuthorised] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  const _confirm = async (data) => {
    const { token } = authorised ? data.login : data.signup
    _saveUserData(token)
    props.history.push(`/`)
  }

  const [handleAccess] = useMutation(
    authorised ? LOGIN_MUTATION : SIGNUP_MUTATION,
    {
      variables: { email, password, name },
      onCompleted: (data) => _confirm(data),
      onError: (error) => console.error(error),
    }
  )

  return (
    <div>
      <h4 className="mv3">{authorised ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!authorised && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={handleAccess}>
          {authorised ? 'login' : 'create account'}
        </div>
        <div
          className="pointer button"
          onClick={() => setAuthorised(!authorised)}
        >
          {authorised
            ? 'need to create an account?'
            : 'already have an account?'}
        </div>
      </div>
    </div>
  )
}

export default Login
