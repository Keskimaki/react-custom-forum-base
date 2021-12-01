import CSS from 'csstype'

const app: CSS.Properties = {
}

const header: CSS.Properties = {
  backgroundColor: '#24292e',
  paddingRight: '50%',
  height: '8vh',
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

const board: CSS.Properties = {
  backgroundColor: '#FFF',
  padding: '5px',
  marginBottom: '10px',
  fontSize: '20px'
}

const link: CSS.Properties = {
  textDecoration: 'inherit',
  color: 'inherit'
}

const login: CSS.Properties = {
  height: '85vh',
  width: '600px',
  backgroundColor: '#FFF',
  paddingTop: '50px',
  textAlign: 'center',
  margin: 'auto'
}

const textInput: CSS.Properties = {
  height: '50px',
  width: '300px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '20px'
}

const button: CSS.Properties = {
  backgroundColor: '#0366d6',
  color: '#FFF',
  height: '50px',
  width: '300px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  marginTop: '10px',
  fontSize: '20px'
}

const footer: CSS.Properties = {
  backgroundColor: '#24292e',
  color: '#FFF',
  height: '4vh',
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
  board,
  link,
  login,
  textInput,
  button,
  footer
}

export default styles