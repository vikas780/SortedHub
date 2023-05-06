import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

//provider consumers

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [followers, setFollowers] = useState(mockFollowers)
  const [repos, setRepos] = useState(mockRepos)
  const [request, setRequest] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ show: false, msg: '' })

  const searchUSer = async (user) => {
    toggleError()
    setLoading(true)
    const response = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((error) => {
        console.log(error)
      })
    if (response) {
      setGithubUser(response.data)
      const { repos_url, followers_url } = response.data
      //Repositories
      axios(`${repos_url}?per_page=100`).then((response) =>
        setRepos(response.data)
      )

      //Followers

      axios(`${followers_url}?per_page=100`).then((response) =>
        setFollowers(response.data)
      )
    } else {
      toggleError(true, 'There is no user exists with that user name')
    }
    checkRequest()
    setLoading(false)
  }
  /*   Add this to .gitignore
 const searchUSer = async (user) => {
   toggleError()
   setLoading(true)
   const response = await axios
     .get(`${rootUrl}/users/${user}`)
     .catch((error) => {
       console.log(error)
     })
   if (response) {
     setGithubUser(response.data)
     const { repos_url, followers_url } = response.data
     await Promise.allSettled([
       axios(`${repos_url}?per_page=100`),
       axios(`${followers_url}?per_page=100`),
     ]).then((response) => {
       const [repos, followers] = response
       const status = 'fulfilled'
       if (repos.status === status) {
         setRepos(repos.value.data)
       }
       if (followers.status === status) {
         setFollowers(followers.value.data)
       }
     })
   } else {
     toggleError(true, 'There is no user exists with that user name')
   }
   checkRequest()
   setLoading(false)
 }

*/

  const checkRequest = async () => {
    const response = await axios.get(`${rootUrl}/rate_limit`)
    const remaining = await response.data.rate.remaining

    setRequest(remaining)

    if (remaining === 0) {
      toggleError(true, 'Sorry you have exceeded your rate limit!')
    }
  }
  function toggleError(show = false, msg = '') {
    setError({ show, msg })
  }

  useEffect(() => checkRequest, [])

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        followers,
        repos,
        request,
        error,
        searchUSer,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

function useGithubContext() {
  const context = React.useContext(GithubContext)
  if (context === undefined) {
    throw new Error('useGithubContext must be used within a GithubProvider')
  }
  return context
}

export { GithubProvider, GithubContext }
