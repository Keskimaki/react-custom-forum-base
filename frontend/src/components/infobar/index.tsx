import React from 'react'
import LatestPosts from './LatestPosts'
import styles from '../../styles'

const InfoBar = () => {
  return (
    <div style={styles.infoBar}>
      <LatestPosts />
      <div style={styles.infoBarItem}>
        Nulla eget tempor mauris. Morbi blandit enim rutrum eros sodales suscipit. Vestibulum non dapibus lacus. In dictum bibendum lorem eu hendrerit. Vivamus commodo ipsum non urna vulputate, eu varius nisl hendrerit. Etiam in neque nunc. Nam interdum auctor diam, sed posuere mauris faucibus bibendum. Praesent felis velit, porttitor id cursus a, tristique nec augue. Curabitur aliquam sapien sed nisl bibendum, sit amet semper nisl sollicitudin. Ut iaculis odio vitae mi bibendum, in volutpat tellus malesuada. Curabitur sagittis sapien nibh. Aenean placerat elit eget ante lacinia rutrum vitae congue purus.
      </div>
      <div style={styles.infoBarItem}>
        Fusce dapibus, mi id placerat mollis, arcu lacus mollis arcu, sit amet fermentum sapien ligula quis ipsum. Quisque vel tortor dapibus, consequat risus laoreet, maximus purus. Ut rhoncus egestas risus, vitae fringilla augue pellentesque nec. Duis volutpat, dui at congue lobortis, odio dolor pellentesque felis, quis euismod massa enim vitae ex. Aliquam nisl leo, imperdiet quis ullamcorper et, interdum vel enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse quis sem ipsum. Ut vulputate mollis leo. Duis luctus, quam a condimentum aliquet, mauris augue viverra lacus, vitae porttitor justo dolor et sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ut lobortis urna, at gravida justo. Vestibulum vitae lorem sed odio lobortis rhoncus. Pellentesque cursus lorem pharetra sapien consectetur consectetur. Etiam volutpat faucibus dolor, at blandit magna eleifend a.
      </div>
    </div>
  )
}

export default InfoBar