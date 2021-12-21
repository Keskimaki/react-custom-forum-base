import React from 'react'
import styles from '../../styles'

const ForumInfo = () => {
  return (
    <div>
      <div style={styles.infoBarItem}>
        <h3 style={styles.subHeader}>Forum Info</h3>
        <br />
        Duis volutpat, dui at congue lobortis, odio dolor pellentesque felis, quis euismod massa enim vitae ex. <strong>Aliquam nisl leo, imperdiet quis ullamcorper et, interdum vel enim.</strong> Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse quis sem ipsum. Ut vulputate mollis leo. Duis luctus, quam a condimentum aliquet, mauris augue viverra lacus, vitae porttitor justo dolor et sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ut lobortis urna, at gravida justo. Vestibulum vitae lorem sed odio lobortis rhoncus. Pellentesque cursus lorem pharetra sapien consectetur consectetur.
      </div>
      <Rules />
    </div>
  )
}

const Rules = () => {
  return (
    <div style={styles.infoBarItem}>
      <h3 style={styles.subHeader}>Forum Rules</h3>
      <strong>
        <ol style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Nulla eget tempor mauris. Morbi blandit enim rutrum eros sodales suscipit.</li>
          <li>Vestibulum non dapibus lacus. In dictum bibendum lorem eu hendrerit.</li>
          <li>Vivamus commodo ipsum non urna vulputate, eu varius nisl hendrerit.</li>
          <li>Etiam in neque nunc. Nam interdum auctor diam, sed posuere mauris faucibus bibendum.</li>
          <li>Praesent felis velit, porttitor id cursus a, tristique nec augue.</li>
          <li>Curabitur aliquam sapien sed nisl bibendum, sit amet semper nisl sollicitudin.</li>
          <li>Ut iaculis odio vitae mi bibendum, in volutpat tellus malesuada.</li>
          <li>Curabitur sagittis sapien nibh. Aenean placerat elit eget ante lacinia rutrum vitae congue purus.</li>
          <li>Fusce dapibus, mi id placerat mollis, arcu lacus mollis arcu, sit amet fermentum sapien ligula quis ipsum.</li>
          <li>Quisque vel tortor dapibus, consequat risus laoreet, maximus purus.</li>
        </ol>
      </strong>
    </div>
  )
}

export default ForumInfo
