import React from 'react'
import LatestPosts from './LatestPosts'
import ForumInfo from './ForumInfo'
import styles from '../../styles'

const InfoBar = () => {
  return (
    <div style={styles.infoBar}>
      <LatestPosts />
      <ForumInfo />
    </div>
  )
}

export default InfoBar