import React from 'react'
import { useMutation } from '@apollo/client'

import { VOTE_MUTATION } from '../apollo/mutation'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'

const Link = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN)
  const [voteMutation] = useMutation(VOTE_MUTATION, {
    variables: { linkId: props.link.id },
    update: (cache, { data: { vote } }) =>
      props.updateStoreAfterVote(cache, vote, props.link.id),
  })
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11" onClick={voteMutation}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {props.link.description} ({props.link.url})
        </div>
        <div className="f6 lh-copy gray">
          {props.link.votes.length} votes | by{' '}
          {props.link.postedBy ? props.link.postedBy.name : 'Unknown'}{' '}
          {timeDifferenceForDate(props.link.createdAt)}
        </div>
      </div>
    </div>
  )
}

export default Link
