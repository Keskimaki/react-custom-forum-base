import CSS from 'csstype'

const app: CSS.Properties = {
}

const header: CSS.Properties = {
  backgroundColor: '#24292e',
  paddingRight: '50%',
  height: '80px',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '25px',
}

const headerTab: CSS.Properties = {
  padding: '10px 0px 10px 10px',
  color: '#FFF',
  fontWeight: 'bold'
}

const footer: CSS.Properties = {
  backgroundColor: '#24292e',
  color: '#FFF',
  height: '40px',
  width: '100%',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-around',
  position: 'absolute',
  bottom: 0
}

const styles = {
  app,
  header,
  headerTab,
  //
  footer
}

export default styles